import { Header } from "@/components/layout/header";
import { HeroCarousel } from "@/components/hero-carousel";
import { MovingTextBar } from "@/components/moving-text-bar";
import { PremadeDesigns } from "@/components/premade-designs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <MovingTextBar />
        <section id="catalog" className="py-12 md:py-20 lg:py-24 bg-secondary">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2 container">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                Explora Nuestro Catálogo
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Inspírate con nuestros diseños predefinidos o crea el tuyo desde cero.
              </p>
            </div>
          </div>
          <div className="container px-4 md:px-6">
            <PremadeDesigns />
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Leds Go. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
