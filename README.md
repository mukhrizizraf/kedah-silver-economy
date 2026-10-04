# Kedah Silver Economy

A website for the grant **Integrated Islamic Elderly Care Ecosystem: A Proof-of-Concept Study for Kedah State** (UUM Scale-Up Research Grant 2026, RM30,000, 1 Nov 2026 to 31 Jul 2027).

It is a static site. There is no build step and no server. Open `index.html` in a browser, or view it on GitHub Pages:

<https://mukhrizizraf.github.io/kedah-silver-economy/>

## Pages

| No. | File | Page | What it shows |
| --- | --- | --- | --- |
| 01 | `index.html` | Overview | What the project is, why it matters, the five results |
| 02 | `ecosystem.html` | How it works | How a person's needs are matched to help, and the data behind it |
| 03 | `network.html` | Who can help | The sample list of 30 organisations, by type, district and status |
| 04 | `scenario.html` | Try a case | Pick a person, district, need and income; see the steps, score and main problem |
| 05 | `roadmap.html` | Plan & budget | What happens each month, the expert review, the budget |
| 06 | `evidence.html` | Sources | The documents behind the site and the reviewer comments |
| 07 | `data.html` | Data blueprint | The workbook sheets and fields for the future dashboard |
| 08 | `app.html` | Our Silver App | A screen-by-screen elderly-first app prototype |

When presenting, the left and right arrow keys move between pages. The EN/BM, light/dark, and colour/font choices are remembered in each browser. The Try a case page now follows the guided one-question-at-a-time flow with an animated worked-example demo, live case summary, explainable plan, matching contacts, map links, sharing, print sheets and follow-up reminders.

## Files

```text
index.html ... evidence.html   page content only (body[data-page] names the page)
assets/css/kse.css             design: colours (light/dark), layout, components, print
assets/js/kse-data.js          all data and the Bahasa Melayu text (loaded in <head>)
assets/js/kse-shell.js         top bar, menu, footer, language, theme, tooltips, arrow keys
assets/js/kse-viz.js           the map, district chart, budget bars, project clock
assets/js/kse-pages.js         one set-up function per page
```

## Updating content

- **Organisations, budget, reviewer comments, "Try a case" logic:** edit `assets/js/kse-data.js`.
- **Page text:** edit the English text in the page's HTML. If the element has `data-i18n="key"`, update the BM text for that key in `KSE.bm` in `kse-data.js`.
- **Add a page:** copy an inner page, set a new `data-page`, add it to `KSE.PAGES` in `kse-shell.js`, and add a set-up function in `kse-pages.js` if it needs one.

The palette choices live in `assets/css/kse-themes.css`: Padi, Songket, Diraja, Teratai, Kayu Jati, Wau, Malam and Jelas.

The overview includes an interactive support map. Select Transport, Meals, Nursing and care, Help at home, Company or Money and aid to highlight matching organisations. The site shell supports English and Bahasa Melayu, and keeps the active tab visible on narrower screens.

The Codex build uses its own favicon at `assets/art/codex-crest.svg` so it is distinct from the preserved Claude reference.

Fonts load from Google Fonts. Offline, the pages use system fonts instead.
