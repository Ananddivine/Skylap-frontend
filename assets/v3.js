/* SkyLap v3 — shared behaviour. Small, dependency-free, progressive: every page works without it. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Hero laptop: gentle intro, then scroll-driven open + separate. ?p=0.9 freezes the scene for design review. */
  const vis = document.querySelector('.hero-visual');
  if (vis) {
    const fixed = new URLSearchParams(location.search).get('p');
    if (fixed !== null) vis.style.setProperty('--p', fixed);
    else if (reduce) vis.style.setProperty('--p', '0.8');
    else {
      const t0 = performance.now();
      const set = (intro) => {
        const y = window.scrollY;
        const s = Math.min(1, Math.max(0, y / 340));
        const e = 1 - Math.pow(1 - Math.min(1, intro), 3);
        vis.style.setProperty('--p', Math.max(0.06 + e * 0.18, s).toFixed(3));
        vis.style.setProperty('--sy', (Math.min(y, 560) * 0.42).toFixed(1) + 'px');
      };
      const tick = () => { const i = (performance.now() - t0) / 1800; set(i); if (i < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
      addEventListener('scroll', () => set(1), { passive: true });
    }
    /* component hover/tap → "We repair this" (exploded laptop interface) */
    const parts = vis.querySelectorAll('[data-part]');
    const tip = document.getElementById('part-tip');
    parts.forEach((el) => {
      const show = () => { if (!tip) return; tip.hidden = false; tip.querySelector('b').textContent = el.dataset.label; tip.querySelector('a').href = el.dataset.href; vis.querySelectorAll('.is-hot').forEach((x) => x.classList.remove('is-hot')); el.classList.add('is-hot'); };
      el.addEventListener('mouseenter', show); el.addEventListener('focus', show); el.addEventListener('click', show);
    });
  }

  /* reveal + count-up */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; e.target.classList.add('in'); io.unobserve(e.target);
    e.target.querySelectorAll('[data-count]').forEach(countUp);
  }), { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal, .proof, .counters').forEach((el) => io.observe(el));
  function countUp(el) {
    const target = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, suffix = el.dataset.suffix ? ' ' + el.dataset.suffix : '';
    if (reduce || Number.isNaN(target)) return;
    const t0 = performance.now(), dur = 1300;
    const step = () => { const k = Math.min(1, (performance.now() - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = (target * e).toFixed(dec) + suffix; if (k < 1) requestAnimationFrame(step); else el.textContent = target.toFixed(dec) + suffix; };
    requestAnimationFrame(step);
  }

  /* diagnostic chooser (symptom → service) */
  const dxData = document.getElementById('dx-data');
  if (dxData) {
    const DX = JSON.parse(dxData.textContent);
    const tiles = [...document.querySelectorAll('.dx-tile')];
    tiles.forEach((t) => t.addEventListener('click', () => {
      tiles.forEach((x) => x.setAttribute('aria-pressed', String(x === t)));
      const d = DX[t.dataset.key]; if (!d) return;
      const kind = document.getElementById('dx-kind'), text = document.getElementById('dx-text'), link = document.getElementById('dx-link'), sel = document.getElementById('qf-issue');
      if (kind) kind.textContent = d.kind; if (text) text.textContent = d.text;
      if (link) { link.href = d.href; link.hidden = !d.href || d.href.startsWith('#'); }
      if (sel) sel.value = t.dataset.key;
    }));
  }

  /* tabs (showroom, filters) */
  document.querySelectorAll('[role=tablist]').forEach((list) => {
    const tabs = [...list.querySelectorAll('[role=tab]')];
    tabs.forEach((tab) => tab.addEventListener('click', () => {
      tabs.forEach((t) => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; const p = document.getElementById(t.getAttribute('aria-controls')); if (p) p.hidden = !on; });
    }));
  });

  /* decision helpers: radio groups with data-score → verdict text (repair or replace; which upgrade) */
  document.querySelectorAll('[data-decider]').forEach((form) => {
    const out = form.querySelector('.decider-out');
    const verdicts = JSON.parse(form.dataset.decider || '[]'); // [{max, title, text}] ordered by max ascending
    form.addEventListener('change', () => {
      const answered = [...form.querySelectorAll('input:checked')];
      const total = form.querySelectorAll('fieldset').length;
      if (answered.length < total) { out.hidden = false; out.innerHTML = `<p class="fine">${answered.length} of ${total} answered.</p>`; return; }
      const score = answered.reduce((s, i) => s + (+i.dataset.score || 0), 0);
      const v = verdicts.find((x) => score <= x.max) || verdicts[verdicts.length - 1];
      out.hidden = false; out.innerHTML = `<p class="eyebrow">Our read</p><h3>${v.title}</h3><p>${v.text}</p>`;
    });
  });

  /* Quote form delivery.
     ENQUIRY_ENDPOINT is the owner's own Google Apps Script web app (see
     deliverables/fixes/quote-form-endpoint.gs). It writes a row to their Google Sheet and emails
     them. The destination address lives only inside that script, never here, so no email address
     appears anywhere in this site. Until the URL is pasted in, the form validates and points
     people at the phone instead of pretending to send. */
  const ENQUIRY_ENDPOINT = '';

  const qf = document.getElementById('qf');
  if (qf) qf.addEventListener('submit', async (e) => {
    e.preventDefault();
    const note = document.getElementById('qf-note');
    const btn = qf.querySelector('button[type=submit], .btn-primary');
    if (!qf.checkValidity()) {
      note.className = 'qf-note is-error';
      note.textContent = 'Please add your name, a 10-digit mobile number and the closest problem.';
      qf.reportValidity();
      return;
    }
    if (!ENQUIRY_ENDPOINT) {
      note.className = 'qf-note is-error';
      note.textContent = 'This form is not connected yet. Please call 96061 20007 or send a photo on WhatsApp and we will pick it up straight away.';
      return;
    }

    const data = Object.fromEntries(new FormData(qf).entries());
    data.page = location.pathname;
    data.source = 'website';

    const label = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    note.className = 'qf-note';
    note.textContent = 'Sending…';

    try {
      // text/plain avoids a CORS preflight, which Apps Script web apps do not answer
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data),
      });
      const out = await res.json().catch(() => ({ ok: res.ok }));
      if (!out.ok) throw new Error(out.note || 'rejected');
      qf.reset();
      note.className = 'qf-note is-ok';
      note.textContent = 'Got it. We call you back on that number during opening hours, usually the same day. If it is urgent, call 96061 20007.';
    } catch (err) {
      note.className = 'qf-note is-error';
      note.textContent = 'That did not send. Please call 96061 20007 or send a photo on WhatsApp and we will pick it up straight away.';
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = label; }
    }
  });

  /* review wall filter */
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const target = document.getElementById(group.dataset.filterGroup);
    group.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
      group.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const key = b.dataset.key;
      target.querySelectorAll('[data-topics]').forEach((card) => { card.hidden = key !== 'all' && !card.dataset.topics.split(' ').includes(key); });
    }));
  });
})();
