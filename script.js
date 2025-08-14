/*
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                           FFSW - SCRIPT PRINCIPAL                                              ║
║                                         Page d'accueil - script.js                                            ║
║                                                                                                                 ║
║  Description: Script JavaScript principal pour la gestion du menu hamburger                                    ║
║  Auteur: FFSW Team                                                                                             ║
║  Date de création: 2025                                                                                        ║
║  Dernière modification: 13 août 2025                                                                           ║
║                                                                                                                 ║
║  Fonctionnalités:                                                                                              ║
║  - Gestion du menu hamburger (ouverture/fermeture)                                                            ║
║  - Animation du bouton burger (transformation en croix)                                                        ║
║  - Gestion des classes CSS pour l'affichage du menu                                                           ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {

    /* 
    ═══════════════════════════════════════════════════════════════════════════════════════
                              GESTION DU MENU HAMBURGER
    ═══════════════════════════════════════════════════════════════════════════════════════
    Récupération des éléments DOM et gestion des événements de clic
    */

    // Récupération des éléments DOM
    const toggleBtn = document.getElementById('menu-toggle');  // Bouton hamburger
    const menu = document.getElementById('mobile-menu');       // Menu déroulant

    // Gestionnaire d'événement pour le clic sur le bouton menu
    toggleBtn.addEventListener('click', () => {

        /* 
        Toggle de la classe 'active' sur le bouton et récupération de l'état
        - Si 'active' est ajouté : retourne true (menu ouvert)
        - Si 'active' est supprimé : retourne false (menu fermé)
        */
        const isOpen = toggleBtn.classList.toggle('active');

        /* 
        Application conditionnelle de la classe 'active' sur le menu
        - Si isOpen = true : ajoute la classe 'active' (menu visible)
        - Si isOpen = false : supprime la classe 'active' (menu masqué)
        */
        menu.classList.toggle('active', isOpen);

        /* 
        NOTES TECHNIQUES :
        - La classe 'active' sur toggleBtn déclenche l'animation croix (CSS)
        - La classe 'active' sur menu déclenche l'affichage du dropdown (CSS)
        - Les animations sont gérées entièrement par les transitions CSS
        */
    });
});
