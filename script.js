/* Lupo — « La carte du loup » */
(function () {
  'use strict';
  var doux = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var html = document.documentElement;

  /* ─────────── Apparitions au scroll ─────────── */
  var cibles = document.querySelectorAll(
    '.hero-logo, .hero-titre, .hero-lede, .hero-actions, ' +
    '.oeil, .display, .liste > li, .cadre, .legende, .pied-carte, .planche figure, ' +
    '.bizzo-img, .chapo, .ing-large, .prix-fort, .bizzo-txt .bt, ' +
    '.chiffres, .sous-titre, .meute li, .avis blockquote, ' +
    '.venir-cols > div, .bt-orange, .pied-logo'
  );
  Array.prototype.forEach.call(cibles, function (el) { el.classList.add('rvl'); });

  var heros = document.querySelectorAll('.hero .rvl');

  function montreHero() {
    Array.prototype.forEach.call(heros, function (el, i) {
      el.style.transitionDelay = (i * 0.09) + 's';
      el.classList.add('vu');
    });
  }

  if (doux || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(cibles, function (el) { el.classList.add('vu'); });
  } else {
    var io = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('vu'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    Array.prototype.forEach.call(cibles, function (el) { io.observe(el); });

    ['.liste > li', '.planche figure', '.avis blockquote', '.meute li'].forEach(function (sel) {
      Array.prototype.forEach.call(document.querySelectorAll(sel), function (el, i) {
        el.style.transitionDelay = (Math.min(i, 7) * 0.05) + 's';
      });
    });
  }

  /* ─────────── Ouverture ─────────── */
  var intro = document.getElementById('intro');

  function sauteIntro() {
    if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
    html.classList.remove('ouverture');
    if (!doux) montreHero();
  }

  function vue() {
    try { return sessionStorage.getItem('lupo-intro') === '1'; } catch (e) { return false; }
  }
  function marque() {
    try { sessionStorage.setItem('lupo-intro', '1'); } catch (e) {}
  }

  if (!intro || doux || vue() || location.hash) {
    sauteIntro();
  } else {
    html.classList.add('ouverture');
    marque();

    /* on attend les deux images, sans jamais dépasser 600 ms */
    var images = intro.querySelectorAll('img');
    var restant = images.length;
    var lance = false;

    var leve = false;

    /* le rideau part, le contenu monte juste derrière */
    function leveRideau() {
      if (leve) return;
      leve = true;
      intro.classList.add('leve');
      html.classList.remove('ouverture');
      setTimeout(montreHero, 170);
      setTimeout(function () {
        if (intro.parentNode) intro.parentNode.removeChild(intro);
      }, 1250);
    }

    /* un clic ou une touche passe l'ouverture */
    function passe() {
      window.removeEventListener('pointerdown', passe);
      window.removeEventListener('keydown', passe);
      leveRideau();
    }
    window.addEventListener('pointerdown', passe);
    window.addEventListener('keydown', passe);

    function demarre() {
      if (lance) return;
      lance = true;
      intro.classList.add('joue');
      setTimeout(leveRideau, 1450);
    }

    Array.prototype.forEach.call(images, function (img) {
      if (img.complete) { if (--restant === 0) demarre(); }
      else {
        img.addEventListener('load', function () { if (--restant === 0) demarre(); });
        img.addEventListener('error', function () { if (--restant === 0) demarre(); });
      }
    });
    if (restant === 0) demarre();
    setTimeout(demarre, 600);
  }

  /* ─────────── Parallaxe des filigranes ─────────── */
  if (!doux) {
    var loups = document.querySelectorAll('.filigrane-tete, .filigrane-queue, .filigrane-maison');
    var vitesses = [-0.08, 0.06, 0.05];
    var attente = false;
    function place() {
      var y = window.pageYOffset;
      Array.prototype.forEach.call(loups, function (el, i) {
        el.style.transform = 'translate3d(0,' + (y * vitesses[i % 3]).toFixed(1) + 'px,0)';
      });
      attente = false;
    }
    window.addEventListener('scroll', function () {
      if (!attente) { attente = true; requestAnimationFrame(place); }
    }, { passive: true });
    place();
  }
})();
