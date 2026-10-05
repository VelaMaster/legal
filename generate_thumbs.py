#!/usr/bin/env python3
"""
generate_thumbs.py
Generador de miniaturas estáticas ultra-ligeras para haslic.com
Extrae fotogramas únicos y representativos de cada capítulo usando ffmpeg.
Salida en: img/episodes/<serie>-<temporada>-<capitulo>.jpg (15-25 KB cada una)
"""

import os
import sys
import subprocess
import shutil

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "img", "episodes")

# Episodios y tiempos de captura personalizados (evitan intro repetida y capturan escenas icónicas)
SERIES_EPISODES = [
    # Rick and Morty Temporada 1
    ("videos/rickymorty/T1/Buscando_las_semillas.mp4", "00:03:40", "rick-1-1.jpg"),
    ("videos/rickymorty/T1/Invasión_canina.mp4", "00:05:30", "rick-1-2.jpg"),
    ("videos/rickymorty/T1/Parque_Anatómico.mp4", "00:07:45", "rick-1-3.jpg"),
    ("videos/rickymorty/T1/La_simulación_alienígena.mp4", "00:09:20", "rick-1-4.jpg"),
    ("videos/rickymorty/T1/Meeseeks_destructores.mp4", "00:11:15", "rick-1-5.jpg"),
    ("videos/rickymorty/T1/La_poción_de_Rick.mp4", "00:13:30", "rick-1-6.jpg"),
    ("videos/rickymorty/T1/Criando_un_Gazorpazorp.mp4", "00:15:40", "rick-1-7.jpg"),
    ("videos/rickymorty/T1/Televisión_Interdimensional.mp4", "00:06:50", "rick-1-8.jpg"),
    ("videos/rickymorty/T1/Cosas_necesarias.mp4", "00:08:40", "rick-1-9.jpg"),
    ("videos/rickymorty/T1/Encuentros_cercanos_a_lo_Rick.mp4", "00:10:50", "rick-1-10.jpg"),
    ("videos/rickymorty/T1/Es_hora_de_la_fiesta.mp4", "00:14:10", "rick-1-11.jpg"),

    # Peacemaker Temporada 1 (si los videos están presentes)
    ("videos/peacemaker/T1/Un_nuevo_torbellino.mp4", "00:06:30", "peace-1-1.jpg"),
    ("videos/peacemaker/T1/Los_mejores_amigos_nunca.mp4", "00:07:45", "peace-1-2.jpg"),
    ("videos/peacemaker/T1/Mejor_muerto_que_Goff.mp4", "00:09:10", "peace-1-3.jpg"),
    ("videos/peacemaker/T1/El_Choad_menos_transitado.mp4", "00:08:20", "peace-1-4.jpg"),
    ("videos/peacemaker/T1/El_mono_esta_bien.mp4", "00:10:40", "peace-1-5.jpg"),
    ("videos/peacemaker/T1/Murn_despues_de_leer.mp4", "00:11:15", "peace-1-6.jpg"),
    ("videos/peacemaker/T1/El_dragon_en_mi_corazon.mp4", "00:07:50", "peace-1-7.jpg"),
    ("videos/peacemaker/T1/La_vaca_de_nuevo.mp4", "00:12:30", "peace-1-8.jpg"),
]

def check_or_install_ffmpeg():
    if shutil.which("ffmpeg"):
        return True
    print("Aviso: 'ffmpeg' no está instalado en este sistema.")
    # Si estamos en Ubuntu/Debian, sugerir o intentar instalarlo
    try:
        print("Intentando instalar ffmpeg con sudo apt...")
        subprocess.run(["sudo", "apt", "update", "-y"], check=True)
        subprocess.run(["sudo", "apt", "install", "-y", "ffmpeg"], check=True)
        return True
    except Exception as e:
        print(f"No se pudo instalar ffmpeg automáticamente: {e}")
        print("Por favor instala ffmpeg con: sudo apt install -y ffmpeg")
        return False

def generate():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    if not check_or_install_ffmpeg():
        sys.exit(1)

    print(f"=== Generador de Miniaturas Estáticas (haslic.com) ===")
    print(f"Directorio de salida: {OUTPUT_DIR}\n")

    count = 0
    skipped = 0

    for rel_video_path, seek_time, out_filename in SERIES_EPISODES:
        abs_video_path = os.path.join(BASE_DIR, rel_video_path)
        out_path = os.path.join(OUTPUT_DIR, out_filename)

        if not os.path.exists(abs_video_path):
            skipped += 1
            continue

        cmd = [
            "ffmpeg", "-y",
            "-ss", seek_time,
            "-i", abs_video_path,
            "-frames:v", "1",
            "-q:v", "3",
            "-vf", "scale=320:180:force_original_aspect_ratio=decrease,pad=320:180:(ow-iw)/2:(oh-ih)/2",
            out_path
        ]

        try:
            res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if res.returncode == 0 and os.path.exists(out_path):
                size_kb = os.path.getsize(out_path) / 1024.0
                print(f"  ✓ {out_filename:<14} ({size_kb:4.1f} KB) extraído en {seek_time}")
                count += 1
            else:
                err_snippet = res.stderr.decode("utf-8", errors="ignore")[-200:]
                print(f"  ✗ Error extrayendo {out_filename}: {err_snippet}")
        except Exception as e:
            print(f"  ✗ Excepción con {abs_video_path}: {e}")

    print(f"\nProceso finalizado: {count} miniaturas generadas.")
    if skipped > 0:
        print(f"({skipped} archivos de video no encontrados en rutas locales, omitidos).")
    print(f"Las miniaturas están listas en: {OUTPUT_DIR}")

if __name__ == "__main__":
    generate()
