import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto grid min-h-[60dvh] max-w-2xl place-items-center px-5 py-20 text-center">
        <div>
          <p className="font-display text-7xl font-semibold text-brand/40">404</p>
          <h1 className="mt-4 font-display text-3xl font-semibold">We could not find that page</h1>
          <p className="mt-3 text-lg text-ink/70">The link may be old or mistyped. Your biodata draft, if you have one, is safe in the editor.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/create" variant="cta">
              Create Bio
            </Button>
            <Button href="/" variant="outline">
              Go to home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
