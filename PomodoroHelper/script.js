let min = 5;
let sec = 1;

var stop = document.getElementById(stop);
var restart = document.getElementById(restart);

document.getElementById('timerResult').innerHTML = min+':00';
const alert = document.getElementById('alert');
function timer() {
    restart.disabled = true;
    stop.disabled = false;

    let timer = setInterval(function () {
        sec--;

        document.getElementById('timerResult').innerHTML = min + ':' + sec;
        console.log(min + ':' + sec);

        if (sec < 10) {
            document.getElementById('timerResult').innerHTML = min + ':0' + sec;
        }

        if (min < 10) {
            document.getElementById('timerResult').innerHTML = '0' + min + ':' + sec;
        }

        if (min < 10 && sec < 10) {
            document.getElementById('timerResult').innerHTML = '0' + min + ':0' + sec;
        }

        if (sec < 1) {
            sec = 60;
            min--;
        }

        if (min < -1) {
            document.getElementById('timerResult').innerHTML = '00:00';
            alert.play();
            id = 0;
        }


    }, 1000);

}

function stopTimer(){
    restart.disabled = false;
    stop.disabled = true;
    clearInterval(timer);
}

stop.addEventListener("click", stopTimer);
restart.addEventListener("click", timer());
stop.disabled = true;
