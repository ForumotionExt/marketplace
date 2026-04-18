---
name: 🧩 Extension Submission
about: Submit a new extension to the FME Marketplace
title: "[Extension] Your Extension Name"
labels: ["extension", "submission", "under review"]
assignees: []
---

## 🧩 Extension Submission

Thank you for contributing to the FME Marketplace! Please fill in all required fields below.

---

### 📋 General Information

| Field | Details |
|---|---|
| **Extension ID** | `your-extension-id` (kebab-case) |
| **Name** | Your Extension Name |
| **Version** | 1.0.0 |
| **Author** | Your GitHub username |
| **Category** | `ui` / `backup` / `analytics` / `moderation` / `automation` |
| **Min FME Version** | 1.4.0 |

---

### 📝 Description

> A clear description of what your extension does and why it's useful.

---

### 🔗 Repository / Source

> Link to the folder or branch containing your extension files:
https://github.com/your-username/your-repo/tree/main/your-extension-id

---

### 📁 Checklist

Please confirm your submission includes all required files:

- [ ] `extension.json` — valid manifest
- [ ] `index.js` — main logic
- [ ] `preview.png` — screenshot of the extension in action
- [ ] Runs only in ACP (`"hooks": ["acp"]`)
- [ ] Does not use `eval()` or load scripts from untrusted sources
- [ ] Folder name is in `kebab-case`
- [ ] No hardcoded credentials or API keys

---

### 🖼️ Preview Screenshot

> Drag and drop a screenshot here, or paste an image URL.

---

### 📄 `extension.json`

> Paste your manifest below:

```json
{
  "id": "",
  "name": "",
  "version": "",
  "description": "",
  "author": "",
  "category": "",
  "tags": [],
  "entry": "index.js",
  "preview": "preview.png",
  "minFmeVersion": "1.4.0",
  "hooks": ["acp"],
  "paid": false
}
```

---

### 💬 Additional Notes

> Anything else the FME Team should know about this extension?

---

> **The FME Team will review your submission and respond within a few days.**  
> Extensions that pass review will be added to the marketplace index and published automatically.