"use client";

import { Lightbulb, MessageSquareQuote, Truck, Wrench, PackageCheck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: MessageSquareQuote,
    title: "1. Cotiza tu Idea",
    description: "Cuéntanos tu idea y te daremos una cotización y un mockup digital.",
    imageUrl: "https://images.unsplash.com/photo-1557825835-b4527f247af6?q=80&w=800",
    gridPosition: "col-start-1 col-end-3 row-start-1 row-end-3",
  },
  {
    icon: Lightbulb,
    title: "2. Diseño y Aprobación",
    description: "Nuestro equipo de diseño perfeccionará tu mockup para tu aprobación.",
    imageUrl: "https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=800",
    gridPosition: "col-start-2 col-end-4 row-start-2 row-end-4",
  },
  {
    icon: Wrench,
    title: "3. Fabricación",
    description: "Con materiales de alta calidad, damos vida a tu letrero de neón LED.",
    imageUrl: "https://images.unsplash.com/photo-1555922877-c34983b6cc33?q=80&w=800",
    gridPosition: "col-start-1 col-end-3 row-start-3 row-end-5",
  },
  {
    icon: PackageCheck,
    title: "4. Control de Calidad",
    description: "Cada letrero es rigurosamente probado para asegurar su calidad y durabilidad.",
    imageUrl: "https://images.unsplash.com/photo-1616091489439-86a04ab4980c?q=80&w=800",
    gridPosition: "col-start-2 col-end-4 row-start-4 row-end-6",
  },
  {
    icon: Truck,
    title: "5. Envío Seguro",
    description: "Embalamos y enviamos tu letrero de forma segura a cualquier parte del país.",
    imageUrl: "https://images.unsplash.com/photo-1566576721346-d4a3b4d30203?q=80&w=800",
    gridPosition: "col-start-1 col-end-3 row-start-5 row-end-7",
  }
];

export function ProcessSteps() {
  return (
    <div className="space-y-4">
      <div className="mb-8 space-y-2 text-center lg:text-left">
        <h3 className="text-2xl font-bold tracking-tighter text-primary sm:text-3xl font-headline">
          Proceso de Atención
        </h3>
        <p className="text-muted-foreground">Iluminamos tu marca en 5 simples pasos.</p>
      </div>
      
      <div className="relative h-[900px] w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-3 grid-rows-7 h-full w-full">
            {/* Connecting Lines */}
            <div className="absolute top-[21%] left-[25%] h-2 w-[16.5%] neon-dash" />
            <div className="absolute top-[28%] left-[41.5%] h-[20%] w-2 neon-dash" />
            <div className="absolute top-[48%] left-[25%] h-2 w-[16.5%] neon-dash" />
            <div className="absolute top-[55%] left-[41.5%] h-[20%] w-2 neon-dash" />
            <div className="absolute top-[75%] left-[25%] h-2 w-[16.5%] neon-dash" />
            
            {steps.map((step, index) => (
                <div key={index} className={cn("relative p-4", step.gridPosition)}>
                  <div className="relative w-full h-full diamond-clip group">
                     <Image
                        src={step.imageUrl}
                        alt={step.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/70" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                          <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                             <div className="absolute inset-0 border-2 border-primary rounded-full neon-glow-primary" />
                             <step.icon className="h-8 w-8 text-primary neon-glow-primary" />
                          </div>
                          <h4 className="text-lg font-bold text-primary">{step.title}</h4>
                          <p className="mt-1 text-xs text-white/80">{step.description}</p>
                      </div>
                  </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
