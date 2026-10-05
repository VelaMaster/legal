cat << 'EOF' | sudo tee /var/www/hasclic/series.js > /dev/null
const DATA = {
  rick: {
    title: "Rick and Morty",
    img: "img/rick-and-morty.jpg",
    about: "Un científico medio loco y su nieto brincando entre dimensiones. Humor negro, ciencia ficción y mucho más corazón del que parece.",
    seasons: [11]
  },
  peace: {
    title: "Peacemaker",
    img: "img/peacemaker.jpg",
    about: "Un tipo que quiere la paz aunque tenga que tumbar a medio mundo para conseguirla. Acción, chistes pesados y una intro que no se te olvida.",
    seasons: [8]
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
  "rick-1-11": "videos/rickymorty/T1/Es_hora_de_la_fiesta.mp4"
};

const q = new URLSearchParams(location.search).get("s");
const id = DATA[q] ? q : "rick";
const s = DATA[id];

document.title = s.title;
document.getElementById("title").textContent = s.title;
document.getElementById("about").textContent = s.about;

const cover = document.getElementById("cover");
cover.className = "cover art-" + id;
cover.innerHTML = `<img src="${s.img}" alt="Portada de ${s.title}" onerror="this.remove()"><span>${s.title}</span>`;

const chips = document.getElementById("seasons");
const eps = document.getElementById("eps");

function showSeason(n) {
  chips.querySelectorAll("button").forEach(b => b.classList.toggle("on", +b.dataset.n === n));
  eps.innerHTML = Array.from({ length: s.seasons[n - 1] }, (_, i) => {
    const e = i + 1;
    const url = LINKS[`${id}-${n}-${e}`];
    return `<li class="ep" id="ep-${e}" style="flex-wrap: wrap;">
      <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
        <span>Episodio ${e}</span>
        <div>
          ${url ? `<button type="button" class="btn tonal" onclick="reproducir('${url}', 'ep-${e}')">Ver</button> <a class="btn ghost" href="${url}" download>Descargar</a>`
              : `<span class="meta">Próximamente</span>`}
        </div>
      </div>
      <div id="player-ep-${e}" style="width: 100%; margin-top: 15px; display: none;"></div>
    </li>`;
  }).join("");
}

window.reproducir = function(url, epId) {
  document.querySelectorAll('video').forEach(v => {
    v.pause();
    v.removeAttribute('src');
    v.load();
    v.parentElement.style.display = 'none';
    v.parentElement.innerHTML = '';
  });
  
  const container = document.getElementById('player-' + epId);
  container.style.display = 'block';
  container.innerHTML = `<video src="${url}" controls autoplay style="width: 100%; border-radius: 8px; background: #000; box-shadow: 0 4px 12px rgba(0,0,0,0.5);"></video>`;
  container.scrollIntoView({ behavior: "smooth", block: "center" });
};

chips.innerHTML = s.seasons.map((_, i) => `<button class="chip" type="button" data-n="${i + 1}">Temporada ${i + 1}</button>`).join("");
chips.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (b) showSeason(+b.dataset.n);
});
showSeason(1);
EOF
