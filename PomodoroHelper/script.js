let min = 9;
let sec = 11;
function timer() {

    let click = 0;
    click++;

    if(click === 1) {
        let timer = setInterval(function () {
            sec--; /* Variável de segundos diminui 1 por segundo*/

            if (sec === -1) { /* Quando o número de segundos é igual a -1, ele retorna para 59. Há de ser -1, pois se for 0 ele pula de, por exemplo, 10:01 para 09:59*/
                min--;
                sec = 59;
            }


            if (min < 10) { /* Mostra o resultado e procura a condição correta para cada tipo de situação */
                document.getElementById('timerResult').innerHTML = '0' + min + ':' + sec;
            } else if (sec < 10) {
                document.getElementById('timerResult').innerHTML = min + ':0' + sec;
            } else if (min < 10 && sec < 10) {
                document.getElementById('timerResult').innerHTML = '0' + min + ':0' + sec;
            } else if (min > 10 && sec < 10) {
                document.getElementById('timerResult').innerHTML = min + ':0' + sec;
            }

            if (min === 0 && sec === 0) {
                clearInterval(timer);
                document.getElementById('timerResult').innerHTML = '00:00';
            }
            console.log(min + ':' + sec);


        }, 1000)
    }else if(click > 1){
        document.getElementById('cu')
    }
}