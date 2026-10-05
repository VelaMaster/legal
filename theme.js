// Paleta dinámica: cambia al recargar y evoluciona suavemente con el tiempo
(function () {
  var KEY = "dc-theme-hue", root = document.documentElement, prev = null;
  try {
    var v = localStorage.getItem(KEY);
    if (v !== null && v !== "" && !isNaN(+v)) prev = +v;
  } catch (e) {}

  var nav = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || {};
  var internal = false;
  try { internal = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (e) {}

  var start, next;
  if (prev === null) {
    start = next = Math.floor(Math.random() * 360);
  } else if (nav.type === "reload" || !internal) {
    start = prev;
    next = (prev + (Math.random() < 0.5 ? -1 : 1) * (60 + Math.random() * 120) + 360) % 360;
  } else {
    start = next = prev;
  }

  root.style.setProperty("--h", start);
  try { localStorage.setItem(KEY, Math.round(next)); } catch (e) {}

  if (next !== start) {
    addEventListener("DOMContentLoaded", function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { root.style.setProperty("--h", next); });
      });
    });
  }

  // Transición suave continua con el tiempo (cada 25 segundos se desliza a un nuevo matiz armónico)
  var currentHue = next;
  setInterval(function () {
    currentHue = (currentHue + 18) % 360;
    root.style.setProperty("--h", currentHue);
    try { localStorage.setItem(KEY, Math.round(currentHue)); } catch (e) {}
  }, 25000);
})();
