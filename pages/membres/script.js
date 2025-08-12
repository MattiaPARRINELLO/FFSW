// Script pour la navbar - menu burger
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            // Toggle de la classe active sur le bouton burger
            menuToggle.classList.toggle('active');

            // Toggle de la classe active sur le menu mobile
            mobileMenu.classList.toggle('active');
        });

        // Fermer le menu si on clique en dehors
        document.addEventListener('click', function (event) {
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // Fermer le menu quand on clique sur un lien
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
});
