# Template development

## Add a template in four steps

1. Create `src/templates/<id>/` with `index.tsx` (component), `styles.ts(x)` (palette and section styles) and `config.ts` (definition).
2. In `config.ts` export a `TemplateDefinition`:

```ts
export const myTemplate: TemplateDefinition = {
  id: "my-template",             // used in /create?template=my-template
  name: "My Template",
  description: "One sentence for the card.",
  style: "Two columns, photo left",
  categories: ["Modern", "Boy"],  // drives the filter pills
  previewSample: "girl",          // optional, thumbnail sample data
  component: MyTemplate,
  supportedSections: [/* SectionKey[] */],
  defaultSettings: { accent: "#0F766E", showPhotoPlaceholder: true },
  accentOptions: [{ name: "Teal", value: "#0F766E" }],
};
```

3. Add it to the `templates` array in `src/templates/registry.ts`.
4. Done. The gallery, home showcase, editor selector, filters and colour swatches pick it up automatically.

## Rules a template must follow

- Props are `{ data, model, settings }`. Render from `model` (the view model), not raw `data`, so empty fields and sections stay hidden.
- Wrap the page in `TemplateShell`. It is a fixed 794 px wide (A4 at 96 dpi), grows taller if content is long, and carries `data-template-root`, which exporters capture.
- Render sections with `TemplateSection` (or copy its `data-block` attributes). Every row, section title and paragraph needs `data-block="row|title|text"`. The PDF exporter uses these to avoid cutting through content.
- Use **literal colours** (hex/rgba, see `src/lib/color.ts`), not CSS variables or `oklch`. The exporter rasterises the DOM and literal colours render identically in every browser.
- Fonts: use `FONT_DISPLAY` / `FONT_BODY` from `shared/constants.ts`.
- Use plain `<img>` (through `TemplatePhoto`), never `next/image`.
- Handle "no photo": `TemplatePhoto` shows a silhouette when `settings.showPhotoPlaceholder` is true and renders nothing otherwise.
- **Fit sample data on one A4 page** (1123 px). Check by opening `/create?template=<id>`; the preview says "A4, 1 page".

## Shared helpers

- `balanceColumns(sections, n)`: splits sections into n columns of similar height.
- `pick / omit`: filter sections by key.
- `SectionStyles`: styles object for `TemplateSection` (wrapper, title, row, label, value, text, `renderTitle`).
- `alpha / tint / shade`: colour helpers.

## Testing a template

1. `npm run dev`, open `/create?template=<id>`.
2. Try empty, sample and very long data (add many Additional information fields) to check pagination.
3. Download PDF, PNG and JPEG and compare with the preview.
