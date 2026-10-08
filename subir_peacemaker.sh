#!/usr/bin/env bash
# ==============================================================================
# subir_peacemaker.sh
# Convierte los MKVs de Peacemaker en ~/Movies a MP4 ultra-optimizados para web
# y los sube por red local al servidor Ubuntu (192.168.1.17)
# ==============================================================================

set -e

SERVER_USER="diego"
SERVER_IP="192.168.1.17"
SERVER_DEST="/var/www/hasclic/videos/peacemaker/T1"
MOVIES_DIR="$HOME/Movies"
TMP_DIR="$HOME/Movies/peacemaker_mp4"

# Mapeo de archivos MKV a los nombres esperados por haslic.com (series.js)
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

echo "========================================================"
echo " Integración de Peacemaker Temporada 1 para haslic.com"
echo "========================================================"

# 1. Verificar ffmpeg
if ! command -v ffmpeg &> /dev/null; then
  echo "❌ Error: ffmpeg no está instalado en tu Mac."
  echo "Puedes instalarlo rápidamente con Homebrew ejecutando:"
  echo "  brew install ffmpeg"
  exit 1
fi

mkdir -p "$TMP_DIR"

# 2. Conversión / Remuxing a MP4 con faststart
echo ""
echo "▶ Paso 1: Remuxing de MKV a MP4 con audio AAC y faststart..."
echo "  (Copia el video H.264 sin pérdida y convierte audio a AAC compatible con web)"
echo ""

for item in "${EPISODES[@]}"; do
  mkv_name="${item%%:*}"
  mp4_name="${item##*:}"
  input_path="$MOVIES_DIR/$mkv_name"
  output_path="$TMP_DIR/$mp4_name"

  if [ ! -f "$input_path" ]; then
    echo "⚠️  No se encontró: $input_path (saltando)"
    continue
  fi

  if [ -f "$output_path" ]; then
    echo "  ✓ $mp4_name ya existe en temporal. Saltando conversión."
    continue
  fi

  echo "  ⏳ Procesando $mkv_name -> $mp4_name..."
  ffmpeg -y -i "$input_path" \
    -map 0:v:0 -map 0:a:0 \
    -c:v copy \
    -c:a aac -b:a 192k \
    -movflags +faststart \
    "$output_path" -loglevel warning
  echo "  ✅ $mp4_name listo."
done

# 3. Crear directorio en el servidor
echo ""
echo "▶ Paso 2: Creando directorio remoto en $SERVER_USER@$SERVER_IP..."
ssh "$SERVER_USER@$SERVER_IP" "mkdir -p $SERVER_DEST"

# 4. Transferir archivos al servidor
echo ""
echo "▶ Paso 3: Transfiriendo archivos MP4 al servidor por red local..."
rsync -avP --inplace "$TMP_DIR/" "$SERVER_USER@$SERVER_IP:$SERVER_DEST/"

# 5. Ajustar permisos y generar miniaturas
echo ""
echo "▶ Paso 4: Ajustando permisos y generando miniaturas en el servidor..."
ssh "$SERVER_USER@$SERVER_IP" bash << 'EOF'
  chmod -R 755 /var/www/hasclic/videos/peacemaker
  cd /var/www/hasclic
  if [ -f generate_thumbs.py ]; then
    python3 generate_thumbs.py
  fi
EOF

echo ""
echo "🎉 ¡Peacemaker Temporada 1 integrado con éxito en haslic.com!"
echo "Puedes comprobarlo abriendo https://hasclic.com/series.html?s=peace"
