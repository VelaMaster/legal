# Sistema de Comentarios y Base de Datos

Este proyecto incluye un sistema completo de comentarios conectado a una base de datos ligera **SQLite** que funciona tanto en pruebas locales como en producción sobre un servidor con Nginx.

---

## 1. ¿Cómo funciona la Base de Datos?

- **Motor**: SQLite (archivo local `comentarios.db`).
- **Ventajas**:
  - No requiere instalar MySQL, PostgreSQL ni dependencias pesadas.
  - Viene integrado nativamente en Python 3.
  - Todo se almacena en un solo archivo respaldable (`comentarios.db`).

### Estructura de la tabla `comentarios`:
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | INTEGER PRIMARY KEY | Identificador único autoincrementable |
| `series` | TEXT | Identificador de la serie (`rick`, `peace`, etc.) |
| `author` | TEXT | Nombre del usuario o `"Anónimo"` |
| `text` | TEXT | Contenido del comentario |
| `date` | TEXT | Fecha y hora legible en español |
| `timestamp` | INTEGER | Marca de tiempo en milisegundos |

---

## 2. Uso en Local (En tu computadora)

Para probar la página con el servidor y la base de datos funcionando:

1. Abre tu terminal en esta carpeta:
   ```bash
   cd /Users/diego/Documents/legal
   ```
2. Ejecuta el servidor integrado:
   ```bash
   python3 server.py
   ```
3. Abre en tu navegador:
   - **Catálogo**: [http://localhost:8000/index.html](http://localhost:8000/index.html)
   - **Serie**: [http://localhost:8000/series.html?s=rick](http://localhost:8000/series.html?s=rick)

> **Nota de respaldo**: Si abres directamente el archivo `series.html` sin encender el servidor, los comentarios se guardan automáticamente en el almacenamiento local de tu navegador (`localStorage`) para que nunca fallen.

---

## 3. Uso en Servidor de Producción (Nginx / Linux)

En tu servidor (por ejemplo en `/var/www/hasclic`):

1. **Copiar los archivos**:
   Copia todos los archivos de esta carpeta al directorio de tu servidor.
2. **Iniciar el servicio backend**:
   Puedes correr `server.py` en segundo plano con `systemd`, `pm2` o `nohup`:
   ```bash
   nohup python3 server.py > server.log 2>&1 &
   ```
3. **Configuración de Nginx**:
   En tu archivo de configuración de Nginx (`/etc/nginx/sites-available/...`), agrega este bloque dentro de `server { ... }` para reenviar las peticiones a la API:
   ```nginx
   # Reenvío de la API de comentarios y contacto hacia el backend Python
   location /api/ {
       proxy_pass http://127.0.0.1:8000/api/;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   }
   ```
4. Recarga Nginx:
   ```bash
   sudo systemctl reload nginx
   ```
