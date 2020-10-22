RED='\033[0;31m'
PURPLE='\033[0;35m'
BLUE='\033[1;34m'
GREEN='\033[1;32m'
BOLD='\033[1m'
UNDERLINE=`tput smul`
NC='\033[0m' # No Color

VERSION="0.0.2"

# Activity spinner
spinner() {
  local -r pid="${1}"
  local -r delay='0.3'
  local spinstr='\|/-'
  local temp
  while ps a | awk '{print $1}' | grep -q "${pid}"; do
    temp="${spinstr#?}"
    printf " [${BLUE}%c${NC}]  " "${spinstr}"
    spinstr=${temp}${spinstr%"${temp}"}
    sleep "${delay}"
    printf "\b\b\b\b\b\b"
  done
}

# End the activity spinner and clear the line
exitSpinner() {
  kill "${spinpid}"
  wait $spinpid 2>/dev/null
  printf "\r"
}

printf "${PURPLE}${BOLD}Owncast Installer v${VERSION} ${NC}\n\n"

# Determine operating system
OS=$(uname -s)

if [ $OS = "Darwin" ]; then
  PLATFORM="macOS"
  FFMPEG_VERSION="4.3.1"
  FFMPEG_DOWNLOAD_URL="https://evermeet.cx/ffmpeg/ffmpeg-${FFMPEG_VERSION}.zip"
elif [ $OS = "Linux" ]; then
  # TODO: Figure out the actual architecture
  PLATFORM="linux"
  FFMPEG_VERSION="b4.3.1"
  FFMPEG_ARCH="linux-x64"
  FFMPEG_DOWNLOAD_URL="https://github.com/eugeneware/ffmpeg-static/releases/download/${FFMPEG_VERSION}/${FFMPEG_ARCH}"
else
  exit 1
fi

# Build release download URL
URL="https://github.com/owncast/owncast/releases/download/v${VERSION}/owncast-${PLATFORM}-${VERSION}.zip"
TARGET_FILE="owncast-${PLATFORM}-${VERSION}.zip"

# Create target directory
mkdir -p ./owncast
cd owncast
printf "${GREEN}Created${NC} directory  [${GREEN}✓${NC}]\n"

# Download release
printf "${BLUE}Downloading${NC} Owncast v${VERSION} for ${PLATFORM}"
spinner & spinpid=$!
curl -s -L ${URL} --output ${TARGET_FILE}
exitSpinner
printf "${GREEN}Downloaded${NC} Owncast v${VERSION} for ${PLATFORM}  [${GREEN}✓${NC}]\n"

# Check for unzip
which unzip >> /dev/null
if [ $? -ne 0 ]; then
  printf "${RED}ERROR:${NC} Unable to unzip ${TARGET_FILE} because unzip is not found on your system."
  exit 1
fi

# Unzip release
unzip -oq ${TARGET_FILE}

# Delete release zip file
rm $TARGET_FILE

# Check for ffmpeg
which ffmpeg >> /dev/null
if [ $? -ne 0 ]; then
  # Download ffmpeg
  FFMPEG_TARGET_FILE="ffmpeg.zip"
  printf "${BLUE}Downloading${NC} ffmpeg v${FFMPEG_VERSION} "
  spinner & spinpid=$!
  curl -s -L ${FFMPEG_DOWNLOAD_URL} --output ${FFMPEG_TARGET_FILE}
  exitSpinner
  printf "${GREEN}Downloaded${NC} ffmpeg because it was not found on your system [${GREEN}✓${NC}]\n"
  unzip -oq ${FFMPEG_TARGET_FILE}
  rm $FFMPEG_TARGET_FILE
fi

printf "\n"
printf "${GREEN}Success!${NC} Run owncast by changing to the ${BOLD}owncast${NC} directory and run ${BOLD}./owncast${NC}.  The default port is ${BOLD}8080${NC} and the default streaming key is ${BOLD}abc123${NC}.\nVisit ${UNDERLINE}https://owncast.online/docs/configuration/${NC} to learn how to configure your new Owncast server."
printf "\n\n"
