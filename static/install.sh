#!/usr/bin/env bash
# shellcheck disable=SC2059

set -o errexit
set -o nounset
set -o pipefail

# Install configuration
if ! [ "${OWNCAST_VERSION:-}" ]; then
  OWNCAST_VERSION="0.0.4"
fi

if ! [ "${OWNCAST_INSTALL_DIRECTORY:-}" ]; then
  OWNCAST_INSTALL_DIRECTORY="$(pwd)/owncast"
fi

INSTALL_TEMP_DIRECTORY="$(mktemp -d)"

# Set up an exit handler so we can print a help message on failures.
_success=false
shutdown () {
  if [ $_success = false ]; then
    printf "Your Owncast installation did not complete successfully.\n"
    printf "Please report your issue at https://github.com/owncast/owncast/issues\n"
  fi
  rm -rf "$INSTALL_TEMP_DIRECTORY"
}
trap shutdown INT TERM ABRT EXIT

# Formatting escape codes.
RED='\033[0;31m'
PURPLE='\033[0;35m'
BLUE='\033[1;34m'
GREEN='\033[1;32m'
BOLD='\033[1m'
UNDERLINE='\033[4m'
NC='\033[0m' # No Color

# Activity spinner for background processes.
spinner() {
  local -r delay='0.3'
  local spinstr='\|/-'
  local temp
  while ps -p "$1" >> /dev/null; do
    temp="${spinstr#?}"
    printf " [${BLUE}%c${NC}]  " "${spinstr}"
    spinstr=${temp}${spinstr%"${temp}"}
    sleep "${delay}"
    printf "\b\b\b\b\b\b"
  done
  printf "\r"
}

# Print an error message and exit the program.
errorAndExit() {
  printf "${RED}ERROR:${NC} %s" "$1"
  exit 1;
}

# Check for a required tool, or exit
requireTool() {
  which "$1" >> /dev/null && EC=$? || EC=$?
  if [ $EC != 0 ]; then
    errorAndExit "Could not locate \"$1\", which is required for installation."
  fi
}

main () {
  printf "${PURPLE}${BOLD}Owncast Installer v%s ${NC}\n\n" "$OWNCAST_VERSION"

  requireTool "curl"
  requireTool "unzip"

  # Determine operating system & architecture
  case $(uname -s) in
    "Darwin")
      OWNCAST_ARCH="64bit"
      PLATFORM="macOS"
      FFMPEG_VERSION="4.3.1"
      FFMPEG_DOWNLOAD_URL="https://evermeet.cx/ffmpeg/ffmpeg-${FFMPEG_VERSION}.zip"
      FFMPEG_TARGET_FILE="${INSTALL_TEMP_DIRECTORY}/ffmpeg.zip"
      ;;
    "Linux")
      case "$(uname -m)" in
      "x86_64")
        FFMPEG_ARCH="linux-x64"
        OWNCAST_ARCH="64bit"
        ;;
      i?86)
        FFMPEG_ARCH="linux-ia32"
        OWNCAST_ARCH="32bit"
        ;;
      armv7?)
        FFMPEG_ARCH="linux-arm"
        OWNCAST_ARCH="arm7"
        ;;
      *)
        errorAndExit "Unsupported CPU architecture $(uname -m)"
        ;;
      esac
      PLATFORM="linux"
      FFMPEG_VERSION="b4.3.1"
      FFMPEG_DOWNLOAD_URL="https://github.com/eugeneware/ffmpeg-static/releases/download/${FFMPEG_VERSION}/${FFMPEG_ARCH}"
      FFMPEG_TARGET_FILE="${OWNCAST_INSTALL_DIRECTORY}/ffmpeg"
      ;;
    *)
      errorAndExit "Unsupported operating system $(uname -s)"
      ;;
  esac

  # Build release download URL
  OWNCAST_URL="https://github.com/owncast/owncast/releases/download/v${OWNCAST_VERSION}/owncast-${OWNCAST_VERSION}-${PLATFORM}-${OWNCAST_ARCH}.zip"
  OWNCAST_TARGET_FILE="${INSTALL_TEMP_DIRECTORY}/owncast-${OWNCAST_VERSION}-${PLATFORM}-${OWNCAST_ARCH}.zip"

  # Create target directory
  mkdir -p "$OWNCAST_INSTALL_DIRECTORY"
  printf "${GREEN}Created${NC} directory  [${GREEN}✓${NC}]\n"

  # Download release
  printf "${BLUE}Downloading${NC} Owncast v${OWNCAST_VERSION} for ${PLATFORM}"
  curl -s -L ${OWNCAST_URL} --output "${OWNCAST_TARGET_FILE}" &
  spinner $!
  printf "${GREEN}Downloaded${NC} Owncast v${OWNCAST_VERSION} for ${PLATFORM}  [${GREEN}✓${NC}]\n"

  # Unzip release
  unzip -oq "$OWNCAST_TARGET_FILE" -d "$OWNCAST_INSTALL_DIRECTORY"

  # Delete release zip file
  rm "$OWNCAST_TARGET_FILE"

  # Check for ffmpeg
  which ffmpeg >> /dev/null && EC=$? || EC=$?
  if [ $EC -ne 0 ]; then
    # Download ffmpeg
    printf "${BLUE}Downloading${NC} ffmpeg v${FFMPEG_VERSION} "
    curl -s -L ${FFMPEG_DOWNLOAD_URL} --output "${FFMPEG_TARGET_FILE}" &
    spinner $!
    printf "${GREEN}Downloaded${NC} ffmpeg because it was not found on your system [${GREEN}✓${NC}]\n"
    if [[ "$FFMPEG_TARGET_FILE" == *.zip ]]; then
      unzip -oq "$FFMPEG_TARGET_FILE" -d "$OWNCAST_INSTALL_DIRECTORY"
      rm "$FFMPEG_TARGET_FILE"
    fi
    chmod u+x "${OWNCAST_INSTALL_DIRECTORY}/ffmpeg"
  fi

  _success=true

  printf "\n"
  printf "${GREEN}Success!${NC} Run owncast by changing to the ${BOLD}owncast${NC} directory and run ${BOLD}./owncast${NC}.\n"
  printf "The default port is ${BOLD}8080${NC} and the default streaming key is ${BOLD}abc123${NC}.\n"
  printf "Visit ${UNDERLINE}https://owncast.online/docs/configuration/${NC} to learn how to configure your new Owncast server."
  printf "\n\n"
}

main
