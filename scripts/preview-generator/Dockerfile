FROM ghcr.io/charmbracelet/vhs:v0.11.0


# Create volume
VOLUME /vhs
WORKDIR /vhs

# Install Dependencies
RUN apt-get update --allow-releaseinfo-change && apt-get -y install ffmpeg chromium bash curl unzip gifsicle

ENTRYPOINT ["/usr/bin/vhs"]