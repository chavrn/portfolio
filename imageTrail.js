/* ============================================================
   AULNE STUDIO — ImageTrail.js
   Traînée d'images au survol de la zone hero (index.html)
   Utilise GSAP (déjà chargé dans la page).
   ============================================================ */

(function () {

    /* ----------------------------------------------------------
       LISTE DES IMAGES
       Toutes les cover depuis ressources/projets/
    ---------------------------------------------------------- */
    const TRAIL_IMAGES = [
        "cover_26carnavalOrsières.png",
        "cover_etoileBlanche-menuBoisson.png",
        "cover_etoileBlanche-sousverre.png",
        "cover_etoileBlanche-tshirt.png",
        "cover_curia.png",
        "cover_medze-carotte.png",
        "cover_medze-etiquette.png",
        "cover_medze-insta.png",
        "cover_medze-paquet.png",
        "cover_narutaQuest-activity.png",
        "cover_narutaQuest-activityChoix.png",
        "cover_narutaQuest-base.png",
        "cover_narutaQuest-classement.png",
        "cover_rjv-affiche.png",
        "cover_rjv-logo.png",
        "cover_rjv-photo1.png",
        "cover_ambigramme-marina.png",
        "cover_ambigramme-niepce.png",
        "cover_altea-logo.png",
        "cover_yearbook-rob.png",
        "cover_yearbook-texte.png",
        "cover_25carnavalOrsières.png",
        "cover_zygomatique-poster.png",
        "cover_zygomatique-pot.png",
        "cover_osika.png",
        "cover_24carnavalOrsières.png",
        "24_noPlanetB.png",
        "cover_wovement-affiche.png",
        "cover_wovement-mockup.png",
        "cover_bal20.png",
    ];

    /* ----------------------------------------------------------
       CONFIG
    ---------------------------------------------------------- */
    const CONFIG = {
        imageCount:    12,      // nb d'images simultanées dans le pool
        imgWidth:      180,     // px — largeur de chaque vignette
        imgHeight:     180,     // px — hauteur de chaque vignette
        triggerDist:   80,      // px — distance min entre deux apparitions
        fadeInDur:     0.35,    // s — durée d'entrée
        fadeOutDelay:  0.55,    // s — délai avant disparition
        fadeOutDur:    0.5,     // s — durée de disparition
        rotRange:      12,      // deg — amplitude de rotation aléatoire
        scaleFrom:     0.7,     // échelle de départ
        scaleTo:       1.0,     // échelle d'arrivée
        zoneSelector:  '.home-trail-zone', // zone déclenchante
    };

    /* ----------------------------------------------------------
       INIT — attend que le DOM + GSAP soient prêts
    ---------------------------------------------------------- */
    function init() {
        if (typeof gsap === 'undefined') {
            // GSAP pas encore chargé (defer) → réessayer
            setTimeout(init, 100);
            return;
        }

        const zone = document.querySelector(CONFIG.zoneSelector);
        if (!zone) return; // page sans zone trail

        /* Pool d'éléments img pré-créés */
        const pool = buildPool(zone);

        let currentIndex = 0;
        let lastX = -9999;
        let lastY = -9999;
        let imgSequence = 0; // index cyclique dans TRAIL_IMAGES

        zone.addEventListener('mousemove', (e) => {
            const rect = zone.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const dx = x - lastX;
            const dy = y - lastY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONFIG.triggerDist) return;

            lastX = x;
            lastY = y;

            const el = pool[currentIndex % CONFIG.imageCount];
            currentIndex++;
            showImage(el, x, y, imgSequence % TRAIL_IMAGES.length);
            imgSequence++;
        });

        /* Optionnel : masquer toutes les images quand la souris quitte la zone */
        zone.addEventListener('mouseleave', () => {
            pool.forEach(el => {
                gsap.killTweensOf(el);
                gsap.set(el, { autoAlpha: 0 });
            });
            lastX = -9999;
            lastY = -9999;
        });
    }

    /* ----------------------------------------------------------
       Construire le pool de <img> dans la zone
    ---------------------------------------------------------- */
    function buildPool(zone) {
        /* La zone doit être position:relative ou absolute */
        const pool = [];

        for (let i = 0; i < CONFIG.imageCount; i++) {
            const img = document.createElement('img');
            img.className = 'trail-img';
            img.setAttribute('aria-hidden', 'true');
            img.setAttribute('draggable', 'false');

            // Style inline de base
            Object.assign(img.style, {
                position:      'absolute',
                width:         CONFIG.imgWidth  + 'px',
                height:        CONFIG.imgHeight + 'px',
                objectFit:     'cover',
                pointerEvents: 'none',
                userSelect:    'none',
                visibility:    'hidden',
                opacity:       '0',
                zIndex:        '10',
                borderRadius:  '2px',
                willChange:    'transform, opacity',
            });

            zone.appendChild(img);
            pool.push(img);
        }

        return pool;
    }

    /* ----------------------------------------------------------
       Animer une image à la position (x, y)
    ---------------------------------------------------------- */
    function showImage(el, x, y, imgIdx) {
        // Charger la bonne image (lazy)
        const src = 'ressources/projets/' + TRAIL_IMAGES[imgIdx];
        if (el.getAttribute('src') !== src) el.src = src;

        // Rotation aléatoire légère
        const rot = (Math.random() - 0.5) * 2 * CONFIG.rotRange;

        // Centrer l'image sur le curseur
        const left = x - CONFIG.imgWidth  / 2;
        const top  = y - CONFIG.imgHeight / 2;

        // Tuer les tweens précédents sur cet élément
        gsap.killTweensOf(el);

        // Positionner instantanément
        gsap.set(el, {
            left,
            top,
            rotation: rot,
            scale:    CONFIG.scaleFrom,
            autoAlpha: 0,
            zIndex:   10 + (imgIdx % 20),
        });

        // Entrée
        gsap.to(el, {
            autoAlpha:  1,
            scale:      CONFIG.scaleTo,
            duration:   CONFIG.fadeInDur,
            ease:       'power3.out',
            // Sortie enchaînée
            onComplete: () => {
                gsap.to(el, {
                    autoAlpha:  0,
                    scale:      CONFIG.scaleTo + 0.05,
                    duration:   CONFIG.fadeOutDur,
                    delay:      CONFIG.fadeOutDelay,
                    ease:       'power2.in',
                });
            }
        });
    }

    /* ----------------------------------------------------------
       Lancement
    ---------------------------------------------------------- */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
