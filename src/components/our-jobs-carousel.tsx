"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel-react'
import Image from "next/image"

import { OurJobsImages, type OurJobsImage } from "@/lib/placeholder-images"
import { JobDetailsModal } from "./job-details-modal"
import { ChevronDown } from "lucide-react"

const OPTIONS: EmblaOptionsType = {
  loop: true,
  axis: 'y',
  align: 'center',
}

export function OurJobsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Autoplay({ delay: 3000, stopOnInteraction: false })]);
  const [selectedJob, setSelectedJob] = React.useState<OurJobsImage | null>(null);

  return (
    <>
      <div className="w-full h-full relative">
        <div className="w-full h-full overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="embla__container--vertical h-full">
            {OurJobsImages.map((image) => (
              <div 
                className="embla__slide--vertical" 
                key={image.id}
                onClick={() => setSelectedJob(image)}
              >
                <div className="embla__slide__inner p-2 cursor-pointer h-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.alt}
                    width={600}
                    height={600}
                    className="rounded-lg object-contain w-full h-full"
                    data-ai-hint={image.imageHint}
                    style={{ objectPosition: image.objectPosition }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex justify-center items-center pointer-events-none">
          <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
        </div>
      </div>
      <JobDetailsModal 
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
      />
    </>
  )
}
