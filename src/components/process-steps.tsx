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
  },
  {
    icon: Wrench,
    title: "2. Diseño y Fabricación",
    description: "Perfeccionamos el diseño y, una vez aprobado, damos vida a tu letrero con materiales de alta calidad.",
    imageUrl: "https://images.unsplash.com/photo-1555922877-c34983b6cc33?q=80&w=800",
  },
  {
    icon: PackageCheck,
    title: "3. Control de Calidad",
    description: "Cada letrero es rigurosamente probado para asegurar su funcionamiento y durabilidad.",
    imageUrl: "https://images.unsplash.com/photo-1616091489439-86a04ab4980c?q=80&w=800",
  },
  {
    icon: Truck,
    title: "4. Envío Seguro",
    description: "Embalamos y enviamos tu letrero de forma segura a cualquier parte del país.",
    imageUrl: "https://images.unsplash.com/photo-1566576721346-d4a3b4d30203?q=80&w=800",
  }
];

export function ProcessSteps() {
  return (
    <div className="space-y-4">
      <div className="mb-8 space-y-2 text-center lg:text-left">
        <h3 className="text-2xl font-bold tracking-tighter text-primary sm:text-3xl font-headline">
          Proceso de Atención
        </h3>
        <p className="text-muted-foreground">Iluminamos tu marca en 4 simples pasos.</p>
      </div>
      
      <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-8">
        {steps.map((step, index) => (
            <div key={index} className="relative w-full h-64 rounded-lg group overflow-hidden">
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
                    <p className="mt-1 text-sm text-white/80 max-w-xs">{step.description}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
