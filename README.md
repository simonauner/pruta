# Tuta restyle

A Proton-inspired dark theme for the [Tuta](https://app.tuta.com) web app, as a Tampermonkey userscript.

- Indigo sidebar with compact, Proton-sized rows and icons
- Flat, full-width mail list with hairline separators and an accent bar on the selected row
- Purple accent, rounded pill labels, restyled dialogs, menus and settings view
- Toolbar row shares the sidebar background
- Readable mail bodies: 16px text, 1.65 line height, ~70 characters per line, softer text colour and accent links

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. Open the raw script and click Install:
   https://raw.githubusercontent.com/simonauner/pruta/main/tuta-restyle.user.js

## Customise

Colours are CSS variables at the top of the script (`--accent`, `--side`, `--bg`, ...).

## Notes

Some rules match Tuta's inline styles (for example the selected-folder colour), so a Tuta update can break individual rules. Cosmetic only; it never touches your mail.
