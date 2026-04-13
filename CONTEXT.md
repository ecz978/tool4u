# Tool4U — Briefing per Claude

Incolla questo all'inizio di ogni nuova sessione.

---

## Progetto

**Sito:** https://tool4u.org  
**Repository:** https://github.com/ecz978/tool4u  
**Hosting:** Cloudflare Pages con Worker  
**Deploy:** automatico al push su `main`  
**Working dir:** `/home/claude-user/tool4u`  
**Git remote:** richiede token GitHub — impostalo così:
```
git remote set-url origin https://ecz978:TOKEN@github.com/ecz978/tool4u.git
```

---

## Struttura del sito

```
public/
  index.html              ← homepage (lista tool con filtri e ricerca)
  chi-siamo.html          ← pagina about (creata apr 2026)
  privacy.html            ← privacy policy
  sitemap.xml             ← sitemap completa
  robots.txt              ← robots
  og-image.png            ← immagine OG condivisa da tutte le pagine
  *.html                  ← 76 tool pages (clean URL, no .html in canonical)
  blog/
    it/   (247 articoli)
    en/   (133 articoli)
    de/   (99 articoli)
    fr/   (12 articoli)
    es/   (10 articoli)
    el/   (10 articoli)
    pt/   (9 articoli)
    pl/   (10 articoli)
    cs/   (9 articoli)
    hr/   (10 articoli)
    sr/   (10 articoli)
    uk/   (10 articoli)
src/
  index.js                ← Cloudflare Worker: redirect 301 da .html → clean URL
wrangler.jsonc            ← config Cloudflare (name: tool4u, main: src/index.js)
tools.json                ← registry di tutti i tool (usato per generare la homepage?)
```

**Totale:** 76 tool + 569 articoli blog in 12 lingue

---

## Cosa è già stato fatto (cronologia)

### Sessione aprile 2026 — SEO completo

**1. Clean URLs (commit b772e4c)**
- Cloudflare Worker (`src/index.js`) che fa 301 redirect da `/pagina.html` → `/pagina`
- Canonical, hreflang, og:url, JSON-LD, link interni, sitemap: tutti aggiornati senza `.html`
- Motivazione: Google scansionava entrambe le versioni (con e senza .html) → URL duplicate → "crawled but not indexed"

**2. FAQPage schema su tutti i tool (commit aaba58b)**
- 79 tool pages ora hanno `FAQPage` JSON-LD schema con 4 domande/risposte ciascuna
- Aggiunto anche HTML visibile con `<details>/<summary>` (accordion)
- 4 file HTML troncati fixati (calorie-attivita, interessi-legali, rata-mutuo, convertitore-netto-lordo)
- Scopo: attivare rich snippets Google (domande espanse nei risultati)

**3. BlogPosting schema su tutti gli articoli (commit f12852f)**
- 569 articoli blog in 12 lingue ora hanno `BlogPosting` JSON-LD schema
- `og:type` corretto da `website` → `article` su tutte le pagine blog
- 45 articoli IT troncati fixati (aggiunto `</body></html>` mancante)
- Schema include: headline, description, url, datePublished (2026-03-15), dateModified (2026-04-13), inLanguage, author/publisher Organization

**4. Pagina Chi siamo (commit abf095a)**
- Creata `/public/chi-siamo.html` con `Organization` JSON-LD schema
- Contenuto: missione, principi (privacy, formule verificate, multilingua), lista categorie tool, trasparenza affiliazioni, contatti
- Linkata dal footer di homepage e privacy.html
- Aggiunta a sitemap.xml
- Scopo: segnali E-E-A-T per Google

---

## Stato SEO attuale (aprile 2026)

| Elemento | Stato |
|---|---|
| Clean URLs con redirect 301 | ✅ |
| Canonical senza .html | ✅ |
| FAQPage schema su tool | ✅ 79/79 |
| BlogPosting schema su articoli | ✅ 569/569 |
| og:type=article su blog | ✅ |
| Organization schema | ✅ (chi-siamo.html) |
| Sitemap | ✅ (aggiornata) |
| robots.txt | ✅ |
| Hreflang su tool | ✅ |
| Indicizzazione Google (apr 2026) | ~53 pagine su 650+ |

---

## Problemi noti / da fare

### Priorità alta
- [ ] **Backlink**: il sito è nuovo (marzo 2026) e ha pochissima autorità esterna. Google è cauto. Servono link da siti italiani di settore.
- [ ] **Contenuto thin**: alcuni tool hanno poco testo oltre al calcolatore. Aggiungere sezioni "Come funziona", "Esempio pratico", "Quando usarlo".

### Priorità media
- [ ] **Articoli EN/DE incompleti**: EN ha 133 articoli, DE 99 — le altre lingue hanno solo 9-12. Da espandere.
- [ ] **Internal linking**: ogni articolo blog dovrebbe linkare al tool corrispondente in modo più sistematico.
- [ ] **Core Web Vitals**: non ancora misurati. Verificare su PageSpeed Insights.
- [ ] **og:image personalizzata**: attualmente tutte le pagine usano la stessa `og-image.png`. Immagini specifiche per pagina migliorerebbero il CTR sui social.

### Priorità bassa
- [ ] **Schema WebSite con SearchAction** sull'homepage (sitelinks search box)
- [ ] **BreadcrumbList schema** sulle pagine blog

---

## Stack tecnico

- **Hosting:** Cloudflare Pages + Worker
- **Linguaggi:** HTML/CSS/JS puro (niente framework)
- **Font:** DM Sans (Google Fonts) — usato nelle pagine statiche
- **Colori principali:** `#2563eb` (blu primario), `#1a1a2e` (testo scuro), `#FAFAF8` (background)
- **Analytics:** Microsoft Clarity (`w0vhf9r9mx`)
- **Affiliazioni:** Amazon Associates (tag: `tool4u0b-21`)
- **Email contatto:** info@tool4u.org, privacy@tool4u.org

---

## Pattern ricorrenti nel codice

### Tool page (public/*.html)
- Canonical: `https://tool4u.org/SLUG` (senza .html)
- Schema: `WebApplication` + `FAQPage`
- Sezione FAQ HTML con `<details>/<summary>` prima di `</body>`
- Sezione "Approfondisci" con link all'articolo guida corrispondente

### Articolo blog (public/blog/LANG/SLUG.html)
- Canonical: `https://tool4u.org/blog/LANG/SLUG` (senza .html)
- Schema: `BlogPosting`
- `og:type`: `article`
- Hreflang verso le versioni in altre lingue

### Git commit
- User: `Tool4U`, email: `dev@tool4u.org`
- Co-authored: `Claude Sonnet 4.6 <noreply@anthropic.com>`

---

## Come aggiungere un nuovo tool

1. Creare `public/SLUG.html` con canonical, schema WebApplication, FAQPage, sezione FAQ HTML
2. Aggiungere in `tools.json` (se esiste il registry)
3. Aggiungere alla homepage `index.html` (lista tool)
4. Aggiungere a `sitemap.xml`
5. Creare articolo guida in `blog/it/guida-SLUG.html` + versioni EN/DE

## Come aggiungere articoli blog

- File: `public/blog/LANG/SLUG.html`
- Includere canonical, BlogPosting schema, og:type=article, hreflang
- Aggiungere a sitemap.xml
- Linkare al tool corrispondente
