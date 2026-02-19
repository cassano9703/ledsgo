
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
import { VideoGallery } from "@/components/video-gallery";
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
        <section id="our-jobs" className="py-12 md:py-20 lg:py-24">
            <div className="w-full px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                            Nuestros Trabajos
                        </h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Inspírate con la galería de nuestros clientes y mira nuestros trabajos en acción.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 h-[600px]">
                        <OurJobsCarousel />
                    </div>
                    <div className="order-1 md:order-2 space-y-4 text-center md:text-left">
                         <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Cada letrero es una historia de éxito. Aquí puedes ver algunos de los proyectos que hemos realizado para nuestros clientes.
                        </p>
                        <Button asChild size="lg">
                            <Link href="/catalogo/neon">Ver Galería Completa</Link>
                        </Button>
                    </div>
                </div>

                <div className="mt-20">
                    <VideoGallery />
                </div>
            </div>
        </section>
        <section id="process" className="py-12 md:py-20 lg:py-24 bg-secondary">
          <div className="w-full px-6 md:px-10 lg:px-16">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Nuestro Proceso de Atención
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Iluminamos tu marca en 5 simples pasos.
                </p>
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <ProcessSteps />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
