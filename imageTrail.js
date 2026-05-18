/* ============================================================
   AULNE STUDIO — ImageTrail.js
   Traînée d'images au survol de la zone hero (index.html)
   Utilise GSAP (déjà chargé dans la page).
   ============================================================ */

(function () {

    /* ----------------------------------------------------------
       LISTE DES IMAGES
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

    const CONFIG = {
        imageCount:       12,
        imgWidth:         180,
        imgHeight:        180,
        triggerDistSq:    80 * 80,  // comparaison sans Math.sqrt
        fadeInDur:        0.35,
        fadeOutDelay:     0.55,
        fadeOutDur:       0.5,
        rotRange:         12,
        scaleFrom:        0.7,
        scaleTo:          1.0,
        zoneSelector:     '.home-trail-zone',
    };

    /* ----------------------------------------------------------
       Préchargement — remplit le cache navigateur avant affichage
    ---------------------------------------------------------- */
    function preloadImages() {
        TRAIL_IMAGES.forEach(name => {
            const img = new Image();
            img.src = 'ressources/projets/' + name;
        });
    }

    /* ----------------------------------------------------------
       INIT
    ---------------------------------------------------------- */
    function init() {
        if (typeof gsap === 'undefined') {
            setTimeout(init, 100);
            return;
        }

        const zone = document.querySelector(CONFIG.zoneSelector);
        if (!zone) return;

        preloadImages();

        const pool = buildPool(zone);

        let currentIndex = 0;
        let lastX = -9999;
        let lastY = -9999;
        let imgSequence = 0;

        // Rect mis en cache — recalculé seulement au resize/scroll
        let zoneRect = zone.getBoundingClientRect();
        const refreshRect = () => { zoneRect = zone.getBoundingClientRect(); };
        window.addEventListener('resize', refreshRect, { passive: true });
        window.addEventListener('scroll', refreshRect, { passive: true });

        // RAF throttle — un seul traitement par frame
        let rafId = null;
        let pendingX = 0, pendingY = 0;

        zone.addEventListener('mousemove', (e) => {
            pendingX = e.clientX - zoneRect.left;
            pendingY = e.clientY - zoneRect.top;
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                const dx = pendingX - lastX;
                const dy = pendingY - lastY;
                if (dx * dx + dy * dy < CONFIG.triggerDistSq) return;
                lastX = pendingX;
                lastY = pendingY;
                const el = pool[currentIndex % CONFIG.imageCount];
                currentIndex++;
                showImage(el, pendingX, pendingY, imgSequence % TRAIL_IMAGES.length);
                imgSequence++;
            });
        }, { passive: true });

        zone.addEventListener('mouseleave', () => {
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
            pool.forEach(el => {
                gsap.killTweensOf(el);
                gsap.set(el, { autoAlpha: 0 });
            });
            lastX = -9999;
            lastY = -9999;
        });
    }

    /* ----------------------------------------------------------
       Pool de <img> — positionnées en transform (GPU composité)
    ---------------------------------------------------------- */
    function buildPool(zone) {
        const pool = [];
        for (let i = 0; i < CONFIG.imageCount; i++) {
            const img = document.createElement('img');
            img.className = 'trail-img';
            img.setAttribute('aria-hidden', 'true');
            img.setAttribute('draggable', 'false');
            Object.assign(img.style, {
                position:      'absolute',
                left:          '0',
                top:           '0',
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
       Animer une image — translate GPU uniquement (pas de left/top)
    ---------------------------------------------------------- */
    function showImage(el, x, y, imgIdx) {
        const src = 'ressources/projets/' + TRAIL_IMAGES[imgIdx];
        if (el.getAttribute('src') !== src) el.src = src;

        const rot = (Math.random() - 0.5) * 2 * CONFIG.rotRange;
        // x/y = transform: translate → composité GPU, pas de layout
        const tx = x - CONFIG.imgWidth  / 2;
        const ty = y - CONFIG.imgHeight / 2;

        gsap.killTweensOf(el);
        gsap.set(el, {
            x: tx, y: ty,
            rotation:  rot,
            scale:     CONFIG.scaleFrom,
            autoAlpha: 0,
            zIndex:    10 + (imgIdx % 20),
        });

        gsap.to(el, {
            autoAlpha: 1,
            scale:     CONFIG.scaleTo,
            duration:  CONFIG.fadeInDur,
            ease:      'power3.out',
            onComplete() {
                gsap.to(el, {
                    autoAlpha: 0,
                    scale:     CONFIG.scaleTo + 0.05,
                    duration:  CONFIG.fadeOutDur,
                    delay:     CONFIG.fadeOutDelay,
                    ease:      'power2.in',
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
