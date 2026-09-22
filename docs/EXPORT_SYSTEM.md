# Export system

Files: `src/lib/export/{capture,paginate,pdf,image}.ts`, UI in `src/components/editor/DownloadControls.tsx`.

## Flow

1. **Validate**: `checkDownloadReady()`. If something is missing, a toast lists it and the first offending section opens.
2. **Mount `ExportStage`**: an off-screen, unscaled copy of the template (`position: fixed; left: -10000px`). Zoom level and screen size never affect the output.
3. **Wait** for fonts (`document.fonts.ready`) and images to load and decode.
4. **Rasterise** with `html-to-image` at about 300 dpi: pixel ratio `300/96 = 3.125`, reduced automatically so the canvas stays under ~16 million pixels (protects iOS Safari and low-memory phones). Fonts are embedded with `getFontEmbedCSS`. Safari gets a small warm-up render first.
5. **Output**
   - PNG: canvas to blob.
   - JPEG: flattened onto white, quality 0.95.
   - PDF (`jspdf`): pages are chosen by `computePageSlices()` *before* rasterising.

## Pagination

`computePageSlices(root)` reads every `[data-block]` element. When a page boundary would fall inside a block it moves the cut up to the top of that block (a section title stays with its first row). Continuation pages get a 40 px top margin and the template's background colour. Content at most 36 px taller than A4 is scaled to fit one page instead of spilling a few pixels.

## Fallback

If export fails, the error toast offers **Print or save as PDF**: `PrintStage` renders the template into a `.print-only` portal and calls `window.print()`. `globals.css` hides everything else in `@media print` and sets `@page { size: A4; margin: 0 }`. This path gives selectable text.

## Known limits

- PDF pages are images (not selectable text).
- PNG/JPEG of a long biodata is a single tall image.
- Continuous decorative frames are cut at page boundaries.
- Verified in headless Chromium only. Test iPhone Safari before launch.
