# موجودیار — landing page

Single-page, Persian (RTL) landing page for «موجودیار», a WooCommerce back-in-stock
waitlist plugin. Built to route **B — Product tour** from the CALL 1 specification
(`docs/apex-call-1-spec.md`), with the section order fixed by CALL 2.

## Preview

Any static server works; the page has no build step and makes no external requests.

```bash
python3 -m http.server 8080      # then open http://localhost:8080
```

```
index.html            page markup (semantic, one h1, landmarks)
assets/style.css      tokens → reset → layout → components → sections → utilities → media → print
assets/app.js         header state, in-view reveal, hero mock, demo state machine, copy-facts
assets/favicon.svg    tab icon, same three-part mark as the header (no extra request)
assets/shots/         ten real plugin screenshots: 600px webp thumbnails + full/ for click-through
fonts/                Vazirmatn 400/500/700 woff2 (self-hosted, OFL licence included)
demo/                 standalone interactive demo (single file + its own README)
docs/                 CALL 1 spec
INSTALL.md            install + hosting guide (Persian)
```

## What is measured (and therefore stated as a number)

Every figure comes from the FACT LEDGER, with its source named in the page itself:

- off-target pages: 0 plugin assets, 0 plugin queries — `tests/queries.php`
- out-of-stock product: 2 assets, form HTML 1,984 B (2,236 B on a variable product)
- front CSS+JS: 13,577 B raw → 4,495 B gzipped against a 12,288 B budget
- 411 unit + 444 integration + 173 admin-render assertions, 0 failures, PHP 7.4.33 & 8.3.33
- 28 release-gate checks · release archive 81 files, 301,599 B

Anything the ledger marks untested is rendered as «داده در دسترس نیست» or
«اعلام‌شده، آزمون‌نشده» — never as a green tick. The compatibility table uses exactly
those three states, and the accent colour is not used for any of them.

## What is mocked

- **The hero form.** Product «ژل شستشوی صورت کامان», stock 0, price box ۹۹۸٬۵۰۰ →
  ۷۴۸٬۸۷۰ تومان — the product, the prices and the wording all come from a real product page
  (see `assets/shots/form-desktop.webp`). The fields start empty with the plugin's own
  placeholders. Submitting keeps the form on the page, clears the fields and prints the
  plugin's confirmation line — nothing is sent.
- **The demo (§8).** Entirely in-memory, deterministic, no fetch, no storage, no SMS.
  Six scenarios; each ends with a one-line takeaway phrased as a fact.
- **Dates** in the demo are plausible Jalali dates, not data from a real installation.

## What is a placeholder (wire these before launch)

**Nothing is left pointing at a missing target.** The pricing/licence section was removed on
request, and with it the last placeholder: there is no price on the page and no buy button,
because neither a confirmed price nor a store URL exists. Every CTA now lands somewhere real —
«دیدن دمو» → `#demo`, «تصویرهای واقعی» → `#shots`.

To put selling back: add a `<section id="buy">` with your price and one link to your store,
then point the header, hero and footer CTAs at it. The CSS is gone with the section, so build
it from `.mjy-card` + `.mjy-btn` rather than resurrecting `.mjy-licence`.

## Audit outcome (CALL 4)

The three invented licence tiers were removed: they carried commercial terms («نصب روی یک
فروشگاه»، «اولویت در پاسخ») that exist in no ledger, and they contradicted CALL 1 §11
(«one price, no hidden Pro tier»). What remains is one package described only with facts the
ledger carries. The «مشکل» section was deleted and one sentence of it moved into the mechanism
section. The hero footnote no longer claims that *every* number is measured — it names the two
measurement files. (Since CALL 8 the mock's product and price are real too, so the footnote
says that instead.)

## Notes on two directives

- **CALL 1 §6 recommended a static annotated screenshot set; CALL 2 §F mandates an
  interactive demo.** CALL 2 wins. The trade-off CALL 1 warned about is real: every demo
  scenario is a hand-built HTML replica, so it must be re-checked whenever the admin UI
  changes. Six scenarios, one file, ~5 KB gzipped — the cost is review time, not code.
- **Focus ring.** The amber accent is used for the restocked/success moment and for the
  primary CTA's focus ring, inset (`outline-offset: -6px`) so it sits on the teal button
  rather than on the pale page — amber on white is 2.0:1 and would fail the 3:1 indicator
  rule; on teal it is 3.9:1.

## Budget (measured on this build)

| Item | Raw | Gzipped |
|---|---|---|
| index.html | 43.2 KB | 8.2 KB |
| assets/style.css | 33.6 KB | 6.9 KB |
| assets/app.js | 18.4 KB | 5.6 KB |
| **page total, fonts excluded** | **95.2 KB** | **20.7 KB** |
| `assets/shots/` thumbnails (10 files, `loading="lazy"`) | 125 KB | — |
| `assets/shots/full/` (only fetched on click) | 690 KB | — |

## No invented data (CALL 8)

Every number and every product on the page now has a source. What changed:

- the mock product was a fictional backpack with an invented «was/now» price. It is now the
  product from the real screenshot, at the real prices (۹۹۸٬۵۰۰ → ۷۴۸٬۸۷۰ تومان);
- the product icon became a pump bottle to match it;
- demo §۹'s counter said «۹٬۹۹۵ در انتظار» — a number that existed only inside scenario ۲.
  It now says «بقیه در انتظار»;
- the FAQ claimed installing takes «two minutes». Nobody measured that; it now states what is
  true — one zip, no Composer, no build.

What is still synthetic, and says so where it appears: the demo's customer rows (the frame
carries «دمو — داده‌های ساختگی»), the phone masks, and the Jalali dates. The gallery images
are untouched captures of a real installation.

## Audit pass (CALL 9): tour, comparison table, no price

Four findings from the landing audit, and what happened to each.

- **«ویدیو یا تیزر منتشر نشده» (§12).** There is no video, and inventing a player over a
  still would be a lie. Instead the screenshot section gained a **tour**: the ten real
  screenshots, one at a time, with a counter, previous/next, ten dots, a play button and
  arrow keys. It only advances by itself after you press play, stops at the last frame, and
  pauses on hover or focus. Every frame is a real capture, and the stage links to the
  full-size file. No fetch, no storage, no fake video chrome.
- **«جدول مقایسه وجود ندارد» (§13).** Added under the features: «موجودیار در برابر پیگیری
  دستی», seven rows, every cell traceable to a claim already made on the page. It compares
  against the manual spreadsheet-and-phone method — not against rival plugins, because we
  have measured nothing about rivals and will not invent a comparison.
- **«هیروسکشن جذاب و منظم» (§14).** Tidied, not rewritten: the three spec rules became pills,
  the footnote is one line, the mock label lost its second clause.
- **«این بخش را حذف کنید» (§15).** The licence/pricing section is gone, with all of its CSS.
  The page now prints no price and carries no buy button, because neither a confirmed price
  nor a store URL exists yet — that is honest, and it means no CTA lands on a dead anchor.
  The support promise that lived in that block («پاسخ اولیه حداکثر ۲۴ ساعت کاری؛ هدف ۴
  ساعت») moved to the end of the FAQ. The FAQ was renumbered to ۱۰.

Test suite after the change: **30 checks, 0 failures** (`/home/user/.tmpdom/t13.js`, jsdom —
DOM behaviour only, not a browser-quality claim).

## Sales pass (CALL 7)

Section ۰۷ used to be «چیزهایی که موجودیار ندارد» — five lines of what the plugin does *not*
do. It was honest but it sold against the product. It is gone. In its place, «سه چیزی که این را
متفاوت میکند»: three claims the page can already back (0 bytes elsewhere, units-in units-out,
two-layer stock detection), each with a small CSS miniature built out of the page's own tokens,
and each with its source named underneath.

The rest of the page got depth, all in CSS — no library, no canvas, no pointer tracking:

- the hero card floats above a tilted gradient plane (`::before`, still `z-index`-safe);
- feature entries became cards that lift on hover, with the icon on a raised tile;
- mechanism nodes lift; gallery cards lean half a degree;
- spotlight miniatures are three stacked, slightly rotated sheets behind the real content.

Hover motion is decoration only: nothing is hidden behind a hover, the reduced-motion rule
collapses every transition, and the print block strips transforms and the decorative planes.

## Real screenshots (CALL 6, part 2)

Section ۹ «همان چیزی که نصب میشود» shows ten captures of the plugin as installed. Thumbnails
are 600–1200 px wide webp (125 KB for all ten, `loading="lazy"`, `decoding="async"`); clicking one
opens the 1400 px version from `assets/shots/full/`, which is the only thing that costs the
remaining 690 KB, and only on demand.

**The images contain live data** — real customer names from one shop, phone numbers already
masked by the plugin. That is the point of the section (the note above it says so), but it
means the pictures are public as soon as the page is. If they should not be, the section has
to be dropped or the names blurred; nothing else in the page depends on it.

## Fidelity pass (CALL 6 — against plugin screenshots)

Ten screenshots of the real plugin were compared with this page. The form is now the
plugin's, not an approximation:

- labels «نام و نام خانوادگی» / «شمارهٔ موبایل» (the plugin's own label has a typo, «شمارة»;
  the page uses the correct Persian spelling);
- the intro sentence «این کالا فعلا موجود نیست. شماره خود را بگذارید تا به‌محض بازگشت موجودی
  خبرتان کنیم.» and the confirmation line «ثبت شد. به‌محض بازگشت موجودی خبرتان می‌کنیم.»;
- placeholders «مثلاً مریم احمدی» and «۰۹۱۲۳۴۵۶۷۸۹» — the plugin mixes a Persian zero with a
  Latin 9 («۰9xxxxxxxxx»), which is a bug there, not a look to copy;
- the dashed price box under the form, and the behaviour after submit: the form stays, the
  fields clear, one line appears. The demo used to claim the form "is removed, like the
  plugin does" — that claim was wrong and is gone;
- the demo now requires the name, as the plugin's label implies.

Still different on purpose: the plugin tints the top edge of the form card amber, which this
page reserves for the success moment; and the plugin's green price is rendered in the brand
teal. Not done yet: the plugin also has an **email** channel, which the page never mentions,
and the real screenshots are not embedded anywhere.

## Review pass (after CALL 4)

Checked the whole page again end to end; seven things changed, all of them defects rather
than taste:

- the price card's buy button pointed at the footer, whose own buy button pointed back at the
  price card — a two-click loop. `#buy` now sits on the licence block and both triggers land there.
- `<footer>` was inside `<main>`; the closing tag moved. Footer headings went `h3` → `h2` so
  they stop reading as sub-sections of «سؤال‌ها».
- the hero receipt printed the hard-coded «سارا محمدی · ۰۹۱۲…۴۷» whatever was typed. It now
  echoes the typed name and number. The button became `type="submit"`, so Enter works too.
- demo scenario ۲ kept showing «منتظر: ۱۰٬۰۰۰» after five people were notified while its own
  takeaway said ۹٬۹۹۵. Both now come from `remainingOf(s)`.
- horizontal table regions are `role="region"` + `tabindex="0"` + labelled, so they can be
  scrolled with a keyboard (WCAG 2.1.1); the demo table got the same treatment.
- amber had drifted onto the demo badge and the mechanism's last node; both are teal tints
  again. Amber is back to the success moments and the primary focus ring.
- added a favicon, Open Graph/Twitter title + description, and dropped a duplicated price
  sentence that said the same thing twice in a row.
