# Comprehensive Project Summary: BioCraft (Marriage Biodata Maker)

> **Purpose of this Document:**  
> This file provides an exhaustive, structured technical and functional overview of **BioCraft**. It is designed to give AI models (such as ChatGPT, Claude, Gemini, or custom agents) and human developers an instant, complete understanding of the project's purpose, architecture, stack, state management, template engine, export pipeline, data schemas, and file layout.

---

## 1. Project Overview & Philosophy

**BioCraft** is a modern, privacy-focused web application built to help users create, customize, and export professional marriage biodatas (matrimonial resumes) in A4 format.

### Key Value Propositions
1. **100% Client-Side Privacy:** No server backend or database. All user data, drafts, and uploaded photos remain strictly inside the user's browser via LocalStorage.
2. **Zero Signup / Instant Access:** Users can immediately enter details, switch templates, preview in real time, and download PDFs or images without creating an account.
3. **Live A4 Side-by-Side Preview:** Dynamic preview rendering that matches exact A4 dimensions, updated instantaneously as the user types.
4. **Rich Multi-Cultural Template Engine:** 12 curated themes spanning Classic, Minimal, Modern, Floral, Royal, Traditional, Islamic, and Jain aesthetic choices.
5. **High-Resolution Export Pipeline:** Client-side generation of print-ready PDF, PNG, and JPEG formats (~300 DPI canvas rendering).

---

## 2. Technology Stack & Dependencies

| Category | Technology / Library | Version / Details |
|---|---|---|
| **Framework** | Next.js (App Router) | `16.3.5` |
| **Language** | TypeScript | `^5` (Strict mode) |
| **UI Library** | React | `19.2.8` |
| **Styling** | Tailwind CSS v4 & PostCSS | `@tailwindcss/postcss ^4`, `clsx`, `tailwind-merge` |
| **State Management** | Zustand | `^5.0.15` (State persistence with LocalStorage) |
| **Forms & Validation** | React Hook Form & Zod | `react-hook-form ^7.88.0`, `zod ^4.6.5`, `@hookform/resolvers` |
| **Export Engines** | `html-to-image` & `jspdf` | Canvas rasterization & A4 PDF generation |
| **Animations** | Framer Motion | `^13.4.0` |
| **Icons** | Lucide React | `^1.47.0` |
| **Content Loading** | `gray-matter` & `marked` | Parsing local Markdown for static Blog and Guides |
| **Fonts** | Self-Hosted Local Fonts | Bundled in `src/fonts` (no runtime network dependency on Google Fonts) |

---

## 3. Directory Structure & Codebase Organization

```
d:/zoom-digital/BIODATA/biodata/
├── content/                     # Static Markdown articles for content pages
│   ├── blog/                    # Blog articles (.md with frontmatter)
│   └── guides/                  # Help and tutorial guides (.md with frontmatter)
├── docs/                        # Internal developer documentation
│   ├── ARCHITECTURE.md          # Data flow and state architecture
│   ├── CHANGE_GUIDE.md          # Guide on where to make changes
│   ├── EXPORT_SYSTEM.md         # PDF/PNG/JPEG canvas export mechanics
│   ├── IMAGES.md                # Image guidelines and prompt templates
│   ├── SEO.md                   # Metadata, JSON-LD, and content structure
│   └── TEMPLATE_DEVELOPMENT.md  # Step-by-step guide to adding new templates
├── public/                      # Static public assets (favicons, OG images, SVGs)
├── src/
│   ├── app/                     # Next.js App Router route hierarchy
│   │   ├── (site)/              # Public marketing pages wrapped in main Navbar + Footer
│   │   │   ├── page.tsx         # Home page (Hero, Features, Templates Showcase, FAQ summary)
│   │   │   ├── about/           # About page
│   │   │   ├── blog/            # Blog list & single post dynamic routes `[slug]`
│   │   │   ├── contact/         # Contact page
│   │   │   ├── faq/             # Comprehensive FAQ page
│   │   │   ├── guides/          # Guides list & dynamic route `[slug]`
│   │   │   ├── how-it-works/    # Step-by-step workflow explanation
│   │   │   ├── privacy/         # Privacy Policy document
│   │   │   ├── templates/       # Templates gallery and filter showcase
│   │   │   └── terms/           # Terms of Service document
│   │   ├── create/              # Full-screen Biodata Builder / Editor page
│   │   │   ├── page.tsx         # Split-screen form editor + live preview container
│   │   │   └── layout.tsx       # Dedicated minimal layout for the editor
│   │   ├── globals.css          # Tailwind CSS v4 imports & custom CSS variables
│   │   ├── layout.tsx           # Root layout (Fonts, SEO metadata initialization)
│   │   ├── not-found.tsx        # Custom 404 page
│   │   ├── opengraph-image.tsx  # Dynamic OG image generator
│   │   ├── robots.ts            # Dynamic `robots.txt` generator
│   │   └── sitemap.ts           # Dynamic XML sitemap generator
│   ├── components/              # Modular UI Component Library
│   │   ├── blog/                # Blog cards, post viewers, share buttons
│   │   ├── editor/              # Form sections, field inputs, tab switchers, header bar
│   │   ├── faq/                 # Accordion UI components
│   │   ├── forms/               # Reusable input components, photo uploader, custom field builder
│   │   ├── home/                # Hero banner, feature grids, call-to-action sections
│   │   ├── layout/              # Navbar, Footer, Mobile Navigation, Container wrappers
│   │   ├── preview/             # Live A4 page container, zoom controls, pagination helpers
│   │   ├── seo/                 # Schema.org JSON-LD component injectors
│   │   ├── templates/           # Template cards, category selector filters
│   │   └── ui/                  # Primitives (Buttons, Dialogs, Inputs, Modals, Tabs, Tooltips)
│   ├── config/
│   │   └── site.ts              # Single source of truth for site name, metadata, navigation, links
│   ├── data/                    # Static configuration data & defaults
│   │   ├── sample-biodata.ts    # Initial pre-filled sample data for new visitors
│   │   ├── faqs.ts              # FAQ question-answer pairs
│   │   ├── suggestions.ts       # Autocomplete options for religions, castes, gotras, professions
│   │   └── home-copy.ts         # Marketing copy text for home page
│   ├── lib/                     # Utility functions and business logic
│   │   ├── biodata.ts           # Data normalization, ViewModel builders, empty section checks
│   │   ├── color.ts             # Palette parsing and color theme calculation helpers
│   │   ├── content.ts           # Markdown loader reading `content/` with `gray-matter` & `marked`
│   │   ├── images.ts            # Image processing and base64 resizing utilities
│   │   ├── schema.ts            # Zod validation schema for `BiodataData`
│   │   ├── seo.ts               # JSON-LD structured data generators
│   │   ├── storage.ts           # Safe LocalStorage getter/setter wrapper with error fallbacks
│   │   ├── utils.ts             # `clsx` and `tailwind-merge` utility functions
│   │   └── export/              # Export pipeline module
│   │       ├── canvas.ts        # `html-to-image` rendering logic
│   │       ├── pdf.ts           # `jspdf` document building & page splitting
│   │       └── image.ts         # High-DPI PNG and JPEG image export handlers
│   ├── store/                   # Zustand Global State Stores
│   │   ├── biodata-store.ts     # User biodata state (auto-saves to browser LocalStorage)
│   │   └── editor-ui-store.ts   # Active tab, preview zoom, current template selection, modals
│   ├── templates/               # Handcrafted Biodata Template System
│   │   ├── registry.ts          # Central registry array exporting all 12 templates
│   │   ├── shared/              # Shared template components (Header, Photo, Details Grid, Footer)
│   │   ├── blue-floral/         # Blue Floral design definition & component
│   │   ├── elegant-rose/        # Elegant Rose design definition & component
│   │   ├── emerald-classic/     # Emerald Classic design definition & component
│   │   ├── islamic-emerald/     # Islamic Emerald design definition & component
│   │   ├── islamic-ivory/       # Islamic Ivory design definition & component
│   │   ├── jain-classic/        # Jain Classic design definition & component
│   │   ├── minimal-ivory/       # Minimal Ivory design definition & component
│   │   ├── modern-indigo/       # Modern Indigo design definition & component
│   │   ├── peach-floral/        # Peach Floral design definition & component
│   │   ├── red-rose-classic/    # Red Rose Classic design definition & component
│   │   ├── royal-heritage/      # Royal Heritage design definition & component
│   │   └── traditional-gold/    # Traditional Gold design definition & component
│   └── types/                   # TypeScript Type Definitions
│       ├── biodata.ts           # Core `BiodataData` interface and section types
│       ├── content.ts           # Markdown post and guide frontmatter types
│       └── template.ts          # `TemplateDefinition`, `TemplateProps`, color theme types
```

---

## 4. Architectural Deep-Dive & Data Flow

### A. State Management Architecture (`src/store/`)
1. **`biodata-store.ts` (Zustand):**
   - Holds the entire `BiodataData` state object (Personal Information, Family Background, Contact Details, Horoscope/Astrology details, Custom Sections, Photo URL).
   - Automatically synchronizes changes to browser `LocalStorage` via `src/lib/storage.ts`.
   - Offers action methods to update specific fields, add/remove dynamic fields, update dynamic sections, upload/clear photo, reset to sample data, or clear all fields.

2. **`editor-ui-store.ts` (Zustand):**
   - Controls active UI tab inside `/create` (`"details" | "templates" | "customize"`).
   - Tracks selected template ID (defaults to `emerald-classic`).
   - Manages preview zoom level, active modal triggers, and export loading state.

```
+-------------------------------------------------------------------+
|                            USER UI                                |
|  (/create Form Inputs / Photo Uploader / Dynamic Field Builder)   |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                     Zustand Store & Actions                       |
|           (biodata-store.ts & editor-ui-store.ts)                |
+-------------------------------------------------------------------+
                   |                               |
                   v                               v
+------------------------------------+   +--------------------------+
|       Browser LocalStorage         |   |    Live A4 Preview       |
|    (Persistent Local Draft)        |   | (Template Component Renders|
+------------------------------------+   |    DOM in real-time)     |
                                         +--------------------------+
                                                   |
                                                   v
                                         +--------------------------+
                                         |    Export Pipeline       |
                                         | (html-to-image + jsPDF)  |
                                         +--------------------------+
```

---

## 5. Template Registry & System (`src/templates/`)

Each template is self-contained with its own configuration, color palette options, typography choices, decorative elements, and main React component rendering an A4 sheet.

### Standard Template Contract (`src/types/template.ts`)
Every template exports a `TemplateDefinition` containing:
- `id`: Unique string key (e.g. `royal-heritage`).
- `name`: Display title.
- `description`: Tagline describing the style.
- `category`: Classification (`classic | floral | modern | religious | minimalist`).
- `tags`: Search tags (e.g. `Hindu`, `Traditional`, `Gold`, `Floral`).
- `component`: React component rendering the biodata layout (`TemplateProps`).
- `defaultColors`: Primary, secondary, background, and accent hex codes.

### Available Templates List
1. **Emerald Classic (`emerald-classic`):** Deep emerald green tones with balanced corporate/formal structure.
2. **Royal Heritage (`royal-heritage`):** Luxurious golden borders, traditional ornamental frames.
3. **Minimal Ivory (`minimal-ivory`):** Clean, typography-first layout with subtle warm ivory background.
4. **Modern Indigo (`modern-indigo`):** Contemporary dual-column design with indigo header accent.
5. **Elegant Rose (`elegant-rose`):** Soft rose-gold hues with refined serif headers.
6. **Traditional Gold (`traditional-gold`):** Rich cultural motifs with decorative headers and golden borders.
7. **Blue Floral (`blue-floral`):** Delicately framed floral corners with cool blue color palette.
8. **Peach Floral (`peach-floral`):** Warm aesthetic floral design suited for elegant presentations.
9. **Red Rose Classic (`red-rose-classic`):** Classic Indian red wedding aesthetic with ornate floral borders.
10. **Islamic Emerald (`islamic-emerald`):** Specialized Islamic motifs, crescent/star aesthetic, bismillah header option.
11. **Islamic Ivory (`islamic-ivory`):** Minimalist Islamic design with warm tones and traditional framing.
12. **Jain Classic (`jain-classic`):** Specialized layout honoring Jain cultural preferences and icons.

---

## 6. Export Engine Pipeline (`src/lib/export/`)

BioCraft features a complete in-browser raster-to-vector export engine:

1. **DOM Capture (`canvas.ts`):** Uses `html-to-image` to convert the rendered template element (`#biodata-preview`) into a high-DPI HTML canvas element.
2. **PDF Generation (`pdf.ts`):** 
   - Reads the canvas pixels.
   - Calculates A4 aspect ratio height dimensions (`210mm x 297mm`).
   - Slices canvas height iteratively if the biodata spans multiple pages.
   - Instantiates `jsPDF` and generates a print-ready downloadable `.pdf` file.
3. **Image Generation (`image.ts`):** Generates lossless `.png` or compressed `.jpeg` file blobs directly downloadable in browser.

---

## 7. SEO & Static Site Optimization (`src/lib/seo.ts`)

- **Semantic HTML5 Structure:** Single `<h1>` per page, clean layout structure, descriptive accessibility tags.
- **JSON-LD Schema Markup:** Integrated structured data schemas for:
  - `WebApplication` (defining BioCraft as a free, offline-first web tool).
  - `Organization` (brand details).
  - `FAQPage` (search result rich snippet accordions).
  - `HowTo` (step-by-step guides).
  - `Article` (Blog posts).
- **Dynamic Sitemap & Robots:** Generated cleanly in Next.js App Router (`sitemap.ts`, `robots.ts`).

---

## 8. Summary for AI Assistants & LLMs

When assisting with or modifying **BioCraft**:
- **Do not introduce a backend server or database** unless explicitly instructed; keep everything client-side.
- **Respect the Zustand store pattern** (`biodata-store.ts` for user inputs, `editor-ui-store.ts` for editor UX).
- **Follow Next.js 16 conventions:** Keep Server Components default where possible, mark dynamic client interactions with `'use client'`.
- **Maintain Template Contract:** When adding or editing templates, modify `src/templates/registry.ts` and ensure all templates implement `TemplateDefinition`.
- **Styling:** Use standard Tailwind CSS v4 classes without inline heavy styling where possible.

---

*Document generated and updated for full repository clarity.*
