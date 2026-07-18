#!/bin/sh
# Records a web page in Chromium (with browser chrome) under Xvfb,
# slowly scrolling down. Usage: record-docs-page.sh <url> <output.mp4> [duration]
set -e

URL="$1"
OUT="$2"
DURATION="${3:-10}"

Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99
sleep 1

chromium --no-sandbox --test-type --disable-gpu --disable-dev-shm-usage \
  --force-device-scale-factor=1.5 \
  --no-first-run --no-default-browser-check --disable-infobars \
  --disable-session-crashed-bubble --hide-crash-restore-bubble \
  --window-position=0,0 --window-size=1280,720 "$URL" &
sleep 8  # ponytail: fixed wait for page load; poll the page if this flakes

ffmpeg -y -v error -f x11grab -draw_mouse 1 -video_size 1920x1080 -framerate 25 -i :99 \
  -t "$DURATION" -c:v libx264 -pix_fmt yuv420p -preset fast "$OUT" &
FFMPEG_PID=$!

# Select the curl install command with a triple-click, as if copying it,
# then scroll down slightly — few enough clicks that the highlighted command
# stays on screen until the cut to the terminal.
# ponytail: fixed pixel coords of the code block at scroll-top (1920x1080,
# scale 1.5); re-measure if the docs page layout changes
xdotool mousemove 730 990
sleep 7
xdotool click --repeat 3 --delay 120 1
sleep 2
for i in 1 2; do
  xdotool click 5
  sleep 1
done

wait $FFMPEG_PID
