import { Header } from "@/components/layout/header";
import { LedSignConfigurator } from "@/components/led-sign-configurator";
import { Footer } from "@/components/layout/footer";

export default function CreatePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
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
      </main>
      <Footer />
    </div>
  );
}
