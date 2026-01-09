"use client";

import { Lightbulb, MessageSquareQuote, Truck, Wrench, PackageCheck } from "lucide-react";

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
    <div className="relative space-y-8">
      <div className="mb-8 space-y-2 text-center lg:text-left">
        <h3 className="text-2xl font-bold tracking-tighter text-primary sm:text-3xl font-headline">
          Proceso de Atención
        </h3>
      </div>
      
      <div className="absolute left-8 top-20 bottom-8 w-0.5 bg-primary/30 hidden md:block" />

      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-6">
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
            <step.icon className="h-8 w-8" />
          </div>
          <div className="flex-1 pt-1">
            <h4 className="text-xl font-bold text-primary-foreground">{step.title}</h4>
            <p className="mt-1 text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
