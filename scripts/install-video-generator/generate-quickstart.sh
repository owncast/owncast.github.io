#!/bin/sh
set -e
cd "$(dirname "$0")"

# On the host: build the generator image and re-exec this script inside it.
# Docker is the only host dependency; everything below runs in the container,
# where vhs, chromium, xvfb, ffmpeg, and bc are all pinned by the Dockerfile.
if [ ! -e /.dockerenv ]; then
  docker build -t owncast-install-video-generator .
  docker run --rm -v "$PWD:/vhs" --user "$(id -u):$(id -g)" -e HOME=/tmp \
    --entrypoint /bin/sh owncast-install-video-generator /vhs/generate-quickstart.sh "$@"
  # Publish into the site (host side: static/ isn't visible inside the container)
  [ "$1" = "docs-only" ] || mv install-preview.mp4 install-preview.webm install-preview.jpg ../../static/
  exit 0
fi

# === STEP 0: Regenerate docs-install-page.mp4 ===
# Records the getting-started docs page in a real browser (with chrome),
# scrolling down slightly. Fills the gap before the install video starts.
DOCS_URL="https://owncast-docs-dev-testing.pages.dev/docs/getting-started/install"
sh record-docs-page.sh "$DOCS_URL" docs-install-page.mp4 12

# `./generate-quickstart.sh docs-only` stops here, for iterating on the recording
[ "$1" = "docs-only" ] && exit 0

# === STEP 1: Regenerate owncast-install.mp4 ===
# Same tape as the generate-installer-preview workflow, copied here so it can
# be customized without changing the website's installer preview.
vhs installer.tape
rm -f owncast-install.gif  # tape also emits a gif; only the mp4 is used here

# === CONFIGURATION ===

# Output settings
OUTPUT_DURATION=71          # Total video duration in seconds
OUTPUT_WIDTH=1920
OUTPUT_HEIGHT=1080
BG_COLOR=red                # Background color before install video starts

# ginger-quickstart.mp4 overlay settings (source 454x276, displayed slightly
# larger with aspect ratio preserved; drop shadow derived from the rounded
# video silhouette so it follows the corners)
GINGER_W=500                # Display width (source 454, AR preserved)
GINGER_H=304                # Display height (source 276)
GINGER_X=1398               # Absolute position of the video's top-left corner;
GINGER_Y=706                # size increases extend down and to the right
GINGER_RADIUS=16            # Corner rounding radius in px
GINGER_SHADOW_OFFSET=10     # Shadow offset (down and right) in px
GINGER_SHADOW_BLUR=12       # Shadow gaussian blur sigma
GINGER_SHADOW_OPACITY=0.65  # Shadow darkness (0-1)

# owncast-install.mp4 settings
INSTALL_START=10            # When install video appears (seconds into output)
INSTALL_TRIM_START=0        # Start time in source video
INSTALL_TRIM_END=16         # End time in source video
INSTALL_SPEED=1.0           # 1.0 = tape timeline maps 1:1 to output time
                            # (output t = INSTALL_START + tape t); sync Enter
                            # sounds by tuning the tape sleeps, align globally
                            # with INSTALL_START
INSTALL_FREEZE_DURATION=8   # How long to hold the last frame (seconds)

# obs-tutorial.mp4 settings
OBS_START=25                # When obs tutorial appears (seconds into output)
OBS_SPEED=1.0               # Playback speed multiplier

# quickstart-animalcrossing.mp4 settings
AC_START=60                 # When animal crossing appears (seconds into output)
AC_SPEED=1.0                # Playback speed multiplier
AC_SCALE_W=1264             # Width (original: 1264)
AC_SCALE_H=712              # Height (original: 712)
AC_X="135"              # X position (centered)
AC_Y="190"              # Y position (centered)

# owncast-quickstart-still.png settings
STILL_START=60              # When still image appears (seconds into output)

# owncast-admin-screenshot.png settings
ADMIN_START=49              # When admin screenshot appears (seconds into output)
ADMIN_END=60                # When admin screenshot disappears (seconds into output)

# cursor.mp4 settings
CURSOR_X=560
CURSOR_Y=430
CURSOR_W=350                # Width (height calculated to maintain aspect ratio)
CURSOR_START=49             # When cursor appears (seconds into output)
CURSOR_END=60               # When cursor disappears (seconds into output)

# Green box settings
BOX_X=95
BOX_Y=175
BOX_W=1400
BOX_H=745
BOX_COLOR="black"
BOX_START=60                # When green box appears (seconds into output)

# Fade out settings
FADE_START_BEFORE_END=5     # How many seconds before end to start fade
FADE_DURATION=1             # Duration of fade out (seconds)

# === END CONFIGURATION ===

# Calculate derived values
FREEZE_FRAMES=$((INSTALL_FREEZE_DURATION * 25))  # 25fps
FREEZE_TRIM_START=$(echo "$INSTALL_TRIM_END - 0.1" | bc)
FADE_START=$((OUTPUT_DURATION - FADE_START_BEFORE_END))  # When fade out begins
STILL_FRAMES=$(((OUTPUT_DURATION - STILL_START + 5) * 25))  # Frames for still image duration (with buffer)
GINGER_UNIT_W=$((GINGER_W + 4 * GINGER_SHADOW_BLUR))  # video + room for shadow blur
GINGER_UNIT_H=$((GINGER_H + 4 * GINGER_SHADOW_BLUR))

ffmpeg -y -i ginger-quickstart.mp4 -i owncast-install.mp4 -i obs-tutorial.mp4 -i quickstart-animalcrossing.mp4 -i owncast-quickstart-still.png -i owncast-admin-screenshot.png -i cursor.mp4 -i docs-install-page.mp4 \
  -filter_complex "\
    color=c=${BG_COLOR}:s=${OUTPUT_WIDTH}x${OUTPUT_HEIGHT}:d=${OUTPUT_DURATION}[base];\
    [1:v]trim=start=${INSTALL_TRIM_START}:end=${INSTALL_TRIM_END},setpts=PTS-STARTPTS,setpts=PTS/${INSTALL_SPEED},scale=${OUTPUT_WIDTH}:${OUTPUT_HEIGHT},setsar=1[sped];\
    [1:v]trim=start=${FREEZE_TRIM_START}:end=${INSTALL_TRIM_END},setpts=PTS-STARTPTS,select='eq(n,0)',loop=loop=${FREEZE_FRAMES}:size=1:start=0,setpts=N/25/TB,scale=${OUTPUT_WIDTH}:${OUTPUT_HEIGHT},setsar=1[frozen];\
    [sped][frozen]concat=n=2:v=1:a=0,setpts=PTS+${INSTALL_START}/TB[install];\
    [2:v]setpts=PTS-STARTPTS,setpts=PTS/${OBS_SPEED}+${OBS_START}/TB,scale=${OUTPUT_WIDTH}:${OUTPUT_HEIGHT},setsar=1[obs];\
    [4:v]loop=loop=2000:size=1:start=0,setpts=N/25/TB,scale=${OUTPUT_WIDTH}:${OUTPUT_HEIGHT},setsar=1[still];\
    [3:v]setpts=PTS-STARTPTS,setpts=PTS/${AC_SPEED}+${AC_START}/TB,scale=${AC_SCALE_W}:${AC_SCALE_H}[ac];\
    [7:v]setpts=PTS-STARTPTS,scale=${OUTPUT_WIDTH}:${OUTPUT_HEIGHT},setsar=1[docs];\
    [base][docs]overlay=x=0:y=0:eof_action=pass[bg0];\
    [bg0][install]overlay=x=0:y=0:eof_action=pass[bg1];\
    [5:v]loop=loop=2000:size=1:start=0,setpts=N/25/TB,scale=${OUTPUT_WIDTH}:${OUTPUT_HEIGHT},setsar=1[admin];\
    [bg1][obs]overlay=x=0:y=0:eof_action=pass[bg1a];\
    [6:v]setpts=PTS-STARTPTS,scale=${CURSOR_W}:-1,chromakey=0x00FF00:0.14:0.2,tpad=stop_duration=15:stop_mode=clone,setpts=PTS+${CURSOR_START}/TB[cursor];\
    [bg1a][admin]overlay=x=0:y=0:eof_action=pass:enable='gte(t,${ADMIN_START})*lt(t,${ADMIN_END})'[bg1b];\
    [bg1b][cursor]overlay=x=${CURSOR_X}:y=${CURSOR_Y}:eof_action=repeat[bg2];\
    [bg2][still]overlay=x=0:y=0:eof_action=repeat:enable='gte(t,${STILL_START})'[bg2a];\
    [bg2a]drawbox=x=${BOX_X}:y=${BOX_Y}:w=${BOX_W}:h=${BOX_H}:color=${BOX_COLOR}:t=fill:enable='gte(t,${BOX_START})'[bg3];\
    [bg3][ac]overlay=x=${AC_X}:y=${AC_Y}:eof_action=repeat[bg];\
    [0:v]scale=${GINGER_W}:${GINGER_H},format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='255*not(gt((X-clip(X,${GINGER_RADIUS},W-${GINGER_RADIUS}))*(X-clip(X,${GINGER_RADIUS},W-${GINGER_RADIUS}))+(Y-clip(Y,${GINGER_RADIUS},H-${GINGER_RADIUS}))*(Y-clip(Y,${GINGER_RADIUS},H-${GINGER_RADIUS})),${GINGER_RADIUS}*${GINGER_RADIUS}))'[ground];\
    [ground]split[gv][gs];\
    [gv]pad=${GINGER_UNIT_W}:${GINGER_UNIT_H}:0:0:color=black@0.0[gvid];\
    [gs]pad=${GINGER_UNIT_W}:${GINGER_UNIT_H}:${GINGER_SHADOW_OFFSET}:${GINGER_SHADOW_OFFSET}:color=black@0.0,lutrgb=r=0:g=0:b=0,colorchannelmixer=aa=${GINGER_SHADOW_OPACITY},gblur=sigma=${GINGER_SHADOW_BLUR}[gshadow];\
    [gshadow][gvid]overlay=0:0,fade=t=in:st=0:d=1.5:alpha=1[vid];\
    [bg][vid]overlay=${GINGER_X}:${GINGER_Y},fade=t=out:st=${FADE_START}:d=${FADE_DURATION}[out]" \
  -map "[out]" -map 0:a? \
  -t ${OUTPUT_DURATION} \
  -c:v libx264 -preset slow -crf 23 \
  -pix_fmt yuv420p -profile:v high \
  -g 125 -keyint_min 25 \
  -x264-params "colorprim=bt709:transfer=bt709:colormatrix=bt709" \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  install-preview.mp4

# WebM (VP9/Opus) variant — smaller for browsers that prefer it; embed with
# <video><source src=install-preview.webm><source src=install-preview.mp4></video>
ffmpeg -y -i install-preview.mp4 \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
  -pix_fmt yuv420p -g 125 \
  -c:a libopus -b:a 96k \
  install-preview.webm

# Poster image for the <video poster=...> attribute
ffmpeg -y -ss 4 -i install-preview.mp4 -frames:v 1 -q:v 2 install-preview.jpg
