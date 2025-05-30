const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const animationClass = el.dataset.animation || 'animate__fadeIn';
            el.classList.add('animate__animated', animationClass);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animation]').forEach(el => {
});
