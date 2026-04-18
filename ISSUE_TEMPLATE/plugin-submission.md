---
name: 🔌 Plugin Submission
about: Submit a new plugin to the FME Marketplace
title: "[Plugin] Your Plugin Name"
labels: ["plugin", "submission", "under review"]
assignees: []
---

## 🔌 Plugin Submission

Thank you for contributing to the FME Marketplace! Please fill in all required fields below.

---

### 📋 General Information

| Field | Details |
|---|---|
| **Plugin ID** | `your-plugin-id` (kebab-case) |
| **Name** | Your Plugin Name |
| **Version** | 1.0.0 |
| **Author** | Your GitHub username |
| **Category** | `performance` / `security` / `analytics` / `moderation` / `ui` |
| **Min FME Version** | 1.4.0 |
| **Hooks** | `forum` / `acp` / `both` |

---

### 📝 Description

> A clear description of what your plugin does, what problem it solves, and how it affects the public-facing forum.

---

### 🔗 Repository / Source

> Link to the folder or branch containing your plugin files:

https://github.com/your-username/your-repo/tree/main/your-plugin-id
---

### 📁 Checklist

Please confirm your submission includes all required files:

- [ ] `plugin.json` — valid manifest
- [ ] `index.js` — main logic
- [ ] `preview.png` — screenshot of the plugin in action
- [ ] Hooks are correctly defined (`forum`, `acp`, or both)
- [ ] Does not use `eval()` or load scripts from untrusted sources
- [ ] Does not break existing forum functionality
- [ ] Folder name is in `kebab-case`
- [ ] No hardcoded credentials or API keys
- [ ] Tested on at least one Forumotion forum

---

### 🖼️ Preview Screenshot

> Drag and drop a screenshot here, or paste an image URL.

---

### 📄 `plugin.json`

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
  "style": "style.css",
  "preview": "preview.png",
  "minFmeVersion": "1.4.0",
  "hooks": ["forum"],
  "paid": false
}
```

---

### 🌐 Tested On

> List the Forumotion forums / engines where you tested this plugin:

| Forum URL | Engine | Result |
|---|---|---|
| `https://your-forum.forumactif.com` | phpBB3 | ✅ Works |

---

### 💬 Additional Notes

> Anything else the FME Team should know? Known limitations, conflicts with other plugins, or future plans?

---

> **The FME Team will review your submission and respond within a few days.**  
> Plugins that pass review will be added to the marketplace index and published automatically.