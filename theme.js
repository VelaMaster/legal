// Colores dinámicos: cada vez que regresas o recargas, el tono cambia y se mezcla suave con el anterior.
(function () {
  var KEY = "cb-hue", root = document.documentElement, prev = null;
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
    next = prev + (Math.random() < 0.5 ? -1 : 1) * (70 + Math.random() * 140);
  } else {
    start = next = prev; // navegando dentro del sitio: mismos colores
  }

  root.style.setProperty("--h", start);
  try { localStorage.setItem(KEY, ((next % 360) + 360) % 360); } catch (e) {}

  if (next !== start) {
    addEventListener("DOMContentLoaded", function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { root.style.setProperty("--h", next); });
      });
    });
  }
})();
