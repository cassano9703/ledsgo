import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <Logo className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold font-headline">Leds Go</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          href="/crear"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Crear
        </Link>
        <Link
          href="/#catalog"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Catálogo
        </Link>
        <Link
          href="/#about-us"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Nosotros
        </Link>
        <Button asChild>
          <Link href="/crear">Ordenar Ahora</Link>
        </Button>
      </nav>
    </header>
  );
}
