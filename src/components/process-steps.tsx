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
    title: "2. Diseño y Fabricación",
    description: "Perfeccionamos el diseño y, una vez aprobado, damos vida a tu letrero.",
  },
  {
    icon: PackageCheck,
    title: "3. Empaque y Calidad",
    description: "Cada letrero es probado y embalado para asegurar su durabilidad.",
  },
  {
    icon: Truck,
    title: "4. Envío Seguro",
    description: "Enviamos tu letrero de forma segura a la puerta de tu casa.",
  },
  {
    icon: PartyPopper,
    title: "5. Instalación y Disfrute",
    description: "Recibe tu letrero listo para instalar y dale vida a tu espacio.",
  }
];

export function ProcessSteps() {
  return (
    <div className="relative w-full py-10">
      <div 
        className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-primary/30"
        style={{boxShadow: '0 0 10px hsl(var(--primary))'}}
      ></div>
      <div className="relative flex flex-col gap-12">
        {steps.map((step, index) => {
          const isOdd = index % 2 !== 0;
          return (
            <div key={index} className={`relative flex items-center w-full ${isOdd ? 'justify-start' : 'justify-end'}`}>
               {/* Contenido */}
              <div className={`w-1/2 px-8 ${isOdd ? 'text-left' : 'text-right'}`}>
                  <h4 className="text-xl font-bold text-primary font-display tracking-wider">{step.title}</h4>
                  <p className="mt-2 text-base text-muted-foreground">{step.description}</p>
              </div>
              
               {/* Icono */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div 
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary border-2 border-primary"
                  style={{boxShadow: '0 0 15px hsl(var(--primary))'}}
                >
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}