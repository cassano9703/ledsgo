
import { Header } from "@/components/layout/header";
import { HeroCarousel } from "@/components/hero-carousel";
import { MovingTextBar } from "@/components/moving-text-bar";
import { PremadeDesigns } from "@/components/premade-designs";
import { Differentiators } from "@/components/differentiators";
import { OurJobsCarousel } from "@/components/our-jobs-carousel";
import { ColorPalette } from "@/components/color-palette";
import { ProcessSteps } from "@/components/process-steps";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";

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
        <section id="catalog" className="pb-12 pt-4">
          <div className="w-full px-6 md:px-10 lg:px-16">
            <div className="mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Explora Nuestro Catálogo
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Inspírate con nuestros diseños predefinidos o crea el tuyo desde cero.
                </p>
              </div>
            </div>
            <PremadeDesigns />
          </div>
        </section>
        <Differentiators />
        <section id="our-jobs" className="py-12 md:py-20 lg:py-24 bg-secondary">
          <div className="w-full px-6 md:px-10 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
              
              {/* Left Column: Nuestros Clientes */}
              <div className="flex flex-col gap-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                    Nuestros Clientes
                  </h2>
                  <p className="max-w-[500px] text-muted-foreground md:text-xl">
                    Cada letrero es una historia de éxito. Aquí puedes ver algunos de los proyectos que hemos realizado para nuestros clientes.
                  </p>
                </div>
                <div className="h-[500px] w-full max-w-md mx-auto lg:mx-0">
                  <OurJobsCarousel />
                </div>
                <div className="mt-4">
                  <Button asChild size="lg">
                    <Link href="/catalogo/neon">Ver catálogo completo</Link>
                  </Button>
                </div>
              </div>

              {/* Right Column: Proceso de Atención */}
              <div className="flex flex-col gap-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                    Proceso de Atención
                  </h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Iluminamos tu marca en 5 simples pasos.
                  </p>
                </div>
                <div className="w-full">
                  <ProcessSteps />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
