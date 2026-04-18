# 🔌 Plugins — FME Marketplace

> Community-built plugins that modify and enhance the **public-facing Forumotion forum** — injecting CSS, JavaScript, and UI components directly into forum pages.

![Status](https://img.shields.io/badge/status-accepting%20submissions-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

---

## 🔌 What is a Plugin?

A plugin runs on the **public forum pages** visible to all users. It can inject CSS, manipulate the DOM, add UI components, or enhance forum functionality in real time.

> ⚠️ Unlike Extensions, plugins affect **every visitor** of the forum — not just admins. Test thoroughly before submitting.

---

## 🆚 Plugin vs Extension

| | Plugin 🔌 | Extension 🧩 |
|---|---|---|
| **Runs on** | Public forum pages | ACP only |
| **Affects** | All forum visitors | Admin only |
| **Hooks** | `forum`, `acp`, or both | `acp` only |
| **Examples** | SEO tags, dark mode, anti-spam | Backup, bulk replace, dashboards |
| **Risk level** | Higher — affects live users | Lower — admin-facing only |

---

## 📁 Folder Structure

Each plugin must follow this structure:

```
plugins/
└── your-plugin-id/
    ├── plugin.json    ← manifest (required)
    ├── index.js       ← main logic (required)
    ├── style.css      ← styles (optional)
    └── preview.png    ← screenshot (recommended)
```

---

## 🗂️ Manifest — `plugin.json`

```json
{
  "id": "your-plugin-id",
  "name": "Your Plugin Name",
  "version": "1.0.0",
  "description": "Short description of what it does.",
  "author": "YourUsername",
  "category": "performance | security | analytics | moderation | ui",
  "tags": ["tag1", "tag2"],
  "entry": "index.js",
  "style": "style.css",
  "preview": "preview.png",
  "minFmeVersion": "1.4.0",
  "hooks": ["forum"],
  "paid": false
}
```

### Hooks

| Value | Description |
|---|---|
| `forum` | Runs on public forum pages only |
| `acp` | Runs in the Admin Control Panel only |
| `["forum", "acp"]` | Runs on both |

---

## ✅ Submission Guidelines

Before submitting, make sure your plugin:

- [ ] Has a valid `plugin.json` manifest
- [ ] Declares the correct `hooks` (`forum`, `acp`, or both)
- [ ] Does not use `eval()` or load scripts from untrusted external sources
- [ ] Does not break existing forum layout or functionality
- [ ] Has been tested on at least one live Forumotion forum
- [ ] Includes a `preview.png` screenshot
- [ ] Follows the folder naming convention (`kebab-case`)
- [ ] Contains no hardcoded credentials or API keys

---

## ⚠️ Plugin Safety Rules

Because plugins run on **live forum pages** visible to all users, the FME Team enforces stricter review for plugins than for extensions.

**Forbidden:**
- Loading scripts from untrusted third-party domains
- Collecting or transmitting user data without disclosure
- Modifying or overriding core Forumotion functionality in destructive ways
- Injecting ads or affiliate links

**Required:**
- Wrap all code in an IIFE `(function () { ... })()` to avoid polluting global scope
- Check for the correct page context before running (`window.location`, DOM selectors)
- Handle errors gracefully — never let a plugin crash the forum page

---

## 🚀 Submit Your Plugin

Have a plugin ready? Open an issue using the template below and the FME Team will review it.

[![Submit Plugin](https://img.shields.io/badge/Submit%20Plugin-%F0%9F%9A%80%20Open%20Issue-6f42c1?style=for-the-badge&logo=github)](https://github.com/ForumotionExt/marketplace/issues/new?template=plugin-submission.md&title=%5BPlugin%5D+Your+Plugin+Name)

---

## 📋 Review Process

1. **Submit** — Open an issue using the template above
2. **Review** — FME Team checks manifest, code safety, and hook usage
3. **Testing** — Plugin is verified on a live Forumotion forum
4. **Merge** — Plugin is added to the marketplace index
5. **Published** — Available to all FME users within 1 hour (cache TTL)

> 🔌 Plugins go through an **extra testing step** compared to extensions due to their impact on live users.

---

## 📄 License

All plugins submitted to this marketplace are published under the [MIT License](../../LICENSE) unless explicitly stated otherwise.
