"use client";

import { Lightbulb, MessageSquareQuote, Truck, Wrench, PackageCheck } from "lucide-react";
import { cn } from "@/lib/utils";

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
      
      <div className="relative">
        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-primary/30" style={{boxShadow: '0 0 10px hsl(var(--primary))'}}></div>
        
        {steps.map((step, index) => (
          <div key={index} className={cn(
            "relative mb-12 flex w-full items-center",
            index % 2 === 0 ? "justify-start" : "justify-end"
          )}>
            <div className={cn(
                "w-1/2",
                index % 2 === 0 ? "pr-8" : "pl-8"
            )}>
              <div className={cn(
                  "relative",
                  index % 2 === 0 ? "text-right" : "text-left"
              )}>
                <div className="absolute top-1/2 -translate-y-1/2 flex items-center"
                  style={index % 2 === 0 ? { right: '-2.25rem' } : { left: '-2.25rem' }}
                >
                    <div className={cn("absolute w-8 h-[2px] bg-primary/50", index % 2 === 0 ? "right-full" : "left-full")} style={{boxShadow: '0 0 10px hsl(var(--primary))'}}></div>
                    <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary border-2 border-primary" style={{boxShadow: '0 0 15px hsl(var(--primary))'}}>
                        <step.icon className="h-7 w-7 text-primary" />
                    </div>
                </div>

                <h4 className="text-lg font-bold text-primary">{step.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
