#!/usr/bin/env python3
"""
Servidor HTTP y API de Comentarios con Base de Datos SQLite
No requiere instalar dependencias externas (usa la biblioteca estándar de Python 3).

Ejecución local:
    python3 server.py

Por defecto corre en: http://localhost:8000
"""

import http.server
import json
import os
import sqlite3
import urllib.parse
from datetime import datetime

PORT = 8000
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "comentarios.db")

def init_db():
    """Inicializa la base de datos SQLite y crea la tabla si no existe."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS comentarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            series TEXT NOT NULL,
            author TEXT NOT NULL,
            text TEXT NOT NULL,
            date TEXT NOT NULL,
            timestamp INTEGER NOT NULL
        )
    """)
    conn.commit()
    conn.close()
    print(f"✓ Base de datos SQLite lista en: {DB_FILE}")

class StreamingHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Habilitar CORS para peticiones desde el frontend
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # Endpoint de la API de comentarios
        if parsed.path == "/api/comentarios":
            query_params = urllib.parse.parse_qs(parsed.query)
            series_id = query_params.get("s", [""])[0]

            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            if series_id:
                cursor.execute(
                    "SELECT id, series, author, text, date, timestamp FROM comentarios WHERE series = ? ORDER BY id DESC",
                    (series_id,)
                )
            else:
                cursor.execute(
                    "SELECT id, series, author, text, date, timestamp FROM comentarios ORDER BY id DESC"
                )
            rows = cursor.fetchall()
            conn.close()

            comments = [
                {
                    "id": r[0],
                    "series": r[1],
                    "author": r[2],
                    "text": r[3],
                    "date": r[4],
                    "timestamp": r[5]
                }
                for r in rows
            ]

            response_data = json.dumps(comments, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(response_data)))
            self.end_headers()
            self.wfile.write(response_data)
            return

        # Para cualquier otra ruta, servir los archivos estáticos normales (HTML, CSS, JS, imágenes)
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        
        if parsed.path == "/api/comentarios":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode("utf-8")

            try:
                data = json.loads(body)
                series = str(data.get("series", "general")).strip()
                author = str(data.get("author", "Anónimo")).strip() or "Anónimo"
                text = str(data.get("text", "")).strip()

                if not text:
                    self.send_response(400)
                    self.end_headers()
                    self.wfile.write(b'{"error": "El comentario no puede estar vacio"}')
                    return

                # Fecha formateada
                now = datetime.now()
                date_str = data.get("date") or now.strftime("%d %b %Y, %H:%M")
                ts = int(data.get("timestamp") or (now.timestamp() * 1000))

                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO comentarios (series, author, text, date, timestamp) VALUES (?, ?, ?, ?, ?)",
                    (series, author, text, date_str, ts)
                )
                conn.commit()
                new_id = cursor.lastrowid
                conn.close()

                res_json = json.dumps({
                    "success": True,
                    "id": new_id,
                    "series": series,
                    "author": author,
                    "text": text,
                    "date": date_str,
                    "timestamp": ts
                }).encode("utf-8")

                self.send_response(201)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(res_json)))
                self.end_headers()
                self.wfile.write(res_json)
                return

            except Exception as e:
                self.send_response(500)
                self.end_headers()
                err_msg = json.dumps({"error": str(e)}).encode("utf-8")
                self.wfile.write(err_msg)
                return

        # Para el endpoint de feedback / contacto de la terminal
        if parsed.path == "/api/contacto":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode("utf-8")
            try:
                data = json.loads(body)
                print(f"[Contacto] De: {data.get('nombre')} - Mensaje: {data.get('mensaje')}")
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(b'{"success": true}')
                return
            except Exception:
                self.send_response(400)
                self.end_headers()
                return

        self.send_response(404)
        self.end_headers()

if __name__ == "__main__":
    init_db()
    server_address = ("", PORT)
    httpd = http.server.HTTPServer(server_address, StreamingHandler)
    print(f"✓ Servidor activo en http://localhost:{PORT}")
    print("✓ Pulsa Ctrl+C para detener el servidor.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
