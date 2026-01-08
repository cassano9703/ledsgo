import { Header } from "@/components/layout/header";
import { PremadeDesigns } from "@/components/premade-designs";
import { HeroCarousel } from "@/components/hero-carousel";
import { OurJobsCarousel } from "@/components/our-jobs-carousel";
import { AboutUsImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ColorPalette } from "@/components/color-palette";

export default function Home() {
  const aboutImage = AboutUsImages[0];
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroCarousel />

        <section id="colors" className="py-12 md:py-20 lg:py-24">
          <div className="container">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Nuestra Paleta de Colores
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Colores vibrantes para que tu letrero de neón destaque.
                </p>
              </div>
            </div>
            <ColorPalette />
          </div>
        </section>

        <section id="catalog" className="py-12 md:py-20 lg:py-24">
          <div className="container">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Inspírate con Nuestra Colección
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Descubre nuestros diseños predefinidos o crea el tuyo desde cero.
                </p>
              </div>
            </div>
            <PremadeDesigns />
          </div>
        </section>
        
        <section id="our-jobs" className="py-12 md:py-20 lg:py-24 bg-card">
          <div className="container">
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

        <section id="about-us" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Sobre Nosotros</div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] font-headline">
                  Creamos piezas únicas que iluminan tus espacios
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  En Leds Go, nos apasiona transformar ideas en brillantes realidades. Somos un equipo de diseñadores y artesanos dedicados a crear letreros de neón LED personalizados que no solo decoran, sino que también cuentan una historia.
                </p>
                <Button asChild>
                  <Link href="/crear">Contáctanos</Link>
                </Button>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.alt}
                  width={600}
                  height={400}
                  data-ai-hint={aboutImage.imageHint}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
              </div>
            </div>
          </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Leds Go. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
