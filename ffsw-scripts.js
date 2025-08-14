/*
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                        FFSW - SCRIPTS UNIFIÉS                                                 ║
║                                          ffsw-scripts.js                                                      ║
║                                                                                                                 ║
║  Description: Script JavaScript unifié pour toutes les pages FFSW                                             ║
║  Auteur: FFSW Team                                                                                             ║
║  Date de création: 14 août 2025                                                                                ║
║                                                                                                                 ║
║  Fonctionnalités:                                                                                              ║
║  - Gestion universelle du menu hamburger                                                                      ║
║  - Animations au scroll (Intersection Observer)                                                               ║
║  - Détection automatique des éléments à animer                                                                ║
║  - Compatible toutes pages (accueil, membres, partenaires, comités)                                          ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

/* 
═══════════════════════════════════════════════════════════════════════════════════════
                              GESTION UNIVERSELLE DU MENU HAMBURGER
═══════════════════════════════════════════════════════════════════════════════════════
Version complète avec toutes les fonctionnalités UX
*/

class FFSWMenuManager {
    constructor() {
        this.menuToggle = document.getElementById('menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.init();
    }

    init() {
        // Vérification que les éléments existent
        if (!this.menuToggle || !this.mobileMenu) {
            console.warn('FFSW Menu: Éléments menu hamburger introuvables');
            return;
        }

        this.setupMenuToggle();
        this.setupOutsideClickClose();
        this.setupLinkClickClose();
        
        console.log('✅ FFSW Menu Manager initialisé');
    }

    // Gestion de l'ouverture/fermeture du menu
    setupMenuToggle() {
        this.menuToggle.addEventListener('click', () => {
            const isOpen = this.menuToggle.classList.toggle('active');
            this.mobileMenu.classList.toggle('active', isOpen);
        });
    }

    // Fermeture automatique en cliquant à l'extérieur
    setupOutsideClickClose() {
        document.addEventListener('click', (event) => {
            if (!this.menuToggle.contains(event.target) && 
                !this.mobileMenu.contains(event.target)) {
                this.closeMenu();
            }
        });
    }

    // Fermeture automatique en cliquant sur un lien
    setupLinkClickClose() {
        const menuLinks = this.mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }

    // Méthode utilitaire pour fermer le menu
    closeMenu() {
        this.menuToggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
    }
}

/* 
═══════════════════════════════════════════════════════════════════════════════════════
                            ANIMATIONS AU SCROLL UNIVERSELLES
═══════════════════════════════════════════════════════════════════════════════════════
Détection automatique des éléments à animer selon la page
*/

class FFSWScrollAnimations {
    constructor() {
        this.animatableSelectors = [
            '.member-card',     // Pages membres
            '.comite-card',     // Page comités  
            '.partner-card',    // Page partenaires
            '.event-card',      // Page accueil
            '.card'             // Classe générique
        ];
        
        this.init();
    }

    init() {
        // Configuration de l'Intersection Observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.setupAnimations();
        console.log('✅ FFSW Scroll Animations initialisées');
    }

    // Trouve et configure tous les éléments animables
    setupAnimations() {
        this.animatableSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.prepareElement(element);
                this.observer.observe(element);
            });
        });
    }

    // Prépare un élément pour l'animation (état initial)
    prepareElement(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }

    // Anime un élément quand il devient visible
    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
}

/* 
═══════════════════════════════════════════════════════════════════════════════════════
                            DÉTECTION DE PAGE ET FONCTIONNALITÉS SPÉCIFIQUES
═══════════════════════════════════════════════════════════════════════════════════════
*/

class FFSWPageManager {
    constructor() {
        this.currentPage = this.detectCurrentPage();
        this.init();
    }

    // Détecte la page actuelle basée sur l'URL
    detectCurrentPage() {
        const path = window.location.pathname;
        
        if (path.includes('membres')) return 'membres';
        if (path.includes('partenaires')) return 'partenaires';
        if (path.includes('comites')) return 'comites';
        if (path.includes('detail')) return 'detail';
        
        return 'accueil';
    }

    init() {
        console.log(`📄 Page détectée: ${this.currentPage}`);
        
        // Fonctionnalités spécifiques par page
        switch(this.currentPage) {
            case 'membres':
                this.setupMembersPage();
                break;
            case 'comites':
                this.setupComitesPage();
                break;
            case 'partenaires':
                this.setupPartenairesPage();
                break;
            case 'accueil':
                this.setupHomePage();
                break;
        }
    }

    // Fonctionnalités spécifiques page membres
    setupMembersPage() {
        // Gestion des liens vers les détails des membres
        const memberLinks = document.querySelectorAll('.member-link');
        memberLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('Navigation vers détail membre');
            });
        });
    }

    // Fonctionnalités spécifiques page comités
    setupComitesPage() {
        // Animation supplémentaire pour les statistiques
        const stats = document.querySelectorAll('.stat');
        setTimeout(() => {
            stats.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        stat.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            });
        }, 1000);
    }

    // Fonctionnalités spécifiques page partenaires
    setupPartenairesPage() {
        // Effet hover amélioré pour les cartes partenaires
        const partnerCards = document.querySelectorAll('.partner-card');
        partnerCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Fonctionnalités spécifiques page accueil
    setupHomePage() {
        // Gestion du countdown s'il existe
        const countdown = document.querySelector('.countdown');
        if (countdown) {
            console.log('Countdown détecté sur page accueil');
        }
    }
}

/* 
═══════════════════════════════════════════════════════════════════════════════════════
                            INITIALISATION GLOBALE FFSW
═══════════════════════════════════════════════════════════════════════════════════════
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 FFSW Scripts - Initialisation...');
    
    // Initialisation de tous les managers
    const menuManager = new FFSWMenuManager();
    const scrollAnimations = new FFSWScrollAnimations();
    const pageManager = new FFSWPageManager();
    
    console.log('✅ FFSW Scripts - Tous les systèmes opérationnels');
});

/* 
═══════════════════════════════════════════════════════════════════════════════════════
                            UTILITAIRES GLOBAUX FFSW
═══════════════════════════════════════════════════════════════════════════════════════
*/

// Objet global FFSW pour accès externe si nécessaire
window.FFSW = {
    version: '1.0.0',
    
    // Méthodes utilitaires publiques
    closeMenu: () => {
        document.getElementById('menu-toggle')?.classList.remove('active');
        document.getElementById('mobile-menu')?.classList.remove('active');
    },
    
    // Debug info
    getPageInfo: () => {
        return {
            currentPage: window.location.pathname,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
    }
};
