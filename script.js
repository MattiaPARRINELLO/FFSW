document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');

    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');

        const isOpen = toggleBtn.classList.contains('active');

        if (isOpen) {
            menu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
            menu.classList.add('opacity-100', 'scale-100');
        } else {
            menu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
            menu.classList.remove('opacity-100', 'scale-100');
        }
    });
});
