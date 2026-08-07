# AVAZZOR TATTOO — official website

Production website for **AVAZZOR TATTOO / Lada Romanova**, tattoo artist in Riga.

## Public site

The current public frontend is served from the repository root and includes:

- RU / LV / EN interface;
- portfolio with fullscreen work preview;
- Microrealism, Fine line and Cover-up service pages;
- artist page;
- booking terms and cancellation policy;
- separate preparation & aftercare guide;
- FAQ and journal;
- WhatsApp booking form with date picker and required acknowledgement of terms/privacy;
- privacy policy;
- one-time AVAZZOR brand intro on the home page;
- responsive desktop/mobile navigation and motion system.

## Contacts

- Instagram: `@avazzor.tattoo`
- WhatsApp: `+371 26666691`
- Location: Riga, Latvia

## Technical stack

- static production frontend on GitHub Pages during development/deployment;
- Astro source retained for the structured site/CMS layer;
- Decap CMS configuration under `public/admin`;
- planned production infrastructure can be moved to Cloudflare without changing client-facing content.

## Content management

Real portfolio images, prices and editable content should be maintained through the project content/CMS layer. Repository credentials and infrastructure access are not required for normal client content updates once the CMS authentication flow is enabled.

## Status

**Production-ready site structure — v1.0.0.**

The website is no longer treated as a demo/starter. Remaining content updates (for example new portfolio photography or future price changes) are normal site content maintenance.
