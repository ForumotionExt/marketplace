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
      <h2 class="home">FME Plugins</h2>
      <ul class="h2-breadcrumb"><li class="first">Search & Replace</li></ul>
      <blockquote class="block_left">
        <p class="explain">
          Acest plugin permite căutarea și înlocuirea în bulk a textului din template-urile și CSS-ul forumului tău.
          Funcționează direct din panoul de administrare Forumotion, fără a fi nevoie să editezi fiecare template manual.
          <br><br>
          <strong>Cum funcționează:</strong> Plugin-ul parcurge toate template-urile din categoria selectată,
          caută textul specificat și îl înlocuiește automat. Poți previzualiza rezultatele înainte de a aplica modificările.
          <br><br>
          <strong>⚠️ Riscuri:</strong> Operațiunea este <strong>ireversibilă</strong> — nu există undo după execuție.
          O căutare prea generică (ex: <code>a</code>, <code>div</code>) poate modifica sute de template-uri simultan.
          Se recomandă un <strong>backup</strong> înainte de utilizare și folosirea opțiunii <strong>Preview</strong>
          pentru a verifica rezultatele înainte de a executa înlocuirea.
        </p>
      </blockquote>

      <div class="${FME.dom.content.GROUP}">
        <p>
          Caută și înlocuiește text în bulk în template-urile și CSS-ul forumului.
          <strong>⚠️ Operațiunea este ireversibilă.</strong> Folosește Preview înainte de execuție.
        </p>

        <table class="${FME.dom.content.TABLE}">
          <tbody>
            <tr class="${FME.dom.content.ROW_ODD}">
              <td class="first-col"><label for="fme-bsr-scope">Scope</label></td>
              <td>
                <select id="fme-bsr-scope">
                  <option value="all">Tot forumul</option>
                  <option value="templates">Doar template-uri</option>
                  <option value="css">Doar CSS</option>
                </select>
                <p>Zona în care se va efectua căutarea.</p>
              </td>
            </tr>

            <tr class="${FME.dom.content.ROW_EVEN}">
              <td class="first-col"><label for="fme-bsr-search">Caută</label></td>
              <td>
                <input type="text" id="fme-bsr-search" placeholder="Text de căutat..." />
                <p>Textul exact pe care vrei să îl găsești.</p>
              </td>
            </tr>

            <tr class="${FME.dom.content.ROW_ODD}">
              <td class="first-col"><label for="fme-bsr-replace">Înlocuiește cu</label></td>
              <td>
                <input type="text" id="fme-bsr-replace" placeholder="Lasă gol pentru a șterge..." />
                <p>Textul cu care va fi înlocuit. Gol = ștergere.</p>
              </td>
            </tr>

            <tr class="${FME.dom.content.ROW_EVEN}">
              <td class="first-col"><label for="fme-bsr-case">Case sensitive</label></td>
              <td>
                <input type="checkbox" id="fme-bsr-case" />
                <p>Dacă e activ, "Text" și "text" sunt tratate diferit.</p>
              </td>
            </tr>

          </tbody>
        </table>

        <div class="nav div_btns">
          <button id="fme-bsr-preview" class="button2">
            <i class="fa fa-eye"></i> Preview
          </button>
          <button id="fme-bsr-run" class="button1">
            <i class="fa ${FME.dom.icons.CHECK}"></i> Execută
          </button>
        </div>

      </div>

      <div id="fme-bsr-results" style="display:none;">
        <div class="${FME.dom.content.GROUP}">
          <h3 class="${FME.dom.content.BREADCRUMB}">
            <i class="fa ${FME.dom.icons.INFO}"></i> Rezultate
          </h3>
          <table class="${FME.dom.content.TABLE}">
            <thead>
              <tr>
                <th>Template</th>
                <th>Previzualizare</th>
              </tr>
            </thead>
            <tbody id="fme-bsr-results-list"></tbody>
          </table>
        </div>
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
        list.innerHTML = `
          <tr class="${FME.dom.content.ROW_ODD}">
            <td colspan="2" class="${FME.dom.content.HELP_TEXT}">Niciun rezultat găsit.</td>
          </tr>`;
      } else {
        list.innerHTML = matches.map((m, i) => `
          <tr class="${i % 2 === 0 ? FME.dom.content.ROW_ODD : FME.dom.content.ROW_EVEN}">
            <td><strong>${m.template}</strong></td>
            <td><pre>${m.preview}</pre></td>
          </tr>
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