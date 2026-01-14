// Sélectionner tous les liens du menu
const menuLinks = document.querySelectorAll('#menu-bar_main-links a');

// Fonction pour mettre à jour l'état actif
function updateActiveLink(targetId) {
    menuLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');

        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Ajouter un écouteur sur chaque lien
menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        updateActiveLink(targetId);
    });
});

// Intersection Observer pour détecter la section active lors du scroll
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = `#${entry.target.getAttribute('id')}`;
            updateActiveLink(id);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);


});


// Gestion du tri des projets
document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.getElementById('works_filter');
    const filterText = filterButton.querySelector('span');
    const worksList = document.getElementById('works_list');

    // État du tri (true = plus récent, false = plus ancien)
    let isNewestFirst = true;

    filterButton.addEventListener('click', () => {
        // Inverser l'ordre
        isNewestFirst = !isNewestFirst;

        // Mettre à jour le texte du bouton
        filterText.textContent = isNewestFirst ? 'Plus récent' : 'Plus ancien';

        // Récupérer tous les articles de projet et les séparateurs
        const items = Array.from(worksList.children);

        // Séparer les articles des séparateurs <hr>
        const articles = items.filter(item => item.tagName === 'ARTICLE');
        const hrs = items.filter(item => item.tagName === 'HR');

        // Trier les articles par date
        articles.sort((a, b) => {
            const dateA = new Date(a.querySelector('time').getAttribute('datetime'));
            const dateB = new Date(b.querySelector('time').getAttribute('datetime'));

            return isNewestFirst ? dateB - dateA : dateA - dateB;
        });

        // Vider la liste
        worksList.innerHTML = '';

        // Reconstruire la liste avec les articles triés et les séparateurs
        articles.forEach((article, index) => {
            worksList.appendChild(hrs[index]); // Ajouter le <hr> avant l'article
            worksList.appendChild(article);
        });
    });
});

// Validation de formulaire améliorée
const contactForm = document.querySelector('#contact form');

if (contactForm) {
    const emailInput = contactForm.querySelector('#mail');
    const objectInput = contactForm.querySelector('#object');
    const contentInput = contactForm.querySelector('#content');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        // Validation email
        if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            isValid = false;
            emailInput.setCustomValidity('Veuillez entrer une adresse email valide');
        } else {
            emailInput.setCustomValidity('');
        }

        // Validation objet
        if (objectInput.value.trim().length < 3) {
            isValid = false;
            objectInput.setCustomValidity('L\'objet doit contenir au moins 3 caractères');
        } else {
            objectInput.setCustomValidity('');
        }

        // Validation contenu
        if (contentInput.value.trim().length < 10) {
            isValid = false;
            contentInput.setCustomValidity('Le message doit contenir au moins 10 caractères');
        } else {
            contentInput.setCustomValidity('');
        }

        if (isValid) {
            // Simuler l'envoi (remplacer par votre logique d'envoi réelle)
            console.log('Formulaire soumis:', {
                email: emailInput.value,
                object: objectInput.value,
                content: contentInput.value
            });

            // Afficher un message de succès
            alert('Message envoyé avec succès ! Je vous répondrai dès que possible.');
            contactForm.reset();
        } else {
            // Afficher les erreurs
            contactForm.reportValidity();
        }
    });

    // Retirer les messages d'erreur lors de la saisie
    [emailInput, objectInput, contentInput].forEach(input => {
        input.addEventListener('input', function () {
            this.setCustomValidity('');
        });
    });
}

// Animation au scroll pour les éléments
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .about_skills_card, .testimonials_card');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(element);
    });
};

// Initialiser les animations au chargement
document.addEventListener('DOMContentLoaded', animateOnScroll);

const timelineContainer = document.getElementById('about_experience_timeline-wrapper');

container.addEventListener('wheel', (e) => {
    e.preventDefault();
    container.scrollLeft += e.deltaY;
});

// ============================================
// TIMELINE EXPERIENCE - Interactions
// À ajouter dans script.js
// ============================================

// Fonction d'initialisation de la timeline
function initTimeline() {
    const timelineContainer = document.querySelector('#about_experience_main-container');
    const progressFill = document.querySelector('.timeline-progress-fill');
    const progressText = document.querySelector('.timeline-progress-text');

    if (!timelineContainer) return;

    // ==========================================
    // MISE À JOUR DE LA BARRE DE PROGRESSION
    // ==========================================
    timelineContainer.addEventListener('scroll', function () {
        const scrollLeft = timelineContainer.scrollLeft;
        const scrollWidth = timelineContainer.scrollWidth - timelineContainer.clientWidth;
        const percentage = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;

        if (progressFill) {
            progressFill.style.width = percentage + '%';
        }
        if (progressText) {
            progressText.textContent = Math.round(percentage) + '% exploré';
        }
    });

    // ==========================================
    // CENTRER SUR L'ITEM ACTIF AU CHARGEMENT
    // ==========================================
    setTimeout(() => {
        const activeCard = document.querySelector('.about_experience_timeline-card.active');
        if (activeCard) {
            const cardRect = activeCard.getBoundingClientRect();
            const containerRect = timelineContainer.getBoundingClientRect();
            const scrollTo = activeCard.offsetLeft - (containerRect.width / 2) + (cardRect.width / 2);

            timelineContainer.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    }, 100);

    // ==========================================
    // INTERACTION AU CLIC SUR LES CARTES
    // ==========================================
    const timelineCards = document.querySelectorAll('.about_experience_timeline-card');

    timelineCards.forEach(card => {
        card.addEventListener('click', function () {
            // Retirer la classe active de toutes les cartes
            timelineCards.forEach(c => c.classList.remove('active'));

            // Ajouter la classe active à la carte cliquée
            this.classList.add('active');

            // Centrer sur cette carte
            const cardRect = this.getBoundingClientRect();
            const containerRect = timelineContainer.getBoundingClientRect();
            const scrollTo = this.offsetLeft - (containerRect.width / 2) + (cardRect.width / 2);

            timelineContainer.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        });

        // Effet hover sur les dots
        const dot = card.querySelector('.timeline-dot');
        if (dot) {
            dot.addEventListener('mouseenter', function () {
                if (!card.classList.contains('active')) {
                    this.style.transform = 'scale(1.1)';
                    this.style.borderColor = 'rgba(238, 119, 0, 0.6)';
                }
            });

            dot.addEventListener('mouseleave', function () {
                if (!card.classList.contains('active')) {
                    this.style.transform = 'scale(1)';
                    this.style.borderColor = 'rgba(238, 119, 0, 0.3)';
                }
            });
        }
    });

    // ==========================================
    // NAVIGATION AU CLAVIER
    // ==========================================
    timelineContainer.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.scrollBy({
                left: -280,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.scrollBy({
                left: 280,
                behavior: 'smooth'
            });
        }
    });

    // Rendre le container focusable pour la navigation clavier
    timelineContainer.setAttribute('tabindex', '0');
}

// ==========================================
// INITIALISATION
// ==========================================
// Ajouter cette fonction à l'écouteur DOMContentLoaded existant
document.addEventListener('DOMContentLoaded', function () {
    // ... votre code existant ...

    // Initialiser la timeline
    initTimeline();
});