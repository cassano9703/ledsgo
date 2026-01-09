import { Header } from "@/components/layout/header";
import { HeroCarousel } from "@/components/hero-carousel";
import { MovingTextBar } from "@/components/moving-text-bar";
import { PremadeDesigns } from "@/components/premade-designs";
import { ProductCategories } from "@/components/product-categories";
import { Differentiators } from "@/components/differentiators";
import { OurJobsCarousel } from "@/components/our-jobs-carousel";
import { ColorPalette } from "@/components/color-palette";
import { ProcessSteps } from "@/components/process-steps";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <MovingTextBar />
        <section id="colors" className="py-12 md:py-20 lg:py-24">
          <div className="w-full">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Nuestra Paleta de Colores
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Elige entre nuestra vibrante selección para crear un letrero único.
                </p>
              </div>
            </div>
            <ColorPalette />
          </div>
        </section>
        <Differentiators />
        <section id="catalog" className="py-12 md:py-20 lg:py-24">
          <div className="w-full px-6 md:px-10 lg:px-16">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Explora Nuestro Catálogo
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Inspírate con nuestros diseños predefinidos o crea el tuyo desde cero.
                </p>
              </div>
            </div>
            <PremadeDesigns />
          </div>
        </section>
        <section id="about-us" className="py-12 md:py-20 lg:py-24 bg-secondary">
          <div className="w-full px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 h-[500px]">
                    <OurJobsCarousel />
                </div>
                <div className="lg:col-span-7">
                    <ProcessSteps />
                </div>
            </div>
          </div>
        </section>
        <ProductCategories />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Leds Go. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
