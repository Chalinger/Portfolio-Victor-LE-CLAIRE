// // ============================================
// // CURSOR TRAIL - Traînée de curseur
// // ============================================

// class CursorTrail {
//     constructor() {
//         this.dots = [];
//         this.numDots = 15; // Nombre de points dans la traînée
//         this.mouseX = 0;
//         this.mouseY = 0;
//         this.delay = 0.2; // Délai en secondes
        
//         this.init();
//     }

//     init() {
//         // Créer les éléments de la traînée
//         for (let i = 0; i < this.numDots; i++) {
//             const dot = document.createElement('div');
//             dot.className = 'cursor-trail-dot';
//             document.body.appendChild(dot);
            
//             this.dots.push({
//                 element: dot,
//                 x: 0,
//                 y: 0,
//                 targetX: 0,
//                 targetY: 0
//             });
//         }

//         // Ajouter les styles CSS
//         this.addStyles();

//         // Écouter les mouvements de la souris
//         document.addEventListener('mousemove', (e) => {
//             this.mouseX = e.clientX;
//             this.mouseY = e.clientY;
//         });

//         // Démarrer l'animation
//         this.animate();
//     }

//     addStyles() {
//         const style = document.createElement('style');
//         style.textContent = `
//             .cursor-trail-dot {
//                 position: fixed;
//                 width: 8px;
//                 height: 8px;
//                 background: var(--primary-color, #EE7700);
//                 border-radius: 50%;
//                 pointer-events: none;
//                 z-index: 9999;
//                 opacity: 0;
//                 transition: opacity 0.3s ease;
//                 box-shadow: 0 0 8px var(--primary-color, #EE7700);
//             }

//             .cursor-trail-dot.active {
//                 opacity: 1;
//             }

//             /* Cacher sur mobile et tablette */
//             @media (max-width: 1024px) {
//                 .cursor-trail-dot {
//                     display: none;
//                 }
//             }

//             /* Cacher si l'utilisateur préfère réduire les animations */
//             @media (prefers-reduced-motion: reduce) {
//                 .cursor-trail-dot {
//                     display: none;
//                 }
//             }
//         `;
//         document.head.appendChild(style);
//     }

//     animate() {
//         // Mettre à jour la position du premier point (suit directement la souris)
//         this.dots[0].targetX = this.mouseX;
//         this.dots[0].targetY = this.mouseY;

//         // Chaque point suit le point précédent avec un délai
//         for (let i = 0; i < this.dots.length; i++) {
//             const dot = this.dots[i];
            
//             if (i > 0) {
//                 // Les points suivants suivent le point précédent
//                 const prevDot = this.dots[i - 1];
//                 dot.targetX = prevDot.x;
//                 dot.targetY = prevDot.y;
//             }

//             // Interpolation linéaire avec délai
//             const speed = 0.15 - (i * 0.005); // Vitesse décroissante pour chaque point
//             dot.x += (dot.targetX - dot.x) * speed;
//             dot.y += (dot.targetY - dot.y) * speed;

//             // Appliquer la position
//             dot.element.style.transform = `translate(${dot.x - 4}px, ${dot.y - 4}px)`;
            
//             // Opacité décroissante
//             const opacity = 1 - (i / this.dots.length) * 0.8;
//             dot.element.style.opacity = opacity;

//             // Taille décroissante
//             const size = 8 - (i / this.dots.length) * 4;
//             dot.element.style.width = `${size}px`;
//             dot.element.style.height = `${size}px`;

//             // Activer le point une fois qu'il a bougé
//             if (dot.x !== 0 || dot.y !== 0) {
//                 dot.element.classList.add('active');
//             }
//         }

//         // Continuer l'animation
//         requestAnimationFrame(() => this.animate());
//     }

//     // Méthode pour détruire la traînée (si nécessaire)
//     destroy() {
//         this.dots.forEach(dot => {
//             dot.element.remove();
//         });
//         this.dots = [];
//     }
// }

// // Initialiser la traînée de curseur au chargement de la page
// let cursorTrail;

// document.addEventListener('DOMContentLoaded', () => {
//     // Vérifier si on est sur desktop et que l'utilisateur n'a pas désactivé les animations
//     const isDesktop = window.innerWidth > 1024;
//     const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
//     if (isDesktop && !prefersReducedMotion) {
//         cursorTrail = new CursorTrail();
//     }
// });

// // Optionnel : Permettre d'activer/désactiver la traînée
// window.toggleCursorTrail = function() {
//     if (cursorTrail) {
//         cursorTrail.destroy();
//         cursorTrail = null;
//         console.log('Traînée de curseur désactivée');
//     } else {
//         cursorTrail = new CursorTrail();
//         console.log('Traînée de curseur activée');
//     }
// };



// ============================================
// CURSOR TRAIL - Traînée de curseur (Version Debug)
// ============================================

console.log('🎨 Script cursor-trail chargé !');

// Vérifier la taille de l'écran
const screenWidth = window.innerWidth;
console.log('📏 Largeur écran:', screenWidth);

if (screenWidth <= 1024) {
    console.log('⚠️ Écran trop petit, traînée désactivée');
}

class CursorTrail {
    constructor() {
        console.log('🚀 Initialisation de la traînée...');
        
        this.dots = [];
        this.numDots = 12; // Réduit pour de meilleures performances
        this.mouseX = -100;
        this.mouseY = -100;
        
        this.init();
    }

    init() {
        console.log('✨ Création de', this.numDots, 'points');
        
        // Créer les styles CSS en premier
        this.addStyles();
        
        // Créer les éléments de la traînée
        for (let i = 0; i < this.numDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail-dot';
            dot.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: #EE7700;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-5px, -5px);
                box-shadow: 0 0 10px #EE7700;
            `;
            document.body.appendChild(dot);
            
            this.dots.push({
                element: dot,
                x: -100,
                y: -100,
                currentX: -100,
                currentY: -100
            });
        }

        console.log('✅ Points créés:', this.dots.length);

        // Écouter les mouvements de la souris
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        console.log('👂 Écouteur de souris ajouté');

        // Démarrer l'animation
        this.animate();
        console.log('🎬 Animation démarrée');
    }

    addStyles() {
        // Vérifier si le style existe déjà
        if (document.getElementById('cursor-trail-styles')) {
            console.log('⚠️ Styles déjà présents');
            return;
        }

        const style = document.createElement('style');
        style.id = 'cursor-trail-styles';
        style.textContent = `
            .cursor-trail-dot {
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                transition: opacity 0.3s ease;
            }

            @media (max-width: 1024px) {
                .cursor-trail-dot {
                    display: none !important;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .cursor-trail-dot {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        console.log('💅 Styles CSS ajoutés');
    }

    animate() {
        // Le premier point suit la souris
        this.dots[0].x = this.mouseX;
        this.dots[0].y = this.mouseY;

        // Les autres points suivent le précédent
        for (let i = 0; i < this.dots.length; i++) {
            const dot = this.dots[i];
            
            if (i > 0) {
                const prevDot = this.dots[i - 1];
                dot.x = prevDot.x;
                dot.y = prevDot.y;
            }

            // Interpolation pour le mouvement fluide
            const speed = 0.2 - (i * 0.01);
            dot.currentX += (dot.x - dot.currentX) * speed;
            dot.currentY += (dot.y - dot.currentY) * speed;

            // Appliquer la position
            dot.element.style.left = dot.currentX + 'px';
            dot.element.style.top = dot.currentY + 'px';
            
            // Opacité et taille décroissantes
            const opacity = 1 - (i / this.dots.length) * 0.7;
            const size = 10 - (i / this.dots.length) * 5;
            
            dot.element.style.opacity = opacity;
            dot.element.style.width = size + 'px';
            dot.element.style.height = size + 'px';
            dot.element.style.transform = `translate(-${size/2}px, -${size/2}px)`;
        }

        // Continuer l'animation
        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        console.log('🗑️ Destruction de la traînée');
        this.dots.forEach(dot => {
            dot.element.remove();
        });
        this.dots = [];
    }
}

// Variable globale
let cursorTrail = null;

// Fonction d'initialisation
function initCursorTrail() {
    console.log('🎯 Tentative d\'initialisation...');
    
    const isDesktop = window.innerWidth > 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    console.log('🖥️ Desktop:', isDesktop);
    console.log('♿ Reduced motion:', prefersReducedMotion);
    
    if (isDesktop && !prefersReducedMotion) {
        cursorTrail = new CursorTrail();
        console.log('✅ Traînée initialisée avec succès !');
    } else {
        console.log('❌ Conditions non remplies pour la traînée');
    }
}

// Initialiser au chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursorTrail);
    console.log('⏳ En attente du DOMContentLoaded...');
} else {
    initCursorTrail();
}

// Fonction pour toggle
window.toggleCursorTrail = function() {
    if (cursorTrail) {
        cursorTrail.destroy();
        cursorTrail = null;
        console.log('❌ Traînée désactivée');
    } else {
        cursorTrail = new CursorTrail();
        console.log('✅ Traînée activée');
    }
};

console.log('📦 Script cursor-trail complètement chargé');
console.log('💡 Tapez "toggleCursorTrail()" dans la console pour activer/désactiver');