# 🧩 Extensions — FME Marketplace

> Community-built extensions that add new functionality to the **Forumotion Management Extension** Admin Panel (ACP).

![Status](https://img.shields.io/badge/status-accepting%20submissions-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

---

## 📦 What is an Extension?

Extensions run exclusively inside the **ACP (Admin Control Panel)** and enhance the forum management experience. They do **not** modify the public-facing forum.

**Examples of what an extension can do:**
- Add new tools or panels to the ACP
- Automate repetitive admin tasks
- Export / import forum data
- Provide visual dashboards and reports

---

## 📁 Folder Structure

Each extension must follow this structure:
```tree
extensions/
└── your-extension-id/
├── extension.json   ← manifest (required)
├── index.js         ← main logic (required)
├── style.css        ← styles (optional)
└── preview.png      ← screenshot (recommended)
```
---

## 🗂️ Manifest — `extension.json`

```json
{
  "id": "your-extension-id",
  "name": "Your Extension Name",
  "version": "1.0.0",
  "description": "Short description of what it does.",
  "author": "YourUsername",
  "category": "ui | backup | analytics | moderation | automation",
  "tags": ["tag1", "tag2"],
  "entry": "index.js",
  "preview": "preview.png",
  "minFmeVersion": "1.4.0",
  "hooks": ["acp"],
  "paid": false
}
```

---

## ✅ Submission Guidelines

Before submitting, make sure your extension:

- [ ] Has a valid `extension.json` manifest
- [ ] Runs only within the ACP (`hooks: ["acp"]`)
- [ ] Does not use `eval()` or load external scripts from untrusted sources
- [ ] Includes a `preview.png` screenshot
- [ ] Has a clear and descriptive `description` field
- [ ] Follows the folder naming convention (`kebab-case`)

---

## 🚀 Submit Your Extension

Have an extension ready? Open an issue using the template below and the FME Team will review it.

[![Submit Extension](https://img.shields.io/badge/Submit%20Extension-%F0%9F%9A%80%20Open%20Issue-6f42c1?style=for-the-badge&logo=github)](https://github.com/ForumotionExt/marketplace/issues/new?template=extension-submission.md&title=%5BExtension%5D+Your+Extension+Name)

---

## 📋 Review Process

1. **Submit** — Open an issue using the template above
2. **Review** — FME Team checks the manifest and code
3. **Merge** — Extension is added to the marketplace index
4. **Published** — Available to all FME users within 1 hour (cache TTL)

---

## 📄 License

All extensions submitted to this marketplace are published under the [MIT License](../../LICENSE) unless explicitly stated otherwise.
