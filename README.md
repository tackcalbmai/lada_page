# AVAZZOR TATTOO

Official website for **AVAZZOR TATTOO / Lada Romanova, Riga**.

Production URL: https://tackcalbmai.github.io/lada_page/

## Stack

- semantic static HTML
- CSS (responsive editorial UI and motion)
- vanilla JavaScript
- GitHub Pages deployment

The public website has no analytics or advertising tracking scripts. Language preference is stored in `localStorage`; the one-per-session brand intro uses `sessionStorage`.

## Project structure

- `index.html` — home
- `portfolio.html` — portfolio
- `about.html` — artist page
- `cover-up.html` — cover-up information
- `preparation.html` — session preparation
- `aftercare.html` — tattoo aftercare
- `booking-info.html` — booking terms
- `booking.html` — tattoo enquiry form
- `contacts.html` — contacts
- `faq.html` — short FAQ
- `privacy.html` — privacy policy
- `404.html` — branded error page
- `assets/site.js` — shared navigation, language UI, lightbox, form, intro and interactions
- `assets/*.css` — shared layout, premium UI, animation and responsive rules
- `robots.txt` / `sitemap.xml` — crawl configuration
- `scripts/audit.mjs` — production integrity check

## Local preview

No application server or framework build is required for the public site.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Production check

```bash
npm run build
```

The build command runs the repository audit and checks required pages/assets, local references, canonical/OG metadata and common release blockers such as `href="#"`, release placeholder copy and the misspelling `AVAZOR`.

## Updating content

### Text
Edit the relevant root HTML page. RU is the source copy. LV/EN text for the dedicated production information pages is stored in `assets/site.js`; existing presentation pages use the shared language layer in `assets/i18n.js`.

### Portfolio photos
Portfolio visual blocks are in `portfolio.html` and selected work is in `index.html`. When original photos are added, use optimized web-size assets for the page and a higher-resolution source for the lightbox where needed. Keep `data-lightbox` on media that should open in the viewer.

### Contacts
The current public contacts are:
- WhatsApp: `+371 26666691`
- Instagram: `@avazzor.tattoo`

They are referenced in `assets/site.js`, `contacts.html` and booking-related pages.

### Booking terms
Edit `booking-info.html` and the matching LV/EN keys in `assets/site.js`.

### Preparation
Edit `preparation.html` and the matching LV/EN keys in `assets/site.js`.

### Aftercare
Edit `aftercare.html` and the matching LV/EN keys in `assets/site.js`.

### Privacy
Edit `privacy.html` and the matching LV/EN keys in `assets/site.js`.

## Deployment

GitHub Pages serves the repository from the `main` branch root. `.nojekyll` must remain in the repository.

When a custom production domain is connected, update canonical URLs, Open Graph URLs, `sitemap.xml`, `robots.txt` and the structured-data `url` values from the current GitHub Pages URL to the final domain.

## Brand spelling

Use **AVAZZOR TATTOO** everywhere. Do not use `AVAZOR`.
