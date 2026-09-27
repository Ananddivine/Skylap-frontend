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
  const ENQUIRY_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxbpfD_CeHhFDdOOZnypLL4m3fZXnRdBWJi9Iyd90gerbqnMD7ZlOztltvUFiW0c7wa9A/exec';

  /* ── field rules: stop bad characters as they are typed, explain problems under the field ── */
  const NAME_OK = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;       // letters in any script, spaces, . ' -
  const cleanName = (v) => v.replace(/[^\p{L}\p{M} .'-]/gu, '').replace(/\s{2,}/g, ' ').replace(/^[\s.'-]+/, '').slice(0, 50);
  const cleanPhone = (v) => {
    let d = v.replace(/\D/g, '');
    if (d.length > 10 && d.startsWith('91')) d = d.slice(2);  // pasted +91 96061 20007
    if (d.length > 10 && d.startsWith('0')) d = d.slice(1);   // pasted 096061 20007
    return d.slice(0, 10);
  };
  const RULES = {
    'qf-name': (v) => !v.trim() ? 'Please enter your name.' : v.trim().length < 2 ? 'Name must be at least 2 letters.' : !NAME_OK.test(v.trim()) ? 'Use letters only, no numbers or symbols.' : '',
    'qf-phone': (v) => !v ? 'Please enter your mobile number.' : v.length < 10 ? `Mobile number must be 10 digits (${v.length} entered).` : !/^[6-9]\d{9}$/.test(v) ? 'Enter a valid Indian mobile number starting with 6, 7, 8 or 9.' : '',
    'qf-issue': (v) => !v ? 'Please choose the closest problem.' : '',
  };
  const showErr = (el, msg) => {
    const out = document.getElementById(el.id + '-err');
    el.setCustomValidity(msg);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    el.closest('.f')?.classList.toggle('has-err', !!msg);
    if (out) out.textContent = msg;
  };
  const check = (el) => { const r = RULES[el.id]; if (r) showErr(el, r(el.value)); return !el.validationMessage; };
  const validateAll = (focusFirst) => {
    let first = null;
    Object.keys(RULES).forEach((id) => { const el = document.getElementById(id); if (el && !check(el) && !first) first = el; });
    if (first && focusFirst) first.focus();
    return !first;
  };
  const nm = document.getElementById('qf-name'), ph = document.getElementById('qf-phone'), msg = document.getElementById('qf-msg'), issue = document.getElementById('qf-issue');
  const touched = new Set();
  if (nm) {
    nm.addEventListener('input', () => { const c = cleanName(nm.value); if (c !== nm.value) nm.value = c; if (touched.has(nm)) check(nm); });
    nm.addEventListener('blur', () => { nm.value = nm.value.trim(); touched.add(nm); check(nm); });
  }
  if (ph) {
    ph.addEventListener('beforeinput', (e) => { if (e.inputType === 'insertText' && /\D/.test(e.data || '')) e.preventDefault(); });
    ph.addEventListener('input', () => { const c = cleanPhone(ph.value); if (c !== ph.value) ph.value = c; if (touched.has(ph) || c.length === 10) { touched.add(ph); check(ph); } });
    ph.addEventListener('blur', () => { touched.add(ph); check(ph); });
  }
  if (issue) issue.addEventListener('change', () => check(issue));
  if (msg) {
    const count = document.getElementById('qf-msg-count');
    const upd = () => { if (msg.value.length > 500) msg.value = msg.value.slice(0, 500); if (count) count.textContent = `${msg.value.length} / 500`; };
    msg.addEventListener('input', upd); upd();
  }

  const qf = document.getElementById('qf');
  if (qf) qf.addEventListener('submit', async (e) => {
    e.preventDefault();
    const note = document.getElementById('qf-note');
    const btn = qf.querySelector('button[type=submit], .btn-primary');
    if (!validateAll(true)) {
      note.className = 'qf-note is-error';
      note.textContent = 'Please fix the highlighted field.';
      return;
    }
    const data = Object.fromEntries(new FormData(qf).entries());
    data.name = (data.name || '').trim(); data.message = (data.message || '').trim().slice(0, 500);
    data.page = location.pathname;
    data.source = 'website';

    if (!ENQUIRY_ENDPOINT) {
      /* No sheet to write to yet, so the enquiry goes where this workshop already works: WhatsApp,
         with everything the customer typed carried across. A form that silently goes nowhere loses
         the lead entirely, and telling someone to start again in another app usually loses them too.
         The moment ENQUIRY_ENDPOINT is filled in, this path is skipped and enquiries post to the
         sheet instead — nothing here needs changing again. */
      const issueLabel = (qf.querySelector('#qf-issue')?.selectedOptions?.[0]?.textContent || data.issue || '').trim();
      const lines = [
        'Hi SkyLap, I would like a repair quote.',
        '',
        `Name: ${data.name || ''}`,
        `Phone: ${data.phone || ''}`,
        `Problem: ${issueLabel}`,
      ];
      if ((data.message || '').trim()) lines.push(`Details: ${data.message.trim()}`);
      lines.push('', `Sent from ${location.pathname}`);
      const wa = `https://wa.me/919606120007?text=${encodeURIComponent(lines.join('\n'))}`;
      note.className = 'qf-note is-ok';
      note.textContent = 'Opening WhatsApp with your details filled in. Press send there and we will call you back. Not using WhatsApp? Call 96061 20007.';
      window.open(wa, '_blank', 'noopener');
      return;
    }

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

/* Light / dark switch. The first press flips away from whatever is showing now, which with nothing
   stored is the device setting; the choice is remembered on this device only. */
(() => {
  const btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;
  const root = document.documentElement;
  const showing = () => root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const label = () => btn.setAttribute('aria-label', showing() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  label();
  btn.addEventListener('click', () => {
    const next = showing() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode: still switches for this page */ }
    label();
  });
})();
