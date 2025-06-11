let min = 15;
let sec = 0;
let initialMin = 15;
let initialSec = 0;
let shouldStop = false;
let shortBreak = document.getElementById('shortBreak');
let longBreak = document.getElementById('longBreak');
let pomodoro = document.getElementById('pomodoro');
let pomodoroMin = document.getElementById('pomodoroMin').value ?? "15";
let sbreakMin = document.getElementById('sbreakMin').value ?? "5";
let lbreakMin = document.getElementById('lbreakMin').value ?? "15";

const alert = document.getElementById('alert');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const restart = document.getElementById('restart');

pomodoroMin = parseInt(document.getElementById('pomodoroMin').value) || 15;
sbreakMin = parseInt(document.getElementById('sbreakMin').value) || 5;
lbreakMin = parseInt(document.getElementById('lbreakMin').value) || 15;

startButton.addEventListener('click', function () {
    startButton.disabled = true;
})

stopButton.addEventListener('click', function () {
    shouldStop = true;
    startButton.disabled = false;
});

pomodoro.addEventListener('click', function () {
    min = pomodoroMin;
    console.log(min);
    sec = 0;
    let formattedMin = min < 10 ? '0' + min : min;
    let formattedSec = sec < 10 ? '0' + sec : sec;
    document.getElementById('timerResult').innerHTML = formattedMin + ':' + formattedSec;
    shortBreak.className = 'btn-not-selected';
    longBreak.className = 'btn-not-selected'
    pomodoro.className = 'btn-selected';
});

shortBreak.addEventListener('click', function () {
    shouldStop = true;
    min = sbreakMin;
    sec = 0;
    let formattedMin = min < 10 ? '0' + min : min;
    let formattedSec = sec < 10 ? '0' + sec : sec;
    document.getElementById('timerResult').innerHTML = formattedMin + ':' + formattedSec;
    shortBreak.className = 'btn-selected';
    longBreak.className = 'btn-not-selected'
    pomodoro.className = 'btn-not-selected';
});

longBreak.addEventListener('click', function () {
    shouldStop = true;
    min = lbreakMin;
    sec = 0;
    let formattedMin = min < 10 ? '0' + min : min;
    let formattedSec = sec < 10 ? '0' + sec : sec;
    document.getElementById('timerResult').innerHTML = formattedMin + ':' + formattedSec;
    longBreak.className = 'btn-selected';
    shortBreak.className = 'btn-not-selected'
    pomodoro.className = 'btn-not-selected';
});

restart.addEventListener('click', function () {
    min = initialMin;
    sec = initialSec;
    let formattedMin = min < 10 ? '0' + min : min;
        let formattedSec = sec < 10 ? '0' + sec : sec;
        document.getElementById('timerResult').innerHTML = formattedMin + ':' + formattedSec;
})

function timer() {
    shouldStop = !shouldStop;
    function updateDisplay(min, sec) {
        let formattedMin = min < 10 ? '0' + min : min;
        let formattedSec = sec < 10 ? '0' + sec : sec;
        document.getElementById('timerResult').innerHTML = formattedMin + ':' + formattedSec;
    }

    updateDisplay(min, sec);

    let interval = setInterval(function () {
        if ((min === 0 && sec === 0) || shouldStop) {
            clearInterval(interval);
            return;
        }

        if(min === 0 && sec === 0){
            alert.play();
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

let settings = document.getElementById('settings');
let displaySettings = document.getElementById('displaysettings');
let settingsDiv = document.getElementById('settingsDiv');
let setChecker = 0;

settings.addEventListener('click', function () {
    setChecker++;
    if (setChecker === 1) {
        displaySettings.style.display = 'block';
        requestAnimationFrame(() => {
            settingsDiv.style.height = '100dvh';
        });
    } else if (setChecker === 2) {
        settingsDiv.style.height = '0';
        settingsDiv.addEventListener('transitionend', function handler() {
            displaySettings.style.display = 'none';
            settingsDiv.removeEventListener('transitionend', handler);
        });
        setChecker = 0;
    }
});

let apply = document.getElementById('apply');

apply.addEventListener('click', function () {
    pomodoroMin = parseInt(document.getElementById('pomodoroMin').value) || 15;
    sbreakMin = parseInt(document.getElementById('sbreakMin').value) || 5;
    lbreakMin = parseInt(document.getElementById('lbreakMin').value) || 15;

    if(pomodoroMin === 0 || sbreakMin === 0 || lbreakMin === 0){
        document.getElementById('msg').innerHTML = "O valor deve ser diferente de 0.";
        pomodoroMin = 15;
        sbreakMin = 5;
        lbreakMin = 15;
    }else{
        document.getElementById('msg').innerHTML = " ";
    }

    if (pomodoro.className === 'btn-selected') {
        min = pomodoroMin;
    } else if (shortBreak.className === 'btn-selected') {
        min = sbreakMin;
    } else if (longBreak.className === 'btn-selected') {
        min = lbreakMin;
    }

    sec = 0;
    initialMin = min;
    initialSec = sec;

    let formattedMin = min < 10 ? '0' + min : min;
    let formattedSec = sec < 10 ? '0' + sec : sec;
    document.getElementById('timerResult').innerHTML = formattedMin + ':' + formattedSec;
});