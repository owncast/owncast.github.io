#!/bin/sh
# Records a web page in Chromium (with browser chrome) under Xvfb: scrolls
# down slightly, then selects the curl install command as if copying it.
# Usage: record-docs-page.sh <url> <output.mp4> [duration]
set -e

URL="$1"
OUT="$2"
DURATION="${3:-10}"

# Tiny extension: pressing F9 selects the install command by content, so the
# selection is immune to docs page layout changes (no pixel coordinates).
EXT="$HOME/select-ext"
mkdir -p "$EXT"
cat > "$EXT/manifest.json" <<'EOF'
{
  "manifest_version": 3,
  "name": "install command selector",
  "version": "1.0",
  "content_scripts": [{ "matches": ["<all_urls>"], "js": ["select.js"] }]
}
EOF
cat > "$EXT/select.js" <<'EOF'
addEventListener('keydown', (e) => {
  if (e.key !== 'F9') return;
  const code = [...document.querySelectorAll('pre code, pre')]
    .find((el) => el.textContent.includes('owncast.online/install.sh'));
  if (code) getSelection().selectAllChildren(code);
});
EOF

Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99
sleep 1

chromium --no-sandbox --test-type --disable-gpu --disable-dev-shm-usage \
  --force-device-scale-factor=1.5 \
  --no-first-run --no-default-browser-check --disable-infobars \
  --disable-session-crashed-bubble --hide-crash-restore-bubble \
  --load-extension="$EXT" \
  --window-position=0,0 --window-size=1280,720 "$URL" &
sleep 8  # ponytail: fixed wait for page load; poll the page if this flakes

ffmpeg -y -v error -f x11grab -draw_mouse 1 -video_size 1920x1080 -framerate 25 -i :99 \
  -t "$DURATION" -c:v libx264 -pix_fmt yuv420p -preset fast "$OUT" &
FFMPEG_PID=$!

# Two gentle scrolls down, cursor drifts over the command, then F9 triggers
# the content-based selection (reads as select-to-copy). The cursor position
# is cosmetic only; selection is found by text content.
sleep 2
xdotool click 5
sleep 1.5
xdotool click 5
xdotool mousemove 750 700
sleep 3.5
xdotool key F9

wait $FFMPEG_PID
