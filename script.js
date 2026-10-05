// Dónde se guardan los mensajes: tu servidor recibe un POST con { nombre, mensaje }
const API_URL = "/api/contacto";

const dlg = document.getElementById("term");
const out = document.getElementById("term-out");
const input = document.getElementById("term-in");
let step = 0, nombre = "", mensaje = "";

function print(text, cls) {
  const p = document.createElement("div");
  if (cls) p.className = cls;
  p.textContent = text;
  out.appendChild(p);
  out.scrollTop = out.scrollHeight;
}

function start() {
  out.textContent = "";
  step = 0; nombre = ""; mensaje = "";
  input.value = ""; input.disabled = false;
  print("$ contacto");
  print("Aquí puedes dejarnos una idea, una duda o lo que quieras.");
  print("¿Cómo te llamas? (Enter para omitir)");
}

document.getElementById("open-term").addEventListener("click", () => {
  start();
  dlg.showModal();
  input.focus();
});
document.getElementById("term-x").addEventListener("click", () => dlg.close());
dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

input.addEventListener("keydown", async e => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  const v = input.value.trim();

  if (step === 0) {
    nombre = v;
    print("> " + (v || "(sin nombre)"), "you");
    input.value = "";
    print("Escribe tu mensaje y presiona Enter para enviarlo.");
    step = 1;
    return;
  }

  if (step === 1) {
    if (!v) { print("Escribe algo antes de enviar.", "err"); return; }
    mensaje = v;
    print("> " + v, "you");
    input.disabled = true;
    step = 2;
    print("Enviando...");
    try {
      const r = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, mensaje })
      });
      if (!r.ok) throw new Error(r.status);
      input.value = "";
      print("Listo. Recibimos tu mensaje, gracias.");
      print("Esc para cerrar.");
    } catch (err) {
      print("No se pudo enviar. Revisa tu conexión e inténtalo otra vez.", "err");
      input.disabled = false;
      input.value = mensaje;
      step = 1;
      input.focus();
    }
  }
});
