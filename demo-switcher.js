// ─────────────────────────────────────────────────────────────
// DEMO SWITCHER — only for client approval, not part of final site
// Remove the <script src="demo-switcher.js"></script> tag from each
// HTML page to disable before go-live.
// ─────────────────────────────────────────────────────────────
(function () {
  const WA_DEV = 'https://wa.me/5561985831569?text=' + encodeURIComponent('Olá, Vítor! Vi a demonstração do site do Dr. Otávio Castello e gostaria de avançar.');

  // Inject light theme stylesheet
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'theme-light.css';
  document.head.appendChild(link);

  // Apply saved theme
  const saved = localStorage.getItem('demo-theme') || 'dark';
  if (saved === 'light') document.documentElement.classList.add('theme-light');

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    /* ── FAB ── */
    .demo-fab {
      position: fixed; bottom: 24px; right: 24px; z-index: 9997;
      width: 60px; height: 60px; border-radius: 50%;
      background: #c9a84c; color: #0A0D18;
      border: none; cursor: pointer;
      box-shadow: 0 10px 30px rgba(0,0,0,0.35), 0 0 0 0 rgba(201,168,76,0.55);
      display: flex; align-items: center; justify-content: center;
      transition: transform .25s ease, box-shadow .25s;
      font-family: 'Inter', sans-serif;
      animation: demoPulse 2.4s ease-out infinite;
    }
    .demo-fab:hover { transform: scale(1.08); }
    .demo-fab svg { width: 26px; height: 26px; fill: currentColor; }
    @keyframes demoPulse {
      0%   { box-shadow: 0 10px 30px rgba(0,0,0,0.35), 0 0 0 0 rgba(201,168,76,0.55); }
      70%  { box-shadow: 0 10px 30px rgba(0,0,0,0.35), 0 0 0 20px rgba(201,168,76,0); }
      100% { box-shadow: 0 10px 30px rgba(0,0,0,0.35), 0 0 0 0 rgba(201,168,76,0); }
    }

    /* ── PANEL ── */
    .demo-panel {
      position: fixed; bottom: 100px; right: 24px; z-index: 9997;
      width: 340px; max-width: calc(100vw - 32px);
      background: #0F1325; color: #f8f9fb;
      border: 1px solid rgba(201,168,76,0.35);
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      font-family: 'Inter', sans-serif;
      padding: 1.6rem;
      transform: translateY(20px) scale(.95); opacity: 0;
      pointer-events: none;
      transition: transform .3s cubic-bezier(.2,.8,.2,1), opacity .25s;
    }
    .demo-panel.open { transform: none; opacity: 1; pointer-events: auto; }
    .demo-panel h4 {
      font-size: .68rem; font-weight: 600;
      letter-spacing: .15em; text-transform: uppercase;
      color: #c9a84c; margin-bottom: .5rem;
    }
    .demo-panel p.lead {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.35rem; color: #f8f9fb; line-height: 1.25;
      margin-bottom: 1rem; font-weight: 500;
    }
    .demo-panel p.sub {
      font-size: .82rem; color: #8892a4; line-height: 1.6;
      margin-bottom: 1.25rem;
    }
    .demo-themes { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; margin-bottom: 1.25rem; }
    .demo-theme-btn {
      padding: 1rem .75rem; border: 1px solid rgba(255,255,255,0.1);
      background: transparent; color: #f8f9fb;
      cursor: pointer; font-family: inherit;
      font-size: .78rem; font-weight: 500;
      transition: border-color .2s, background .2s;
      display: flex; flex-direction: column; gap: .5rem; align-items: center;
    }
    .demo-theme-btn:hover { border-color: #c9a84c; }
    .demo-theme-btn.active { border-color: #c9a84c; background: rgba(201,168,76,0.08); }
    .demo-swatch { width: 100%; height: 32px; border: 1px solid rgba(255,255,255,0.1); display: flex; }
    .demo-swatch span { flex: 1; }

    .demo-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 1rem 0; }

    .demo-cta {
      display: flex; align-items: center; justify-content: center; gap: .5rem;
      width: 100%; padding: .9rem 1rem;
      background: #25D366; color: #fff;
      border: none; cursor: pointer; font-family: inherit;
      font-size: .82rem; font-weight: 600;
      letter-spacing: .03em;
      text-decoration: none;
      transition: opacity .2s;
    }
    .demo-cta:hover { opacity: .88; }
    .demo-cta svg { width: 18px; height: 18px; fill: currentColor; }

    .demo-close {
      position: absolute; top: .6rem; right: .6rem;
      width: 30px; height: 30px; background: transparent;
      border: none; color: #8892a4; cursor: pointer;
      font-size: 1.4rem; line-height: 1; transition: color .2s;
    }
    .demo-close:hover { color: #f8f9fb; }

    /* ── WELCOME MODAL ── */
    .demo-modal-scrim {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(5,8,18,0.85);
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      padding: 1.5rem;
      opacity: 0; pointer-events: none;
      transition: opacity .4s ease;
    }
    .demo-modal-scrim.open { opacity: 1; pointer-events: auto; }
    .demo-modal {
      background: #0F1325; color: #f8f9fb;
      border: 1px solid rgba(201,168,76,0.35);
      box-shadow: 0 30px 80px rgba(0,0,0,0.6);
      font-family: 'Inter', sans-serif;
      max-width: 520px; width: 100%;
      padding: 2.5rem 2.25rem 2rem;
      position: relative;
      transform: translateY(30px) scale(.96);
      transition: transform .5s cubic-bezier(.2,.8,.2,1);
    }
    .demo-modal-scrim.open .demo-modal { transform: none; }
    .demo-modal .demo-eyebrow {
      font-size: .7rem; font-weight: 600;
      letter-spacing: .2em; text-transform: uppercase;
      color: #c9a84c; margin-bottom: 1rem;
      display: flex; align-items: center; gap: .75rem;
    }
    .demo-modal .demo-eyebrow::before {
      content: ''; width: 30px; height: 1px; background: #c9a84c;
    }
    .demo-modal h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.1rem; font-weight: 400; line-height: 1.1;
      margin-bottom: 1.25rem;
    }
    .demo-modal h2 em { color: #c9a84c; font-style: italic; }
    .demo-modal p {
      font-size: .95rem; line-height: 1.65; color: #d4d8e0;
      margin-bottom: 1rem;
    }
    .demo-modal p.small { font-size: .82rem; color: #8892a4; margin-bottom: 1.75rem; }
    .demo-modal .demo-actions {
      display: flex; gap: .75rem; flex-wrap: wrap;
    }
    .demo-modal .demo-btn {
      flex: 1; min-width: 140px;
      padding: .9rem 1.25rem;
      border: 1px solid #c9a84c;
      background: #c9a84c; color: #0A0D18;
      font-family: inherit; font-size: .78rem; font-weight: 600;
      letter-spacing: .12em; text-transform: uppercase;
      cursor: pointer; transition: opacity .2s;
    }
    .demo-modal .demo-btn:hover { opacity: .85; }
    .demo-modal .demo-btn.ghost {
      background: transparent; color: #f8f9fb;
      border-color: rgba(255,255,255,0.2);
    }
    .demo-modal .demo-btn.ghost:hover { border-color: #c9a84c; color: #c9a84c; }

    /* ── ARROW HINT (animated, after modal) ── */
    .demo-hint {
      position: fixed; bottom: 34px; right: 100px; z-index: 9998;
      pointer-events: none;
      opacity: 0; transform: translateX(20px);
      transition: opacity .5s ease, transform .5s ease;
      display: flex; align-items: center; gap: .75rem;
    }
    .demo-hint.show { opacity: 1; transform: none; }
    .demo-hint-bubble {
      background: #0F1325;
      border: 1px solid rgba(201,168,76,0.5);
      color: #f8f9fb;
      padding: .75rem 1rem;
      font-family: 'Inter', sans-serif;
      font-size: .82rem; font-weight: 500;
      white-space: nowrap;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      position: relative;
    }
    .demo-hint-bubble strong { color: #c9a84c; }
    .demo-hint-arrow {
      color: #c9a84c;
      animation: demoArrowBounce 1s ease-in-out infinite;
    }
    .demo-hint-arrow svg { display: block; width: 40px; height: 24px; }
    @keyframes demoArrowBounce {
      0%, 100% { transform: translateX(0); }
      50%      { transform: translateX(10px); }
    }
    .demo-hint-close {
      position: absolute; top: -8px; right: -8px;
      width: 22px; height: 22px; border-radius: 50%;
      background: #0F1325; border: 1px solid rgba(255,255,255,0.2);
      color: #8892a4; cursor: pointer; pointer-events: auto;
      font-size: .9rem; line-height: 1;
      display: flex; align-items: center; justify-content: center;
    }
    .demo-hint-close:hover { color: #f8f9fb; }

    @media (max-width: 600px) {
      .demo-fab { width: 54px; height: 54px; bottom: 16px; right: 16px; }
      .demo-panel { right: 16px; bottom: 82px; width: calc(100vw - 32px); }
      .demo-modal { padding: 2rem 1.5rem 1.5rem; }
      .demo-modal h2 { font-size: 1.7rem; }
      .demo-hint { display: none; }
    }
  `;
  document.head.appendChild(style);

  // ── FAB
  const fab = document.createElement('button');
  fab.className = 'demo-fab';
  fab.title = 'Trocar tema · Aprovar projeto';
  fab.setAttribute('aria-label', 'Abrir painel de aprovação');
  fab.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 22a10 10 0 010-20c5.5 0 10 4 10 9 0 5-3 7-7 7-1 0-1.5.5-1.5 1.5S12 22 12 22zm-5-9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>`;
  document.body.appendChild(fab);

  // ── PANEL
  const panel = document.createElement('div');
  panel.className = 'demo-panel';
  panel.innerHTML = `
    <button class="demo-close" aria-label="Fechar">×</button>
    <h4>Para o Dr. Otávio</h4>
    <p class="lead">Escolha o tema do seu portfólio.</p>
    <p class="sub">Visualize nos dois estilos abaixo e escolha qual combina mais com você.</p>
    <div class="demo-themes">
      <button class="demo-theme-btn" data-theme="dark">
        <div class="demo-swatch"><span style="background:#0A0D18"></span><span style="background:#c9a84c"></span><span style="background:#f8f9fb"></span></div>
        Escuro · Elegante
      </button>
      <button class="demo-theme-btn" data-theme="light">
        <div class="demo-swatch"><span style="background:#fbfaf6"></span><span style="background:#b8932f"></span><span style="background:#0A0D18"></span></div>
        Claro · Clínico
      </button>
    </div>
    <div class="demo-divider"></div>
    <p class="sub" style="margin-bottom:.85rem;">Gostou? Vamos finalizar:</p>
    <a href="${WA_DEV}" target="_blank" rel="noopener noreferrer" class="demo-cta">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.104 1.508 5.836L.057 23.571a.5.5 0 00.607.608l5.753-1.505A11.951 11.951 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
      Fale com o Vítor
    </a>
  `;
  document.body.appendChild(panel);

  // ── HINT ARROW
  const hint = document.createElement('div');
  hint.className = 'demo-hint';
  hint.innerHTML = `
    <div class="demo-hint-bubble">
      <button class="demo-hint-close" aria-label="Fechar dica">×</button>
      <strong>Toque este botão</strong> para escolher o tema
    </div>
    <div class="demo-hint-arrow">
      <svg viewBox="0 0 40 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h34M26 4l10 8-10 8"/></svg>
    </div>
  `;
  document.body.appendChild(hint);

  // ── WELCOME MODAL
  const modalScrim = document.createElement('div');
  modalScrim.className = 'demo-modal-scrim';
  modalScrim.innerHTML = `
    <div class="demo-modal">
      <div class="demo-eyebrow">Demonstração · Proposta de site</div>
      <h2>Olá, Dr. Otávio — <em>esta é uma prévia</em> do seu portfólio.</h2>
      <p>Este site foi construído por <strong>Vítor</strong> especialmente para sua avaliação. Navegue à vontade pelas páginas, conheça cada detalhe e, se gostar, basta dizer.</p>
      <p class="small">Você poderá alternar entre dois estilos visuais (escuro ou claro) usando o botão dourado que aparecerá no canto inferior direito.</p>
      <div class="demo-actions">
        <button class="demo-btn" id="demo-ok">Mostre-me o site</button>
        <a href="${WA_DEV}" target="_blank" rel="noopener noreferrer" class="demo-btn ghost">Fale com o Vítor</a>
      </div>
    </div>
  `;
  document.body.appendChild(modalScrim);

  // ── LOGIC
  const updateActive = () => {
    const isLight = document.documentElement.classList.contains('theme-light');
    panel.querySelectorAll('.demo-theme-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === (isLight ? 'light' : 'dark'));
    });
  };
  updateActive();

  fab.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
    hint.classList.remove('show');
    localStorage.setItem('demo-hint-seen', '1');
  });
  panel.querySelector('.demo-close').addEventListener('click', () => panel.classList.remove('open'));
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !fab.contains(e.target)) panel.classList.remove('open');
  });

  panel.querySelectorAll('.demo-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.theme;
      document.documentElement.classList.toggle('theme-light', t === 'light');
      localStorage.setItem('demo-theme', t);
      updateActive();
    });
  });

  // Modal: show on first visit, or if user clears storage
  const showHintLater = () => {
    if (localStorage.getItem('demo-hint-seen')) return;
    setTimeout(() => hint.classList.add('show'), 600);
    // auto-hide after 12s but keep available
    setTimeout(() => hint.classList.remove('show'), 14000);
  };

  const closeModal = () => {
    modalScrim.classList.remove('open');
    localStorage.setItem('demo-welcome-seen', '1');
    showHintLater();
  };

  modalScrim.querySelector('#demo-ok').addEventListener('click', closeModal);
  modalScrim.addEventListener('click', (e) => { if (e.target === modalScrim) closeModal(); });

  hint.querySelector('.demo-hint-close').addEventListener('click', () => {
    hint.classList.remove('show');
    localStorage.setItem('demo-hint-seen', '1');
  });

  if (!localStorage.getItem('demo-welcome-seen')) {
    // open the welcome after tiny delay so page settles
    setTimeout(() => modalScrim.classList.add('open'), 400);
  } else {
    // returning visit: show hint if not dismissed
    showHintLater();
  }
})();
