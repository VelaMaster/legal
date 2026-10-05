/**
 * Utilidad de Historial y Métricas de Reproducción
 */
(function() {
  const STORAGE_KEY = "dc_history";

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveView(showId, epNum) {
    try {
      let history = getHistory().filter(item => item.show !== showId);
      history.unshift({
        show: showId,
        ep: epNum || 1,
        timestamp: Date.now()
      });
      if (history.length > 5) history = history.slice(0, 5);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {}
  }

  // Manejo de eventos data-ev
  document.addEventListener("click", function(e) {
    const target = e.target.closest("[data-ev]");
    if (!target) return;

    const eventName = target.dataset.ev;
    const detail = target.dataset.det;

    if (eventName === "abrir_serie") {
      saveView(detail, 1);
    }
  });

  window.DC_TRACK = {
    getHistory: getHistory,
    saveView: saveView
  };
})();
