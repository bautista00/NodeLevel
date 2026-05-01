#!/usr/bin/env bash
#
# Extrae frames del hero-video.mp4 a public/frames/
# Requiere ffmpeg (brew install ffmpeg)
#
# Por defecto:
#  - 24 fps
#  - Ancho 1600px (manteniendo aspect ratio)
#  - JPG calidad 4 (alta), pesa ~10–18 KB por frame
#
# Uso:
#   bash scripts/extract-frames.sh
#   FPS=30 WIDTH=1920 bash scripts/extract-frames.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
INPUT="${ROOT}/public/hero-video.mp4"
OUT_DIR="${ROOT}/public/frames"

FPS="${FPS:-24}"
WIDTH="${WIDTH:-1600}"
QUALITY="${QUALITY:-4}"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg no está instalado. Instalalo con:  brew install ffmpeg"
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "No encontré $INPUT"
  exit 1
fi

echo "▸ Extrayendo frames de hero-video.mp4"
echo "  fps:     $FPS"
echo "  width:   ${WIDTH}px"
echo "  quality: $QUALITY (1=mejor, 31=peor)"
echo "  out:     $OUT_DIR"

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

ffmpeg -hide_banner -loglevel warning \
  -i "$INPUT" \
  -vf "fps=${FPS},scale=${WIDTH}:-2:flags=lanczos" \
  -q:v "$QUALITY" \
  "$OUT_DIR/frame_%03d.jpg"

COUNT=$(ls -1 "$OUT_DIR" | wc -l | tr -d ' ')
SIZE=$(du -sh "$OUT_DIR" | awk '{print $1}')

echo
echo "✓ Listo — $COUNT frames generados ($SIZE total)"
echo "  Recordá actualizar HERO_FRAME_COUNT en components/HeroScrub.tsx si cambia."

# Generar manifest JSON con el conteo (lo lee el componente)
node -e "require('fs').writeFileSync('${OUT_DIR}/manifest.json', JSON.stringify({ count: $COUNT, fps: $FPS, width: $WIDTH }))"
