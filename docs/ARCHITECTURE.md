# Architecture

## One data contract

`BiodataData` (`src/types/biodata.ts`) is the only shape of biodata. The form edits it, the store holds it, every template renders it and every exporter captures it. Do not create parallel shapes.

```
react-hook-form (editing surface)  --watch-->  useBiodataStore.data  -->  buildViewModel()  -->  Template component
        ^                                            |                                              |
        +------- reset(data) on `revision` bump -----+                                              +--> LivePreview / ExportStage
```

## State

- `src/store/biodata-store.ts`: `data`, `templateId`, `accents` (colour per template), `enabled` (which sections are shown), `saveState`, `revision`.
  - The form calls `setData` on every edit. Changes that come from outside the form (sample data, clear draft, restoring a draft) bump `revision`, and `EditorSidebar` resets the form when it changes.
  - Saves to localStorage are debounced (500 ms) and skipped while the biodata is still empty.
- `src/store/editor-ui-store.ts`: accordion state, mobile tab (Edit/Preview), which dialogs are open, and `reveal(section)` used to jump to a section that fails validation.
- `src/components/editor/form-registry.ts`: lets header controls trigger validation on the form owned by `EditorSidebar`.

## View model

`buildViewModel(data, enabled)` in `src/lib/biodata.ts` turns raw data into `ResolvedSection[]`: empty rows and sections are removed, dates are formatted, age is derived from date of birth, siblings are numbered when there are several. Templates never look at empty fields.

## Validation

`src/lib/schema.ts`:
- `biodataSchema` (zod) is field-level, used by the form. Only name and date of birth are required.
- `checkDownloadReady()` is the gate before download: name, date of birth, and at least one contact detail if the contact section is on.

## Routes

- `src/app/(site)/`: marketing pages, wrapped with navbar, footer and site JSON-LD.
- `src/app/create/page.tsx`: the editor. Full screen, no site navbar. `noindex`.
- Blog and guides are read at build time from `content/` by `src/lib/content.ts`.

## Design tokens

Colours are defined in `src/app/globals.css` under `@theme` and mirrored in `siteConfig.brand`. Orange (`cta`) is used only for the main action and always with dark text, because white on `#F97316` fails contrast.
