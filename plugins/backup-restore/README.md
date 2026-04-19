# 🗄️ Backup & Restore

> Export complet (template-uri + CSS + JS Modules) într-un fișier JSON sau ZIP. Restaurare selectivă pe categorii. Forumotion nu oferă asta nativ.

---

## 📦 Informații

| Câmp | Valoare |
|---|---|
| **ID** | `backup-restore` |
| **Versiune** | `1.0.0` |
| **Autor** | FME Team |
| **Categorie** | Performance |
| **Hook** | `acp` |
| **FME minim** | `1.4.0` |
| **Plătit** | Nu |

---

## 📋 Descriere

Plugin-ul **Backup & Restore** permite administratorilor să exporte și să restaureze complet conținutul forumului — template-uri, CSS și JS Modules — direct din panoul de administrare Forumotion.

Forumotion nu oferă această funcționalitate nativ. Plugin-ul accesează ACP-ul cu sesiunea autentificată și construiește un backup structurat, exportabil în format **JSON** sau **ZIP**.

---

## 🚀 Funcționalități

- 📥 **Export JSON** — fișier unic structurat cu tot conținutul selectat
- 📦 **Export ZIP** — fișiere separate pe categorii (templates/css/js)
- ♻️ **Restore selectiv** — alegi exact ce categorii să fie restaurate
- 🗂️ **Categorii template-uri** — selectezi individual din cele 9 categorii FM
- 💾 **Include JS Modules** — exportă și codul JS custom din ACP
- ⚠️ **Confirmare înainte de restore** — protecție împotriva suprascrierii accidentale

---

## ⚙️ Setări

| Setare | Tip | Default | Descriere |
|---|---|---|---|
| `includeTemplates` | `checkbox` | `true` | Include template-urile în export |
| `includeCss` | `checkbox` | `true` | Include CSS-ul temei |
| `includeJs` | `checkbox` | `true` | Include JS Modules |
| `exportFormat` | `select` | `json` | Formatul exportului: `json` sau `zip` |

---

## 📁 Structură

```
backup-restore/
├── plugin.json   — manifest
├── index.js      — codul principal
├── style.css     — stiluri
└── preview.png   — previzualizare marketplace
```

---

## 📂 Structura fișierului de backup

### JSON
```json
{
  "meta": {
    "version": "1.0.0",
    "date": "2026-04-19T12:00:00.000Z",
    "origin": "https://forum.forumotion.com",
    "tid": "abc123",
    "engine": "prosilver"
  },
  "templates": {
    "main": [
      { "id": "1", "name": "overall_header", "content": "..." }
    ]
  },
  "css": "body { ... }",
  "jsModules": [
    { "id": "42", "title": "[FME Plugin] SEO Tools", "content": "..." }
  ]
}
```

### ZIP
```
fme-backup-1234567890.zip
├── meta.json
├── css/
│   └── theme.css
├── js/
│   └── 42-FME_Plugin_SEO_Tools.js
└── templates/
    ├── main/
    │   └── 1-overall_header.html
    └── portal/
```

---

## 🔌 Dependințe

Necesită **FME Bridge** (`window.__FME__`) cu cel puțin:

- `FME.session` — `isACP()`, `isFMEPage()`, `getSection()`
- `FME.utils.url` — `origin()`, `tid()`, `param()`
- `FME.dom` — `urls`, `icons`, `selectors`
- `FME.templates` — `categories`
- `FME.engine` — `detect()`
- `FME.bus` — `emit()`
- `FME.ui` — `toast()`
- `FME.libs` — `loadJSZip()` *(pentru export ZIP)*

---

## 🛠️ Instalare

1. Deschide **FME → Plugins → Marketplace**
2. Caută `Backup & Restore`
3. Apasă **Instalează**
4. Navighează la **Teme** — vei vedea linkul **Backup & Restore** adăugat în meniu

---

## 📖 Utilizare

### Export
1. Mergi la **Teme → Backup & Restore**
2. Selectează **formatul** — JSON sau ZIP
3. Bifează ce vrei să incluzi — template-uri, CSS, JS
4. Selectează **categoriile de template-uri**
5. Apasă **Exportă** — fișierul se descarcă automat

### Restore
1. Apasă **Alege fișier** și selectează un backup `.json` sau `.zip`
2. Plugin-ul analizează fișierul și afișează categoriile disponibile
3. Bifează ce vrei să restaurezi
4. Apasă **Restaurează** și confirmă
5. ⚠️ Datele existente vor fi **suprascrise**

---

## ⚠️ Riscuri

- Restaurarea este **ireversibilă** — fă întotdeauna un export înainte de restore
- Un backup incomplet (export întrerupt) poate produce un restore parțial
- JS Modules suprascrise pot afecta funcționalitatea forumului
- Backup-urile sunt legate de `tid` — pot fi incompatibile între forumuri diferite

---

## 📝 Changelog

### 1.0.0 — 2026-04-19
- Lansare inițială
- Export JSON și ZIP
- Fetch template-uri, CSS și JS Modules din ACP
- Restaurare selectivă pe categorii
- Integrare vizuală nativă cu ACP Forumotion

---

## 📄 Licență

MIT — [FME Team](https://github.com/ForumotionExt)
