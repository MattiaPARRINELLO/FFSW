document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');

    toggleBtn.addEventListener('click', () => {
        const isOpen = toggleBtn.classList.toggle('active');
        menu.classList.toggle('active', isOpen);
    });
});
