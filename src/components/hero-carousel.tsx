"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"

import { HeroImages } from "@/lib/placeholder-images"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./ui/button"

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {HeroImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="w-full h-full relative">
                <Image
                  src={image.imageUrl}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                  priority={image.id === "hero-1"}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 border-white/50 hover:border-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 border-white/50 hover:border-white" />
      </Carousel>
      <div className="absolute inset-0 flex items-center justify-center text-center text-white pointer-events-none">
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-black/50 p-6 rounded-lg shadow-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl font-headline">
              Diseña tu letrero <span className="text-primary animate-glow" style={{"--glow-color": "hsl(var(--primary))"} as React.CSSProperties}>Neón</span>
            </h1>
            <p className="max-w-2xl mt-4 text-lg text-neutral-200">
              Iluminamos tus ideas con estrategia y diseño.
            </p>
          </div>
          <Button asChild size="lg" className="pointer-events-auto">
            <Link href="#configurator">Crea tu letrero</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
