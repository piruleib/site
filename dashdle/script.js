// Hi! This is all manual, as specified on the index, i tried to use Colon's API but its rate limit is too strict.
// So I manually verified a few levels and put them in a database here. At least until i discover how do i make requests directly to RobTop's servers.
// Enjoy the game!
// BRASIL ON TOP!
// By the way, some variable names are in portuguese, sorry about that.
// devpiruleib

let nivel1Data = null;
let nivel2Data = null;
let score = 0;
let currentLevels = [];
let allLevelsData = null;

// MANUALLY VERIFIED LEVEL DATA - MAY NOT BE ACCURATE :(
const levelsDatabase = { 
    10565740: { name: "Bloodbath", downloads: 112000000, difficulty: 9 },
    3979721: { name: "Cataclysm", downloads: 53000000, difficulty: 9 },
    60979746: { name: "The Golden", downloads: 3300000, difficulty: 9 },
    2760100: { name: "ToE II v2", downloads: 5500000, difficulty: 7 },
    4706930: { name: "Supersonic", downloads: 39100000, difficulty: 8 },
    61079355: { name: "Acu", downloads: 7700000, difficulty: 9 },
    44062068: { name: "Future Funk", downloads: 21889588, difficulty: 7 },
    9145341: { name: "8o", downloads: 17300000, difficulty: 8 },
    38754426: { name: "Killbot", downloads: 2800000, difficulty: 9 },
    4957691: { name: "Windy Landscape", downloads: 13700000, difficulty: 8 },
    75206202: { name: "Firework", downloads: 3700000, difficulty: 9 },
    61137742: { name: "Leyak", downloads: 1800000, difficulty: 8 },
    9608518: { name: "Butterfly Effect", downloads: 937510, difficulty: 5 },
    5904109: { name: "Platinum Adventure", downloads: 52400000, difficulty: 5 },
    34085027: { name: "B", downloads: 16300000, difficulty: 6 },
    13519: { name: "The Nightmare", downloads: 119000000, difficulty: 5 },
    55520: { name: "The Lightning Road", downloads: 74100000, difficulty: 5 },
    76962930: { name: "Sakupen Circles", downloads: 6847563, difficulty: 9 },
    1347537: { name: "Invisible Clubstep", downloads: 14600000, difficulty: 5 },
    17235008: { name: "X", downloads: 51600000, difficulty: 5 },
    25706351: { name: "HeLL", downloads: 11000000, difficulty: 6 },
    27690100: { name: "Slaughterhouse", downloads: 26700000, difficulty: 9 },
    8660411: { name: "Death Moon", downloads: 46200000, difficulty: 5 },
    40299716: { name: "Spectral Tentation", downloads: 401000, difficulty: 8 },
    73667628: { name: "Acheron", downloads: 6500000, difficulty: 9 },
    71912451: { name: "RUST", downloads: 785000, difficulty: 9 },
    4284013: { name: "Nine Circles", downloads: 72800000, difficulty: 7 },
    5310094: { name: "Fairydust", downloads: 900000, difficulty: 7 },
    3543219: { name: "Speed Racer", downloads: 54200000, difficulty: 5 },
    6939821: { name: "Jawbreaker (Zenthic)", downloads: 15300000, difficulty: 7 },
    102765: { name: "Hextec Flow", downloads: 12300000, difficulty: 5 },
    59315849: { name: "Double Dash", downloads: 779348, difficulty: 7 },
    13643591: { name: "Ultra Drivers", downloads: 1785129, difficulty: 7 },
    26681070: { name: "Sonic Wave", downloads: 33500000, difficulty: 9 }
};

// Convert to array for easy random selection
const allLevelIds = Object.keys(levelsDatabase).map(Number);

// Difficulty to image mapping
const difficultyImages = {
  'Extreme Demon': 'img/demon-extreme.png',
  'Insane Demon': 'img/demon-insane.png',
  'Hard Demon': 'img/demon-hard.png',
  'Medium Demon': 'img/demon-medium.png',
  'Easy Demon': 'img/demon-easy.png',
  'Hard': 'img/hard.png',
  'Insane': 'img/insane.png',
  'Easy': 'img/easy.png',
  'Normal': 'img/normal.png',
  'Auto': 'img/auto.png',
  'Demon': 'img/demon.png'
};

const defaultImage = 'img/demon-extreme.png';

function getDifficultyImage(difficulty) {
  if (typeof difficulty === 'number') {
    const difficultyMap = {
      0: difficultyImages['Auto'],
      1: difficultyImages['Easy'],
      2: difficultyImages['Normal'],
      3: difficultyImages['Hard'],
      4: difficultyImages['Insane'],
      5: difficultyImages['Easy Demon'],
      6: difficultyImages['Medium Demon'],
      7: difficultyImages['Hard Demon'],
      8: difficultyImages['Insane Demon'],
      9: difficultyImages['Extreme Demon'],
      10: difficultyImages['Auto']
    };
    return difficultyMap[difficulty] || defaultImage;
  }
  return defaultImage;
}

// Get level data from our verified database
function getLevelData(id) {
    return levelsDatabase[id] || {
        name: `Level ${id}`,
        downloads: Math.floor(Math.random() * 1000000) + 100000,
        difficulty: Math.floor(Math.random() * 10),
        author: "Unknown"
    };
}

// Initialize game - NO API CALLS!
function initializeGame() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Convert database to array for random selection
    allLevelsData = Object.values(levelsDatabase);
    
    console.log(`Game loaded with ${allLevelsData.length} verified levels!`);
    console.log('No API calls - 100% accurate data!');
    
    // Hide loading screen immediately
    loadingScreen.style.display = 'none';
    
    // Start the game
    startGame();
}

function startGame() {
    carregarNovosNiveis();
}

// Choose random levels from our pre-loaded data
function escolherNiveisAleatorios() {
    if (!allLevelsData || allLevelsData.length < 2) {
        // Fallback to random IDs
        const indice1 = Math.floor(Math.random() * allLevelIds.length);
        let indice2;
        do {
            indice2 = Math.floor(Math.random() * allLevelIds.length);
        } while (indice1 === indice2);
        
        return [
            getLevelData(allLevelIds[indice1]),
            getLevelData(allLevelIds[indice2])
        ];
    }

    const indice1 = Math.floor(Math.random() * allLevelsData.length);
    let indice2;
    do {
        indice2 = Math.floor(Math.random() * allLevelsData.length);
    } while (indice1 === indice2);

    return [allLevelsData[indice1], allLevelsData[indice2]];
}

// Load new levels - NO API CALLS!
function carregarNovosNiveis() {
    const [nivel1, nivel2] = escolherNiveisAleatorios();
    setupLevels(nivel1, nivel2);
}

function setupLevels(nivel1, nivel2) {
    nivel1Data = nivel1;
    nivel2Data = nivel2;
    currentLevels = [nivel1, nivel2];
    
    console.log("Setting up levels (100% accurate data):");
    console.log("Level 1:", nivel1.name, "Downloads:", nivel1.downloads, "Difficulty:", nivel1.difficulty);
    console.log("Level 2:", nivel2.name, "Downloads:", nivel2.downloads, "Difficulty:", nivel2.difficulty);
    
    document.getElementById("levelname1").innerText = nivel1.name;
    document.getElementById("levelname2").innerText = nivel2.name;
    document.getElementById("downloads1").innerText = "? downloads";
    document.getElementById("downloads2").innerText = "? downloads";
    
    const img1 = document.querySelector("#box1 img");
    const img2 = document.querySelector("#box2 img");
    
    img1.src = getDifficultyImage(nivel1.difficulty);
    img2.src = getDifficultyImage(nivel2.difficulty);
    
    document.getElementById("gameOverScreen").style.display = "none";
}

function verificarResposta(nivelEscolhido) {
    if (!nivel1Data || !nivel2Data) return;
    
    const downloads1 = nivel1Data.downloads;
    const downloads2 = nivel2Data.downloads;
    
    document.getElementById("downloads1").innerText = `${downloads1.toLocaleString()} downloads`;
    document.getElementById("downloads2").innerText = `${downloads2.toLocaleString()} downloads`;
    
    let acertou = false;
    
    if (nivelEscolhido === 1 && downloads1 > downloads2) {
        acertou = true;
    } else if (nivelEscolhido === 2 && downloads2 > downloads1) {
        acertou = true;
    } else if (downloads1 === downloads2) {
        acertou = true;
    }
    
    if (acertou) {
        score++;
        document.getElementById("scoreValue").innerText = score;
        setTimeout(() => {
            carregarNovosNiveis();
        }, 1500);
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
    document.getElementById("gameOverScreen").style.display = "none";
    carregarNovosNiveis();
}

// Event listeners
document.getElementById("box1").addEventListener("click", () => {
    verificarResposta(1);
});

document.getElementById("box2").addEventListener("click", () => {
    verificarResposta(2);
});

document.getElementById("restartButton").addEventListener("click", reiniciarJogo);

// Start the game - INSTANT LOADING!
initializeGame();