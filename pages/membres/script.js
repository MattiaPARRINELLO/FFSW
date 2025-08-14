/*
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                         FFSW - PAGE MEMBRES                                                   ║
║                                         script.js - Membres                                                   ║
║                                                                                                                 ║
║  Description: Script JavaScript pour la page des membres FFSW                                                  ║
║  Auteur: FFSW Team                                                                                             ║
║  Date de création: 2025                                                                                        ║
║  Dernière modification: 13 août 2025                                                                           ║
║                                                                                                                 ║
║  Fonctionnalités:                                                                                              ║
║  - Gestion complète du menu hamburger                                                                          ║
║  - Fermeture automatique intelligent                                                                           ║
║  - UX optimisée pour la navigation                                                                             ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

/* 
═══════════════════════════════════════════════════════════════════════════════════════
                          GESTION AVANCÉE DU MENU HAMBURGER
═══════════════════════════════════════════════════════════════════════════════════════
Script avec gestion d'événements multiples pour une UX optimale
*/

document.addEventListener('DOMContentLoaded', function () {
    // Récupération des éléments DOM critiques
    const menuToggle = document.getElementById('menu-toggle');  // Bouton hamburger
    const mobileMenu = document.getElementById('mobile-menu');  // Menu déroulant

    // Protection contre les erreurs si les éléments n'existent pas
    if (menuToggle && mobileMenu) {

        /* 
        ▼ GESTIONNAIRE PRINCIPAL - Ouverture/Fermeture du menu ▼
        Gère le toggle des classes CSS pour l'animation et l'affichage
        */
        menuToggle.addEventListener('click', function () {
            // Animation du bouton : lignes → croix
            menuToggle.classList.toggle('active');
            // Affichage du menu : masqué ↔ visible
            mobileMenu.classList.toggle('active');
        });

        /* 
        ▼ FERMETURE INTELLIGENTE - Clic à l'extérieur du menu ▼
        Améliore l'UX en fermant automatiquement le menu
        */
        document.addEventListener('click', function (event) {
            // Vérifier si le clic est en dehors du menu ET du bouton
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                // Restaurer l'état fermé
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        /* 
        ▼ FERMETURE SUR NAVIGATION - Clic sur lien de menu ▼
        Ferme automatiquement le menu quand l'utilisateur navigue
        */
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                // Fermer le menu immédiatement pour navigation fluide
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    /* 
    ═══════════════════════════════════════════════════════════════════════════════════════
    NOTE TECHNIQUE :
    Ce script utilise le pattern "Progressive Enhancement" :
    - Fonctionne même si certains éléments DOM sont manquants
    - Gestion d'erreurs implicite avec les vérifications if()
    - Compatible avec tous les navigateurs modernes
    ═══════════════════════════════════════════════════════════════════════════════════════
    */
});
