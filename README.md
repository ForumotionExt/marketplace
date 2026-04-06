# FME Marketplace

This repository is the official catalog for the FME Chrome Extension's Marketplace tab. The extension fetches `index.json` from the `main` branch using the GitHub raw API to display available widgets, plugins, and themes for Forumotion forums.

## How it works
- The extension fetches `index.json` from this repo to populate the Marketplace tab.
- Each item in the catalog is described in detail, including file path, author, version, and more.

## How to contribute
- Submit your widget, plugin, or theme using the [GitHub issue template](.github/ISSUE_TEMPLATE/submit.yml) or open a pull request.
- All submissions must follow the schema in `index.json` (see below).

## `index.json` schema
- See the root `index.json` for the exact schema and field documentation.
- Widgets and plugins must provide: `id`, `name`, `description`, `author`, `file`, `target`, `status`, `version`, and optionally `stars`, `tags`, `readme`.
- Themes must provide: `id`, `name`, `description`, `author`, `path`, and the same optional fields as above.

## License
MIT