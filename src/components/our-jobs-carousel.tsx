"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel, { type EmblaOptionsType } from 'embla-carousel-react'
import Image from "next/image"

import { OurJobsImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'center',
  containScroll: false,
  slidesToScroll: 1,
}

export function OurJobsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Autoplay({ delay: 3000 })])
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  return (
    <div className="w-full mt-12">
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
            {OurJobsImages.map((image, index) => (
                <div 
                    className="embla__slide" 
                    key={image.id}
                >
                    <Image
                        src={image.imageUrl}
                        alt={image.alt}
                        width={600}
                        height={600}
                        className="rounded-lg object-contain"
                        data-ai-hint={image.imageHint}
                    />
                </div>
            ))}
            </div>
        </div>
        <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
            <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === selectedIndex ? "bg-primary scale-125" : "bg-muted"
                )}
                aria-label={`Ir al trabajo ${index + 1}`}
            />
            ))}
        </div>
    </div>
  )
}
