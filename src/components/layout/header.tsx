import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <Logo className="h-14 w-28" />
        <span className="sr-only">LEDS GO</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          href="/"
          className="text-sm font-medium hover:text-accent transition-colors animate-glow"
          style={{ "--glow-color": "hsl(var(--accent))" } as React.CSSProperties}
          prefetch={false}
        >
          Inicio
        </Link>
        <Link
          href="/#catalog"
          className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
          prefetch={false}
        >
          Galería
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button suppressHydrationWarning variant="ghost" className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-accent hover:bg-transparent transition-colors">
              Diseña tu Letrero
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/crear">Letreros Neón</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/crear/acrilico-espejo">Acrílicos Espejo</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          href="/#our-jobs"
          className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
          prefetch={false}
        >
          Nuestros Clientes
        </Link>
        <Button asChild variant="outline" className="rounded-full border-primary/80 hover:border-primary hover:bg-primary/10 text-primary hover:text-primary">
          <Link href="/crear">Cotiza tu Diseño</Link>
        </Button>
      </nav>
    </header>
  );
}
