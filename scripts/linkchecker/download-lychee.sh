#!/bin/sh
#
# Downloads the lychee link-checker binary for the current platform into this
# directory. The binary is gitignored and should never be committed.
#
# Override the version with LYCHEE_VERSION (defaults to the latest release).

set -e

cd "$(dirname "$0")"

# If the binary already exists, do nothing.
if [ -x ./lychee ]; then
  echo "lychee already present ($(./lychee --version)). Delete ./lychee to re-download."
  exit 0
fi

os="$(uname -s)"
arch="$(uname -m)"

case "$os" in
  Linux) os_part="unknown-linux-gnu" ;;
  Darwin) os_part="apple-darwin" ;;
  *) echo "Unsupported OS: $os" >&2; exit 1 ;;
esac

case "$arch" in
  x86_64 | amd64) arch_part="x86_64" ;;
  arm64 | aarch64) arch_part="aarch64" ;;
  *) echo "Unsupported architecture: $arch" >&2; exit 1 ;;
esac

target="${arch_part}-${os_part}"
asset="lychee-${target}.tar.gz"

if [ -n "$LYCHEE_VERSION" ]; then
  url="https://github.com/lycheeverse/lychee/releases/download/${LYCHEE_VERSION}/${asset}"
else
  url="https://github.com/lycheeverse/lychee/releases/latest/download/${asset}"
fi

echo "Downloading lychee for ${target}..."
echo "  $url"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

curl -fsSL "$url" -o "$tmp/lychee.tar.gz"
tar -xzf "$tmp/lychee.tar.gz" -C "$tmp"

# The tarball contains the `lychee` binary (sometimes alongside other files).
binary="$(find "$tmp" -type f -name lychee | head -n1)"
if [ -z "$binary" ]; then
  echo "Could not find lychee binary in the downloaded archive." >&2
  exit 1
fi

mv "$binary" ./lychee
chmod +x ./lychee

echo "Installed $(./lychee --version)"
