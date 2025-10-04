// Oi! Se você veio fuxicar o código,
// por favor, não se assuste com ele!
// Esse código está longe de ser perfeito, já que foi feito
// por um estudante do Ensino Médio. Mas tá funcional,
// isso que importa.

// variáveis globais

let min = 25;
let sec = 0;
let initialMin = 25;
let initialSec = 0;
let shouldStop = false;
let shortBreak = document.getElementById("shortBreak");
let longBreak = document.getElementById("longBreak");
let pomodoro = document.getElementById("pomodoro");
let pomodoroMin = document.getElementById("pomodoroMin").value ?? "25";
let sbreakMin = document.getElementById("sbreakMin").value ?? "5";
let lbreakMin = document.getElementById("lbreakMin").value ?? "15";
let blinkingInterval = null;
let close = document.getElementById("close");

const alert = document.getElementById("alert");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const restart = document.getElementById("restart");

pomodoroMin = parseInt(document.getElementById("pomodoroMin").value) || 25;
sbreakMin = parseInt(document.getElementById("sbreakMin").value) || 5;
lbreakMin = parseInt(document.getElementById("lbreakMin").value) || 15;

// configuração dos botões

startButton.addEventListener("click", function () {
  startButton.disabled = true;
  clearInterval(blinkingInterval);
  blinkingInterval = null;
  document.getElementById("timerResult").style.color = "#4a5a6a";
});

stopButton.addEventListener("click", function () {
  shouldStop = true;
  startButton.disabled = false;
  clearInterval(blinkingInterval);
  blinkingInterval = null;
  document.getElementById("timerResult").style.color = "#4a5a6a";
});

pomodoro.addEventListener("click", function () {
  min = pomodoroMin;
  console.log(min);
  sec = 0;
  let formattedMin = min < 10 ? "0" + min : min;
  let formattedSec = sec < 10 ? "0" + sec : sec;
  document.getElementById("timerResult").innerHTML =
    formattedMin + ":" + formattedSec;
  shortBreak.className = "btn-not-selected";
  longBreak.className = "btn-not-selected";
  pomodoro.className = "btn-selected";
});

shortBreak.addEventListener("click", function () {
  shouldStop = true;
  min = sbreakMin;
  sec = 0;
  let formattedMin = min < 10 ? "0" + min : min;
  let formattedSec = sec < 10 ? "0" + sec : sec;
  document.getElementById("timerResult").innerHTML =
    formattedMin + ":" + formattedSec;
  shortBreak.className = "btn-selected";
  longBreak.className = "btn-not-selected";
  pomodoro.className = "btn-not-selected";
});

longBreak.addEventListener("click", function () {
  shouldStop = true;
  min = lbreakMin;
  sec = 0;
  let formattedMin = min < 10 ? "0" + min : min;
  let formattedSec = sec < 10 ? "0" + sec : sec;
  document.getElementById("timerResult").innerHTML =
    formattedMin + ":" + formattedSec;
  longBreak.className = "btn-selected";
  shortBreak.className = "btn-not-selected";
  pomodoro.className = "btn-not-selected";
});

restart.addEventListener("click", function () {
  min = initialMin;
  sec = initialSec;
  let formattedMin = min < 10 ? "0" + min : min;
  let formattedSec = sec < 10 ? "0" + sec : sec;
  document.getElementById('timerResult').classList.remove('timer-text-alert');
    document.getElementById('timerResult').classList.add('timer-text-normal');
  document.getElementById("timerResult").innerHTML =
    formattedMin + ":" + formattedSec;
  clearInterval(blinkingInterval);
  blinkingInterval = null;
  document.getElementById("timerResult").style.color = "#4a5a6a";
  startButton.disabled = false;
});

// timer

function timer() {
   document.getElementById('timerResult').classList.remove('timer-text-alert');
document.getElementById('timerResult').classList.add('timer-text-normal');
  shouldStop = !shouldStop;
  function updateDisplay(min, sec) {
    let formattedMin = min < 10 ? "0" + min : min;
    let formattedSec = sec < 10 ? "0" + sec : sec;
    document.getElementById("timerResult").innerHTML =
      formattedMin + ":" + formattedSec;
  }

  updateDisplay(min, sec);

  let interval = setInterval(function () {
    if ((min === 0 && sec === 0) || shouldStop) {
      clearInterval(interval);

      if (min === 0 && sec === 0 && !blinkingInterval) {
        alert.play();
        let isRed = false;
        blinkingInterval = setInterval(() => {
    const el = document.getElementById('timerResult');
    el.classList.toggle('timer-text-alert');
}, 1000);
      }

      return;
    }

    if (min === 0 && sec === 0) {
      alert.play();
      startButton.disabled = true;
    }

    if (sec === 0) {
      if (min > 0) {
        min--;
        sec = 59;
      }
    } else {
      sec--;
    }

    updateDisplay(min, sec);
  }, 1000);
}

timer();

// configurações

let settings = document.getElementById("settings");
let displaySettings = document.getElementById("displaysettings");
let settingsDiv = document.getElementById("settingsDiv");
let setChecker = 0;
let _closeCheck = 0;

let apply = document.getElementById("apply");

apply.addEventListener("click", function () {
  pomodoroMin = parseInt(document.getElementById("pomodoroMin").value) || 25;
  sbreakMin = parseInt(document.getElementById("sbreakMin").value) || 5;
  lbreakMin = parseInt(document.getElementById("lbreakMin").value) || 15;

  if (pomodoroMin === 0 || sbreakMin === 0 || lbreakMin === 0) {
    document.getElementById("msg").innerHTML =
      "O valor deve ser diferente ou maior que 0";
    pomodoroMin = 25;
    sbreakMin = 5;
    lbreakMin = 15;
  } else if (pomodoroMin < 0 || sbreakMin < 0 || lbreakMin < 0) {
    document.getElementById("msg").innerHTML =
      "O valor deve ser diferente ou maior que 0.";
    pomodoroMin = 25;
    sbreakMin = 5;
    lbreakMin = 15;
  } else {
    document.getElementById("msg").innerHTML = "Configurações aplicadas!";
  }

  document.getElementById("close").addEventListener("click", function () {
    document.getElementById("msg").innerHTML = "";
  });
  document.getElementById("close2").addEventListener("click", function () {
    document.getElementById("msg").innerHTML = "";
  });

  if (pomodoro.className === "btn-selected") {
    min = pomodoroMin;
  } else if (shortBreak.className === "btn-selected") {
    min = sbreakMin;
  } else if (longBreak.className === "btn-selected") {
    min = lbreakMin;
  }

  sec = 0;
  initialMin = min;
  initialSec = sec;

  let formattedMin = min < 10 ? "0" + min : min;
  let formattedSec = sec < 10 ? "0" + sec : sec;
  document.getElementById("timerResult").innerHTML =
    formattedMin + ":" + formattedSec;
});

// Função para alternar entre light e dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  // Atualizar o ícone e texto do botão
  const modeIcon = document.getElementById("modeIcon");
  if (document.body.classList.contains("dark-mode")) {
    modeIcon.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    modeIcon.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
}

// Verificar preferência salva ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");
  const modeIcon = document.getElementById("modeIcon");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    modeIcon.textContent = "☀️";
  } else {
    modeIcon.textContent = "🌙";
  }

  // Adicionar evento de clique ao botão
  document
    .getElementById("modeToggle")
    .addEventListener("click", toggleDarkMode);
});
