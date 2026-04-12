let contador_transicao = 0;
let carregamento = document.getElementById("carregamento");
let principal = document.getElementById("principal");
let xpaudio = document.getElementById("xpaudio");
let skipbtn = document.getElementById("skipbtn");

setInterval(() => {
  contador_transicao++;
  transicao();
  console.log(contador_transicao);
}, 1000);

function transicao(){
    if(contador_transicao == 13){
    carregamento.style.display = "none";
    principal.style.display = "flex";
    principal.className = "principalnormal";
    xpaudio.play();
}

    skipbtn.addEventListener("click", () => {
      carregamento.style.display = "none";
    principal.style.display = "flex";
    principal.className = "principalnormal";
    xpaudio.play();
    contador_transicao = -999999999; // to prevent the xp audio to play again if the skip button is clicked, not the best way to solve this but it's a way, because 1 billion seconds is 31 years
    });
}