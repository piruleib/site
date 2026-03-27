// If you're here, you're a gossip ahh.
// This website uses GD Colon's API to get the level's informations. Then, it stores locally so it makes only one request and stores it to the cache, so the site makes the less possible calls and it prevents rate limiting.
// I know Colon doesn't recommend the use of his API, but it's the easiest way to get the informations for the front-end, so i had no choice.
// (colon please keep the API alive i beg)




// =======================
// CONFIG
// =======================
const CACHE_KEY = "gd_levels_cache";
const CACHE_TIME_KEY = "gd_levels_cache_time";
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24h

let nivel1Data = null;
let nivel2Data = null;
let score = 0;
let allLevelsData = null;

// IDs dos levels que você quer usar
const allLevelIds = [
  10565740, 3979721, 60979746, 4706930, 44062068,
  13519, 55520, 27690100, 26681070
];

// =======================
// API + CACHE
// =======================
async function carregarDadosIniciais() {
  const cache = localStorage.getItem(CACHE_KEY);
  const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
  const agora = Date.now();

  // ✅ usa cache
  if (cache && cacheTime && agora - cacheTime < CACHE_DURATION) {
    console.log("Usando cache...");
    allLevelsData = JSON.parse(cache);
    initializeGame();
    return;
  }

  console.log("Buscando API...");

  try {
    const promises = allLevelIds.map(id =>
      fetch(`https://gdbrowser.com/api/level/${id}`)
        .then(res => res.json())
        .then(data => ({
  name: data.name || "Unknown",
  downloads: Number(data.downloads) || 0,
  difficulty: data.difficulty,
  demon: data.demon,
  demonDifficulty: Number(data.demonDifficulty),
  stars: Number(data.stars) || 0
}))
        .catch(() => null)
    );

    // timeout
    const timeout = new Promise(resolve =>
      setTimeout(() => resolve("timeout"), 5000)
    );

    const results = await Promise.race([
      Promise.all(promises),
      timeout
    ]);

    if (results === "timeout") {
      console.error("API demorou demais.");
      return;
    }

    // remove nulls
    allLevelsData = results.filter(r => r !== null);

    // salva cache
    localStorage.setItem(CACHE_KEY, JSON.stringify(allLevelsData));
    localStorage.setItem(CACHE_TIME_KEY, agora);

    console.log("Dados carregados:", allLevelsData);

    initializeGame();

  } catch (err) {
    console.error("Erro na API:", err);
  }
}

function getDifficultyImage(level) {
  const diff = String(level.difficulty || "").toLowerCase();

  // ⭐ AUTO
  if (level.stars == 1 || diff.includes("auto")) {
    return "img/auto.png";
  }

  // 😈 DEMON (usa flag também)
  if (level.demon || diff.includes("demon")) {
    if (diff.includes("easy")) return "img/demon-easy.png";
    if (diff.includes("medium")) return "img/demon-medium.png";
    if (diff.includes("hard")) return "img/demon-hard.png";
    if (diff.includes("insane")) return "img/demon-insane.png";
    if (diff.includes("extreme")) return "img/demon-extreme.png";
    return "img/demon.png";
  }

  // 🎯 NORMAL
  if (diff.includes("easy")) return "img/easy.png";
  if (diff.includes("normal")) return "img/normal.png";
  if (diff.includes("harder")) return "img/harder.png";
  if (diff.includes("hard")) return "img/hard.png";
  if (diff.includes("insane")) return "img/insane.png";

  return "img/normal.png";
}

// =======================
// GAME LOGIC
// =======================
function initializeGame() {
  document.getElementById("loadingScreen").style.display = "none";
  startGame();
}

function startGame() {
  carregarNovosNiveis();
}

function escolherNiveisAleatorios() {
  if (!allLevelsData || allLevelsData.length < 2) {
    console.error("Sem dados suficientes!");
    return [];
  }

  const i1 = Math.floor(Math.random() * allLevelsData.length);
  let i2;

  do {
    i2 = Math.floor(Math.random() * allLevelsData.length);
  } while (i1 === i2);

  return [allLevelsData[i1], allLevelsData[i2]];
}

function carregarNovosNiveis() {
  const levels = escolherNiveisAleatorios();
  if (levels.length < 2) return;

  setupLevels(levels[0], levels[1]);
}

function setupLevels(n1, n2) {
  nivel1Data = n1;
  nivel2Data = n2;

  document.getElementById("levelname1").innerText = n1.name;
  document.getElementById("levelname2").innerText = n2.name;

  document.getElementById("downloads1").innerText = "? downloads";
  document.getElementById("downloads2").innerText = "? downloads";

  document.getElementById("diff1").src = getDifficultyImage(n1);
document.getElementById("diff2").src = getDifficultyImage(n2);

  document.getElementById("gameOverScreen").style.display = "none";
}

function verificarResposta(escolha) {
  const d1 = Number(nivel1Data.downloads) || 0;
  const d2 = Number(nivel2Data.downloads) || 0;

  document.getElementById("downloads1").innerText =
    d1 ? d1.toLocaleString() + " downloads" : "No data";

  document.getElementById("downloads2").innerText =
    d2 ? d2.toLocaleString() + " downloads" : "No data";

  const acertou =
    (escolha === 1 && d1 > d2) ||
    (escolha === 2 && d2 > d1) ||
    d1 === d2;

  if (acertou) {
    score++;
    document.getElementById("scoreValue").innerText = score;
    setTimeout(carregarNovosNiveis, 1500);
  } else {
    gameOver();
  }
}

function gameOver() {
  document.getElementById("finalScore").innerText = score;
  document.getElementById("gameOverScreen").style.display = "flex";
}

function reiniciarJogo() {
  score = 0;
  document.getElementById("scoreValue").innerText = score;

  const screen = document.getElementById("gameOverScreen");
  screen.classList.remove("active");

  carregarNovosNiveis();
}

// =======================
// EVENTS
// =======================
document.getElementById("box1").onclick = () => verificarResposta(1);
document.getElementById("box2").onclick = () => verificarResposta(2);
document.getElementById("restartButton").onclick = reiniciarJogo;

// =======================
// START
// =======================
carregarDadosIniciais();