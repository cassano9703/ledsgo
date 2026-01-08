import { Header } from "@/components/layout/header";
import { HeroCarousel } from "@/components/hero-carousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Leds Go. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
