#!/usr/bin/env bash
# ==============================================================================
# convertir_peacemaker_server.sh
# Para ejecutar directamente en el servidor Ubuntu si subiste los MKVs al server.
# Uso:
#   1. Sube los MKVs de tu Mac al server:
#      rsync -avP ~/Movies/*.mkv diego@192.168.1.17:~/peacemaker_mkv/
#   2. En el server ejecuta este script:
#      cd /var/www/hasclic && bash convertir_peacemaker_server.sh ~/peacemaker_mkv
# ==============================================================================

set -e

SOURCE_DIR="${1:-$HOME/peacemaker_mkv}"
DEST_DIR="/var/www/hasclic/videos/peacemaker/T1"

mkdir -p "$DEST_DIR"

declare -a EPISODES=(
  "Peacemaker.1x01.Dual.1080p-lat.mkv:Un_nuevo_torbellino.mp4"
  "Peacemaker.1x02.Dual.1080p-lat.mkv:Los_mejores_amigos_nunca.mp4"
  "Peacemaker.1x03.Dual.1080p-lat.mkv:Mejor_muerto_que_Goff.mp4"
  "Peacemaker.1x04.Dual.1080p-lat.mkv:El_Choad_menos_transitado.mp4"
  "Peacemaker.1x05.Dual.1080p-lat.mkv:El_mono_esta_bien.mp4"
  "Peacemaker.1x06.Dual.1080p-lat.mkv:Murn_despues_de_leer.mp4"
  "Peacemaker.1x07.Dual.1080p-lat.mkv:El_dragon_en_mi_corazon.mp4"
  "Peacemaker.1x08.HD1080p-lat.mkv:La_vaca_de_nuevo.mp4"
)

echo "=========================================================="
echo " Procesando Peacemaker en el servidor Ubuntu"
echo " Origen: $SOURCE_DIR"
echo " Destino: $DEST_DIR"
echo "=========================================================="

for item in "${EPISODES[@]}"; do
  mkv_name="${item%%:*}"
  mp4_name="${item##*:}"
  input_path="$SOURCE_DIR/$mkv_name"
  output_path="$DEST_DIR/$mp4_name"

  if [ ! -f "$input_path" ]; then
    echo "⚠️  No encontrado: $input_path"
    continue
  fi

  echo "⏳ Convirtiendo $mkv_name a $mp4_name..."
  ffmpeg -y -i "$input_path" \
    -map 0:v:0 -map 0:a:0 \
    -c:v copy \
    -c:a aac -b:a 192k \
    -movflags +faststart \
    "$output_path" -loglevel warning

  echo "  ✓ Generado $mp4_name"
done

chmod -R 755 /var/www/hasclic/videos/peacemaker

echo ""
echo "▶ Generando miniaturas estáticas..."
cd /var/www/hasclic
python3 generate_thumbs.py

echo "✅ ¡Listo! Peacemaker disponible en https://hasclic.com/series.html?s=peace"
