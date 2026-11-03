# موجودیار — landing page

Single-page, Persian (RTL) landing page for «موجودیار», a WooCommerce back-in-stock
waitlist plugin. Built to route **B — Product tour** from the CALL 1 specification
(`docs/apex-call-1-spec.md`), with the 13-section order fixed by CALL 2.

## Preview

Any static server works; the page has no build step and makes no external requests.

```bash
python3 -m http.server 8080      # then open http://localhost:8080
```

```
index.html            page markup (semantic, one h1, landmarks)
assets/style.css      tokens → reset → layout → components → sections → utilities → media → print
assets/app.js         header state, in-view reveal, hero mock, demo state machine, copy-facts
fonts/                Vazirmatn 400/500/700 woff2 (self-hosted, OFL licence included)
demo/                 standalone interactive demo (single file + its own README)
docs/                 CALL 1 spec
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

- **The hero form.** Product «کوله‌پشتی سفری ۳۰ لیتری», price ۱٬۲۸۰٬۰۰۰ تومان, stock 0,
  customer «سارا محمدی» · ۰۹۱۲…۴۷. Submitting shows the real success state; nothing is sent.
- **The demo (§9).** Entirely in-memory, deterministic, no fetch, no storage, no SMS.
  Six scenarios; each ends with a one-line takeaway phrased as a fact.
- **Dates** in the demo are plausible Jalali dates, not data from a real installation.

## What is a placeholder (wire these before launch)

1. **Checkout.** Every purchase CTA carries `data-checkout` and points at an in-page anchor.
   Replace the `href` of the buttons in the licence block with your store URL — nothing else changes.
2. **Price.** The ledger contains no price, so the page refuses to print one: the block shows
   «قیمت پیش از پرداخت» and explains why. When a price is confirmed, put it in `.mjy-price`
   and delete the explanatory line.

## Audit outcome (CALL 4)

The three invented licence tiers were removed: they carried commercial terms («نصب روی یک
فروشگاه»، «اولویت در پاسخ») that exist in no ledger, and they contradicted CALL 1 §11
(«one price, no hidden Pro tier»). What remains is one package described only with facts the
ledger carries. The «مشکل» section was deleted and one sentence of it moved into the mechanism
section. The hero footnote no longer claims that *every* number is measured — it names the two
measurement files and says plainly that the mock's price and customer data are fabricated.

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
| index.html | 44.9 KB | 8.2 KB |
| assets/style.css | 33.5 KB | 6.7 KB |
| assets/app.js | 16.6 KB | 5.0 KB |
| **page total, fonts excluded** | **95 KB** | **~20 KB** |
