(function () {
  'use strict';

  if (!window.__FME__) {
    console.error('[BulkSearchReplace] FME bridge lipsă.');
    return;
  }

  const FME    = window.__FME__;
  const ID     = 'bulk-search-replace';
  const origin = FME.utils.url.origin();
  const tid    = FME.utils.url.tid();

  if (!FME.session.isACP()) return;

  function injectNav() {
    const isThemes = FME.utils.url.param('part') === 'themes';
    if (!isThemes) return;

    const targetLink = document.querySelector('a[href*="part=themes&sub=templates"]');
    if (!targetLink) {
      console.warn('[BulkSearchReplace] Link target nu a fost găsit.');
      return;
    }

    const targetItem = targetLink.closest('div');
    if (!targetItem) return;
    if (document.querySelector('.fme-bsr-nav')) return;

    const navUrl  = FME.dom.urls.FME_SECTION(origin, tid, 'bulk-search-replace');
    const navItem = document.createElement('div');
    navItem.className = 'fme-bsr-nav submenu'
    navItem.innerHTML = `
      <a href="${navUrl}">
        <i class="fa ${FME.dom.icons.EDIT}"></i>
        <span>Search & Replace</span>
      </a>
    `;

    targetItem.parentNode.insertBefore(navItem, targetItem);
  }

  function injectPanel() {
    if (!FME.session.isFMEPage()) return;
    if (FME.session.getSection() !== 'bulk-search-replace') return;

    const main = document.querySelector(`#${FME.dom.selectors.CONTENT.WRAPPER}`);
    if (!main) return;
    if (main.querySelector('.fme-bsr-panel')) return;

    const panel = document.createElement('div');
    panel.className = 'fme-bsr-panel';
    panel.innerHTML = `
      <h2 class="${FME.dom.selectors.CONTENT.BREADCRUMB}">
        <i class="fa ${FME.dom.icons.EDIT}"></i> Search &amp; Replace
      </h2>

      <div class="${FME.dom.selectors.CONTENT.GROUP}">

        <div class="fme-bsr-form">

          <div class="fme-bsr-row">
            <label>Scope</label>
            <select id="fme-bsr-scope">
              <option value="all">Tot forumul</option>
              <option value="templates">Doar template-uri</option>
              <option value="css">Doar CSS</option>
            </select>
          </div>

          <div class="fme-bsr-row">
            <label>Caută</label>
            <input type="text" id="fme-bsr-search" placeholder="Text de căutat..." />
          </div>

          <div class="fme-bsr-row">
            <label>Înlocuiește cu</label>
            <input type="text" id="fme-bsr-replace" placeholder="Text de înlocuit..." />
          </div>

          <div class="fme-bsr-row">
            <label>
              <input type="checkbox" id="fme-bsr-case" />
              Case sensitive
            </label>
          </div>

          <div class="fme-bsr-actions">
            <button id="fme-bsr-preview" class="fme-btn">
              <i class="fa ${FME.dom.icons.INFO}"></i> Preview
            </button>
            <button id="fme-bsr-run" class="fme-btn fme-btn-primary">
              <i class="fa ${FME.dom.icons.CHECK}"></i> Execută
            </button>
          </div>

        </div>

        <div id="fme-bsr-results" class="fme-bsr-results" style="display:none;">
          <h3>Rezultate</h3>
          <div id="fme-bsr-results-list"></div>
        </div>

      </div>
    `;

    main.appendChild(panel);
    bindEvents();
    FME.settings.get(ID).then(cfg => {
      if (cfg.searchScope)  document.getElementById('fme-bsr-scope').value   = cfg.searchScope;
      if (cfg.caseSensitive) document.getElementById('fme-bsr-case').checked = cfg.caseSensitive;
    });
  }

  function bindEvents() {
    function getFormValues() {
      return {
        search       : document.getElementById('fme-bsr-search').value.trim(),
        replace      : document.getElementById('fme-bsr-replace').value.trim(),
        scope        : document.getElementById('fme-bsr-scope').value,
        caseSensitive: document.getElementById('fme-bsr-case').checked,
      };
    }

    function showResults(matches) {
      const container = document.getElementById('fme-bsr-results');
      const list      = document.getElementById('fme-bsr-results-list');

      if (!matches.length) {
        list.innerHTML = `<p class="${FME.dom.selectors.CONTENT.HELP_TEXT}">Niciun rezultat găsit.</p>`;
      } else {
        list.innerHTML = matches.map(m => `
          <div class="fme-bsr-match">
            <strong>${m.template}</strong>
            <pre>${m.preview}</pre>
          </div>
        `).join('');
      }

      container.style.display = 'block';
    }

    document.getElementById('fme-bsr-preview').addEventListener('click', async () => {
      const { search, scope, caseSensitive } = getFormValues();

      if (!search) {
        FME.ui.toast('Introduceți textul de căutat.', 'warn');
        return;
      }

      FME.ui.toast('Se caută...', 'info');

      // Salvăm preferințele
      await FME.settings.save(ID, { searchScope: scope, caseSensitive });

      // TODO: apelează FMInjector sau ForumotionAPI pentru a fetch template-urile
      // și caută textul în ele — implementare specifică FM
      const matches = []; // rezultatele căutării

      showResults(matches);
    });

    document.getElementById('fme-bsr-run').addEventListener('click', async () => {
      const { search, replace, scope, caseSensitive } = getFormValues();

      if (!search) {
        FME.ui.toast('Introduceți textul de căutat.', 'warn');
        return;
      }

      const confirmed = confirm(`Înlocuiești "${search}" cu "${replace}" în ${scope}. Continui?`);
      if (!confirmed) return;

      FME.ui.toast('Se execută...', 'info');

      // TODO: fetch templates, înlocuiește, salvează înapoi via ForumotionAPI
      // Exemplu flux:
      // 1. fetch lista template-uri din ACP
      // 2. pentru fiecare template, fetch conținut
      // 3. înlocuiește search → replace (cu flag caseSensitive)
      // 4. salvează template modificat

      FME.bus.emit('bsr:done', { search, replace, scope });
      FME.ui.toast('Înlocuire completă!', 'success');
    });
  }

  function init() {
    injectNav();
    injectPanel();
  }

  init();

  if (!document.querySelector('.fme-bsr-nav') || !document.querySelector('.fme-bsr-panel')) {
    const observer = new MutationObserver(() => {
      init();
      
      if (document.querySelector('.fme-bsr-nav') && document.querySelector('.fme-bsr-panel')) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  FME.bus.emit('plugin:ready', { id: ID });
})();