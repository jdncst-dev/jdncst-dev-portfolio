'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { Project } from '@/components/home/types'

const newTabProps = {
  target: '_blank',
  rel: 'noopener noreferrer'
}

export function ProjectModal({
  project,
  onClose
}: {
  project: Project
  onClose: () => void
}) {
  const mediaSlides = project.slides.filter(
    (slide) =>
      (slide.type === 'image' || slide.type === 'video') && Boolean(slide.src)
  )
  const hasMedia = mediaSlides.length > 0
  const hasMultipleSlides = mediaSlides.length > 1
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [readyProjectId, setReadyProjectId] = useState<string | null>(null)
  const isCarouselReady = readyProjectId === project.id
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  const reInitCarousel = useCallback(() => {
    if (!carouselApi) return
    window.requestAnimationFrame(() => {
      carouselApi.reInit()
    })
  }, [carouselApi])

  const syncVideoPlayback = useCallback(
    (activeIndex: number) => {
      videoRefs.current.forEach((video, index) => {
        if (!video) return
        if (index === activeIndex) {
          void video.play().catch(() => {})
          return
        }
        video.pause()
      })
    },
    []
  )

  useEffect(() => {
    if (!carouselApi) return

    const frame = window.requestAnimationFrame(() => {
      carouselApi.reInit()
      window.requestAnimationFrame(() => {
        carouselApi.reInit()
        syncVideoPlayback(carouselApi.selectedScrollSnap())
        setReadyProjectId(project.id)
      })
    })

    const handleSelect = () => {
      syncVideoPlayback(carouselApi.selectedScrollSnap())
    }

    carouselApi.on('select', handleSelect)
    carouselApi.on('reInit', handleSelect)

    return () => {
      carouselApi.off('select', handleSelect)
      carouselApi.off('reInit', handleSelect)
      window.cancelAnimationFrame(frame)
    }
  }, [carouselApi, project.id, syncVideoPlayback])

  useEffect(() => {
    videoRefs.current = []
  }, [project.id])

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
        className='max-h-[calc(100dvh-2.75rem)] w-[calc(100vw-1rem)] max-w-6xl gap-0 overflow-hidden rounded-lg border-border bg-(--surface) p-0 text-foreground shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:w-[calc(100vw-3rem)] sm:max-w-6xl'
        showCloseButton
      >
        <DialogHeader className='border-b border-border bg-(--surface-low) px-4 py-3 sm:px-5 sm:py-4'>
          <span className='meta-label'>Project detail</span>
          <DialogTitle className='sr-only'>{project.name}</DialogTitle>
          <DialogDescription className='sr-only'>
            {project.summary}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='max-h-[calc(100dvh-93px)] sm:max-h-[calc(100dvh-105px)] lg:h-[calc(100dvh-105px)] lg:min-h-0'>
          <div
            className={hasMedia
              ? 'grid grid-cols-1 lg:h-full lg:min-h-0 lg:grid-cols-12 lg:items-stretch'
              : 'grid grid-cols-1'}
          >
            {hasMedia ? (
              <div className='border-b border-border bg-(--background)/35 p-3 sm:p-5 lg:col-span-7 lg:h-full lg:min-h-0 lg:border-b-0 lg:border-r lg:p-6'>
              <Carousel
                className='project-carousel flex h-[min(46dvh,27rem)] max-h-[min(46dvh,27rem)] min-h-0 flex-col sm:h-[min(50dvh,30rem)] sm:max-h-[min(50dvh,30rem)] lg:h-[calc(100dvh-153px)] lg:max-h-[calc(100dvh-153px)] lg:min-h-0'
                opts={{ align: 'start', loop: true }}
                setApi={setCarouselApi}
              >
                <CarouselContent
                  className={
                    hasMultipleSlides
                      ? '-ml-4 h-[calc(100%-2.25rem)] min-h-0 flex-none items-center sm:h-[calc(100%-3rem)]'
                      : '-ml-4 h-full min-h-0 flex-none items-center'
                  }
                >
                  {mediaSlides.map((slide, index) => (
                    <CarouselItem
                      className='flex h-full min-h-0 items-end justify-center lg:items-center'
                      key={slide.label}
                    >
                      <div className='relative flex h-full w-full min-h-0 items-end justify-center overflow-hidden project-media-stage lg:items-center'>
                        {slide.type === 'video' ? (
                          <video
                            autoPlay
                            className='project-media rounded-md border border-border'
                            controls
                            loop
                            muted
                            onCanPlay={reInitCarousel}
                            onLoadedMetadata={reInitCarousel}
                            playsInline
                            ref={(node) => {
                              videoRefs.current[index] = node
                            }}
                            src={slide.src}
                          />
                        ) : slide.type === 'image' ? (
                          <Image
                            alt={slide.alt ?? slide.label}
                            className='project-media rounded-md border border-border'
                            draggable={false}
                            height={1400}
                            onLoad={reInitCarousel}
                            src={slide.src!}
                            width={1400}
                          />
                        ) : null}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {hasMultipleSlides && isCarouselReady ? (
                  <div className='mt-3 shrink-0 flex items-center justify-between border-t border-border pt-3'>
                    <CarouselPrevious
                      className='project-carousel-nav !static !h-auto !w-auto !translate-y-0 !rounded-none !border-0 !bg-transparent !p-0 !shadow-none'
                      size='default'
                      variant='ghost'
                    >
                      <span className='inline-flex items-center gap-2'>
                        <span aria-hidden='true'>&larr;</span>
                        <span>Previous</span>
                      </span>
                    </CarouselPrevious>
                    <CarouselNext
                      className='project-carousel-nav !static !h-auto !w-auto !translate-y-0 !rounded-none !border-0 !bg-transparent !p-0 !shadow-none'
                      size='default'
                      variant='ghost'
                    >
                      <span className='inline-flex items-center gap-2'>
                        <span>Next</span>
                        <span aria-hidden='true'>&rarr;</span>
                      </span>
                    </CarouselNext>
                  </div>
                ) : null}
              </Carousel>
              </div>
            ) : null}
            <div
              className={
                hasMedia
                  ? 'p-4 sm:p-6 lg:col-span-5 lg:h-full lg:p-7'
                  : 'p-4 sm:p-6 lg:px-7 lg:py-7'
              }
            >
              <div className='mb-5 sm:mb-7'>
                <h2
                  className='text-2xl font-semibold tracking-normal text-foreground sm:text-3xl'
                  id='project-modal-title'
                >
                  {project.name}
                </h2>
                <div className='meta-label mt-3 flex flex-wrap gap-3'>
                  <span>{project.role}</span>
                  <span>{project.period}</span>
                </div>
              </div>
              <Separator className='mb-5 bg-border sm:mb-7' />
              <SectionLabel>Summary</SectionLabel>
              <p className='mb-5 text-sm leading-7 text-(--text-secondary) sm:mb-7'>
                {project.summary}
              </p>
              <SectionLabel>Key contribution</SectionLabel>
              <ul className='mb-5 space-y-3 sm:mb-7'>
                {project.contribution.map((item) => (
                  <li
                    className='flex gap-3 text-sm leading-6 text-(--text-secondary)'
                    key={item}
                  >
                    <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent' />
                    {item}
                  </li>
                ))}
              </ul>
              <SectionLabel>Stack</SectionLabel>
              <div className='mb-6 flex flex-wrap gap-2 sm:mb-8'>
                {project.stack.map((item) => (
                  <Badge className='chip' key={item} variant='outline'>
                    {item}
                  </Badge>
                ))}
              </div>
              {project.url ? (
                <Button
                  asChild
                  className='button-primary w-full justify-center'
                >
                  <a href={project.url} {...newTabProps}>
                    View public project
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <h3 className='micro-label mb-3'>{children}</h3>
}
