"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel-react'
import Image from "next/image"

import { OurJobsImages, type OurJobsImage } from "@/lib/placeholder-images"
import { JobDetailsModal } from "./job-details-modal"

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
      <div className="w-full h-full relative overflow-hidden" ref={emblaRef}>
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
                  className="rounded-lg object-cover w-full h-full"
                  data-ai-hint={image.imageHint}
                />
              </div>
            </div>
          ))}
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
