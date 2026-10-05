/**
 * Controlador del Reproductor y Catálogo de Series
 */

const DATA = {
  rick: {
    title: "Rick and Morty",
    originalTitle: "Rick and Morty",
    img: "img/rick-and-morty.jpg",
    rating: "16+",
    year: "2013",
    genre: "Animación · Ciencia Ficción · Comedia",
    about: "Un científico alcohólico e hiperbrillante arrastra a su tímido nieto a dementes aventuras por dimensiones paralelas, el espacio profundo y crisis existenciales inesperadas.",
    seasons: [11],
    episodes: {
      1: [
        { ep: 1, title: "Buscando las semillas", duration: "22 min", desc: "Rick lleva a Morty a otra dimensión en busca de las semillas de megaárboles, mientras Jerry y Beth discuten sobre la mala influencia de Rick." },
        { ep: 2, title: "Invasión canina", duration: "22 min", desc: "Rick inventa un casco para aumentar la inteligencia del perro Snuffles. Mientras tanto, se infiltran en los sueños del profesor de matemáticas de Morty." },
        { ep: 3, title: "Parque Anatómico", duration: "22 min", desc: "Rick envía a Morty en miniatura al cuerpo de un vagabundo para salvar un parque de diversiones anatómico mientras celebran la Navidad." },
        { ep: 4, title: "La simulación alienígena", duration: "21 min", desc: "Rick y Jerry se encuentran atrapados dentro de una simulación de realidad virtual creada por extraterrestres estafadores zigerianos." },
        { ep: 5, title: "Meeseeks destructores", duration: "22 min", desc: "Rick le entrega a la familia una caja Meeseeks para ayudarlos con sus frustraciones, pero Jerry lleva a un Meeseeks a una crisis mortal." },
        { ep: 6, title: "La poción de Rick", duration: "21 min", desc: "Morty le pide a Rick una pócima de amor para Jessica, desatando una epidemia que muta a toda la humanidad en monstruos de Cronenberg." },
        { ep: 7, title: "Criando un Gazorpazorp", duration: "22 min", desc: "Morty compra un robot alienígena y tiene un hijo mitad humano y mitad alienígena guerrero que crece en cuestión de horas." },
        { ep: 8, title: "Televisión Interdimensional", duration: "22 min", desc: "Aburridos de la programación local, Rick conecta la tele a canales de dimensiones infinitas con comerciales y películas surrealistas." },
        { ep: 9, title: "Cosas necesarias", duration: "22 min", desc: "Summer entra a trabajar con un misterioso anticuario que resulta ser el Diablo, y Rick monta un laboratorio competitivo de ciencia." },
        { ep: 10, title: "Encuentros cercanos a lo Rick", duration: "23 min", desc: "Rick es falsamente acusado de matar a versiones alternativas de sí mismo por el Consejo Transdimensional de Ricks." },
        { ep: 11, title: "Es hora de la fiesta", duration: "22 min", desc: "Con Beth y Jerry de viaje en una convención del Titanic, Rick y Summer organizan una legendaria fiesta con seres intergalácticos." }
      ]
    }
  },
  peace: {
    title: "Peacemaker",
    originalTitle: "Peacemaker",
    img: "img/peacemaker.jpg",
    rating: "18+",
    year: "2022",
    genre: "Acción · Superhéroes · Comedia negra",
    about: "Christopher Smith, un engreído justiciero que cree ciegamente en la paz a toda costa, se une al impredecible equipo de operaciones secretas de ARGUS para una misión clasificada mundial.",
    seasons: [8],
    episodes: {
      1: [
        { ep: 1, title: "Un nuevo torbellino", duration: "44 min", desc: "Tras sobrevivir a los eventos de Corto Maltese, Peacemaker sale del hospital y es asignado al Proyecto Butterfly bajo amenazas legales." },
        { ep: 2, title: "Los mejores amigos nunca, por siempre", duration: "39 min", desc: "Peacemaker y su leal águila Eagly intentan eludir a la policía mientras Adebayo y Harcourt rastrean un misterioso dispositivo." },
        { ep: 3, title: "Mejor muerto que Goff", duration: "41 min", desc: "El equipo emprende su primera misión de infiltración de alto riesgo para neutralizar a un objetivo que parece controlado por parásitos." },
        { ep: 4, title: "El Choad menos transitado", duration: "47 min", desc: "Peacemaker visita a su racista e implacable padre Auggie para conseguir nuevos cascos con habilidades letales." },
        { ep: 5, title: "El mono está bien", duration: "42 min", desc: "Una incursión a una fábrica clandestina de néctar alienígena se sale de control cuando el equipo se enfrenta a una bestia alterada." },
        { ep: 6, title: "Murn después de leer", duration: "44 min", desc: "El detective Song y la policía acorralan a Peacemaker mientras se descubren verdades ocultas sobre la verdadera naturaleza del equipo." },
        { ep: 7, title: "El dragón en mi corazón", duration: "41 min", desc: "Auggie Smith adopta su alter ego como el Dragón Blanco para cazar a su propio hijo en una encrucijada familiar salvaje." },
        { ep: 8, title: "La vaca de nuevo", duration: "47 min", desc: "La épica batalla final contra la reina y el ganado de las Mariposas extraterrestres para determinar el destino de la humanidad." }
      ]
    }
  }
};

const LINKS = {
  "rick-1-1": "videos/rickymorty/T1/Buscando_las_semillas.mp4",
  "rick-1-2": "videos/rickymorty/T1/Invasión_canina.mp4",
  "rick-1-3": "videos/rickymorty/T1/Parque_Anatómico.mp4",
  "rick-1-4": "videos/rickymorty/T1/La_simulación_alienígena.mp4",
  "rick-1-5": "videos/rickymorty/T1/Meeseeks_destructores.mp4",
  "rick-1-6": "videos/rickymorty/T1/La_poción_de_Rick.mp4",
  "rick-1-7": "videos/rickymorty/T1/Criando_un_Gazorpazorp.mp4",
  "rick-1-8": "videos/rickymorty/T1/Televisión_Interdimensional.mp4",
  "rick-1-9": "videos/rickymorty/T1/Cosas_necesarias.mp4",
  "rick-1-10": "videos/rickymorty/T1/Encuentros_cercanos_a_lo_Rick.mp4",
  "rick-1-11": "videos/rickymorty/T1/Es_hora_de_la_fiesta.mp4",
  // Peacemaker
  "peace-1-1": "videos/peacemaker/T1/Un_nuevo_torbellino.mp4",
  "peace-1-2": "videos/peacemaker/T1/Los_mejores_amigos_nunca.mp4",
  "peace-1-3": "videos/peacemaker/T1/Mejor_muerto_que_Goff.mp4",
  "peace-1-4": "videos/peacemaker/T1/El_Choad_menos_transitado.mp4",
  "peace-1-5": "videos/peacemaker/T1/El_mono_esta_bien.mp4",
  "peace-1-6": "videos/peacemaker/T1/Murn_despues_de_leer.mp4",
  "peace-1-7": "videos/peacemaker/T1/El_dragon_en_mi_corazon.mp4",
  "peace-1-8": "videos/peacemaker/T1/La_vaca_de_nuevo.mp4"
};

(function() {
  const q = new URLSearchParams(location.search).get("s");
  const id = DATA[q] ? q : "rick";
  const s = DATA[id];

  let currentSeason = 1;
  let currentPlayingEp = null;

  // Actualizar metadatos y Hero
  document.title = `${s.title} · haslic.com`;
  const titleEl = document.getElementById("title");
  const aboutEl = document.getElementById("about");
  const coverEl = document.getElementById("cover");
  const backdropEl = document.getElementById("hero-backdrop");
  const ratingBadge = document.getElementById("series-rating");
  const yearBadge = document.getElementById("series-year");

  if (titleEl) titleEl.textContent = s.title;
  if (aboutEl) aboutEl.textContent = s.about;
  if (ratingBadge) ratingBadge.textContent = s.rating || "16+";
  if (yearBadge) yearBadge.textContent = s.year || "2022";

  if (backdropEl) {
    backdropEl.style.backgroundImage = `url("${s.img}")`;
  }

  if (coverEl) {
    coverEl.className = "s-poster cover art-" + id;
    coverEl.innerHTML = `<img src="${s.img}" alt="Portada de ${s.title}" onerror="this.remove()"><span>${s.title}</span>`;
  }

  // Elementos de Temporadas y Episodios
  const chipsEl = document.getElementById("seasons");
  const epsEl = document.getElementById("eps");
  const epCountEl = document.getElementById("episodes-count");

  // Elementos del Reproductor
  const playerContainer = document.getElementById("player-container");
  const videoEl = document.getElementById("video-element");
  const playerStatus = document.getElementById("player-status");
  const playerCloseBtn = document.getElementById("player-close-btn");
  const fallbackBox = document.getElementById("player-fallback");
  const fallbackPath = document.getElementById("fallback-path");
  const btnPrev = document.getElementById("btn-prev-ep");
  const btnNext = document.getElementById("btn-next-ep");
  const playerEpCounter = document.getElementById("player-ep-counter");

  // Compartir y Toast
  const shareBtn = document.getElementById("share-btn");
  const toast = document.getElementById("toast");
  const playFirstBtn = document.getElementById("play-first-btn");

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showToast("¡Enlace copiado al portapapeles!");
        }).catch(() => {
          showToast(url);
        });
      } else {
        showToast("Enlace de serie preparado.");
      }
    });
  }

  // Reproducir episodio
  window.reproducir = function(url, seasonNum, epNum, epTitle) {
    currentPlayingEp = epNum;

    const hideFallback = () => {
      if (fallbackBox) fallbackBox.style.display = "none";
    };

    // Ocultar mensaje de fallback inicialmente
    hideFallback();

    // Actualizar barra de estado del reproductor
    if (playerStatus) {
      playerStatus.innerHTML = `<span>Temporada ${seasonNum} · Episodio ${epNum}: <strong>${epTitle || 'Capítulo ' + epNum}</strong></span>`;
    }

    if (playerEpCounter) {
      playerEpCounter.textContent = `T${seasonNum} : E${epNum}`;
    }

    // Configurar video
    if (videoEl) {
      // Limpiar listeners previos para evitar cruces
      videoEl.onplaying = hideFallback;
      videoEl.oncanplay = hideFallback;
      videoEl.onloadeddata = hideFallback;

      // Solo mostrar fallback si realmente hay un error 404 o falla irrecuperable del archivo
      videoEl.onerror = function() {
        if (videoEl.error && fallbackBox && fallbackPath) {
          fallbackBox.style.display = "flex";
          fallbackPath.textContent = url;
        }
      };

      videoEl.pause();
      // encodeURI asegura compatibilidad con tildes y caracteres especiales en Nginx / Linux
      videoEl.src = encodeURI(url);
      videoEl.load();

      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          hideFallback();
        }).catch(err => {
          // Si el navegador bloquea la reproducción automática con audio por política de seguridad,
          // NO es un error de archivo: el video ya está cargado y el usuario solo debe pulsar Play.
          console.log("Autoplay con audio requiere interacción o fue pausado:", err.name);
          hideFallback();
        });
      }
    }

    // Mostrar el contenedor del reproductor
    if (playerContainer) {
      playerContainer.style.display = "block";
      playerContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Actualizar botones Siguiente / Anterior
    const totalEpsInSeason = s.seasons[seasonNum - 1] || 1;
    if (btnPrev) {
      btnPrev.disabled = epNum <= 1;
      btnPrev.onclick = () => {
        if (epNum > 1) {
          triggerEpisodePlay(seasonNum, epNum - 1);
        }
      };
    }
    if (btnNext) {
      btnNext.disabled = epNum >= totalEpsInSeason;
      btnNext.onclick = () => {
        if (epNum < totalEpsInSeason) {
          triggerEpisodePlay(seasonNum, epNum + 1);
        }
      };
    }

    // Resaltar el episodio activo en la lista
    document.querySelectorAll(".ep-item").forEach(item => {
      const isCurrent = +item.dataset.ep === epNum;
      item.classList.toggle("now-playing", isCurrent);
      const eq = item.querySelector(".equalizer");
      if (eq) eq.style.display = isCurrent ? "inline-flex" : "none";
    });

    // Guardar en historial
    if (window.DC_TRACK) {
      window.DC_TRACK.saveView(id, epNum);
    }
  };

  function triggerEpisodePlay(seasonNum, epNum) {
    const epData = (s.episodes && s.episodes[seasonNum] && s.episodes[seasonNum][epNum - 1]) || { title: `Episodio ${epNum}` };
    const url = LINKS[`${id}-${seasonNum}-${epNum}`] || `videos/${id}/T${seasonNum}/ep-${epNum}.mp4`;
    window.reproducir(url, seasonNum, epNum, epData.title);
  }

  // Cerrar reproductor
  if (playerCloseBtn) {
    playerCloseBtn.addEventListener("click", () => {
      if (videoEl) {
        videoEl.pause();
        videoEl.removeAttribute("src");
        videoEl.load();
      }
      if (playerContainer) {
        playerContainer.style.display = "none";
      }
      document.querySelectorAll(".ep-item").forEach(item => {
        item.classList.remove("now-playing");
        const eq = item.querySelector(".equalizer");
        if (eq) eq.style.display = "none";
      });
      currentPlayingEp = null;
    });
  }

  // Caché en memoria y sessionStorage para miniaturas generadas de los videos
  const THUMB_CACHE = {};

  // Función para calcular un segundo único para cada capítulo (evita la intro idéntica)
  function getUniqueSeekTime(epNum, duration) {
    if (!duration || duration <= 120) return 45;
    // La intro suele estar en los primeros 60 segundos; saltamos al minuto 3+ y distribuimos
    const minTime = 160; // 2 min 40s
    const maxTime = Math.max(minTime + 60, duration - 120);
    const step = (maxTime - minTime) / 12;
    return minTime + ((epNum * 3) % 11) * step;
  }

  function loadVideoThumbnail(videoUrl, imgEl, fallbackEl, epNum = 1) {
    if (!videoUrl || !imgEl) return;

    const cacheKey = "thumb_v4_" + videoUrl + "_ep_" + epNum;

    // 1. Revisar si la miniatura ya está en memoria o en sessionStorage
    if (THUMB_CACHE[cacheKey]) {
      imgEl.src = THUMB_CACHE[cacheKey];
      imgEl.style.display = "block";
      if (fallbackEl) fallbackEl.style.display = "none";
      return;
    }
    try {
      const saved = sessionStorage.getItem(cacheKey);
      if (saved) {
        THUMB_CACHE[cacheKey] = saved;
        imgEl.src = saved;
        imgEl.style.display = "block";
        if (fallbackEl) fallbackEl.style.display = "none";
        return;
      }
    } catch (e) {}

    // 2. Extraer un fotograma único directamente del archivo de video mediante Canvas
    const v = document.createElement("video");
    v.crossOrigin = "anonymous";
    v.src = encodeURI(videoUrl);
    v.muted = true;
    v.playsInline = true;
    v.preload = "metadata";

    let captured = false;

    function cleanup() {
      v.pause();
      v.removeAttribute("src");
      v.load();
    }

    function captureFrame() {
      if (captured) return;
      captured = true;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 320;
        canvas.height = 180;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.75);

        // Guardar en caché para que no vuelva a procesar
        THUMB_CACHE[cacheKey] = dataUrl;
        try { sessionStorage.setItem(cacheKey, dataUrl); } catch (e) {}

        // Aplicar a la imagen de la tarjeta del capítulo
        imgEl.src = dataUrl;
        imgEl.style.display = "block";
        if (fallbackEl) fallbackEl.style.display = "none";
      } catch (err) {
        console.warn("No se pudo extraer frame del video:", err);
      } finally {
        cleanup();
      }
    }

    v.addEventListener("loadedmetadata", function() {
      const targetTime = getUniqueSeekTime(epNum, v.duration);
      v.currentTime = targetTime;
    }, { once: true });

    v.addEventListener("seeked", captureFrame, { once: true });

    v.addEventListener("error", function() {
      captured = true;
      cleanup();
    }, { once: true });

    // Tiempo límite por si el video tarda en responder
    setTimeout(function() {
      if (!captured) {
        captured = true;
        cleanup();
      }
    }, 4500);
  }

  // Renderizar temporada seleccionada
  function showSeason(n) {
    currentSeason = n;
    
    // Actualizar botones de temporada
    if (chipsEl) {
      chipsEl.querySelectorAll("button").forEach(b => {
        b.classList.toggle("on", +b.dataset.n === n);
      });
    }

    const totalCount = s.seasons[n - 1] || 0;
    if (epCountEl) {
      epCountEl.textContent = `${totalCount} episodios en Temporada ${n}`;
    }

    const seasonEpisodes = (s.episodes && s.episodes[n]) || [];

    if (epsEl) {
      epsEl.innerHTML = Array.from({ length: totalCount }, (_, i) => {
        const e = i + 1;
        const info = seasonEpisodes[i] || {
          title: `Episodio ${e}`,
          duration: "25 min",
          desc: "Capítulo completo disponible para transmisión en alta calidad."
        };
        const url = LINKS[`${id}-${n}-${e}`];
        const isPlaying = currentPlayingEp === e;

        return `
          <li class="ep-item ${isPlaying ? 'now-playing' : ''}" data-ep="${e}">
            <div class="ep-info">
              <div class="ep-thumb" ${url ? `onclick="reproducir('${url}', ${n}, ${e}, '${info.title.replace(/'/g, "\\'")}')"` : ''} title="${url ? 'Reproducir ' + info.title : 'Próximamente'}">
                <span class="ep-num-fallback" id="thumb-fallback-${e}">${e}</span>
                ${url ? `
                  <img class="ep-thumb-img" id="thumb-img-${e}" alt="Miniatura ${info.title}" style="display: none;" loading="lazy">
                  <div class="thumb-play-overlay">
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                ` : ''}
                <span class="ep-badge-overlay">E${e}</span>
              </div>
              <div class="ep-details">
                <div class="ep-title">
                  <span>${info.title}</span>
                  <span class="meta" style="margin-left: 8px; font-weight: normal;">• ${info.duration || '24 min'}</span>
                  <span class="equalizer" style="display: ${isPlaying ? 'inline-flex' : 'none'};">
                    <span class="eq-bar"></span>
                    <span class="eq-bar"></span>
                    <span class="eq-bar"></span>
                  </span>
                </div>
                <p class="ep-desc">${info.desc}</p>
              </div>
            </div>
            <div class="ep-actions">
              ${url ? `
                <button type="button" class="btn filled" style="height: 38px; padding: 0 16px; font-size: 0.88rem;" onclick="reproducir('${url}', ${n}, ${e}, '${info.title.replace(/'/g, "\\'")}')">
                  <svg viewBox="0 0 24 24" style="width: 16px; height: 16px;"><path d="M8 5v14l11-7z"/></svg>
                  <span>Ver</span>
                </button>
                <a class="btn ghost" style="height: 38px; padding: 0 14px; font-size: 0.88rem;" href="${url}" download title="Descargar archivo multimedia">
                  <svg viewBox="0 0 24 24" style="width: 16px; height: 16px;"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                </a>
              ` : `
                <span class="badge" style="padding: 6px 12px; font-size: 0.85rem;">Próximamente</span>
              `}
            </div>
          </li>
        `;
      }).join("");

      // Extraer y colocar la miniatura del video si ya está enlazado
      for (let i = 0; i < totalCount; i++) {
        const e = i + 1;
        const url = LINKS[`${id}-${n}-${e}`];
        if (url) {
          const imgEl = document.getElementById(`thumb-img-${e}`);
          const fallbackEl = document.getElementById(`thumb-fallback-${e}`);
          loadVideoThumbnail(url, imgEl, fallbackEl, e);
        }
      }
    }
  }

  // Construir chips de temporadas
  if (chipsEl) {
    chipsEl.innerHTML = s.seasons.map((_, i) => `
      <button class="chip ${i === 0 ? 'on' : ''}" type="button" data-n="${i + 1}">
        Temporada ${i + 1}
      </button>
    `).join("");

    chipsEl.addEventListener("click", e => {
      const b = e.target.closest("button");
      if (b && b.dataset.n) {
        showSeason(+b.dataset.n);
      }
    });
  }

  // Botón "Ver primer capítulo" en el Hero
  if (playFirstBtn) {
    playFirstBtn.addEventListener("click", () => {
      triggerEpisodePlay(1, 1);
    });
  }

  // ========================================================
  // SECCIÓN DE COMENTARIOS Y CONEXIÓN CON BASE DE DATOS / LOCALSTORAGE
  // ========================================================
  const API_COMMENTS = "/api/comentarios";
  const commentsList = document.getElementById("comments-list");
  const commentsCount = document.getElementById("comments-count");
  const commentForm = document.getElementById("comment-form");
  const commentAuthor = document.getElementById("comment-author");
  const commentAnon = document.getElementById("comment-anon");
  const commentText = document.getElementById("comment-text");
  const charCounter = document.getElementById("char-counter");
  const btnSubmitComment = document.getElementById("btn-submit-comment");

  const LOCAL_STORAGE_COMMENTS_KEY = "dc_comments_" + id;

  function getLocalComments() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_COMMENTS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveLocalComment(comment) {
    try {
      const list = getLocalComments();
      list.unshift(comment);
      localStorage.setItem(LOCAL_STORAGE_COMMENTS_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function renderCommentCard(c) {
    const card = document.createElement("div");
    card.className = "comment-card";
    const initial = (c.author || "A").trim().charAt(0).toUpperCase();

    card.innerHTML = `
      <div class="comment-avatar">${initial}</div>
      <div class="comment-content">
        <div class="comment-meta">
          <span class="comment-author">${c.author || 'Anónimo'}</span>
          <span class="comment-date">${c.date || 'Reciente'}</span>
        </div>
        <p class="comment-text">${c.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      </div>
    `;
    return card;
  }

  async function loadComments() {
    if (!commentsList) return;
    let list = [];

    try {
      const res = await fetch(`${API_COMMENTS}?s=${encodeURIComponent(id)}`);
      if (res.ok) {
        list = await res.json();
      } else {
        throw new Error("API no disponible");
      }
    } catch (err) {
      // Fallback a almacenamiento local si el backend no está corriendo en local
      list = getLocalComments();
    }

    if (commentsCount) {
      commentsCount.textContent = `${list.length} comentario${list.length === 1 ? '' : 's'}`;
    }

    commentsList.innerHTML = "";
    if (list.length === 0) {
      commentsList.innerHTML = `
        <div class="comments-empty">
          <p style="font-weight: 500; margin-bottom: 4px;">Aún no hay comentarios en esta serie</p>
          <p class="meta">Sé el primero en compartir tu opinión.</p>
        </div>
      `;
    } else {
      list.forEach(c => {
        commentsList.appendChild(renderCommentCard(c));
      });
    }
  }

  if (commentAnon) {
    commentAnon.addEventListener("change", function() {
      if (this.checked) {
        commentAuthor.dataset.previous = commentAuthor.value;
        commentAuthor.value = "Anónimo";
        commentAuthor.disabled = true;
      } else {
        commentAuthor.value = commentAuthor.dataset.previous || "";
        commentAuthor.disabled = false;
        commentAuthor.focus();
      }
    });
  }

  if (commentText && charCounter) {
    commentText.addEventListener("input", function() {
      charCounter.textContent = `${this.value.length} / 1000`;
    });
  }

  if (commentForm) {
    commentForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      const text = commentText.value.trim();
      if (!text) return;

      let author = (commentAnon && commentAnon.checked) ? "Anónimo" : (commentAuthor.value.trim() || "Anónimo");

      const now = new Date();
      const formattedDate = now.toLocaleDateString("es-MX", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      const newComment = {
        series: id,
        author: author,
        text: text,
        date: formattedDate,
        timestamp: Date.now()
      };

      if (btnSubmitComment) {
        btnSubmitComment.disabled = true;
        btnSubmitComment.style.opacity = "0.7";
      }

      try {
        // Intentar guardar en base de datos vía API
        await fetch(API_COMMENTS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newComment)
        });
      } catch (err) {
        console.warn("Guardando comentario en base de datos local:", err);
      } finally {
        // Guardar copia local y reflejar inmediatamente en pantalla
        saveLocalComment(newComment);

        const empty = commentsList.querySelector(".comments-empty");
        if (empty) empty.remove();

        commentsList.prepend(renderCommentCard(newComment));

        const currentTotal = commentsList.querySelectorAll(".comment-card").length;
        if (commentsCount) {
          commentsCount.textContent = `${currentTotal} comentario${currentTotal === 1 ? '' : 's'}`;
        }

        commentText.value = "";
        if (charCounter) charCounter.textContent = "0 / 1000";
        if (btnSubmitComment) {
          btnSubmitComment.disabled = false;
          btnSubmitComment.style.opacity = "";
        }

        if (typeof showToast === "function") {
          showToast("¡Comentario publicado!");
        }
      }
    });
  }

  // Cargar comentarios iniciales
  loadComments();

  // Iniciar mostrando la primera temporada
  showSeason(1);
})();
