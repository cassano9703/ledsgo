import { Header } from "@/components/layout/header";
import { AcrylicSignConfigurator } from "@/components/acrylic-sign-configurator";

export default function CreateAcrylicPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section id="configurator" className="py-12 md:py-20 lg:py-24">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Diseña tu Letrero en Acrílico Espejo
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Personaliza cada detalle para crear una pieza única y elegante.
                </p>
              </div>
            </div>
            <AcrylicSignConfigurator />
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Leds Go. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
