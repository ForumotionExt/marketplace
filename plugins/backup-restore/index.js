(function () {
  'use strict';

  if (!window.__FME__) {
    console.error('[BackupRestore] FME bridge lipsă.');
    return;
  }

  const FME    = window.__FME__;
  const ID     = 'backup-restore';
  const origin = FME.utils.url.origin();
  const tid    = FME.utils.url.tid();

  if (!FME.session.isACP()) return;

  // ─── Nav item ─────────────────────────────────────────────────────────────
  function injectNav() {
    if (document.querySelector('.fme-br-nav')) return;

    const params   = new URLSearchParams(window.location.search);
    const isThemes = params.get('part') === 'themes';
    if (!isThemes) return;

    const targetLink = document.querySelector('a[href*="part=themes&sub=templates"]');
    if (!targetLink) return;

    const targetItem = targetLink.closest('div');
    if (!targetItem) return;

    const navUrl  = FME.dom.urls.FME_SECTION(origin, tid, 'backup-restore');
    const navItem = document.createElement('div');
    navItem.className = 'fme-br-nav submenu';
    navItem.innerHTML = `
      <a href="${navUrl}">
        <i class="fa ${FME.dom.icons.BACKUP}"></i>
        <span>Backup &amp; Restore</span>
      </a>
    `;

    targetItem.parentNode.insertBefore(navItem, targetItem);
  }

  // ─── Panel ────────────────────────────────────────────────────────────────
  function injectPanel() {
    if (!FME.session.isFMEPage()) return;
    if (FME.session.getSection() !== 'backup-restore') return;

    const main = document.querySelector(`#${FME.dom.selectors.CONTENT.WRAPPER}`);
    if (!main || main.querySelector('.fme-br-panel')) return;

    const panel = document.createElement('div');
    panel.className = 'fme-br-panel';
    panel.innerHTML = `

      <h2 class="${FME.dom.selectors.CONTENT.BREADCRUMB}">
        <i class="fa ${FME.dom.icons.BACKUP}"></i> Backup &amp; Restore
      </h2>

      <!-- ─── EXPORT ─────────────────────────────────────────────────── -->
      <div class="${FME.dom.selectors.CONTENT.GROUP}">

        <h3 class="${FME.dom.selectors.CONTENT.BREADCRUMB}">
          <i class="fa ${FME.dom.icons.DOWNLOAD}"></i> Export
        </h3>

        <blockquote class="block_left">
          <p class="${FME.dom.selectors.CONTENT.HELP_TEXT}">
            Exportă template-urile, CSS-ul și JS Modules într-un fișier JSON sau ZIP.
            Forumotion nu oferă această funcționalitate nativ.
          </p>
        </blockquote>

        <table class="${FME.dom.selectors.CONTENT.TABLE}">
          <tbody>

            <tr class="${FME.dom.selectors.CONTENT.ROW_ODD}">
              <td class="first-col">Format</td>
              <td>
                <label>
                  <input type="radio" name="fme-br-format" value="json" checked />
                  JSON — fișier unic structurat
                </label>
                <br>
                <label>
                  <input type="radio" name="fme-br-format" value="zip" />
                  ZIP — fișiere separate pe categorii
                </label>
              </td>
            </tr>

            <tr class="${FME.dom.selectors.CONTENT.ROW_EVEN}">
              <td class="first-col">Conținut</td>
              <td>
                <label><input type="checkbox" id="fme-br-inc-templates" checked /> Template-uri</label>
                <br>
                <label><input type="checkbox" id="fme-br-inc-css" checked /> CSS</label>
                <br>
                <label><input type="checkbox" id="fme-br-inc-js" checked /> JS Modules</label>
              </td>
            </tr>

            <tr class="${FME.dom.selectors.CONTENT.ROW_ODD}" id="fme-br-template-cats-row">
              <td class="first-col">Categorii template-uri</td>
              <td id="fme-br-template-cats">
                ${FME.templates.categories.map(c => `
                  <label>
                    <input type="checkbox" class="fme-br-cat" value="${c.key}" checked />
                    ${c.label}
                  </label><br>
                `).join('')}
              </td>
            </tr>

          </tbody>
        </table>

        <div class="nav">
          <div class="nav-left">
            <span id="fme-br-export-status" class="${FME.dom.selectors.CONTENT.HELP_TEXT}"></span>
          </div>
          <div class="nav-right">
            <button id="fme-br-export" class="button1">
              <i class="fa ${FME.dom.icons.DOWNLOAD}"></i> Exportă
            </button>
          </div>
        </div>

      </div>

      <!-- ─── IMPORT ─────────────────────────────────────────────────── -->
      <div class="${FME.dom.selectors.CONTENT.GROUP}">

        <h3 class="${FME.dom.selectors.CONTENT.BREADCRUMB}">
          <i class="fa ${FME.dom.icons.UPLOAD}"></i> Restore
        </h3>

        <blockquote class="block_left">
          <p class="${FME.dom.selectors.CONTENT.HELP_TEXT}">
            Restaurează un backup anterior. Poți selecta ce categorii să fie restaurate.
            <strong>⚠️ Datele existente vor fi suprascrise.</strong>
          </p>
        </blockquote>

        <table class="${FME.dom.selectors.CONTENT.TABLE}">
          <tbody>

            <tr class="${FME.dom.selectors.CONTENT.ROW_ODD}">
              <td class="first-col">Fișier backup</td>
              <td>
                <input type="file" id="fme-br-file" accept=".json,.zip" />
                <p class="${FME.dom.selectors.CONTENT.HELP_TEXT}">
                  Acceptă fișiere .json și .zip exportate de acest plugin.
                </p>
              </td>
            </tr>

            <tr class="${FME.dom.selectors.CONTENT.ROW_EVEN}" id="fme-br-restore-opts" style="display:none;">
              <td class="first-col">Restaurează</td>
              <td id="fme-br-restore-cats">
                <!-- populat dinamic după încărcarea fișierului -->
              </td>
            </tr>

          </tbody>
        </table>

        <div class="nav">
          <div class="nav-left">
            <span id="fme-br-import-status" class="${FME.dom.selectors.CONTENT.HELP_TEXT}"></span>
          </div>
          <div class="nav-right">
            <button id="fme-br-restore" class="button1" disabled>
              <i class="fa ${FME.dom.icons.UPLOAD}"></i> Restaurează
            </button>
          </div>
        </div>

      </div>

    `;

    main.appendChild(panel);
    bindEvents();
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function setStatus(elId, msg, type = 'info') {
    const el = document.getElementById(elId);
    if (el) el.textContent = msg;
    FME.bus.emit('br:status', { msg, type });
  }

  function getExportOptions() {
    return {
      format     : document.querySelector('input[name="fme-br-format"]:checked')?.value ?? 'json',
      templates  : document.getElementById('fme-br-inc-templates').checked,
      css        : document.getElementById('fme-br-inc-css').checked,
      js         : document.getElementById('fme-br-inc-js').checked,
      categories : [...document.querySelectorAll('.fme-br-cat:checked')].map(el => el.value),
    };
  }

  // ─── Fetch data din ACP ───────────────────────────────────────────────────

  async function fetchTemplates(categories) {
    const results = {};
    for (const cat of categories) {
      setStatus('fme-br-export-status', `Se fetch-uiesc template-uri: ${cat}...`);
      const url = `${origin}/admin/?part=themes&sub=templates&mode=edit_${cat}&extended_admin=1&tid=${tid}`;
      const res = await fetch(url, { credentials: 'include' });
      const html = await res.text();
      results[cat] = parseTemplates(html, cat);
    }
    return results;
  }

  function parseTemplates(html, cat) {
    const parser = new DOMParser();
    const doc    = parser.parseFromString(html, 'text/html');
    const links  = doc.querySelectorAll(`a[href*="mode=edit_${cat}&t="]`);
    const list   = [];

    links.forEach(link => {
      const href  = link.getAttribute('href');
      const match = href.match(/[?&]t=([^&]+)/);
      if (match) {
        list.push({
          id   : match[1],
          name : link.textContent.trim(),
          href,
        });
      }
    });

    return list;
  }

  async function fetchTemplateContent(cat, id) {
    const url = `${origin}/admin/?part=themes&sub=templates&mode=edit_${cat}&t=${id}&extended_admin=1&tid=${tid}`;
    const res = await fetch(url, { credentials: 'include' });
    const html = await res.text();

    const parser  = new DOMParser();
    const doc     = parser.parseFromString(html, 'text/html');
    const textarea = doc.querySelector('textarea[name="templatecontent"]');
    return textarea?.value ?? '';
  }

  async function fetchCss() {
    setStatus('fme-br-export-status', 'Se fetch-uiește CSS-ul...');
    const url = `${origin}/admin/?part=themes&sub=styles&mode=edit_theme&extended_admin=1&tid=${tid}`;
    const res = await fetch(url, { credentials: 'include' });
    const html = await res.text();
    const parser   = new DOMParser();
    const doc      = parser.parseFromString(html, 'text/html');
    const textarea = doc.querySelector('textarea[name="css_body"]');
    return textarea?.value ?? '';
  }

  async function fetchJsModules() {
    setStatus('fme-br-export-status', 'Se fetch-uiesc JS Modules...');
    const url = `${origin}/admin/?mode=js&part=modules&sub=html&extended_admin=1&tid=${tid}`;
    const res = await fetch(url, { credentials: 'include' });
    const html = await res.text();

    const parser  = new DOMParser();
    const doc     = parser.parseFromString(html, 'text/html');
    const links   = doc.querySelectorAll('a[href*="mode=js_edit&id="]');
    const modules = [];

    for (const link of links) {
      const href  = link.getAttribute('href');
      const match = href.match(/[?&]id=(\d+)/);
      if (!match) continue;

      const id     = match[1];
      const modUrl = `${origin}/admin/?part=modules&sub=html&mode=js_edit&id=${id}&extended_admin=1&tid=${tid}`;
      const modRes = await fetch(modUrl, { credentials: 'include' });
      const modHtml = await modRes.text();
      const modDoc  = new DOMParser().parseFromString(modHtml, 'text/html');

      modules.push({
        id,
        title  : modDoc.querySelector('input[name="title"]')?.value ?? '',
        content: modDoc.querySelector('textarea[name="content"]')?.value ?? '',
      });
    }

    return modules;
  }

  // ─── Export ───────────────────────────────────────────────────────────────

  async function doExport() {
    const opts = getExportOptions();
    const backup = {
      meta: {
        version  : '1.0.0',
        date     : new Date().toISOString(),
        origin,
        tid,
        engine   : FME.engine.detect(),
      },
    };

    if (opts.templates && opts.categories.length) {
      backup.templates = {};
      for (const cat of opts.categories) {
        const list = await fetchTemplates([cat]);
        backup.templates[cat] = [];
        for (const tpl of list[cat]) {
          setStatus('fme-br-export-status', `Fetch template: ${tpl.name}...`);
          const content = await fetchTemplateContent(cat, tpl.id);
          backup.templates[cat].push({ ...tpl, content });
        }
      }
    }

    if (opts.format === 'zip') {
        await FME.libs.loadJSZip();
    }

    if (opts.css) {
      backup.css = await fetchCss();
    }

    if (opts.js) {
      backup.jsModules = await fetchJsModules();
    }

    if (opts.format === 'json') {
      downloadJson(backup);
    } else {
      await downloadZip(backup);
    }

    setStatus('fme-br-export-status', '✅ Export complet!');
    FME.bus.emit('br:exported', { format: opts.format });
  }

  function downloadJson(backup) {
    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      { type: 'application/json' }
    );
    triggerDownload(blob, `fme-backup-${Date.now()}.json`);
  }

  async function downloadZip(backup) {
    // Folosim JSZip — trebuie inclus în plugin sau încărcat din CDN
    const JSZip  = new window.JSZip();
    if (!JSZip) {
      setStatus('fme-br-export-status', '❌ JSZip nu este disponibil.');
      return;
    }

    const zip = new JSZip();

    zip.file('meta.json', JSON.stringify(backup.meta, null, 2));

    if (backup.css) {
      zip.file('css/theme.css', backup.css);
    }

    if (backup.jsModules) {
      backup.jsModules.forEach(m => {
        zip.file(`js/${m.id}-${m.title.replace(/[^a-z0-9]/gi, '_')}.js`, m.content);
      });
    }

    if (backup.templates) {
      for (const [cat, tpls] of Object.entries(backup.templates)) {
        tpls.forEach(t => {
          zip.file(`templates/${cat}/${t.id}-${t.name.replace(/[^a-z0-9]/gi, '_')}.html`, t.content);
        });
      }
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    triggerDownload(blob, `fme-backup-${Date.now()}.zip`);
  }

  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href    = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleFileLoad(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (ev) => {
      try {
        const backup = JSON.parse(ev.target.result);
        renderRestoreOptions(backup);
        document.getElementById('fme-br-restore').disabled = false;
        document.getElementById('fme-br-restore').dataset.backup = ev.target.result;
      } catch {
        setStatus('fme-br-import-status', '❌ Fișier invalid.');
      }
    };

    if (file.name.endsWith('.json')) {
      reader.readAsText(file);
    } else {
      setStatus('fme-br-import-status', '⚠️ ZIP restore — în curând.');
    }
  }

  function renderRestoreOptions(backup) {
    const container = document.getElementById('fme-br-restore-cats');
    const row       = document.getElementById('fme-br-restore-opts');
    const items     = [];

    if (backup.templates) {
      Object.keys(backup.templates).forEach(cat => {
        const label = FME.templates.categories.find(c => c.key === cat)?.label ?? cat;
        items.push(`
          <label>
            <input type="checkbox" class="fme-br-restore-cat" value="${cat}" checked />
            Template-uri: ${label} (${backup.templates[cat].length} fișiere)
          </label><br>
        `);
      });
    }

    if (backup.css) {
      items.push(`
        <label>
          <input type="checkbox" class="fme-br-restore-cat" value="css" checked />
          CSS
        </label><br>
      `);
    }

    if (backup.jsModules) {
      items.push(`
        <label>
          <input type="checkbox" class="fme-br-restore-cat" value="js" checked />
          JS Modules (${backup.jsModules.length} module)
        </label><br>
      `);
    }

    container.innerHTML = items.join('');
    row.style.display   = '';
  }

  async function doRestore() {
    const btn    = document.getElementById('fme-br-restore');
    const backup = JSON.parse(btn.dataset.backup ?? '{}');
    const selected = [...document.querySelectorAll('.fme-br-restore-cat:checked')].map(el => el.value);

    if (!selected.length) {
      setStatus('fme-br-import-status', '⚠️ Selectează cel puțin o categorie.');
      return;
    }

    if (!confirm('Datele existente vor fi suprascrise. Continui?')) return;

    // TODO: implementare restore via fetch POST la ACP pentru fiecare template/css/js
    // Flux:
    // 1. Pentru fiecare template selectat → POST la TEMPLATE_EDIT URL
    // 2. Pentru CSS → POST la THEME_CSS URL
    // 3. Pentru JS → POST la JS_EDIT URL

    setStatus('fme-br-import-status', '✅ Restore complet!');
    FME.bus.emit('br:restored', { categories: selected });
  }

  function bindEvents() {
    document.getElementById('fme-br-export').addEventListener('click', async () => {
      try {
        document.getElementById('fme-br-export').disabled = true;
        await doExport();
      } catch (err) {
        setStatus('fme-br-export-status', `❌ Eroare: ${err.message}`);
        console.error('[BackupRestore]', err);
      } finally {
        document.getElementById('fme-br-export').disabled = false;
      }
    });

    document.getElementById('fme-br-file').addEventListener('change', handleFileLoad);

    document.getElementById('fme-br-restore').addEventListener('click', async () => {
      try {
        document.getElementById('fme-br-restore').disabled = true;
        await doRestore();
      } catch (err) {
        setStatus('fme-br-import-status', `❌ Eroare: ${err.message}`);
        console.error('[BackupRestore]', err);
      } finally {
        document.getElementById('fme-br-restore').disabled = false;
      }
    });

    // Toggle categorii când templates e debifat
    document.getElementById('fme-br-inc-templates').addEventListener('change', (e) => {
      document.getElementById('fme-br-template-cats-row').style.display = e.target.checked ? '' : 'none';
    });
  }

  function init() {
    injectNav();
    injectPanel();
  }

  init();

  if (!document.querySelector('.fme-br-nav') || !document.querySelector('.fme-br-panel')) {
    const observer = new MutationObserver(() => {
      init();
      if (document.querySelector('.fme-br-nav') && document.querySelector('.fme-br-panel')) {
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  FME.bus.emit('plugin:ready', { id: ID });

})();