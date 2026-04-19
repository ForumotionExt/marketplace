# 🔍 Search & Replace

> Caută și înlocuiește text în bulk în template-urile forumului tău Forumotion.

---

## 📦 Informații

| Câmp | Valoare |
|---|---|
| **ID** | `bulk-search-replace` |
| **Versiune** | `1.0.0` |
| **Autor** | FME Team |
| **Categorie** | Moderation |
| **Hook** | `acp` |
| **FME minim** | `1.4.0` |
| **Plătit** | Nu |

---

## 📋 Descriere

Plugin-ul **Search & Replace** permite administratorilor să caute și să înlocuiască text în bulk în template-urile și CSS-ul forumului, direct din panoul de administrare Forumotion.

Accesibil din meniul **Teme**, înainte de secțiunea Template-uri.

---

## 🚀 Funcționalități

- 🔎 **Căutare în bulk** — caută text în toate template-urile sau doar în CSS
- ✏️ **Înlocuire în bulk** — înlocuiește automat textul găsit în toate locațiile
- 👁️ **Preview** — vizualizează rezultatele înainte de a executa înlocuirea
- 🔡 **Case sensitive** — opțiune pentru căutare sensibilă la majuscule
- 💾 **Setări salvate** — preferințele sunt reținute între sesiuni

---

## ⚙️ Setări

| Setare | Tip | Default | Descriere |
|---|---|---|---|
| `searchScope` | `select` | `all` | Scopul căutării: tot forumul, doar template-uri sau doar CSS |
| `caseSensitive` | `checkbox` | `false` | Căutare sensibilă la majuscule |
| `maxResults` | `number` | `100` | Numărul maxim de rezultate returnate (1–500) |
| `apiKey` | `text` | `""` | Cheie API opțională (secret) |

---

## 📁 Structură

```
bulk-search-replace/
├── plugin.json   — manifest
├── index.js      — codul principal
├── style.css     — stiluri
└── preview.png   — previzualizare marketplace
```

---

## 🔌 Dependințe

Necesită **FME Bridge** (`window.__FME__`) cu cel puțin:

- `FME.session` — `isACP()`, `isFMEPage()`, `getSection()`
- `FME.utils.url` — `origin()`, `tid()`, `param()`
- `FME.dom` — `urls`, `icons`, `selectors`
- `FME.settings` — `get()`, `save()`
- `FME.bus` — `emit()`
- `FME.ui` — `toast()`

---

## 🛠️ Instalare

1. Deschide **FME → Plugins → Marketplace**
2. Caută `Search & Replace`
3. Apasă **Instalează**
4. Navighează la **Teme** — vei vedea linkul **Search & Replace** adăugat în meniu

---

## 📖 Utilizare

1. Mergi la **Teme → Search & Replace**
2. Selectează **Scope** — unde vrei să cauți
3. Introdu textul de **căutat**
4. Introdu textul de **înlocuit**
5. Apasă **Preview** pentru a vedea ce va fi modificat
6. Apasă **Execută** pentru a aplica înlocuirea

---

## 📝 Changelog

### 1.0.0
- Lansare inițială
- Căutare și înlocuire în template-uri și CSS
- Suport pentru preview înainte de execuție
- Setări salvate per sesiune

---

## 📄 Licență

MIT — [FME Team](https://github.com/ForumotionExt)