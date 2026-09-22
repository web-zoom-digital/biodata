# Change guide

| I want to... | Edit |
|---|---|
| Rename the brand, change nav/footer links, contact email | `src/config/site.ts` |
| Change colours | `@theme` in `src/app/globals.css` (and `siteConfig.brand`) |
| Change fonts | Replace files in `src/fonts/` and update `src/app/layout.tsx` |
| Change hero text | `src/components/home/Hero.tsx` |
| Change home steps / "why" copy / biodata types | `src/data/home.ts` |
| Add or edit FAQs | `src/data/faqs.ts` |
| Add a template | `docs/TEMPLATE_DEVELOPMENT.md` |
| Change a template's colour choices | `accentOptions` in its `config.ts` |
| Add a form field | 1) type in `src/types/biodata.ts`, 2) default in `createEmptyBiodata`/`normalizeBiodata` (`src/lib/biodata.ts`), 3) zod in `src/lib/schema.ts`, 4) input in the matching `src/components/forms/*Form.tsx`, 5) a row in `buildViewModel` |
| Add a new section | The steps above, plus `SectionKey` type, `SECTION_ORDER`, `SECTION_TITLES`, `defaultEnabledSections`, and an `EditorSection` in `EditorSidebar.tsx` |
| Change dropdown suggestions | `src/data/form-options.ts` |
| Change required fields for download | `checkDownloadReady` in `src/lib/schema.ts` |
| Change export quality | `TARGET_RATIO` in `src/lib/export/capture.ts` (JPEG quality in `image.ts`/`pdf.ts`) |
| Change PDF page margins | `PAGE_MARGIN` in `src/lib/export/paginate.ts` |
| Change the localStorage key | `siteConfig.storageKey` (changing it abandons existing drafts) |
| Change sample data | `src/data/sample-biodata.ts` |
| Add a blog post or guide | `docs/SEO.md` |
| Change privacy / terms text | `src/app/(site)/privacy/page.tsx`, `terms/page.tsx` |
