# Images

The site ships with **no photographs**. Template thumbnails are live renders, the hero uses live template mockups over an SVG rosette, and article cards use a small SVG pattern. This keeps the site fast and avoids stock-photo licensing issues.

## Dropping in real photos

Add a file and it is used automatically (no code change). Pages are static, so rebuild (`npm run build`) or restart `npm run dev` after adding one. Supported: `.webp`, `.jpg`, `.jpeg`, `.png`.

| File | Where it shows |
|---|---|
| `public/images/heroes/home.jpg` | Home hero, as a faint background |
| `public/images/blog/<slug>.jpg` | Header of that blog card |
| `public/images/guides/<slug>.jpg` | Header of that guide card |

Use images you own or have a licence for. Suggested size: 1600 px wide for the hero, 900 px for cards. Compress to WebP where possible.

## Prompts for generating your own hero image

- "Warm natural-light photograph of an Indian family looking at a printed document together at a wooden table, shallow depth of field, soft window light, no text, 35 mm lens look."
- "Close-up of hands holding a printed A4 marriage biodata beside a cup of chai, soft daylight, neutral background, no readable text."

Avoid images of real, identifiable people unless you have their written permission. Avoid text inside images.
