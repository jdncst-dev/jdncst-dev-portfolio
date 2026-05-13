'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
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

  const reInitCarousel = useCallback(() => {
    if (!carouselApi) return
    window.requestAnimationFrame(() => {
      carouselApi.reInit()
    })
  }, [carouselApi])

  useEffect(() => {
    if (!carouselApi) return

    const frame = window.requestAnimationFrame(() => {
      carouselApi.reInit()
      window.requestAnimationFrame(() => {
        carouselApi.reInit()
        setReadyProjectId(project.id)
      })
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [carouselApi, project.id])

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
        className='max-h-[94vh] w-[calc(100vw-1rem)] max-w-6xl gap-0 overflow-hidden rounded-lg border-border bg-(--surface) p-0 text-foreground shadow-2xl sm:w-[calc(100vw-3rem)] sm:max-w-6xl'
        showCloseButton
      >
        <DialogHeader className='border-b border-border bg-(--surface-low) px-4 py-3 sm:px-5 sm:py-4'>
          <span className='meta-label'>Project detail</span>
          <DialogTitle className='sr-only'>{project.name}</DialogTitle>
          <DialogDescription className='sr-only'>
            {project.summary}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='max-h-[calc(94vh-49px)] sm:max-h-[calc(94vh-57px)] lg:h-[calc(94vh-57px)] lg:min-h-0'>
          <div
            className={hasMedia
              ? 'grid grid-cols-1 lg:h-full lg:min-h-0 lg:grid-cols-12 lg:items-stretch'
              : 'grid grid-cols-1'}
          >
            {hasMedia ? (
              <div className='border-b border-border bg-(--background)/35 p-3 sm:p-5 lg:col-span-7 lg:h-full lg:min-h-0 lg:border-b-0 lg:border-r lg:p-6'>
              <Carousel
                className='project-carousel h-[min(50svh,30rem)] max-h-[min(50svh,30rem)] lg:h-[calc(94vh-57px-3rem)] lg:max-h-[calc(94vh-57px-3rem)] lg:min-h-0'
                opts={{ align: 'start', loop: true }}
                setApi={setCarouselApi}
              >
                <CarouselContent className='-ml-4 h-full min-h-0 items-stretch'>
                  {mediaSlides.map((slide) => (
                    <CarouselItem
                      className='flex h-full min-h-0 items-center'
                      key={slide.label}
                    >
                      <div className='relative flex h-full w-full min-h-0 items-center justify-center overflow-hidden project-media-stage'>
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
                  <>
                    <CarouselPrevious className='left-3 top-1/2 h-11 w-11 -translate-y-1/2 border-border bg-(--background-elevated) text-foreground shadow-lg shadow-black/20 hover:bg-(--surface) hover:text-accent' />
                    <CarouselNext className='right-3 top-1/2 h-11 w-11 -translate-y-1/2 border-border bg-(--background-elevated) text-foreground shadow-lg shadow-black/20 hover:bg-(--surface) hover:text-accent' />
                  </>
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
