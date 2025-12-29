import { Header } from "@/components/layout/header";
import { PremadeDesigns } from "@/components/premade-designs";
import { HeroCarousel } from "@/components/hero-carousel";
import { OurJobsCarousel } from "@/components/our-jobs-carousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroCarousel />

        <section id="catalog" className="py-12 md:py-20 lg:py-24 bg-card">
          <div className="container">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Inspírate con Nuestra Colección
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Elige uno de nuestros diseños populares o úsalo como punto de partida para tu propia creación.
                </p>
              </div>
            </div>
            <PremadeDesigns />
          </div>
        </section>

        <section id="our-jobs" className="py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">BEST QUALITY PRICE</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Nuestros Trabajos
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Echa un vistazo a algunos de los increíbles letreros que hemos creado para nuestros clientes.
                </p>
              </div>
            </div>
            <OurJobsCarousel />
          </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Leds Go. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
