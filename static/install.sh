#!/usr/bin/env bash
# shellcheck disable=SC2059

set -o errexit
set -o nounset
set -o pipefail

# Install configuration
if ! [ "${OWNCAST_VERSION:-}" ]; then
	OWNCAST_VERSION="0.2.3"
fi

if ! [ "${OWNCAST_INSTALL_DIRECTORY:-}" ]; then
	OWNCAST_INSTALL_DIRECTORY="$(pwd)/owncast"
fi

if ! [ "${OWNCAST_BACKUP_DIRECTORY:-}" ]; then
	OWNCAST_BACKUP_DIRECTORY="$(pwd)/owncast-install-backups"
fi

if ! [ "${FORCE_FFMPEG_DOWNLOAD:-}" ]; then
	FORCE_FFMPEG_DOWNLOAD=false
fi

INSTALL_TEMP_DIRECTORY="$(mktemp -d)"

# Set up an exit handler so we can print a help message on failures.
_success=false
shutdown() {
	if [ $_success = false ]; then
		printf "\n\n"
		printf "${RED}ERROR:${NC} Your Owncast installation did not complete successfully.\n"
		printf "Please report your issue at https://github.com/owncast/owncast/issues if there is an unexpected problem.\n\n"
	fi
	rm -rf "$INSTALL_TEMP_DIRECTORY"
}
trap shutdown INT TERM ABRT EXIT

# Formatting escape codes.

if [ -z ${NO_COLOR+x} ]; then
	RED='\033[0;31m'
	PURPLE='\033[0;35m'
	BLUE='\033[1;34m'
	GREEN='\033[1;32m'
	BOLD='\033[1m'
	UNDERLINE='\033[4m'
	NC='\033[0m' # No Color
else
	RED=''
	PURPLE=''
	BLUE=''
	GREEN=''
	BOLD=''
	UNDERLINE=''
	NC=''
fi

# Activity spinner for background processes.
spinner() {
	local -r delay='0.3'
	local spinstr='\|/-'
	local temp
	while ps -p "$1" >>/dev/null; do
		temp="${spinstr#?}"
		printf " [${BLUE}%c${NC}]  " "${spinstr}"
		spinstr=${temp}${spinstr%"${temp}"}
		sleep "${delay}"
		printf "\b\b\b\b\b\b"
	done
	printf "\r\033[K"
}

# Print an error message and exit the program.
errorAndExit() {
	printf "${RED}ERROR:${NC} %s" "$1"
	exit 1
}

# Check for a required tool, or exit
requireTool() {
	if ! command -v "$1" &>/dev/null; then
		errorAndExit "Could not locate \"$1\", which is required for installation. Please install it on your system."
	fi
}

# Check if the current user matches the owner of an existing file or directory
checkUpgradeUserOwnership() {
	local path="$1"
	local description="$2"
	local current_user
	local owner

	current_user="$(whoami)"

	# Get file owner (cross-platform: macOS uses -f '%Su', Linux uses -c '%U')
	if [[ "$(uname -s)" == "Darwin" ]]; then
		owner="$(stat -f '%Su' "$path")"
	else
		owner="$(stat -c '%U' "$path")"
	fi

	if [[ "$current_user" != "$owner" ]]; then
		printf "\n"
		printf "${RED}ERROR:${NC} You are running this upgrade as ${BOLD}${current_user}${NC}, but ${description} is owned by ${BOLD}${owner}${NC}.\n"
		printf "Upgrades should be run as the same user who originally installed Owncast.\n"
		exit 1
	fi
}

# Backup the existing install
backupInstall() {
	BACKUP_STAGING="$(mktemp -d)"
	mkdir "${BACKUP_STAGING}"/backup
	TIMESTAMP=$(date +%s)
	BACKUP_FILE="${TIMESTAMP}-v${OWNCAST_VERSION}".tar.gz
	printf "${BLUE}Backing up${NC} your files to ${OWNCAST_BACKUP_DIRECTORY} before upgrading to v${OWNCAST_VERSION}"

	FILE_LIST=(
		"data/"
	)

	# Make backup directory if it doesn't exist
	[[ -d $OWNCAST_BACKUP_DIRECTORY ]] || mkdir "$OWNCAST_BACKUP_DIRECTORY"

	for i in "${FILE_LIST[@]}"; do
		cp -r "$i" "${BACKUP_STAGING}"/backup
	done

	pushd "${BACKUP_STAGING}" >>/dev/null
	tar zcf "${BACKUP_FILE}" backup &
	spinner $!
	popd >>/dev/null
	mv "${BACKUP_STAGING}"/"${BACKUP_FILE}" "${OWNCAST_BACKUP_DIRECTORY}"/

	rm -rf "${BACKUP_STAGING}"
	printf "${GREEN}Backed up${NC} your files before upgrading to v${OWNCAST_VERSION}  [${GREEN}✓${NC}]\n"
}

main() {
	printf "${PURPLE}${BOLD}Owncast Installer v%s ${NC}\n\n" "$OWNCAST_VERSION"

	requireTool "curl"
	requireTool "unzip"
	requireTool "tar"

	# Determine operating system & architecture
	case $(uname -s) in
	"Darwin")
		PLATFORM="macOS"
		FFMPEG_OS="darwin"
		case "$(uname -m)" in
		"x86_64")
			OWNCAST_ARCH="64bit"
			FFMPEG_ARCH="amd64"
			;;
		"arm64")
			OWNCAST_ARCH="arm64"
			FFMPEG_ARCH="arm64"
			;;
		*)
			errorAndExit "Unsupported CPU architecture $(uname -m)"
			;;
		esac
		;;
	"Linux")
		PLATFORM="linux"
		FFMPEG_OS="linux"
		case "$(uname -m)" in
		"x86_64")
			FFMPEG_ARCH="amd64"
			OWNCAST_ARCH="64bit"
			;;
		aarch64)
			FFMPEG_ARCH="arm64"
			OWNCAST_ARCH="arm64"
			;;
		*)
			errorAndExit "Unsupported CPU architecture $(uname -m)"
			;;
		esac
		;;
	*)
		errorAndExit "Unsupported operating system $(uname -s)"
		;;
	esac

	# Build ffmpeg download URL
	FFMPEG_VERSION="8.0"
	FFMPEG_RELEASE="20260123163721"
	FFMPEG_SUFFIX=""
	[[ "$FFMPEG_OS" == "linux" ]] && FFMPEG_SUFFIX="-static"
	FFMPEG_DOWNLOAD_URL="https://github.com/owncast/ffmpeg-builds/releases/download/${FFMPEG_RELEASE}/ffmpeg${FFMPEG_VERSION}-${FFMPEG_OS}-${FFMPEG_ARCH}${FFMPEG_SUFFIX}.tar.gz"
	FFMPEG_TARGET_FILE="${INSTALL_TEMP_DIRECTORY}/ffmpeg.tar.gz"

	# Build release download URL
	OWNCAST_URL="https://github.com/owncast/owncast/releases/download/v${OWNCAST_VERSION}/owncast-${OWNCAST_VERSION}-${PLATFORM}-${OWNCAST_ARCH}.zip"
	OWNCAST_TARGET_FILE="${INSTALL_TEMP_DIRECTORY}/owncast-${OWNCAST_VERSION}-${PLATFORM}-${OWNCAST_ARCH}.zip"

	# If the install directory exists already then cd into it and upgrade
	if [[ -d "$OWNCAST_INSTALL_DIRECTORY" && -x "$OWNCAST_INSTALL_DIRECTORY/owncast" ]]; then
		checkUpgradeUserOwnership "$OWNCAST_INSTALL_DIRECTORY/owncast" "the Owncast executable"
		if [[ -d "$OWNCAST_INSTALL_DIRECTORY/data" ]]; then
			checkUpgradeUserOwnership "$OWNCAST_INSTALL_DIRECTORY/data" "the data directory"
		fi
		printf "${BLUE}Existing install found${NC} in ${OWNCAST_INSTALL_DIRECTORY}. Will update it to v${OWNCAST_VERSION}. If this is incorrect remove the directory and rerun the installer.\n"
		cd "$OWNCAST_INSTALL_DIRECTORY"
		OWNCAST_INSTALL_DIRECTORY="./"
		backupInstall
	# If the owncast binary exists then upgrade
	elif [ -x ./owncast ]; then
		checkUpgradeUserOwnership "./owncast" "the Owncast executable"
		if [[ -d "./data" ]]; then
			checkUpgradeUserOwnership "./data" "the data directory"
		fi
		printf "${BLUE}Existing install found${NC} in this directory. Will update it to v${OWNCAST_VERSION}. If this is incorrect remove the directory and rerun the installer.\n"
		backupInstall
		OWNCAST_INSTALL_DIRECTORY="./"
	else
		# Create target directory
		mkdir -p "$OWNCAST_INSTALL_DIRECTORY"
		printf "${GREEN}Created${NC} directory  [${GREEN}✓${NC}]\n"
	fi

	# Download release
	printf "${BLUE}Downloading${NC} Owncast v${OWNCAST_VERSION} for ${PLATFORM}"
	curl -s -L "${OWNCAST_URL}" --output "${OWNCAST_TARGET_FILE}" &
	spinner $!
	printf "${GREEN}Downloaded${NC} Owncast v${OWNCAST_VERSION} for ${PLATFORM}  [${GREEN}✓${NC}]\n"

	# Unzip release
	unzip -oq "$OWNCAST_TARGET_FILE" -d "$OWNCAST_INSTALL_DIRECTORY"

	# Delete release zip file
	rm "$OWNCAST_TARGET_FILE"

	# Check for ffmpeg (skip check if FORCE_FFMPEG_DOWNLOAD is set)
	if [[ "$FORCE_FFMPEG_DOWNLOAD" == true ]] || ! [[ -x "$(command -v ffmpeg)" || -x "$(command -v ${OWNCAST_INSTALL_DIRECTORY}/ffmpeg)" ]]; then
		# Download ffmpeg
		printf "${BLUE}Downloading${NC} ffmpeg v${FFMPEG_VERSION} "
		curl -s -L "${FFMPEG_DOWNLOAD_URL}" --output "${FFMPEG_TARGET_FILE}" &
		spinner $!
		if [[ "$FORCE_FFMPEG_DOWNLOAD" == true ]]; then
			printf "${GREEN}Downloaded${NC} ffmpeg (forced download) [${GREEN}✓${NC}]\n"
		else
			printf "${GREEN}Downloaded${NC} ffmpeg because it was not found on your system [${GREEN}✓${NC}]\n"
		fi
		if [[ "$FFMPEG_TARGET_FILE" == *.zip ]]; then
			unzip -oq "$FFMPEG_TARGET_FILE" -d "$OWNCAST_INSTALL_DIRECTORY"
			rm "$FFMPEG_TARGET_FILE"
		elif [[ "$FFMPEG_TARGET_FILE" == *.tar.gz ]]; then
			tar -xzf "$FFMPEG_TARGET_FILE" -C "$OWNCAST_INSTALL_DIRECTORY"
			rm "$FFMPEG_TARGET_FILE"
		fi
		chmod u+x "${OWNCAST_INSTALL_DIRECTORY}/ffmpeg"
	fi

	_success=true

	printf "${GREEN}Success!${NC} Run owncast by changing to the ${BOLD}owncast${NC} directory and run ${BOLD}./owncast${NC}.\n"
	printf "The default port is ${BOLD}8080${NC} and the default streaming key and admin password is ${BOLD}abc123${NC}.\n"
	printf "Visit ${UNDERLINE}https://owncast.online/docs/configuration/${NC} to learn how to configure your new Owncast server."
	printf "\n\n"
}

main
