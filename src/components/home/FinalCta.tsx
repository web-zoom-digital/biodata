import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function FinalCta({ title = "Ready to make yours?", text = "Start with sample details to see how it looks, or begin with your own. It takes about ten minutes." }: { title?: string; text?: string }) {
  return (
    <section className="bg-ink py-16 text-white sm:py-20">
      <Container className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 text-lg text-white/75">{text}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <Button
            href="/create"
            variant="cta"
            size="lg"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.03] hover:shadow-orange-500/40 active:scale-[0.98]"
          >
            <span>Create Your Biodata</span>
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Button>
          <Button
            href="/templates"
            variant="cta"
            size="lg"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.03] hover:shadow-emerald-500/40 active:scale-[0.98]"
          >
            <span>Explore All Templates</span>
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}

