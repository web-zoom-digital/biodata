import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: ElementType }) {
  return <Tag className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</Tag>;
}

export function Section({ children, className, id, tone = "white" }: { children: ReactNode; className?: string; id?: string; tone?: "white" | "soft" | "brand" }) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", tone === "soft" && "bg-mist/70", tone === "brand" && "bg-brand-soft", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({ title, intro, className, align = "left" }: { title: string; intro?: string; className?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-3 text-lg leading-relaxed text-ink/70">{intro}</p> : null}
    </div>
  );
}
