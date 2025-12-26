import { Header } from "@/components/layout/header";
import { LedSignConfigurator } from "@/components/led-sign-configurator";
import { PremadeDesigns } from "@/components/premade-designs";
import { HeroCarousel } from "@/components/hero-carousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroCarousel />

        <section id="configurator" className="py-12 md:py-20 lg:py-24">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Diseña tu Letrero LED Personalizado
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Da vida a tus ideas con nuestro configurador fácil de usar.
                </p>
              </div>
            </div>
            <LedSignConfigurator />
          </div>
        </section>

        <section id="catalog" className="py-12 md:py-20 lg:py-24 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  O Elige un Diseño Prefabricado
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Inspírate con nuestra colección de letreros populares. Listos para ordenar o personalizar.
                </p>
              </div>
            </div>
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
