import Image from "next/image";
import Link from "next/link";
import type { ContentKind, ContentMeta } from "@/lib/content";
import { findPublicImage } from "@/lib/images";

export function ArticleCard({ item, kind }: { item: ContentMeta; kind: ContentKind }) {
  const photo = findPublicImage(kind, item.slug);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.25)]">
      {/* Glossy Reflection Light Sweep Effect on Hover */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-1000 group-hover:translate-x-[250%]" />
      </div>

      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        {photo ? (
          <Image
            src={photo}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 p-6 text-center text-slate-800">
            <span className="font-display text-xs font-bold uppercase tracking-wider text-sky-700">{item.category}</span>
            <p className="mt-1.5 line-clamp-2 text-xs font-semibold text-slate-700">{item.title}</p>
          </div>
        )}
        {/* Soft bottom vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute left-3.5 top-3.5 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold tracking-wide text-sky-700 shadow-md backdrop-blur-md">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-sky-600">
          <Link href={`/${kind}/${item.slug}`} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>

      </div>
    </article>
  );
}

