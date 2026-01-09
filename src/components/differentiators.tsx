"use client"

import { Leaf, Clock, Zap } from "lucide-react";

const differentiators = [
  {
    name: "Eco-amigables",
    icon: Leaf,
    description: "Materiales sostenibles y procesos de bajo impacto.",
  },
  {
    name: "Larga Durabilidad",
    icon: Clock,
    description: "Más de 50,000 horas de vida útil para tus letreros.",
  },
  {
    name: "Bajo Consumo",
    icon: Zap,
    description: "Tecnología LED eficiente para un menor gasto energético.",
  },
];

export function Differentiators() {
  const backgroundImageUrl = "https://i.imgur.com/sI68Yek.jpeg";

  return (
    <section 
      className="relative py-12 md:py-20 lg:py-24"
      style={{ 
        backgroundImage: `url('${backgroundImageUrl}')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div className="relative w-full px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-white">
              El Diferencial
            </h2>
            <p className="mx-auto max-w-[700px] text-neutral-300 md:text-xl">
              Por qué nuestros letreros de neón son la mejor elección.
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {differentiators.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-4 text-center">
              <div
                className="w-24 h-24 rounded-full border-2 border-primary/50 flex items-center justify-center bg-secondary/80"
                style={{
                  boxShadow: "0 0 15px hsl(var(--primary) / 0.5)",
                }}
              >
                <item.icon className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.name}</h3>
              <p className="text-neutral-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}