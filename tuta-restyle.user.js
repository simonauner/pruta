// ==UserScript==
// @name         Tuta restyle (Proton-ish)
// @namespace    https://github.com/simonauner/pruta
// @version      1.0.0
// @description  Proton-inspired dark theme for the Tuta web app: indigo sidebar, flat mail list, compact navigation.
// @match        https://app.tuta.com/*
// @run-at       document-idle
// @grant        none
// @updateURL    https://raw.githubusercontent.com/simonauner/pruta/main/tuta-restyle.user.js
// @downloadURL  https://raw.githubusercontent.com/simonauner/pruta/main/tuta-restyle.user.js
// ==/UserScript==
(() => {
  const css = `
  :root{--bg:#15131d;--side:#1b1740;--surface:#1b1824;--raised:#221f2d;--line:#2a2636;--accent:#8b6cff;--accent-solid:#6d4aff;--accent-soft:rgba(139,108,255,.16);--side-hover:rgba(255,255,255,.07);--side-sel:rgba(255,255,255,.12)}
  body{font-family:"Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif!important;-webkit-font-smoothing:antialiased;letter-spacing:-.005em;background:var(--bg)!important}
  .main-view,.view-columns,.list-column{background:var(--bg)!important}
  .header-nav{background:linear-gradient(to right,var(--side) 300px,var(--bg) 300px)!important;border-bottom:none}
  .nav-bg,drawer-menu{background:var(--side)!important}
  .list-bg,.list-container{background:transparent!important}
  .search-bar{border-radius:8px!important;background:var(--surface)!important;border:1px solid var(--line)!important}
  .search-bar:focus-within{border-color:var(--accent)!important;box-shadow:0 0 0 3px var(--accent-soft)}

  /* sidebar */
  .nav-bg{color:#e9e6ff}
  .nav-bg .folder-row{border-radius:8px!important;background:transparent!important;margin-bottom:1px}
  .nav-bg .folder-row:hover{background:var(--side-hover)!important}
  .nav-bg .folder-row:has(a.nav-button[style*="255, 179, 181"]){background:var(--side-sel)!important}
  .nav-bg a.nav-button{color:#cfc9f5!important;font-weight:500}
  .nav-bg a.nav-button[style*="255, 179, 181"],.nav-bg a.nav-button[style*="255, 179, 181"] *{color:#fff!important;fill:#fff!important;font-weight:600}
  .nav-bg small.b,.nav-bg .sidebar-section small{text-transform:none!important;letter-spacing:0;font-size:13px;font-weight:600;color:#9d97d1!important}
  .nav-bg button.border-radius-12.b{width:100%;justify-content:center;background:var(--accent-solid)!important;color:#fff!important;border-radius:8px!important;box-shadow:none!important;height:40px;font-weight:600}
  .nav-bg button.border-radius-12.b *{color:#fff!important;fill:#fff!important}
  .nav-bg button.border-radius-12.b:hover{filter:brightness(1.1)}

  /* mail list: flat rows, hairline separators */
  .list-row{background:transparent!important}
  .list-row>.border-radius.ml-8{margin:0!important;border-radius:0!important;border:none!important;border-bottom:1px solid var(--line)!important;background:transparent!important;transition:background .1s}
  .list-row:hover>.border-radius.ml-8{background:var(--raised)!important}
  .list-row>.border-radius.ml-8[style*="rgba"],.list-row.row-selected>.border-radius.ml-8{background:var(--accent-soft)!important;box-shadow:inset 3px 0 0 var(--accent)}
  .list-row .mb-4{margin-bottom:0!important}
  .teamLabel{border-radius:999px!important;font-size:11px!important;font-weight:600!important;filter:saturate(.8)}

  /* reading pane */
  .border-radius-12.rel.mlr-24{background:var(--surface)!important;border:1px solid var(--line);border-radius:12px!important}

  /* top nav */
  .header-nav .nav-button{border-radius:8px!important}
  .header-nav a.nav-button[style*="255, 179, 181"]{background:var(--accent-soft)!important}
  a.nav-button[style*="255, 179, 181"]:not(.nav-bg *),a.nav-button[style*="255, 179, 181"]:not(.nav-bg *) *{color:var(--accent)!important;fill:var(--accent)!important}

  /* dialogs, menus, accents */
  .dialog,.elevated-bg.dropdown-shadow,.dropdown-panel{background:var(--surface)!important;border:1px solid var(--line);border-radius:12px!important;box-shadow:0 24px 64px rgba(0,0,0,.55)!important}
  .dialog-header{border-bottom:1px solid var(--line)}
  .content-accent-fg,.content-accent-fg *{color:var(--accent)!important;fill:var(--accent)!important}
  button.content-accent-fg{border-radius:8px!important}
  button.content-accent-fg:hover{background:var(--accent-soft)!important}
  .text_editor{caret-color:var(--accent)}
  ::selection{background:rgba(139,108,255,.35)}
  ::-webkit-scrollbar{width:8px}::-webkit-scrollbar-thumb{background:var(--line);border-radius:8px}

  /* compact sidebar, Proton-sized */
  .nav-bg{font-size:14px!important}
  .nav-bg .folder-row{margin-bottom:0!important}
  .nav-bg .folder-row,.nav-bg a.nav-button{height:36px!important;min-height:36px!important;line-height:36px}
  .nav-bg a.nav-button,.nav-bg a.nav-button *{font-size:14px!important}
  .nav-bg .button-height{height:36px!important;min-height:36px!important}
  .nav-bg .icon-24{width:24px!important;height:24px!important;display:inline-flex!important;align-items:center;justify-content:center;flex-shrink:0}
  .nav-bg .icon-24 svg{width:18px!important;height:18px!important}
  .nav-bg .folder-row>button,.nav-bg .folder-row .icon-button{width:28px!important;height:28px!important}
  .nav-bg .folder-row>button.justify-end{width:40px!important;min-width:40px!important;justify-content:center!important}
  .nav-bg button.border-radius-12.b{height:38px!important;font-size:14px!important}
  .nav-bg button.border-radius-12.b .icon-24,.nav-bg button.border-radius-12.b svg{width:18px!important;height:18px!important}
  .nav-bg small.b,.nav-bg .sidebar-section small{font-size:12px!important}
  .nav-bg .sidebar-section{padding-top:4px}

  /* icon strip (news, help, settings, logout) at normal size */
  .nav-bg drawer-menu .icon-24,.nav-bg drawer-menu .icon-24 svg,drawer-menu .icon-24,drawer-menu .icon-24 svg,drawer-menu button svg{width:24px!important;height:24px!important}
  drawer-menu .icon-button,drawer-menu button{width:40px!important;height:40px!important;min-width:40px!important;display:flex;align-items:center;justify-content:center;border-radius:8px}
  drawer-menu button:hover{background:var(--side-hover)!important}

  /* settings view */
  .content-bg{background:var(--surface)!important;border:1px solid var(--line);border-bottom:none;border-radius:12px 12px 0 0!important;margin-left:8px;margin-right:8px;width:auto!important}
  .nav-bg .folder-row{color:#cfc9f5}
  .nav-bg .folder-row.row-selected{background:var(--side-sel)!important;background-image:none!important;color:#fff;font-weight:600;box-shadow:none!important}
  .nav-bg .folder-row.row-selected::before,.nav-bg .folder-row.row-selected::after{display:none!important}
  .nav-bg .folder-row.row-selected *{background:transparent!important;color:#fff!important;fill:#fff!important}
  .nav-bg .folder-row *{font-size:14px}
  .text-field{border-color:var(--line)}

  /* section headers in the sidebar are not interactive */
  .nav-bg .folder-row:not(.state-bg),.nav-bg .folder-row:not(.state-bg):hover{background:transparent!important}

  /* vertically center icons */
  .nav-bg .icon-24{line-height:0!important;align-self:center}
  .nav-bg .icon-24 svg{display:block!important}
  .nav-bg button.button-content .icon-24{position:relative!important;top:4px!important}

  /* toolbar row shares the sidebar background */
  .view-columns{isolation:isolate}
  .view-columns::before{content:"";position:absolute;left:0;right:0;top:0;height:52px;background:var(--side);z-index:-1;pointer-events:none}
  .list-column{background:transparent!important}
  .list-column .nav-bg{background:transparent!important}

  /* reading pane: comfortable text (the pane lives inside .nav-bg, so undo the sidebar font size) */
  .list-column .nav-bg{font-size:16px!important;color:#e6e3f2!important}
  .mail-viewer .scroll-x>div{font-size:16px!important;line-height:1.65!important;max-width:680px;color:#e6e3f2;letter-spacing:0;word-spacing:0}

  /* label pills: center the text */
  .teamLabel{height:18px;line-height:18px!important;padding-top:0!important;padding-bottom:0!important}
  `;
  const s = document.createElement('style');
  s.id = 'tuta-restyle';
  s.textContent = css;
  document.head.appendChild(s);

  // Mail bodies render inside an open shadow root, so page CSS cannot reach them.
  const SHADOW_CSS = `
    *{hyphens:manual}
    p{margin:0 0 1em}
    li{margin:.3em 0}
    ul,ol{padding-left:1.4em}
    a{color:#a78bfa;text-underline-offset:2px}
    b,strong{font-weight:650}
  `;
  const patch = () => {
    document.querySelectorAll('.mail-viewer .scroll-x > div').forEach((host) => {
      const root = host.shadowRoot;
      if (!root || root.getElementById('tuta-restyle-shadow')) return;
      const st = document.createElement('style');
      st.id = 'tuta-restyle-shadow';
      st.textContent = SHADOW_CSS;
      root.appendChild(st);
    });
  };
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; patch(); });
  }).observe(document.body, { childList: true, subtree: true });
  patch();
})();
