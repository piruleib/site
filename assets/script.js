// Inicializar ScrollReveal
ScrollReveal().reveal('.animated-text', {
  duration: 1000,
  distance: '20px',
  easing: 'ease-out',
  origin: 'bottom',
  interval: 200
});

ScrollReveal().reveal('.abouttext, #imgabout', {
  duration: 1000,
  distance: '50px',
  easing: 'ease-out',
  origin: 'bottom',
  interval: 200
});

ScrollReveal().reveal('.linguagens li', {
  duration: 800,
  distance: '30px',
  easing: 'ease-out',
  origin: 'bottom',
  interval: 150
});

ScrollReveal().reveal('.pomodoro, .pervias', {
  duration: 1000,
  distance: '40px',
  easing: 'ease-out',
  origin: 'bottom',
  interval: 200
});

// Adicionar classe animated-text aos elementos de texto
document.addEventListener('DOMContentLoaded', function() {
  const textElements = document.querySelectorAll('.text h1, .text h3');
  textElements.forEach(element => {
    element.classList.add('animated-text');
  });
});

// Botão seta para baixo
document.getElementById('setabaixo').addEventListener('click', function() {
  document.getElementById('aboutme').scrollIntoView({ 
    behavior: 'smooth' 
  });
});