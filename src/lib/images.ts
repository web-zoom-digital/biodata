import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["webp", "jpg", "jpeg", "png"];

/**
 * Looks for an optional photo in /public/images/<folder>/<name>.(webp|jpg|jpeg|png).
 * Returns its public URL when present, otherwise null so the caller can render its built-in artwork.
 * This lets you drop in real photography without touching any code. See docs/IMAGES.md.
 */
export function findPublicImage(folder: "heroes" | "blog" | "guides" | "templates", name: string): string | null {
  for (const ext of EXTENSIONS) {
    const file = path.join(process.cwd(), "public", "images", folder, `${name}.${ext}`);
    if (fs.existsSync(file)) return `/images/${folder}/${name}.${ext}`;
  }
  return null;
}
