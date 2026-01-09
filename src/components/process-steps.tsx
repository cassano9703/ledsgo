"use client";

import { Lightbulb, MessageSquareQuote, Truck, Wrench, PackageCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const steps = [
  {
    icon: MessageSquareQuote,
    title: "1. Cotiza tu Idea",
    description: "Cuéntanos tu idea, envíanos una referencia y te daremos una cotización y un mockup digital al instante."
  },
  {
    icon: Lightbulb,
    title: "2. Diseño y Aprobación",
    description: "Nuestro equipo de diseño perfeccionará tu mockup. Solo pasamos a producción con tu visto bueno."
  },
  {
    icon: Wrench,
    title: "3. Fabricación",
    description: "Con materiales de alta calidad y tecnología de punta, damos vida a tu letrero de neón LED."
  },
  {
    icon: PackageCheck,
    title: "4. Control de Calidad",
    description: "Cada letrero es rigurosamente probado para asegurar que cumpla con nuestros estándares de calidad y durabilidad."
  },
  {
    icon: Truck,
    title: "5. Envío Seguro",
    description: "Embalamos tu letrero con el máximo cuidado y lo enviamos a cualquier parte del país de forma segura."
  }
];

export function ProcessSteps() {
  return (
    <div className="space-y-8 relative">
        <div className="space-y-4 mb-12 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Nuestros Trabajos
            </h2>
            <p className="text-muted-foreground md:text-lg">
                Cada letrero es una historia de éxito. Aquí puedes ver algunos de los proyectos que hemos realizado para nuestros clientes.
            </p>
            <Button asChild>
                <Link href="/crear">Crea tu propio diseño</Link>
            </Button>
        </div>
      
      {/* Vertical line */}
      <div className="absolute left-8 top-12 bottom-8 w-0.5 bg-primary/30 hidden md:block"></div>

      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-6">
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary text-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
            <step.icon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary-foreground">{step.title}</h3>
            <p className="mt-1 text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
