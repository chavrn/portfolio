/* ============================================================
   AULNE STUDIO — Loader.js
   Écran de chargement % sur fond noir.
   Se retire quand la page est prête (DOMContentLoaded + images critiques).
   ============================================================ */

(function () {

    /* ----------------------------------------------------------
       INJECTER LE LOADER dans le DOM immédiatement
       (avant DOMContentLoaded pour éviter le flash)
    ---------------------------------------------------------- */
    const overlay = document.createElement('div');
    overlay.id = 'site-loader';
    overlay.innerHTML = `<span id="loader-percent">0</span><span class="loader-sym">%</span>`;
    document.documentElement.appendChild(overlay);

    /* Styles inline — injectés avant tout CSS externe pour garantir
       l'affichage même si style.css est lent à charger              */
    const style = document.createElement('style');
    style.textContent = `
    #site-loader {
      position: fixed;
      inset: 0;
      background: #0a0a0a;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      z-index: 99999;
      pointer-events: all;
      transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  visibility 0.6s;
    }
    #site-loader.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    #loader-percent {
      font-family: 'Alte Haas Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.04em;
      color: #ffffff;
      line-height: 1;
      font-variant-numeric: tabular-nums;
      /* Largeur fixe pour éviter le saut lors du changement de chiffres */
      display: inline-block;
      min-width: 2ch;
      text-align: right;
    }
    .loader-sym {
      font-family: 'Alte Haas Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 13px;
      font-weight: 400;
      color: #ffffff;
      line-height: 1;
    }
    /* Bloquer le scroll pendant le chargement */
    body.loading {
      overflow: hidden;
    }
  `;
    document.head.appendChild(style);

    /* Bloquer le scroll immédiatement */
    document.documentElement.classList.add('loading-active');

    /* ----------------------------------------------------------
       VARIABLES
    ---------------------------------------------------------- */
    const percentEl = document.getElementById('loader-percent');
    let   current   = 0;   // valeur affichée
    let   target    = 0;   // valeur cible (0–100)
    let   rafId     = null;
    let   pageReady = false;

    /* ----------------------------------------------------------
       ANIMATION DU COMPTEUR
       Interpolation douce vers la valeur cible
    ---------------------------------------------------------- */
    function animateCounter() {
        if (current < target) {
            // Vitesse adaptative : plus lent quand on approche de 100
            const step = Math.max(0.4, (target - current) * 0.06);
            current = Math.min(target, current + step);
            percentEl.textContent = Math.floor(current);
        }

        if (current < 100) {
            rafId = requestAnimationFrame(animateCounter);
        } else {
            percentEl.textContent = '100';
            // Petit délai avant de retirer le loader
            setTimeout(hideLoader, 300);
        }
    }

    /* ----------------------------------------------------------
       MISE À JOUR DE LA CIBLE
    ---------------------------------------------------------- */
    function setTarget(value) {
        target = Math.min(100, Math.max(target, Math.floor(value)));
        if (!rafId) {
            rafId = requestAnimationFrame(animateCounter);
        }
    }

    /* ----------------------------------------------------------
       MASQUER LE LOADER
    ---------------------------------------------------------- */
    function hideLoader() {
        overlay.classList.add('hidden');
        document.body.classList.remove('loading');
        document.documentElement.classList.remove('loading-active');
        overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    }

    /* ----------------------------------------------------------
       LOGIQUE DE PROGRESSION
       Phase 1 (0→40%) : DOM parsé
       Phase 2 (40→80%) : images critiques chargées
       Phase 3 (80→100%) : window.load ou timeout de sécurité
    ---------------------------------------------------------- */

    // Phase 1 — DOMContentLoaded → 40 %
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('loading');
        setTarget(40);
        loadCriticalImages();
    });

    // Phase 2 — Images critiques (logo + première image projet)
    function loadCriticalImages() {
        const criticalSrcs = [
            'ressources/logo/2026-01-26_aulneLogo-01.png',
            'ressources/projets/cover_26carnavalOrsières.png',
            'ressources/projets/cover_etoileBlanche-menuBoisson.png',
            'ressources/projets/cover_curia.png',
        ];

        let loaded = 0;
        const total = criticalSrcs.length;

        criticalSrcs.forEach(src => {
            const img = new Image();
            img.onload = img.onerror = () => {
                loaded++;
                // 40 % → 80 % proportionnellement
                setTarget(40 + Math.round((loaded / total) * 40));
                if (loaded === total) onCriticalReady();
            };
            img.src = src;
        });

        // Sécurité : si les images ne chargent pas en 3s, on passe quand même
        setTimeout(onCriticalReady, 3000);
    }

    let criticalDone = false;
    function onCriticalReady() {
        if (criticalDone) return;
        criticalDone = true;
        setTarget(80);
        if (pageReady) setTarget(100);
    }

    // Phase 3 — window.load → 100 %
    window.addEventListener('load', () => {
        pageReady = true;
        setTarget(100);
    });

    // Sécurité absolue : après 6s on ferme quoi qu'il arrive
    setTimeout(() => {
        target  = 100;
        current = 100;
        percentEl.textContent = '100';
        hideLoader();
    }, 6000);

})();
