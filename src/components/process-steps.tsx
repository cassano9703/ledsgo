"use client";

import { Lightbulb, MessageSquareQuote, Truck, Wrench, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "1. Cotiza tu Idea",
    description: "Cuéntanos tu idea y te daremos una cotización y un mockup digital.",
  },
  {
    icon: Wrench,
    title: "2. Diseño y Aprobación",
    description: "Perfeccionamos el diseño y, una vez aprobado, damos vida a tu letrero con materiales de alta calidad.",
  },
  {
    icon: PackageCheck,
    title: "3. Fabricación y Calidad",
    description: "Cada letrero es rigurosamente fabricado y probado para asegurar su funcionamiento y durabilidad.",
  },
  {
    icon: Truck,
    title: "4. Envío Seguro",
    description: "Embalamos y enviamos tu letrero de forma segura a cualquier parte del país.",
  }
];

export function ProcessSteps() {
  return (
    <div className="space-y-4 w-full">
      <div className="mb-8 space-y-2 text-left">
        <h3 className="text-2xl font-bold tracking-tighter text-primary sm:text-3xl font-headline">
          Proceso de Atención
        </h3>
        <p className="text-muted-foreground">Iluminamos tu marca en 4 simples pasos.</p>
      </div>
      
      <div className="relative pl-12">
        <div className="absolute left-[29px] top-0 h-full w-[2px] bg-primary/30" style={{boxShadow: '0 0 10px hsl(var(--primary))'}}></div>
        
        {steps.map((step, index) => (
          <div key={index} className="relative mb-12 flex items-start">
            <div className="absolute left-0 top-0 flex items-center">
              <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-secondary border-2 border-primary" style={{boxShadow: '0 0 15px hsl(var(--primary))'}}>
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="absolute left-14 w-8 h-[2px] bg-primary/50" style={{boxShadow: '0 0 10px hsl(var(--primary))'}}></div>
            </div>

            <div className="pl-28 pt-1">
              <h4 className="text-lg font-bold text-primary">{step.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
