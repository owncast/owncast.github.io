FROM ghcr.io/charmbracelet/vhs


# Create volume
VOLUME /vhs
WORKDIR /vhs

# Install Dependencies
RUN apt-get -y install ffmpeg chromium bash curl unzip

ENTRYPOINT ["/usr/bin/vhs"]