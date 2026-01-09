"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel-react'
import Image from "next/image"

import { OurJobsImages, type OurJobsImage } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"
import { JobDetailsModal } from "./job-details-modal"

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'center',
  containScroll: false,
  slidesToScroll: 1,
}

const SCALE_FACTOR = 4;
const TRANSITION_DURATION = '500ms';

type PropType = {
  options?: EmblaOptionsType
}

export const OurJobsCarousel: React.FC<PropType> = (props) => {
  const { options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Autoplay({ delay: 3000 })])
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scale, setScale] = React.useState<number[]>([])
  const [selectedJob, setSelectedJob] = React.useState<OurJobsImage | null>(null);

  const TWEEN_FACTOR = 4.2

  const tweenScale = React.useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaCarouselType['eventName']) => {
      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()
      const slidesInView = emblaApi.slidesInView()

      const tweens = emblaApi.scrollSnapList().map((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (eventName === 'scroll') {
            if (slidesInView.indexOf(slideIndex) > -1) {
              const diff = diffToTarget * (-1 / TWEEN_FACTOR)
              const tween = 1 - Math.abs(diff)
              setScale(prevScale => {
                const newScale = [...prevScale];
                newScale[slideIndex] = tween;
                return newScale;
              });
            }
          }
        })
        return diffToTarget
      })
    },
    [],
  )

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
    tweenScale(emblaApi)
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect).on('scroll', tweenScale).on('reInit', tweenScale)
    
    // Set initial scale
    const initialScale = emblaApi.slidesInView().map((index) => (
      index === emblaApi.selectedScrollSnap() ? 1 : 0.8
    ));
    const slides = emblaApi.slideNodes();
    slides.forEach((_, index) => {
      if(!initialScale[index]) initialScale[index] = 0.8;
    });

    setScale(initialScale);
  }, [emblaApi, onSelect, tweenScale])

  return (
    <>
      <div className="w-full mt-12">
          <div className="embla" ref={emblaRef}>
              <div className="embla__container">
              {OurJobsImages.map((image, index) => (
                  <div 
                      className="embla__slide embla__slide--our-jobs" 
                      key={image.id}
                      onClick={() => setSelectedJob(image)}
                  >
                    <div 
                      className="embla__slide__inner p-2 cursor-pointer"
                      style={{
                        ...(scale[index] !== undefined && {
                          transform: `scale(${scale[index]})`,
                          opacity: scale[index] < 0.8 ? 0.3 : 1
                        }),
                        transition: `transform ${TRANSITION_DURATION}, opacity ${TRANSITION_DURATION}`,
                      }}
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
      <JobDetailsModal 
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
      />
    </>
  )
}
