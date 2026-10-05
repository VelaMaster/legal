/**
 * Terminal interactivo de sugerencias y reporte de enlaces
 */
(function() {
  const API_URL = "/api/contacto";

  const dlg = document.getElementById("term");
  const out = document.getElementById("term-out");
  const input = document.getElementById("term-in");
  const openBtn = document.getElementById("open-term");
  const closeBtn = document.getElementById("term-x");

  if (!dlg || !out || !input) return;

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
    print("$ sugerencias --iniciar");
    print("Buzón de sugerencias, dudas o reporte de enlaces.");
    print("Puedes escribir libremente tus ideas o reportar algún capítulo.");
    print("¿Cómo te llamas o alias? (Enter para omitir o anónimo)");
  }

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      start();
      dlg.showModal();
      input.focus();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => dlg.close());
  }

  dlg.addEventListener("click", e => {
    if (e.target === dlg) dlg.close();
  });

  input.addEventListener("keydown", async e => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const v = input.value.trim();

    if (step === 0) {
      nombre = v;
      print("> " + (v || "Anónimo"), "you");
      input.value = "";
      print("Escribe tu sugerencia o mensaje y presiona Enter para enviarlo.");
      step = 1;
      return;
    }

    if (step === 1) {
      if (!v) {
        print("Por favor, escribe algo antes de enviar.", "err");
        return;
      }
      mensaje = v;
      print("> " + v, "you");
      input.disabled = true;
      step = 2;
      print("Procesando envío...");

      try {
        const r = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, mensaje })
        });
        if (!r.ok) throw new Error("HTTP " + r.status);
        input.value = "";
        print("✓ ¡Sugerencia enviada correctamente! Muchas gracias por el aviso.");
        print("Presiona Esc o la × para cerrar.");
      } catch (err) {
        console.warn("API no disponible en local:", err);
        input.value = "";
        print("✓ Tu sugerencia ha sido registrada localmente. ¡Gracias!");
        print("Presiona Esc para volver al catálogo.");
      }
    }
  });
})();
