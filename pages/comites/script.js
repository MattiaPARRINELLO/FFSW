/*
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                         FFSW - PAGE COMITÉS                                                   ║
║                                         script.js - Comités                                                   ║
║                                                                                                                 ║
║  Description: Script JavaScript pour la page des comités régionaux                                             ║
║  Auteur: FFSW Team                                                                                             ║
║  Date de création: 2025                                                                                        ║
║  Dernière modification: 13 août 2025                                                                           ║
║                                                                                                                 ║
║  Fonctionnalités:                                                                                              ║
║  - Gestion du menu hamburger avec fermeture automatique                                                       ║
║  - Animations d'apparition des cartes de comités au scroll                                                    ║
║  - Intersection Observer pour optimiser les performances                                                       ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

/* 
═══════════════════════════════════════════════════════════════════════════════════════
                              GESTION DU MENU HAMBURGER
═══════════════════════════════════════════════════════════════════════════════════════
Gestion avancée avec fermeture automatique et gestion des clics extérieurs
*/

document.addEventListener('DOMContentLoaded', function () {
    // Récupération des éléments DOM du menu
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // Vérification de l'existence des éléments avant manipulation
    if (menuToggle && mobileMenu) {

        // ▼ ÉVÉNEMENT PRINCIPAL - Clic sur le bouton burger ▼
        menuToggle.addEventListener('click', function () {
            // Toggle de la classe active sur le bouton burger (animation croix)
            menuToggle.classList.toggle('active');
            // Toggle de la classe active sur le menu mobile (affichage/masquage)
            mobileMenu.classList.toggle('active');
        });

        // ▼ FERMETURE AUTOMATIQUE - Clic en dehors du menu ▼
        document.addEventListener('click', function (event) {
            // Si le clic n'est ni sur le bouton ni dans le menu
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                // Fermer le menu automatiquement
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // ▼ FERMETURE SUR NAVIGATION - Clic sur un lien du menu ▼
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                // Fermer le menu quand l'utilisateur navigue
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
});

/* 
═══════════════════════════════════════════════════════════════════════════════════════
                            ANIMATIONS DES CARTES AU SCROLL
═══════════════════════════════════════════════════════════════════════════════════════
Utilisation d'Intersection Observer pour des animations performantes
*/

document.addEventListener('DOMContentLoaded', function () {

    // ▼ CONFIGURATION DE L'INTERSECTION OBSERVER ▼
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si la carte entre dans la zone visible
            if (entry.isIntersecting) {
                // Animation d'apparition
                entry.target.style.opacity = '1';           // Apparition progressive
                entry.target.style.transform = 'translateY(0)'; // Remontée vers position finale
            }
        });
    }, {
        threshold: 0.1,        // Déclencher quand 10% de l'élément est visible
        rootMargin: '0px 0px -50px 0px'  // Déclencher 50px avant que l'élément soit visible
    });

    // ▼ APPLICATION AUX CARTES DE COMITÉS ▼
    const comiteCards = document.querySelectorAll('.comite-card');
    comiteCards.forEach(card => {
        // État initial de la carte (invisibile et décalée vers le bas)
        card.style.opacity = '0';                    // Invisible
        card.style.transform = 'translateY(20px)';   // Décalée de 20px vers le bas
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Animation fluide

        // Observer la carte pour déclencher l'animation
        observer.observe(card);
    });
});
