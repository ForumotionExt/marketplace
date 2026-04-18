# 🎨 Themes — FME Marketplace

> Community-built themes that completely transform the **visual appearance** of your Forumotion forum — colors, typography, layouts, and more.

![Status](https://img.shields.io/badge/status-accepting%20submissions-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

---

## 🎨 What is a Theme?

A theme is a complete visual overhaul of your Forumotion forum. It includes custom CSS, optional JavaScript enhancements, and a preview screenshot. Themes target the **public-facing forum** and affect every visitor.

> ⚠️ Themes modify the global appearance of the forum. Always test on a staging forum before deploying to production.

---

## 🆚 Theme vs Plugin vs Extension

| | Theme 🎨 | Plugin 🔌 | Extension 🧩 |
|---|---|---|---|
| **Runs on** | Public forum pages | Public forum pages | ACP only |
| **Affects** | Visual appearance | Functionality & UI | Admin tools |
| **Primary file** | `style.css` | `index.js` | `index.js` |
| **JS required** | Optional | Yes | Yes |
| **Examples** | Dark Neon, Ocean Blue | SEO Pro, Anti-Spam | Backup, Diff Viewer |

---

## 📁 Folder Structure

Each theme must follow this structure:
```
themes/
└── your-theme-id/
├── theme.json      ← manifest (required)
├── style.css       ← main stylesheet (required)
├── index.js        ← JS enhancements (optional)
└── preview.png     ← screenshot (required)
```
---

## 🗂️ Manifest — `theme.json`

```json
{
  "id": "your-theme-id",
  "name": "Your Theme Name",
  "version": "1.0.0",
  "description": "Short description of the theme's visual style.",
  "author": "YourUsername",
  "engine": "phpBB3 | phpBB2 | both",
  "tags": ["dark", "minimal", "neon"],
  "entry": "style.css",
  "script": "index.js",
  "preview": "preview.png",
  "minFmeVersion": "1.4.0",
  "status": "stable | beta | wip",
  "paid": false
}
```

### Engine Compatibility

| Value | Description |
|---|---|
| `phpBB3` | Compatible with prosilver-based forums |
| `phpBB2` | Compatible with subsilver-based forums |
| `both` | Compatible with both engines |

### Status

| Value | Description |
|---|---|
| `stable` | Fully tested, production ready |
| `beta` | Functional but may have minor issues |
| `wip` | Work in progress, not ready for production |

---

## ✅ Submission Guidelines

Before submitting, make sure your theme:

- [ ] Has a valid `theme.json` manifest
- [ ] Includes a `style.css` as the primary file
- [ ] Declares the correct `engine` compatibility (`phpBB3`, `phpBB2`, or `both`)
- [ ] Has been tested on the declared engine
- [ ] Includes a `preview.png` screenshot (minimum `800×500px`)
- [ ] Does not override Forumotion's core admin styles
- [ ] Follows the folder naming convention (`kebab-case`)
- [ ] Contains no hardcoded external font/image URLs from untrusted sources
- [ ] Has a `status` field set correctly (`stable`, `beta`, or `wip`)

---

## 🖌️ Theme Guidelines

**CSS Best Practices:**
- Use CSS variables for colors and fonts to make the theme easily customizable
- Scope selectors carefully — avoid overly broad rules like `* { ... }`
- Avoid `!important` unless absolutely necessary
- Test on both desktop and mobile viewports

**JavaScript (optional):**
- Only use JS for enhancements that cannot be achieved with CSS alone
- Wrap all code in an IIFE `(function () { ... })()`
- Do not load external scripts from untrusted sources

**Preview Screenshot:**
- Minimum resolution: `800×500px`
- Should show the forum homepage or topic listing
- Must accurately represent the final result

---

## 🚀 Submit Your Theme

Have a theme ready? Open an issue using the template below and the FME Team will review it.

[![Submit Theme](https://img.shields.io/badge/Submit%20Theme-%F0%9F%9A%80%20Open%20Issue-6f42c1?style=for-the-badge&logo=github)](https://github.com/ForumotionExt/marketplace/issues/new?template=theme-submission.md&title=%5BTheme%5D+Your+Theme+Name)

---

## 📋 Review Process

1. **Submit** — Open an issue using the template above
2. **Review** — FME Team checks manifest, CSS quality, and engine compatibility
3. **Testing** — Theme is applied to a test forum on the declared engine
4. **Merge** — Theme is added to the marketplace index
5. **Published** — Available to all FME users within 1 hour (cache TTL)

---

## 📄 License

All themes submitted to this marketplace are published under the [MIT License](../../LICENSE) unless explicitly stated otherwise.