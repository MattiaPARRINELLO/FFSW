/*
╔═══════════════════════════════════════════════════════════════════════════════════════╗
║                          ANIMATIONS FFSW - VERSION SIMPLIFIÉE                        ║
║                                animations-simple.js                                  ║
║                                                                                       ║
║  Description: Version simplifiée qui n'interfère pas avec le menu hamburger          ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════════════════════════
//                              SMOOTH SCROLL POUR LES ANCRES SEULEMENT
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Gère le scroll fluide vers une ancre spécifique
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
 * Met à jour SEULEMENT le bouton "En savoir plus" pour le smooth scroll
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
        console.log('✅ Bouton smooth scroll configuré');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════════════
//                              ÉCRAN DE CHARGEMENT AVEC LOGO
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Affiche l'écran de chargement avec le logo
 */
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const navbar = document.querySelector('nav');

    console.log('🔍 Recherche de l\'écran de chargement...', loadingScreen);

    if (loadingScreen) {
        loadingScreen.classList.add('active');
        console.log('🔄 Écran de chargement affiché - Classes:', loadingScreen.classList);

        // Réduire le z-index de la navbar pour qu'elle passe derrière
        if (navbar) {
            navbar.style.zIndex = '1000'; // Plus bas que l'écran de chargement (9999)
            console.log('🔒 Navbar mise en arrière-plan (z-index réduit)');
        }

        // Vérifier que le logo est présent
        const logo = loadingScreen.querySelector('.loading-logo');
        console.log('🖼️ Logo trouvé:', logo ? 'OUI' : 'NON');
    } else {
        console.error('❌ Écran de chargement introuvable!');
    }
}

/**
 * Masque l'écran de chargement
 */
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const navbar = document.querySelector('nav');

    if (loadingScreen) {
        loadingScreen.classList.remove('active');
        console.log('✅ Écran de chargement masqué');

        // Remettre le z-index normal de la navbar
        if (navbar) {
            navbar.style.zIndex = ''; // Retour à la valeur CSS par défaut
            console.log('🔓 Navbar remise au premier plan (z-index restauré)');
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════════════
//                              TRANSITIONS ENTRE PAGES (VERSION SIMPLE)
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Gère la transition de sortie avant de naviguer vers une nouvelle page
 */
function navigateWithTransition(targetUrl) {
    console.log('🚀 Début de transition vers:', targetUrl);

    // Afficher l'écran de chargement
    showLoadingScreen();

    // Ajouter la classe de fade out
    document.body.classList.remove('page-loaded');

    // Temps de transition augmenté pour bien voir le logo
    setTimeout(() => {
        console.log('📍 Navigation vers:', targetUrl);
        window.location.href = targetUrl;
    }, 2000); // ← ICI : 2 secondes pour voir le logo
}

/**
 * Configure SEULEMENT les boutons spécifiques (pas les liens du menu)
 */
function setupPageTransitions() {
    // Boutons qui naviguent vers d'autres pages (pas dans le menu mobile)
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
            console.log('✅ Transition configurée pour:', selector);
        }
    });
}

// ═══════════════════════════════════════════════════════════════════════════════════════
//                              ANIMATION DE FADE IN AU CHARGEMENT
// ═══════════════════════════════════════════════════════════════════════════════════════

function setupPageFadeIn() {
    // Cette fonction est maintenant utilisée seulement pour les transitions
    // Attendre plus longtemps avant de masquer l'écran de chargement
    setTimeout(() => {
        // Masquer l'écran de chargement
        hideLoadingScreen();

        // Ajouter la classe pour rendre le body visible avec transition
        document.body.classList.add('page-loaded');

        console.log('✅ Page fade-in appliqué après transition');
    }, 1500); // ← ICI : 1.5 secondes sur la nouvelle page après transition
}

// ═══════════════════════════════════════════════════════════════════════════════════════
//                              INITIALISATION SIMPLE
// ═══════════════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Démarrage animations simples...');

    // D'abord faire le fade-in de la page SANS masquer le logo immédiatement
    document.body.classList.add('page-loaded');
    console.log('✅ Page chargée');

    // PUIS test de l'écran de chargement (après le fade-in)
    setTimeout(() => {
        console.log('🧪 Test de l\'écran de chargement...');
        showLoadingScreen();
        setTimeout(() => {
            hideLoadingScreen();
            console.log('🧪 Test terminé - Logo visible 3 secondes');
        }, 1500); // 3 secondes pour bien voir le logo
    }, 0); // Attendre 1 seconde avant le test

    // Configuration du smooth scroll
    setupSmoothScrollButtons();

    // Configuration des transitions de page (seulement boutons)
    setupPageTransitions();

    console.log('✅ Animations simples initialisées - Menu hamburger non touché');
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
