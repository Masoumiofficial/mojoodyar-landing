# APEX ∞ / CALL 1 — Specification

**موجودیار landing page. Spec only. Binding for CALL 2.**

> The FACT LEDGER didn't arrive with the brief. Below holds to your stated invariants (PHP 7.4, shared hosting, Persian-first, no social proof, no counts); `[ledger]` marks facts to fill from it, never invent.

## 1. One-sentence job

Within 90 seconds a visitor must answer *"will this work on my shop, and what will I actually see?"* — enough to install or buy without emailing first.

## 2. Audience split

**1. The owner who installs it herself.** Fears the last plugin white-screened her shop and cost a repair bill. Proof: a compatibility block naming her stack — PHP 7.4, shared hosting, no cron, no Redis, no SSH — plus a boring screenshot of the plugin's own settings. **§8**, reinforced by §10.

**2. The freelancer installing for a client.** Fears a ticket in three weeks he can't close, and a client who blames him. Proof: a scope page of refusals, an uninstall line (drops its table, leaves products alone), a changelog with real dates. **§9 + §10**.

**3. The burned buyer** — has paid for two abandoned plugins. Fears silence in six months. Proof: one price, one update window, one refund condition, no hidden "Pro" tier. **§11**.

## 3. Three design routes

**A. Engineering document.** Single column, tight type, numbered headings, tables, footnotes. Hero = name, one sentence, version string, requirements, buy. Refuses photographs, cards, illustration, whitespace theatre. Risk: reads as docs; the non-technical majority bounces.

**B. Product tour.** Hero holds one real screen (the shopper's form, filled) and the page walks that screen through time: form → admin row → email sent → restocked. Steps, not sections. Refuses abstract diagrams, feature grids, anything not a shipped-build screenshot. Risk: every section depends on screenshots staying in sync.

**C. Editorial.** Narrow column, long sentences, numbers as pull-quotes (`0` external calls, `1` table, `10` minutes). Hero = a paragraph, not a headline. Refuses buttons above the fold, comparison tables, bullets. Risk: beautiful, slow to convert, and it needs numbers the ledger may not carry.

**Pick: B.** The buyer asks "what will I see", not "what is this" — B answers it above the fold. Most of the audience is non-technical; A's density signals maintenance burden, not honesty. B's sync risk is contained by §6: stills, not a live replica.

## 4. Section map

| # | Section | Purpose | Primary element | Failure mode (do NOT) |
|---|---|---|---|---|
| 1 | Header | Identify, one action | Name, version chip, Buy | A six-link nav; imply a site, not a page |
| 2 | Hero | Show it working | Filled shopper-form still | Promise "۳۰٪ فروش بیشتر" — unprovable |
| 3 | The real problem | Name the leak | Two paragraphs, a DM shot | Fear-marketing with invented lost revenue |
| 4 | How it works | Set expectations | One screen, three states | Diagram a flow the plugin doesn't enforce |
| 5 | The shopper's side | Prove the form is light | Annotated still, mobile width | Stage a mock instead of the shipped UI |
| 6 | The panel | Prove admin is legible | Annotated admin table | Invented names as customers; segments not shipped |
| 7 | The email | Show the actual send | The literal email, unstyled | Show HTML design when it sends plain text |
| 8 | Compatibility | Remove install fear | Stack table `[ledger]` | Claim "all hosts"; list untested versions |
| 9 | What it won't do | Buy trust with scope | Plain list of refusals | Add "coming soon" — a roadmap lie |
| 10 | Engineering notes | Reward the skeptic | Table, hooks, uninstall | Another version's hooks; "no telemetry" while pinging a licence server |
| 11 | Price & licence | Close | One price, update window, refund | Struck-through "was" price; "۳ لایسنس مانده" |
| 12 | FAQ | Absorb objections | Eight ledger-true answers | Unasked questions; a dead contact form |
| 13 | Final CTA + footer | Last action, clean exit | Buy, version, changelog | Footer as blog-and-social sitemap |

## 5. Conversion path

Three destinations, ten links:

- **Buy** ×4 — header, hero, §11, §13.
- **See the panel** ×3 — hero (secondary), §4, §11 ("before you pay").
- **Read the FAQ** ×3 — after §9, §11, §13.

Not links: blog, social icons, "تماس با ما" in the header (contact is plain text in the FAQ), header changelog (footer only), docs, account login, language switcher, cart.

## 6. Demo decision

**Recommend (a): a static annotated screenshot set**, choreographed as route B's steps — stills plus captions, no live DOM.

- **(a)** Half a day; ~20 minutes per release; no code risk. A still cannot drift into lying.
- **(b)** 2–4 days, then a parity tax: every admin redesign invalidates it, and a lagging replica is the lie this brand can't survive.
- **(c)** 3–5 days; re-record each release, RTL subtitles, megabytes on the hosts we sell to.

## 7. What we will not build

1. **Testimonial carousel** — no permissioned quotes exist; inventing them poisons every other claim.
2. **Logo wall** — implies a roster we won't verify; reads as borrowed credibility.
3. **Countdown banner** — a licence has no stock, so the urgency is fiction.
4. **Chat bubble** — promises a response time nobody staffs; the honest channel is one footer email.
5. **Analytics cookie banner** — with no telemetry, it only apologises for something we didn't do.
