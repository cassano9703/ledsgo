
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from "embla-carousel-autoplay"

import { HeroImages } from "@/lib/placeholder-images"
import { Button } from "./ui/button"

export function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])

  return (
    <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {HeroImages.map((heroImage) => (
            <div className="embla__slide relative h-full" key={heroImage.id}>
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.alt}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority={heroImage.id === 'hero-1'}
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-start justify-center pt-20 md:pt-24 text-center text-white pointer-events-none">
        <div 
          className="relative bg-black/60 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-center space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl font-headline">
                Diseña tu letrero <span className="text-accent animate-glow" style={{"--glow-color": "hsl(var(--accent))"} as React.CSSProperties}>Neón</span>
              </h1>
              <p className="max-w-2xl mt-4 text-lg text-neutral-200">
                Iluminamos tus ideas con estrategia y diseño.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center pointer-events-auto">
              <Button asChild size="lg">
                <Link href="/crear">Letrero Neón</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/50 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm">
                <Link href="/crear/acrilico-espejo">Acrílico Espejo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
