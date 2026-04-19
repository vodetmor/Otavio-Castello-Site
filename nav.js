// ── SHARED NAV + FOOTER ──────────────────────────────
(function () {
  const pages = [
    { href: 'index.html',       label: 'Home' },
    { href: 'sobre.html',       label: 'Sobre' },
    { href: 'repositorio.html', label: 'Repositório' },
    { href: 'horizonte.html',   label: 'Horizonte Claro' },
    { href: 'contato.html',     label: 'Contato' },
  ];

  const current = location.pathname.split('/').pop() || 'index.html';

  // ── NAV ──
  const nav = document.getElementById('nav');
  nav.innerHTML = `
    <a class="nav-logo" href="index.html" aria-label="Início"></a>
    <ul class="nav-links">
      ${pages.map(p => `
        <li><a href="${p.href}" class="${current === p.href ? 'active' : ''}">${p.label}</a></li>
      `).join('')}
    </ul>
    <button class="nav-burger" id="burger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  `;

  // mobile overlay
  const mobile = document.createElement('nav');
  mobile.className = 'nav-mobile';
  mobile.id = 'nav-mobile';
  mobile.innerHTML = pages.map(p =>
    `<a href="${p.href}" class="${current === p.href ? 'active' : ''}">${p.label}</a>`
  ).join('');
  document.body.prepend(mobile);

  document.getElementById('burger').addEventListener('click', () => {
    document.getElementById('burger').classList.toggle('open');
    mobile.classList.toggle('open');
  });

  // scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // ── FOOTER ──
  const footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="nav-logo">Dr. Otávio <span>Castello</span></div>
            <p>Geriatria · Psiquiatria Forense · Perícia Médica</p>
          </div>
          <div class="footer-col">
            <h4>Páginas</h4>
            ${pages.map(p => `<a href="${p.href}">${p.label}</a>`).join('')}
          </div>
          <div class="footer-col">
            <h4>Contato</h4>
            <a href="tel:+556132440040">(61) 3244-0040</a>
            <a href="http://lattes.cnpq.br/6172644291323202" target="_blank" rel="noopener noreferrer">Currículo Lattes</a>
          </div>
          <div class="footer-col">
            <h4>Horizonte Claro</h4>
            <p>Geriatria, Psiquiatria e Perícia</p>
            <a href="tel:+556132440040">(61) 3244-0040</a>
            <a href="horizonte.html">Saiba mais →</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Dr. Otávio Castello. Todos os direitos reservados.</span>
          <span>CRM/DF · RQE 9.937 · RQE 18.748</span>
        </div>
      </div>
    `;
  }

  // ── SCROLL REVEAL ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
