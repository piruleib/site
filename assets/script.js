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

// Melhorias para mobile
function handleMobileMenu() {
  const header = document.querySelector('header');
  const menu2 = document.querySelector('.menu2');
  
  if (window.innerWidth <= 768) {
    // Adicionar menu hamburger para mobile
    if (!document.querySelector('.menu-toggle')) {
      const menuToggle = document.createElement('button');
      menuToggle.className = 'menu-toggle';
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      menuToggle.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
      `;
      
      header.appendChild(menuToggle);
      
      // Estilos para o menu mobile
      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 768px) {
          .menu-toggle {
            display: block !important;
          }
          
          .menu2 ul {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(34, 40, 49, 0.98);
            flex-direction: column;
            padding: 20px;
            gap: 15px;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 99;
          }
          
          .menu2 ul.active {
            transform: translateY(0);
            opacity: 1;
          }
          
          .menu2 ul li {
            width: 100%;
            text-align: center;
          }
          
          .menu2 ul li a {
            display: block;
            padding: 10px;
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 480px) {
          .menu2 ul {
            top: 60px;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Toggle do menu
      menuToggle.addEventListener('click', function() {
        menu2.querySelector('ul').classList.toggle('active');
        this.innerHTML = menu2.querySelector('ul').classList.contains('active') 
          ? '<i class="fas fa-times"></i>' 
          : '<i class="fas fa-bars"></i>';
      });
      
      // Fechar menu ao clicar em um link
      menu2.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          menu2.querySelector('ul').classList.remove('active');
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
      });
    }
  }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  handleMobileMenu();
  window.addEventListener('resize', handleMobileMenu);
});

// Smooth scroll melhorado para mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = window.innerWidth <= 768 ? 70 : 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});