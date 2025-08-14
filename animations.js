/*
╔═══════════════════════════════════════════════════════════════════════════════════════╗
║                                 ANIMATIONS FFSW                                      ║
║                                 animations.js                                        ║
║                                                                                       ║
║  Description: Gestion des animations de scroll fluide et transitions de page         ║
║  Auteur: FFSW Team                                                                    ║
║  Date de création: 13 août 2025                                                      ║
║                                                                                       ║
║  Fonctionnalités:                                                                    ║
║  - Smooth scroll pour les ancres internes                                           ║
║  - Transitions fluides entre les pages                                              ║
║  - Animations de fade in/out                                                        ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════════════════════════
//                              SMOOTH SCROLL POUR LES ANCRES
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Gère le scroll fluide vers une ancre spécifique
 * @param {string} targetId - ID de l'élément cible (sans le #)
 */
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }
}

/**
 * Met à jour les boutons pour utiliser le smooth scroll au lieu de la redirection directe
 */
function setupSmoothScrollButtons() {
    // Bouton "En savoir plus" vers la section #whoweare
    const heroButton = document.querySelector('button[onclick*="#whoweare"]');
    if (heroButton) {
        heroButton.removeAttribute('onclick');
        heroButton.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollTo('whoweare');
        });
    }

    // Liens dans le menu mobile vers #contact
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollTo('contact');
            // Fermer le menu mobile si ouvert
            closeMobileMenu();
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════════════
//                              TRANSITIONS ENTRE PAGES
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Gère la transition de sortie avant de naviguer vers une nouvelle page
 * @param {string} targetUrl - URL de destination
 */
function navigateWithTransition(targetUrl) {
    // Ajouter la classe de fade out
    document.body.classList.add('page-fade-out');

    // Attendre la fin de l'animation puis naviguer
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 400); // Durée de l'animation (--page-transition-duration)
}

/**
 * Met à jour tous les boutons de navigation pour utiliser les transitions
 */
function setupPageTransitions() {
    // Boutons qui naviguent vers d'autres pages
    const pageButtons = [
        { selector: 'button[onclick*="comites/index.html"]', url: 'pages/comites/index.html' },
        { selector: 'button[onclick*="partenaires/index.html"]', url: 'pages/partenaires/index.html' },
        { selector: 'button[onclick*="membres/index.html"]', url: 'pages/membres/index.html' }
    ];

    pageButtons.forEach(({ selector, url }) => {
        const button = document.querySelector(selector);
        if (button) {
            button.removeAttribute('onclick');
            button.addEventListener('click', function (e) {
                e.preventDefault();
                navigateWithTransition(url);
            });
        }
    });

    // Liens dans le menu de navigation (exclure le menu mobile pour éviter les conflits)
    const navLinks = document.querySelectorAll('a[href*=".html"]:not([href="#"]):not(#mobile-menu a)');
    navLinks.forEach(link => {
        // Exclure les liens du menu mobile, les liens externes et les ancres
        const isInMobileMenu = link.closest('#mobile-menu');
        if (!isInMobileMenu && link.href.includes(window.location.origin) && !link.href.includes('#')) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetUrl = this.getAttribute('href');
                navigateWithTransition(targetUrl);
            });
        }
    });
}

/**
 * Configure les liens du menu mobile avec transitions
 */
function setupMobileMenuTransitions() {
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a[href*=".html"]:not([href="#"])');
    console.log('🔍 Liens du menu mobile trouvés:', mobileMenuLinks.length);

    mobileMenuLinks.forEach(link => {
        if (link.href.includes(window.location.origin) && !link.href.includes('#')) {
            link.addEventListener('click', function (e) {
                console.log('🖱️ Clic sur lien menu mobile:', this.href);
                e.preventDefault();
                const targetUrl = this.getAttribute('href');

                // Fermer le menu mobile avant la transition
                closeMobileMenu();

                // Petite pause pour laisser le menu se fermer, puis naviguer
                setTimeout(() => {
                    navigateWithTransition(targetUrl);
                }, 150);
            });
        }
    });
}

/**
 * Fonction pour fermer le menu mobile (si elle existe)
 */
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const burgerIcon = document.getElementById('menu-toggle'); // Correction du nom de l'ID

    if (mobileMenu && burgerIcon) {
        mobileMenu.classList.remove('active');
        burgerIcon.classList.remove('active');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════════════
//                              ANIMATION DE FADE IN AU CHARGEMENT
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Gère l'animation de fade in au chargement de la page
 */
function setupPageFadeIn() {
    document.body.classList.add('page-fade-in');

    // Retirer la classe après l'animation
    setTimeout(() => {
        document.body.classList.remove('page-fade-in');
        document.body.classList.add('page-transition');
    }, 400);
}

// ═══════════════════════════════════════════════════════════════════════════════════════
//                              INITIALISATION
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Initialise toutes les animations quand le DOM est chargé
 */
document.addEventListener('DOMContentLoaded', function () {
    // Animation de fade in au chargement
    setupPageFadeIn();

    // Petite pause pour laisser script.js s'initialiser complètement
    setTimeout(() => {
        // Configuration du smooth scroll
        setupSmoothScrollButtons();

        // Configuration des transitions entre pages
        setupPageTransitions();

        // Configuration des transitions du menu mobile
        setupMobileMenuTransitions();

        console.log('✅ Animations FFSW initialisées');
    }, 100); // Délai de 100ms
});

// ═══════════════════════════════════════════════════════════════════════════════════════
//                              GESTION DU BOUTON RETOUR DU NAVIGATEUR
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Gère l'animation de fade in quand l'utilisateur utilise le bouton retour
 */
window.addEventListener('pageshow', function (event) {
    // Si la page est chargée depuis le cache (bouton retour)
    if (event.persisted) {
        setupPageFadeIn();
    }
});
