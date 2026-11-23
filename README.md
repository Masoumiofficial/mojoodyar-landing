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
assets/app.js         header state, hero form, 3D parallax, reveal, tour, scroll progress, counters
assets/theme.js       light/dark bootstrap — runs before paint, remembers the choice
assets/brand/         the mojoodyar logo (32/64/180/512 + webp) and the ژاکت wordmark
assets/shots/         ten real plugin screenshots: 600px webp thumbnails + full/ for click-through
fonts/                Vazirmatn 400/500/700 + JetBrains Mono 400/600 woff2 (OFL)
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

Two links are honest but generic, and both are one-line swaps when the real targets exist:

- the ژاکت badges point at `https://www.zhaket.com` — replace with the plugin's own page;
- `og:image` is a relative path. Crawlers want an absolute URL, so make it
  `https://<domain>/assets/brand/mojoodyar-512.webp` (or a 1200×630 social card) at launch.

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
  primary CTA's focus ring. On the dark theme the ring sits *outside* the mint button
  (`outline-offset: 3px`): amber on mint is 1.07:1 and would fail the 3:1 indicator rule,
  amber on the page background is 9.43:1.

## Budget (measured on this build)

| Item | Raw | Gzipped |
|---|---|---|
| index.html | 34.5 KB | 7.7 KB |
| assets/style.css | 37.7 KB | 8.2 KB |
| assets/app.js | 11.1 KB | 3.5 KB |
| **page total, fonts excluded** | **83.3 KB** | **19.4 KB** |
| `assets/brand/` (5 files; 22 KB of it is on first paint) | 98.6 KB | — |
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

## Figures and the floating chips (CALL 14)

Two things were wrong and both came from the same mistake — treating coded text as if it were
Latin text.

**Numbers.** `--mono` listed only Latin monospace faces, so every Persian numeral (۰-۹) fell
through the stack into whatever the operating system offered — a different typeface in the
eyebrows, the numbers band, the tour counter and the mock's price. Now there is a separate
`--figure` token: Vazirmatn with `font-variant-numeric: tabular-nums`, used by every Persian
number on the page. `--mono` also gained Vazirmatn as its fallback so nothing can slip through
again; JetBrains Mono is now used only where it belongs — Latin words, the mock URL and `.ltr`.

**Chips.** The three floating labels had near-black backgrounds, mint text, mono type and a
mint border: a different palette and a different voice from the rest of the hero. They now use
the page's own surfaces, `--line-2` borders, ink text, the body typeface at 12px, and a mint dot
before the label. In light theme they invert to white cards. One label was reworded to match
the page's formal tone («سرور خودِ فروشگاه» instead of «خودت»).

## More depth in the hero (CALL 14)

Added on top of the existing stage: a slow conic halo behind the deck, a second plate rotated
`3.2°` at `translateZ(−70px)` behind the card, a contact shadow under it, a diagonal sheen
across the card face, and a scroll-driven tilt (`--sy`) that joins the pointer parallax. All of
it disappears under `prefers-reduced-motion` and in print.

The mock's browser bar now reads `etehadwp.com/product/…`. The path segment is a placeholder
until the real product slug is supplied.

## The mark, the store badge, and a violet accent (CALL 15)

The page now uses the product's own artwork. `assets/brand/mojoodyar-32/64/180/512` are cut from
the supplied 1254 px logo and serve as the tab icon (32, 64), the iOS home-screen icon (180) and
`og:image` (512, webp — 26 KB instead of the 1.7 MB original). The header and footer wordmark
carry that mark instead of the drawn tick; the old `favicon.svg` is gone, so the mark is one
9.9 KB request that the browser caches for the visit.

ژاکت appears twice: a badge under the install steps and a smaller one in the footer — the real
wordmark on a white plate, so its charcoal and orange survive both themes. Both link to
`zhaket.com`. The exact product page was never supplied, so the badge names the store and does
not pretend to be a listing URL; swap the `href` when the page exists.

**Palette.** The interactive layer moved from mint to the logo's violet. `--brand` (dark
`#7C3AED`, light `#6D28D9`) paints the primary button, the ghost button's hover border, the
kicker dot, the eyebrow numbers, the first stop of the h1 gradient, the active tour tab and the
corner glow. Mint keeps its meaning — restocked, in stock, sent — so green still means a happy
state. White on `--brand` is 5.7:1 in dark and 7.1:1 in light. Amber is untouched: success and
the focus ring only.

**Four more effects**, each a transform or an opacity change:

- a 2 px scroll-progress line along the top edge, violet into mint;
- a pointer spotlight that follows the cursor across the hero card — `hover: hover` only;
- the numbers band counts up once when it scrolls into view, in Persian digits with `٬`. The
  markup ships the final figure, so with JS off or reduced motion the real number is just there;
- a single light sweep across the primary button on hover.

All of them are disabled under `prefers-reduced-motion`, and the progress line is hidden in
print. The new inline custom properties (`--p`, `--px`, `--py`) are written by script, like the
tilt's `--mx/--my`: they are measured values, not styling in the markup.

## Light and dark (CALL 12)

The page now ships both themes. Dark is the default; `assets/theme.js` runs before the
stylesheet and sets `data-theme` on `<html>` from, in order: the visitor's saved choice
(`localStorage`), the OS preference (`prefers-color-scheme`), then dark. It also re-follows the
OS while the page is open, unless the visitor has pressed the button themselves.

Every colour is a token, so the light theme is a second token block, not a second stylesheet.
Surfaces invert, mint becomes `#0F766E` with white ink, violet becomes `#6D4CE0`, amber becomes
`#B45309` for the focus ring. Three things stay dark in both themes on purpose: the image-zoom
badge, the floating hero chips and the mock's browser bar — they sit on top of imagery.

Contrast, computed for the light palette: ink 17.3:1 · muted 6.2:1 · mint-text 7.5:1 ·
white-on-mint 5.5:1 · focus amber 4.8:1 · danger 6.5:1 · violet 5.3:1.

**The demo follows the same key**, so a visitor who picks light does not land on a dark demo.

## Compatibility, reframed (CALL 12)

The old section was an eleven-row table where seven rows said «داده در دسترس نیست». Honest,
and it sold against the product. It is now four cards — the two PHP versions that were actually
tested, plus WordPress, WooCommerce and HPOS marked «اعلامشده» — and one sentence that names
what has not been tested (PHP 8.4, WP 5.x, multilingual) without turning the page into a
confession. The claim that survives is exactly the claim the ledger supports: tested is tested,
declared is declared.

Two additions in the same pass: a «نصب در سه قدم» section, and scroll-reveal that only ever
hides content when `theme.js` has run — with JS off, or with reduced motion, everything is
visible from the first paint.

## Rebuild (CALL 11): a new page around a 3D hero

The previous page was set aside and rebuilt from scratch — new markup, new stylesheet, new
script. Nothing was layered over the old cascade: `style.css` and `app.js` are new files and
`index.html` was written again. What survived is the content that is true: the ledger numbers,
the six features, the comparison table, the ten real screenshots, the compatibility states and
the FAQ.

**The hero.** A perspective stage (`1400px`) with three depth planes:

1. a floor grid rotated 74° into the ground, masked to fade out, plus two blurred glow orbs;
2. a deck rotated `X 9° / Y −15° / Z −1.5°` that carries a working mock of the plugin's product
   page — real product, real prices, a form you can actually type into;
3. three floating chips at `translateZ(130px)` stating facts, not decoration.

Pointer movement feeds `--mx` / `--my` into the stage and each plane shifts by a different
amount, so the card tilts and the chips drift. On touch, on `prefers-reduced-motion`, or with
no fine pointer, the whole thing stays flat and static. The deck also floats ±12px on an 8s
loop, which stops under reduced motion.

**What else changed.** Section order is now hero → numbers band → four steps → bento features →
comparison → screenshots (tour + grid) → compatibility → demo band → FAQ → footer. Type is
larger and tighter; the whole page runs on one accent (mint) with violet reserved for the h1
gradient and amber for the success line and focus ring.

**Weight.** Critical path fell from 26,344 B to **16,137 B gzipped** (index 7,077 + css 6,494 +
js 2,566): the old page carried mark-up for sections that no longer exist.

**Contrast, computed:** ink 17.8:1 · muted 8.9:1 · mint-text 13.5:1 · ink-on-mint 8.6:1 ·
amber 10.0:1 · danger 9.9:1 · violet 7.4:1.

**Honest limit, again:** there is no browser in this sandbox. The transforms are deterministic
and the arithmetic is checked, but I have not seen the 3D stage render. The preview is the
only way to judge it.

## Dark theme (CALL 10)

The landing was rebuilt on the visual system of the Gapineh landing: dark navy surfaces,
one bright accent, a second softer accent for gradients, monospace for numbers and Latin,
glows instead of borders-as-decoration.

**Palette** — `#0B1120` page, `#111A2E` surface, `#17223B` raised surface, `#070C18` footer,
`#263552` hairlines; text `#E9F1F7` and `#A3B1C6`; accent mint `#2DD4BF` (text `#5EEAD4`,
ink on mint `#04252D`) and violet `#A78BFA` for the highlight gradient. Amber `#F2A93B` keeps
its old job — the success moment and the primary focus ring — and nothing else.

**Type** — Vazirmatn for Persian, JetBrains Mono (`fonts/JetBrainsMono-*.woff2`, OFL, 43 KB
for both weights) for numbers, Latin runs and the eyebrow counter. Both self-hosted; the page
still makes no external request.

**Shape** — hero gets a masked 56px grid and two radial glows; cards lift on hover into a mint
glow ring; the h1 closes on a mint-to-violet gradient phrase; the footer sits on its own
darker plane. Interactions are unchanged.

**What changed in the CSS** — tokens only, plus the colour literals that had been written for a
light page (shadows, glass fills, input borders). No layer was stacked on top of the old one:
there is still a single cascade, and still no `!important`.

**What print does** — the print block resets the tokens to ink-on-white before anything else,
so the printed page is black text on white regardless of the screen theme.

**Not verified here:** no browser binary exists in this sandbox, so layout, glow rendering,
mono alignment and the hover states are unverified by eye. Contrast was computed, not
eyeballed: ink 16.5:1, muted 8.7:1, mint-on-surface 9.3:1, on-mint ink 8.6:1, amber 9.4:1.

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
