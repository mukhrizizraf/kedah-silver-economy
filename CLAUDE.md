# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this folder is

A static, multi-page, bilingual (English / Bahasa Melayu) pitch site for a **UUM Scale-Up Research Grant 2026** proposal: *Integrated Islamic Elderly Care Ecosystem: A Proof-of-Concept Study for Kedah State* (project leader Prof. Madya Dr. Shamzaeffa binti Samsudin, SEFB, UUM).

- **Where it lives:** the folder is in Google Drive and is also the git repo `mukhrizizraf/kedah-silver-economy`. GitHub Pages serves `main` from the root at <https://mukhrizizraf.github.io/kedah-silver-economy/>.
- **Source documents:** `dokumen/` holds the revised application form (23-page PDF), the reply-to-reviewers table (5-page PDF) and the pilot-to-policy roadmap image (the WhatsApp JPEG).
- **Kept off GitHub:** `.gitignore` excludes `dokumen/`, `OPEN_ITEMS.md` (local notes), the original Codex single-file version (`kedah_silver_economy_grant_dashboard_v1_codex.html`) and its old filename, which is now just a redirect to `index.html`. Never commit the grant PDFs.
- **No build step:** there is no build, lint or test tooling. The site uses classic `<script src>` tags on purpose (no ES modules, no `fetch()`), so it works from `file://` as well as GitHub Pages. Keep it that way. Fonts come from Google Fonts and fall back to system fonts offline.
- **Origin of the structure:** it was modelled on the user's `mukhrizizraf/sefb_planner_code` repo (multi-page static HTML, one design-system CSS file, shared JS, `body[data-page]`). It deliberately does not look like that repo, so don't copy its naming or visuals.

## Commands

The machine is Windows. The Bash tool runs Git Bash, so quote the path: `cd "/i/My Drive/SILVER ECONOMY"`.

```bash
# Syntax-check the scripts
for f in kse-data kse-shell kse-viz kse-pages; do node --check assets/js/$f.js; done

# Render a page headlessly (dump the DOM to check content, or take a screenshot)
C="/c/Program Files/Google/Chrome/Application/chrome.exe"
"$C" --headless=new --disable-gpu --virtual-time-budget=5000 --dump-dom "file:///I:/My%20Drive/SILVER%20ECONOMY/network.html"
"$C" --headless=new --disable-gpu --hide-scrollbars --window-size=1360,2400 --virtual-time-budget=5000 --screenshot=out.png "file:///I:/My%20Drive/SILVER%20ECONOMY/index.html"

# Publish (Pages rebuilds in about a minute)
git add -A && git commit -m "..." && git push
curl -s https://mukhrizizraf.github.io/kedah-silver-economy/assets/js/kse-data.js | head   # confirm the live version
```

- **Screenshot artifacts:** headless screenshots can catch count-up numbers mid-animation, so a wrong KPI in a screenshot isn't necessarily a real bug.
- **Phone layouts:** the headless window can't go narrower than about 500px. To test phone width, load the page inside a 390px `<iframe>` in a scratch HTML file.
- **Testing BM or dark mode:** use a scratch page that sets `localStorage` `kse-lang=bm` or `kse-theme=dark`, then redirects to the site.
- **Git setup:** the repo's git identity is `mukhrizizraf <mukhrizizraf@users.noreply.github.com>`, which keeps the user's personal email out of public commits. Git Credential Manager handles the push. The `gh` CLI is not installed.
- **Lock files:** Google Drive sync can leave an empty `.git/config.lock` behind. If git says "could not lock config file", check that no git process is running, then delete the empty lock.

## Architecture

The six pages, in pitch order, are:

| File | EN label | BM label |
| --- | --- | --- |
| `index.html` | Overview | Latar belakang |
| `ecosystem.html` | How it works | Cara ia berfungsi |
| `network.html` | Who can help | Siapa boleh membantu |
| `scenario.html` | Try a case | Cuba satu kes |
| `roadmap.html` | Plan & budget | Pelan & bajet |
| `evidence.html` | Sources | Sumber |

The file names are older than the labels. Keep them, because links depend on them. Each page contains only its `<main>` content, and the load order matters:

1. **In `<head>`:** an inline one-liner applies the saved `kse-theme` before paint. Then `assets/css/kse.css` and `assets/js/kse-data.js` load.
2. **First child of `<body>`:** `assets/js/kse-shell.js` must go here. It injects the top bar and drawer immediately, so there is no layout jump, using `K.PAGES`, which is both the site map and the pitch order. On `DOMContentLoaded` it appends the footer pager and the tooltip, runs `KSE.pageInit[body.dataset.page]`, then calls `K.applyLang()`.
3. **End of `<body>`:** `kse-viz.js` (the charts) and `kse-pages.js` (one init per page) load.

Everything hangs off one global, `window.KSE` (`K`). Other things to know:

- **Rendering contract:** a page init binds its events once and pushes its render functions onto `K.onLang`. `K.applyLang()` runs them on load and on every EN/BM switch. So dynamic text must use `K.L({en,bm})` or `K.T(en,bm)` at render time, never at init time.
- **Static i18n:** the English text lives in the HTML, and an element opts in with `data-i18n="key"`. On first run `applyLang` stores the English in `data-en`, and `K.bm[key]` supplies the BM. `applyLang` sets `textContent`, so a `data-i18n` element must contain text only. Wrap the text in a `<span data-i18n>` when it sits next to an icon or a form control.
- **Data (`kse-data.js`):**
  - `records`: the 30-organisation sample list, with `types`/`typeOrder` and `status`/`statusOrder` (`ring` sets each dot's distance from the centre on the overview map)
  - `schema`: the three data lists
  - `scenario`: the "Try a case" model
  - `budget`: 7 lines, keyed by Vot
  - `reviews`/`reviewStatus`: the reviewer comments
  - `why`, `partners`/`partnerStatus`, `team`, `track`, `plans`: the overview sections
  - `fit`: Figure 2's four layers
  - `bm`: the BM dictionary

  Filters match record fields by exact string, so `<option value>`s must equal the `type`, `district` and `status` values.
- **Colour roles:** organisation types use the fixed categorical slots `--t1..5` on page surfaces and `--b1..5` on the dark band. They are assigned by `types[x].c` and never cycled. Evidence, partner and review statuses reuse the reserved good/warn/neutral tokens and always come with a text label (`K.pill`). The dark theme is defined three times in `kse.css` (bare `:root`, the `prefers-color-scheme` block, `[data-theme="dark"]`). Keep all three in sync.
- **Navigation:** map dots link to `network.html#r<index>`, which scrolls to that row and highlights it. The arrow keys move through `K.PAGES`, except when focus is in a form control or a scroll container. Below 1260px the nav collapses into the drawer, because the BM labels are long.
- **"Try a case" logic:** it is the same as the original prototype's. Coverage is clamped to 20–96%. The need and district adjustments apply. Income under RM1,000 adds 6, and welfare with income over RM3,000 subtracts 8. The outputs are sample logic, not estimates, and the page says so.
- **Hard-coded figures in HTML:** these don't update on their own when the data changes:
  - the KPI strip on `index.html`
  - the `headstat` on each page head (network `5 / 30`, scenario `90`, evidence `9 / 11`)
  - the Gantt `grid-column` spans on `roadmap.html`: column 1 is the label, and month *n* is column *n+1*

  `data-count` (the count-up) is only for plain integers.

## Content rules

- **Write plainly.** The user asked for simple, direct words: short sentences, everyday vocabulary (about IELTS Band 6), no em dashes. Name things by what they are ("Who can help", "Try a case"). This applies to EN and BM alike.
- **Keep the status labels.** The data values `Verified` / `Candidate` / `Demo` display as **Confirmed** / **To check** / **Example** (BM: Disahkan / Perlu disemak / Contoh). Only Confirmed records are backed by a source. Never present To check or Example records as confirmed coverage; the site promises this in several places.
- **Framing:** the model is an *optional* Islamic model that adds to national social protection. It does not replace it (Figure 2, and the reply to reviewers).
- **Public site:** never publish IC numbers, staff IDs, phone numbers or the PDFs. The waqf expert (Dr. Nurmazilah Dato' Mahzan) appears as "Waqf governance expert" until the user confirms she can be named.

## Source documents

The 23-page application form is the authority. When it disagrees with the reply table or the roadmap image, the form wins (for example, it says 10 experts where the other two say 8–10).

- **Text:** extract it with `pdftotext -layout` (in `/mingw64/bin`).
- **Tick boxes and figures:** these don't survive text extraction. Render those pages with PyMuPDF (`python -c "import pymupdf; ..."`, then `page.get_pixmap(...)`) and look at the image. `pdftoppm` is not installed, so the Read tool can't page through long PDFs.

Facts the site shows, as stated in the form:

- **Timing:** 9 months, 1 Nov 2026 to 31 Jul 2027. There are 5 objectives in 4 action-research phases (diagnosis, planning, action, reflection), and Objectives 4 and 5 are both in Phase 4. By month: Objective 1 in M1–3, Objective 2 in M4–5, Objective 3 in M6–7, Objective 4 in M8, Objective 5 in M9 (Table 2).
- **Methods:** 8–10 Muslim older persons in interviews; 15–20 people at the design workshop; a review panel of 10 people scoring relevance, feasibility, practicality and institutional readiness (I-CVI and S-CVI/Ave); then a small controlled pilot of the referral process.
- **Budget:** RM30,000. Vot 11000 is RM18,000. Vot 21000 is RM4,281. Vot 29000 is RM7,719: workshops 3,600, tokens 2,500, RMC fee 874, printing 445, copyright filing 300.
- **Team:** the leader plus five researchers. Prof. Madya Dr. Shazida Jan Mohd Khan is the substitute leader.
- **Ticks:** Social Sciences; MADANI Big Bold "Social Protection Reform"; SDG 3; niche "Economic, Financial Analysis and Policy"; priority area "Fiscal sustainability of an aging society". Risk ratings: technical Low, timing Medium, budget Low.
- **Partners:** PERKIM, WANIDA and the waqf expert have signed letters of intent. MAIK is in talks.

`OPEN_ITEMS.md` (kept local) records what was resolved and what is still open.
