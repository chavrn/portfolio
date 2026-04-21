/* ============================================================
   AULNE STUDIO — script.js
   GSAP + Navigation + Scroll Infini + Image Swap
   ============================================================ */

const PROJECTS = [
  {
    id: 1,
    title: "Carnaval d'Orsières 2026",
    year: 2026,
    category: "Poster Design",
    subtitle: "Univers onirique et festif",
    description: "Conception de l'identité visuelle pour l'édition 2026 sous la thématique « Imagine ton monde ». L'objectif était de créer une porte d'entrée visuelle vers un imaginaire féerique et ludique.",
    description2: "Le travail s'articule autour d'une composition dynamique où la typographie expressive rencontre des éléments illustratifs oniriques, capturant l'essence festive de mon village natal.",
    images: ["cover_26carnavalOrsières.png"]
  },
  {
    id: 2,
    title: "L'Étoile Blanche",
    year: 2026,
    category: "Brand Assets",
    subtitle: "Refonte d'expérience print",
    description: "Projet de refonte globale de la carte et des supports marketing pour l'établissement. L'enjeu était de moderniser l'image de marque tout en conservant son ADN chaleureux.",
    description2: "Déclinaison d'un écosystème tangible incluant le design des menus, la création de sous-verres personnalisés et une gamme textile (t-shirts), assurant une cohérence visuelle sur chaque point de contact client.",
    images: [
      "cover_etoileBlanche-tshirt.png",
      "cover_etoileBlanche-menuBoisson.png",
      "cover_etoileBlanche-sousverre.png"
    ]
  },
  {
    id: 3,
    title: "Curia",
    year: 2026,
    category: "Visual Identity",
    subtitle: "Branding participatif",
    description: "Création de l'identité visuelle pour Curia, une application de ticketing citoyen permettant aux habitants de proposer et de voter pour des projets d'aménagement urbain.",
    description2: "Le logotype symbolise l'échange et la validation démocratique, avec une esthétique institutionnelle moderne qui inspire confiance et clarté pour les municipalités.",
    images: ["cover_curia.png"]
  },
  {
    id: 4,
    title: "Medze.ch",
    year: 2025,
    category: "Branding & Web",
    subtitle: "Écosystème e-commerce complet",
    description: "Développement d'une identité de marque 360° pour une plateforme alimentaire, incluant le logotype, une série d'illustrations de personnages (fruits et légumes) et une charte graphique solaire.",
    description2: "Le projet a abouti à la création d'un site e-commerce sous WordPress, complété par une stratégie de packaging et de contenu pour les réseaux sociaux, offrant une expérience de marque fluide du digital au physique. Découvrez le projet sur <a href='https://www.medze.ch' target='_blank'>www.medze.ch</a> et sur <a href='https://www.instagram.com/medze.ch/' target='_blank'>Instagram</a>.",images: [
      "cover_medze-paquet.png",
      "cover_medze-carotte.png",
      "cover_medze-etiquette.png",
      "cover_medze-insta.png"
    ]
  },
  {
    id: 5,
    title: "NaturaQuest",
    year: 2025,
    category: "UI Design",
    subtitle: "Interface de data-visualisation ludique",
    description: "Design d'interface pour une application de récolte de données environnementales en Suisse. L'enjeu était de transformer des données scientifiques brutes en une expérience utilisateur engageante.",
    description2: "Conception d'un UI clair et intuitif favorisant la gamification, permettant aux utilisateurs de devenir acteurs de la préservation de la nature par le biais d'un design ludique et immersif.",
    images: [
      "cover_narutaQuest-base.png",
      "cover_narutaQuest-activity.png",
      "cover_narutaQuest-activityChoix.png",
      "cover_narutaQuest-classement.png",
      "cover_narutaQuest-s.png"
    ]
  },
  {
    id: 6,
    title: "RJV 2025",
    year: 2025,
    category: "Art Direction",
    subtitle: "Identité événementielle cantonale",
    description: "Direction artistique pour le Rassemblement des Jeunesses Valaisannes. Travail de déclinaison à partir de l'identité existante pour créer un univers propre à l'édition 2025.",
    description2: "Réalisation de l'affiche officielle et couverture photographique de l'événement, garantissant une synergie entre le design graphique et la capture de l'instant réel sur le terrain.",
    images: [
      "cover_rjv-affiche.png",
      "cover_rjv-logo.png",
      "cover_rjv-photo1.png",
      "cover_rjv-photo3.png",
      "cover_rjv-pjoto2.png"
    ]
  },
  {
    id: 7,
    title: "Ambigramme",
    year: 2025,
    category: "Digital Art",
    subtitle: "Design sonore et visuel",
    description: "Conception des couvertures pour un podcast d'histoire de l'art dédié à l'analyse et au décryptage d'œuvres iconiques.",
    description2: "Le design visuel reflète la dualité du podcast : une dissection rigoureuse du contexte historique mêlée à une ouverture contemporaine, illustrée par un travail sur la symétrie et la lisibilité.",
    images: ["cover_ambigramme-marina.png", "cover_ambigramme-niepce.png"]
  },
  {
    id: 8,
    title: "Altéa",
    year: 2025,
    category: "Visual Identity",
    subtitle: "Branding d'agence",
    description: "Création d'un logotype minimaliste pour une agence fictive. Recherche sur la structure et l'équilibre des formes pour traduire le professionnalisme et l'innovation.",
    description2: "Une identité épurée pensée pour une lisibilité maximale sur tous les supports de communication professionnels.",
    images: ["cover_altea-logo.png"]
  },
  {
    id: 9,
    title: "Yearbook",
    year: 2025,
    category: "Editorial",
    subtitle: "Conception graphique éditoriale",
    description: "Refonte complète du yearbook de l'école. Un travail de mise en page complexe alliant structure rigoureuse et créativité visuelle.",
    description2: "Utilisation de grilles typographiques modulaires, traitement chromatique des images et choix de papiers virtuels pour créer un objet de mémoire moderne et pérenne.",
    images: ["cover_yearbook-rob.png", "cover_yearbook-texte.png"]
  },
  {
    id: 10,
    title: "Carnaval d'Orsières 2025",
    year: 2025,
    category: "Poster Design",
    subtitle: "Identité visuelle « Le détail qui tue »",
    description: "Conception de l'affiche officielle 2025. Un projet axé sur la précision et l'impact visuel pour illustrer une thématique centrée sur le détail.",
    description2: "Le projet inclut également une déclinaison pour le tournoi de Beer-pong lié à l'événement, assurant une cohérence visuelle sur les différents pôles de la manifestation.",
    images: ["cover_25carnavalOrsières.png"]
  },
  {
    id: 11,
    title: "Zygomatique",
    year: 2024,
    category: "Visual Identity",
    subtitle: "Branding hygiène & sourire",
    description: "Création d'une identité visuelle pour une marque de soins dentaires. Le défi était de rendre le secteur de l'hygiène attractif et moderne.",
    description2: "Développement du logotype, de la charte typographique et mise en situation réelle via le design de packaging et d'affiches promotionnelles au ton décalé.",
    images: ["cover_zygomatique-poster.png", "cover_zygomatique-pot.png"]
  },
  {
    id: 12,
    title: "Osika",
    year: 2024,
    category: "Visual Identity",
    subtitle: "Identité de librairie",
    description: "Conception d'un logotype pour une librairie. Travail de synthèse graphique pour évoquer le monde du livre et du partage culturel.",
    description2: "Une approche minimaliste favorisant un signe iconique fort, adaptable sur petits et grands formats.",
    images: ["cover_osika.png"]
  },
  {
    id: 13,
    title: "Carnaval d'Orsières 2024",
    year: 2024,
    category: "Poster Design",
    subtitle: "Branding événementiel",
    description: "Réalisation de l'affiche et de la communication visuelle pour le tournoi de Beer-pong du Carnaval 2024.",
    description2: "Une esthétique brute et énergique, conçue pour capter l'attention d'une cible jeune et dynamique au sein de l'événement.",
    images: ["cover_24carnavalOrsières.png"]
  },
  {
    id: 14,
    title: "No Planet B",
    year: 2024,
    category: "Graphic Art",
    subtitle: "Manifeste visuel écologique",
    description: "Projet d'affiche engagée utilisant une contrainte textuelle imposée pour dénoncer l'urgence climatique.",
    description2: "Une composition à fort impact visuel, jouant sur le contraste et la hiérarchie typographique pour porter un message militant et universel.",
    images: ["24_noPlanetB.png"]
  },
  {
    id: 15,
    title: "Movement",
    year: 2023,
    category: "Poster Design",
    subtitle: "Swiss Design & Skis",
    description: "Projet réalisé dans le cadre d'un concours pour la Journée internationale des droits des femmes. L'objectif était de mettre en avant la communauté féminine de la marque à travers une création originale.",
    description2: "Inspirée par les codes du graphisme suisse (propreté, grille, impact), cette affiche a été conçue pour être déclinée sur une paire de skis, alliant esthétique minimaliste et performance sportive.",
    images: ["cover_wovement-affiche.png", "cover_wovement-mockup.png"]
  },
  {
    id: 16,
    title: "Bal des 20",
    year: 2022,
    category: "Poster Design",
    subtitle: "Hiérarchie et clarté",
    description: "Conception d'une affiche événementielle pour une manifestation locale. Le défi principal résidait dans l'intégration d'une grande quantité d'informations textuelles impératives.",
    description2: "Un travail rigoureux sur la typographie et la mise en page a permis de garantir une lisibilité optimale et une circulation fluide de l'information, sans sacrifier l'impact visuel de l'affiche.",
    images: ["cover_bal20.png"]
  }
];

/* --- CURSOR --- */
function initCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  if (!cursor || !follower) return;
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
  });
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12; followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px'; follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
}

/* --- HEADER --- */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* --- TRANSITIONS --- */
function initPageTransitions() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;
  gsap.set(overlay, { scaleY: 1, transformOrigin: 'top' });
  gsap.to(overlay, { scaleY: 0, duration: 0.7, ease: 'power3.inOut', delay: 0.05 });
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.set(overlay, { transformOrigin: 'bottom' });
      gsap.to(overlay, { scaleY: 1, duration: 0.55, ease: 'power3.inOut', onComplete: () => { window.location.href = href; } });
    });
  });
}

/* --- ENTRANCE --- */
function initEntranceAnimations() {
  gsap.to('.fade-up', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.4 });
  gsap.to('.fade-in', { opacity: 1, duration: 1.1, ease: 'power2.out', stagger: 0.08, delay: 0.5 });
}

/* --- SCROLL ANIM --- */
function initScrollAnimations() {
  if (typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });
}

/* --- PAGE WORKS (Carousel/Grid) --- */
function initWorksPage() {
  const carouselView = document.getElementById('carousel-view');
  const gridView = document.getElementById('grid-view');
  if (!carouselView && !gridView) return;

  if (carouselView) {
    const namesList = document.getElementById('works-names-list');
    const numEl = document.getElementById('project-index');
    const categoryEl = document.getElementById('project-category');
    const scrollCol = document.getElementById('works-scroll');
    const scrollInner = document.getElementById('works-scroll-inner');

    PROJECTS.forEach((p, i) => {
      const li = document.createElement('li');
      li.textContent = p.title;
      if (i === 0) li.classList.add('active');
      li.addEventListener('click', () => {
        const target = document.querySelector(`.works-scroll-item[data-project-id="${p.id}"][data-copy="1"]`);
        if (target) {
          gsap.to(scrollCol, { scrollTop: target.offsetTop - scrollCol.clientHeight/2 + target.offsetHeight/2, duration: 0.8 });
        }
      });
      namesList.appendChild(li);
    });

    const COPIES = 3;
    for (let c = 0; c < COPIES; c++) {
      PROJECTS.forEach((p, i) => {
        const item = document.createElement('div');
        item.className = 'works-scroll-item';
        item.dataset.projectId = p.id;
        item.dataset.projectIndex = i;
        item.dataset.copy = c;
        item.innerHTML = `<a href="project-detail.html?id=${p.id}"><img src="ressources/projets/${p.images[0]}" alt="${p.title}"></a>`;
        scrollInner.appendChild(item);
      });
    }

    scrollCol.addEventListener('scroll', () => {
      const bh = scrollInner.scrollHeight / COPIES;
      if (scrollCol.scrollTop < bh * 0.4) scrollCol.scrollTop += bh;
      else if (scrollCol.scrollTop > bh * 1.6) scrollCol.scrollTop -= bh;

      // Détection simplifiée
      const items = document.querySelectorAll('.works-scroll-item');
      let closest = null, minD = Infinity;
      const cy = scrollCol.getBoundingClientRect().top + scrollCol.clientHeight/2;
      items.forEach(it => {
        const d = Math.abs(it.getBoundingClientRect().top + it.offsetHeight/2 - cy);
        if(d < minD) { minD = d; closest = it; }
      });
      if(closest) {
        const idx = parseInt(closest.dataset.projectIndex);
        numEl.textContent = String(idx + 1).padStart(2, '0');
        categoryEl.textContent = PROJECTS[idx].category;
        namesList.querySelectorAll('li').forEach((li, i) => li.classList.toggle('active', i === idx));
      }
    });
  }

  const btnCarousel = document.getElementById('btn-carousel');
  const btnGrid = document.getElementById('btn-grid');
  if(btnGrid) {
    btnGrid.addEventListener('click', () => {
      carouselView.classList.add('hidden');
      gridView.classList.add('visible');
    });
  }
}

/* ============================================================
   PAGE DETAIL — Image Swap Logic
   ============================================================ */
function initDetailPage() {
  const wrapper = document.querySelector('.detail-wrapper');
  if (!wrapper || !wrapper.dataset.detail) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return;

  const num = String(PROJECTS.indexOf(project) + 1).padStart(2, '0');
  document.getElementById('detail-num').textContent = num;
  document.getElementById('detail-title').textContent = project.title;
  document.getElementById('detail-subtitle').textContent = project.subtitle;
  document.getElementById('detail-desc1').innerHTML = project.description;
  document.getElementById('detail-desc2').innerHTML = project.description2;

  const mainImgContainer = document.querySelector('.detail-main-img');
  const sideImgsContainer = document.querySelector('.detail-side-imgs');

  // Injecter l'image principale
  mainImgContainer.innerHTML = `<img src="ressources/projets/${project.images[0]}" alt="${project.title}" id="current-main-img">`;

  // Injecter les miniatures
  sideImgsContainer.innerHTML = '';
  project.images.slice(1).forEach((imgFile) => {
    const div = document.createElement('div');
    div.className = 'detail-side-img';
    div.innerHTML = `<img src="ressources/projets/${imgFile}" alt="Détail" loading="lazy">`;
    sideImgsContainer.appendChild(div);
  });

  // --- LOGIQUE DE SWAP (ÉCHANGE) ---
  sideImgsContainer.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('img');
    const mainImg = document.getElementById('current-main-img');

    if (!clickedImg || !mainImg) return;

    // Animation de transition
    const tl = gsap.timeline();

    tl.to([mainImg, clickedImg], { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' });

    tl.add(() => {
      // Échange des sources
      const tempSrc = mainImg.src;
      mainImg.src = clickedImg.src;
      clickedImg.src = tempSrc;
    });

    tl.to([mainImg, clickedImg], { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
  });
}

/* --- HOME --- */
function initHomePage() {
  const container = document.querySelector('.home-projects');
  if (!container) return;
  PROJECTS.slice(0, 4).forEach(p => {
    const item = document.createElement('div');
    item.className = 'home-project-item fade-in';
    item.innerHTML = `
      <a href="project-detail.html?id=${p.id}">
        <div class="home-project-img"><img src="ressources/projets/${p.images[0]}" alt="${p.title}"></div>
        <div class="home-project-info"><span>${p.title}</span><span>${p.category}</span></div>
      </a>`;
    container.appendChild(item);
  });
}

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initHeaderScroll();
  initPageTransitions();
  initEntranceAnimations();
  initScrollAnimations();
  initWorksPage();
  initDetailPage();
  initHomePage();
});