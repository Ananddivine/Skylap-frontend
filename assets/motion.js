/* ═══════════════════════════════════════════════════════════════════════════════════════
   SkyLap motion system  ·  GSAP 3 + ScrollTrigger, self-hosted in assets/vendor/

   Rules this file keeps:
   - Content is never hidden without a way back. The head script only sets `motion-pending`
     when motion is allowed; a safety timer lifts it if this file fails to run, so a slow or
     blocked script can never leave the page blank.
   - The hero headline and hero photo are the page's largest paint. They move by transform only,
     never by opacity, so the moment Google measures as "loaded" is not delayed by the intro.
   - prefers-reduced-motion switches every animation off, not down.
   - Nothing hijacks scrolling. Scroll speed stays the visitor's own.
   ═══════════════════════════════════════════════════════════════════════════════════════ */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const release = () => root.classList.remove('motion-pending');

  if (reduce || !window.gsap || !window.ScrollTrigger) { release(); return; }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  const fine = matchMedia('(pointer: fine)').matches;          // a mouse, not a finger
  const EASE = 'expo.out';

  /* ── 1. the hero arrives in order ─────────────────────────────────────────────────────
     The headline and the photo paint immediately and are never hidden: they are the largest
     things on screen and hiding them would delay the moment Google counts the page as loaded.
     Everything around them arrives in sequence instead. fromTo with explicit end values, because
     the head script pre-hid these pieces and a plain from() would read that hidden state as the
     finish line. */
  const hero = document.querySelector('.hx, .hero-board, .svc-hero, .phero');
  if (hero) {
    const tl = gsap.timeline({ defaults: { ease: EASE, duration: 1 } });
    const show = { opacity: 1, y: 0 };
    const q = (sel) => hero.querySelectorAll(sel);
    const kicker = q('.hx-proof, .hx-kw, .h1-kw, .symptom-line, .phero .eyebrow');
    const lead = q('.hx-sub, .said, .lead');
    const actions = q('.hx-cta .btn, .hx-stats > div, .cta-row .btn, .h-ticks > span, .hero-fine');
    const chips = q('.hx-card-top, .hx-steps li, .strip-label, .chip-link');
    if (kicker.length) tl.fromTo(kicker, { opacity: 0, y: 12 }, { ...show, duration: .7 }, 0);
    if (lead.length) tl.fromTo(lead, { opacity: 0, y: 18 }, { ...show, stagger: .08 }, .15);
    if (actions.length) tl.fromTo(actions, { opacity: 0, y: 16 }, { ...show, stagger: .06 }, .28);
    if (chips.length) tl.fromTo(chips, { opacity: 0, y: 12 }, { ...show, stagger: .035, duration: .8 }, .45);
    // the underline under "the part that failed" draws itself once the intro settles
    const em = hero.querySelector('.hero-display em');
    if (em) tl.add(() => em.classList.add('drawn'), .55);
    const ring = hero.querySelector('.fault');
    const call = hero.querySelector('.hx-pin, .callout');
    if (ring) tl.fromTo(ring, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: .9, ease: 'back.out(2)' }, .7);
    if (call) tl.fromTo(call, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 }, .85);
  }
  release();

  /* ── 2. section headings and their intro copy rise as they come into view ─────────── */
  gsap.utils.toArray('.sec-head, .chapter-text, .answer-sec .prose > h2, .rel-sec h2').forEach((el) => {
    gsap.from(el.children.length ? el.children : el, {
      y: 30, opacity: 0, duration: 1, ease: EASE, stagger: .08,
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });
  });

  /* ── 3. grids arrive one card after another, never all at once ─────────────────────── */
  const GRIDS = [
    ['.dx-grid, .tiles', '.dx-tile, .tile'],
    ['.cells', '.cell'],
    ['.wall-grid', '.rv'],
    ['.prod-grid', '.prod'],
    ['.work-grid', 'li'],
    ['.steps', 'li'],
    ['.proof, .counters', '.pf, .counter'],
    ['.related', 'a, li'],
    ['.faq', 'details'],
  ];
  for (const [grid, item] of GRIDS) {
    gsap.utils.toArray(grid).forEach((g) => {
      const items = g.querySelectorAll(`:scope > ${item.split(', ').join(', :scope > ')}`);
      if (!items.length) return;
      gsap.from(items, {
        y: 36, opacity: 0, duration: .9, ease: EASE,
        // cap the whole cascade near 0.8s: 120 review cards at .07s each took 8s to finish appearing
        stagger: { each: Math.min(.07, .8 / items.length), from: 'start' },
        scrollTrigger: { trigger: g, start: 'top 88%', once: true },
      });
    });
  }

  /* ── 4. photographs settle in with a slow scale, the way a camera finds focus ─────── */
  gsap.utils.toArray('.chapter-photo, .part-photo, .map-card').forEach((el) => {
    gsap.from(el, {
      y: 40, scale: .96, opacity: 0, duration: 1.3, ease: EASE,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  /* ── 5. the hero board drifts as the page scrolls past it ─────────────────────────── */
  const board = document.querySelector('.hx-stage img, .board-photo .shot');
  if (board) {
    gsap.to(board, {
      yPercent: -9, ease: 'none',
      scrollTrigger: { trigger: board.closest('.hx-card, .board-photo'), start: 'top bottom', end: 'bottom top', scrub: .6 },
    });
  }

  /* ── 6. with a mouse, the board tilts toward the pointer ──────────────────────────── */
  const frame = document.querySelector('.hx-card, .board-photo');
  if (frame && fine) {
    const shot = frame.querySelector('.hx-stage, .shot');
    gsap.set(frame, { transformPerspective: 1100 });
    const rx = gsap.quickTo(shot, 'rotationX', { duration: .8, ease: 'power3.out' });
    const ry = gsap.quickTo(shot, 'rotationY', { duration: .8, ease: 'power3.out' });
    frame.addEventListener('pointermove', (e) => {
      const r = frame.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      ry(px * 12); rx(py * -9);
    });
    frame.addEventListener('pointerleave', () => { rx(0); ry(0); });
  }

  /* ── 7. primary buttons lean toward the cursor ────────────────────────────────────── */
  if (fine) {
    document.querySelectorAll('.hx-cta .btn-primary, .btn-primary.lg, .final .btn-primary').forEach((btn) => {
      const x = gsap.quickTo(btn, 'x', { duration: .5, ease: 'power3.out' });
      const y = gsap.quickTo(btn, 'y', { duration: .5, ease: 'power3.out' });
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * .22);
        y((e.clientY - r.top - r.height / 2) * .3);
      });
      btn.addEventListener('pointerleave', () => { x(0); y(0); });
    });
  }

  /* ── 8. a hairline of progress along the top of the page ──────────────────────────── */
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });

  /* ── 9. the header tightens once the page starts moving ───────────────────────────── */
  const hdr = document.querySelector('.hdr');
  if (hdr) {
    ScrollTrigger.create({ start: 40, end: 'max', onToggle: (s) => hdr.classList.toggle('is-scrolled', s.isActive) });
  }

  /* fonts and images can change the layout after this runs; re-measure once everything is in */
  addEventListener('load', () => ScrollTrigger.refresh());

  /* safety net for slow or busy devices: if a scroll-triggered reveal has not played by the time the
     element has been on screen for 1.5s, show it anyway. Content must never stay invisible. */
  if ('IntersectionObserver' in window) {
    const targets = new Set();
    gsap.globalTimeline.getChildren(true, true, false).forEach((t) => (t.targets ? t.targets() : []).forEach((el) => el instanceof Element && targets.add(el)));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      setTimeout(() => { if (parseFloat(getComputedStyle(e.target).opacity) < 0.5) gsap.to(e.target, { opacity: 1, y: 0, scale: 1, duration: .35, overwrite: true }); }, 1500);
    }));
    targets.forEach((el) => io.observe(el));
  }
  // any later height change (late images, fonts, accordions) re-measures, so nothing is left hidden
  if ('ResizeObserver' in window) {
    let t; new ResizeObserver(() => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 200); }).observe(document.body);
  }
})();
