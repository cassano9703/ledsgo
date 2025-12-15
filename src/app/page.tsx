import { Header } from "@/components/layout/header";
import { LedSignConfigurator } from "@/components/led-sign-configurator";
import { PremadeDesigns } from "@/components/premade-designs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section id="configurator" className="py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Design Your Perfect LED Sign
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Bring your ideas to life with our easy-to-use configurator.
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
                  Or Choose a Premade Design
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get inspired by our collection of popular signs. Ready to order or customize.
                </p>
              </div>
            </div>
            <PremadeDesigns />
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Leds Go. All rights reserved.</p>
      </footer>
    </div>
  );
}
