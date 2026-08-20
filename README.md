# isofbautoinvitePC — Invite fans and post likers in Facebook™ (open-source build)

A browser extension (Manifest V3, Chrome/Edge/Firefox) that automates engagement
work on a **Facebook Business Page**:

- **Invite fans** — opens one of your posts, scrolls the list of people who
  reacted, and sends page-follow invites to them (with optional filters: skip
  certain reactions, skip names, skip people without a profile picture, etc.).
- **Invite friends/followers** — for groups or events, walks the friends or
  followers list and sends the invites.
- **Shared posts** — for every person who shared your post:
  - likes their post,
  - likes their comment on your post,
  - comments on their post using up to 5 user-defined templates (spintax
    `{a|b|c}` and `%name` personalization supported),
  - optionally invites the likers of your shared post (or the people who liked
  your comments) to your page.
- **Multi-page mode** — you give it a list of page/post URLs (up to 200) and it
  walks them one by one in "full scan" or "real-time" mode, resuming
  automatically after each page navigation.

## Open-source build

This fork removes all commercial licensing:

- no license key, trial, or subscription checks (see `contentscript.js` →
  `licWorking()` / `calcLicVars()`),
- no phone-home to the vendor server (no license verification, no remote
  selector updates — the extension now always uses its built-in CSS selectors),
- no install-time redirect to a vendor website (installation opens the options
  page instead),
- per-run invite hard caps and trial caps removed; the only limits left are the
  user-configurable ones (per-run / per-day limits in the popup and options
  page).

## Installing (load unpacked)

1. Open your browser's extensions page
   - Chrome/Edge: `chrome://extensions` / `edge://extensions`
   - Firefox: `about:addons`
2. Enable **Developer mode**.
3. Click **Load unpacked extension** and select this folder.
4. Open your Facebook Business Page, go to a post (or a page), and click the
   extension icon. A floating panel appears with the options and the Start
   button.

> The Facebook tab must stay **visible** — browsers suspend hidden tabs, and
> the script cannot scroll or click while the page is hidden.

## Usage notes

- **Single post:** open a post, open its "who reacted" list, click the icon,
  and answer "Yes" when asked to scan only this post.
- **Multi-page mode:** open the options page (extension icon → Options),
  paste one page/post URL per line into the list, save, then start the script
  on your first page.
- **Shared posts:** tick *Like shared posts* / *Comment all shared posts* in
  the floating panel (or options page) and provide at least one comment text.
- **Limits:** keep the per-run/per-day numbers moderate and keep the random
  delays enabled. Aggressive automation can trigger Facebook's rate limits.

## ⚠️ Disclaimer / legal

- This tool automates clicks on Facebook's website, which **violates
  Facebook's Terms of Service**. Your page or personal account may be
  restricted, limited, or banned. Use at your own risk.
- Intended for automation of engagement on **your own** page/account only.
- The software is provided **as-is**, with no warranty of any kind (see
  [LICENSE](LICENSE)).

## Project layout

| File | Purpose |
|---|---|
| `manifest.json` | MV3 manifest |
| `background.js` | Service worker: icon-click injection, tab orchestration (second-tab scans), reload re-injection |
| `contentscript.js` | Main engine (invites, likes, comments, multi-page loop, popup UI) |
| `content_newtab.js` | Parallel engine run inside the second tab Facebook opens for a post |
| `options.html` / `options.js` | Options page router |
| `options/options_mul*.html/js` | Options UI (en/es/it/ru/uk) |
| `sendkeys.js` | bililiteRange text-selection/typing helper for the comment box |
| `comment_sender.js` / `postTextNow.js` | Submits prepared comments, incl. iframe composers |
| `error_redirect.js` | "Enable pop-ups for facebook.com" guidance dialog |
| `forceReload.js` | Clears `beforeunload` before forced refreshes |
| `_locales/` | UI translations |

## Development

**Testing.** Load the repository root as an unpacked extension (see
*Installing* above). There is no build step — the sources are the shipped
files. `node --check <file>.js` gives a quick syntax check for any JS file.

**Versioning.** `manifest.json` uses date-based versions (`YYYY.MM.DD`).
Bump it for every release; the version is shown in the popup header and in
support email subjects.

**Facebook selectors.** The engine finds buttons and lists through a mix of
hard-coded CSS selectors and text matching (translated per UI language). When
Facebook ships a redesign:

1. Reproduce the breakage with a manual run, read the console (enable the
   *DEBUG* option in *Settings → Daily limit & other*).
2. Update the selectors in `contentscript.js` / `content_newtab.js` — the
   `server_*` variables at the top of `contentscript.js` hold the main
   selector fragments; look for the element in DevTools and adjust.
3. Bump the version and test on a real page.

**Translations.** All user-facing strings live in `_locales/<lang>/messages.json`
(loaded via `api.i18n.getMessage`). Add a key to **every** locale when the code
references one — a missing key renders as an empty string.

**Conventions.**

- The content scripts run inside the Facebook page: any CSS they inject
  (`content.css`) must be scoped to extension-owned ids/classes so nothing
  leaks onto the host page.
- `background.js` owns all tab orchestration; content scripts never open or
  close tabs themselves.
- State that must survive page navigation is written to `chrome.storage.local`
  (`_tab_ID`, `_runMode`, `_fbe_number`, counters) before each redirect.

