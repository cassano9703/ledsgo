"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { HeroImages } from "@/lib/placeholder-images"
import { Button } from "./ui/button"

export function HeroCarousel() {
  const heroImage = HeroImages[0]; // Usamos la primera imagen como estática

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <div className="w-full h-full relative">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.alt}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center text-center text-white pointer-events-none">
        <div 
          className="relative bg-black/60 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-center space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl font-headline">
                Diseña tu letrero <span className="text-primary animate-glow" style={{"--glow-color": "hsl(var(--primary))"} as React.CSSProperties}>Neón</span>
              </h1>
              <p className="max-w-2xl mt-4 text-lg text-neutral-200">
                Iluminamos tus ideas con estrategia y diseño.
              </p>
            </div>
            <Button asChild size="lg" className="pointer-events-auto">
              <Link href="/crear">Crea tu letrero</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
