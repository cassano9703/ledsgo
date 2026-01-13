"use client";

import { Lightbulb, Wrench, PackageCheck, Truck, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "1. Cotiza tu Idea",
    description: "Cuéntanos tu idea y te daremos una cotización y un mockup digital.",
  },
  {
    icon: Wrench,
    title: "2. Diseño y Aprobación",
    description: "Perfeccionamos el diseño y, una vez aprobado, damos vida a tu letrero.",
  },
  {
    icon: PackageCheck,
    title: "3. Fabricación y Calidad",
    description: "Cada letrero es fabricado y probado para asegurar su durabilidad.",
  },
  {
    icon: Truck,
    title: "4. Envío Seguro",
    description: "Embalamos y enviamos tu letrero de forma segura a todo el país.",
  },
  {
    icon: PartyPopper,
    title: "5. Instalación y Disfrute",
    description: "Recibe tu letrero listo para instalar y dale vida a tu espacio.",
  }
];

export function ProcessSteps() {
  return (
    <div className="space-y-4 w-full">
      <div className="mb-8 space-y-2 text-center lg:text-left">
        <h3 className="text-2xl font-bold tracking-tighter text-primary sm:text-3xl font-headline">
          Proceso de Atención
        </h3>
        <p className="text-muted-foreground">Iluminamos tu marca en 5 simples pasos.</p>
      </div>
      
      <div className="relative pt-4">
        {/* Vertical Line */}
        <div 
          className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-primary/30"
          style={{boxShadow: '0 0 10px hsl(var(--primary))'}}
        />
        
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-center">
              {index % 2 === 0 ? (
                // Step on the left, text on the right
                <>
                  <div className="w-1/2 pr-12">
                     <div 
                      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-secondary border-2 border-primary"
                      style={{boxShadow: '0 0 15px hsl(var(--primary))'}}
                    >
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div className="w-1/2 pl-12 text-left">
                    <h4 className="text-lg font-bold text-primary">{step.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </>
              ) : (
                // Step on the right, text on the left
                <>
                  <div className="w-1/2 pr-12 text-right">
                    <h4 className="text-lg font-bold text-primary">{step.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  <div className="w-1/2 pl-12">
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-secondary border-2 border-primary"
                      style={{boxShadow: '0 0 15px hsl(var(--primary))'}}
                    >
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}