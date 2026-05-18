'use client'

import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type WindowState = 'open' | 'closing' | 'closed'

export function HeroSection() {
  const [tabStack, setTabStack] = useState<string[]>([])

  const addTab = (title: string) => {
    setTabStack((current) =>
      current.includes(title) ? current : [...current, title]
    )
  }

  const removeTab = (title: string) => {
    setTabStack((current) => current.filter((item) => item !== title))
  }

  return (
    <section className='relative flex flex-1 items-center overflow-hidden px-4 pb-8 pt-24 sm:px-6 md:pt-18 lg:pb-8 lg:pt-16'>
      <div className='absolute inset-0 opacity-[0.16]'>
        <div className='hero-grid h-full w-full' />
      </div>
      <div className='absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-background to-transparent' />
      <div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-stretch lg:grid-cols-12 lg:items-stretch lg:gap-8'>
        <div className='relative z-10 md:col-start-1 md:row-start-1 lg:col-span-6'>
          <div className='flex items-stretch gap-4'>
            <div className='hero-mobile-avatar'>
              <Image
                alt='Portrait of Jordan Castiglioni'
                className='object-cover scale-200 translate-y-[40%]'
                draggable={false}
                fill
                priority
                sizes='76px'
                src='/portrait/jordan-castiglioni.jpg'
              />
            </div>
            <div>
              <h1 className='max-w-3xl text-4xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-5xl md:text-[3.1rem] lg:text-[3.65rem]'>
                Jordan Castiglioni
              </h1>
              <p className='font-mono text-base font-semibold uppercase text-accent sm:text-lg'>
                Full Stack Developer and Tech Lead
              </p>
              <div className='mt-3 flex flex-wrap items-center gap-2 font-mono text-xs font-semibold uppercase text-accent'>
                <span>Freelance</span>
                <span className='h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]' />
                <span>Milano / Remote</span>
              </div>
            </div>
          </div>
          <p className='mt-4 max-w-xl text-lg leading-7 text-foreground sm:text-xl sm:leading-8 md:text-lg md:leading-7 lg:text-xl lg:leading-8'>
            I build modern web applications, AI-enabled products and delivery
            systems from idea to production.
          </p>
          <div className='mt-5 flex flex-col gap-3 sm:flex-row'>
            <Button asChild className='button-primary h-11 px-4' size='lg'>
              <a href='#work'>Explore my works</a>
            </Button>
            <Button
              asChild
              className='button-secondary h-11 bg-transparent px-4'
              size='lg'
              variant='outline'
            >
              <a
                href='/resume/Jordan-Castiglioni-CV.pdf'
                rel='noopener noreferrer'
                target='_blank'
              >
                View resume / CV
              </a>
            </Button>
          </div>
        </div>
        <div className='relative z-10 hidden min-w-0 md:col-start-2 md:row-start-1 md:block lg:hidden'>
          <PortraitWindow
            className='flex h-full'
            onClose={addTab}
            onRestore={removeTab}
            tabIndex={tabStack.indexOf('portrait.jpg')}
          />
        </div>
        <div className='relative z-10 min-w-0 space-y-3 md:col-span-2 md:row-start-2 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:block lg:h-full'>
          <div className='grid min-w-0 gap-3 lg:h-full lg:grid-cols-[0.58fr_1fr] lg:items-stretch'>
            <PortraitWindow
              className='hidden lg:flex lg:h-full'
              onClose={addTab}
              onRestore={removeTab}
              tabIndex={tabStack.indexOf('portrait.jpg')}
            />
            <ProfileWindow
              className='lg:h-full'
              onClose={addTab}
              onRestore={removeTab}
              tabIndex={tabStack.indexOf('profile.json')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function WindowShell({
  title,
  tabIndex = 0,
  onClose,
  onRestore,
  hideClosedOnMobile = false,
  placeholderImageSrc,
  placeholderText,
  className,
  headerClassName,
  contentClassName,
  children
}: {
  title: string
  tabIndex?: number
  onClose?: (title: string) => void
  onRestore?: (title: string) => void
  hideClosedOnMobile?: boolean
  placeholderImageSrc?: string
  placeholderText?: string
  className?: string
  headerClassName?: string
  contentClassName?: string
  children: ReactNode
}) {
  const [state, setState] = useState<WindowState>('open')
  const windowRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState<number | null>(null)

  useEffect(() => {
    if (state !== 'open' || !windowRef.current) {
      return
    }

    const updateSize = () => {
      const rect = windowRef.current?.getBoundingClientRect()
      if (!rect) return
      setWindowHeight(rect.height)
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(windowRef.current)

    return () => observer.disconnect()
  }, [state])

  const closeWindow = () => {
    onClose?.(title)
    setState('closed')
  }

  const restoreWindow = () => {
    onRestore?.(title)
    setState('open')
  }

  const placeholder = (
    <div
      className={cn(
        'window-minimized-placeholder',
        state !== 'closed' && 'window-placeholder-underlay'
      )}
      style={
        state === 'closed' && windowHeight
          ? { minHeight: windowHeight }
          : undefined
      }
    >
      {placeholderImageSrc ? (
        <Image
          alt=''
          className='object-contain object-center'
          draggable={false}
          fill
          loading='eager'
          sizes='(min-width: 1024px) 360px, 100vw'
          src={placeholderImageSrc}
        />
      ) : placeholderText ? (
        <span className='font-mono text-xs font-semibold text-(--text-muted)'>
          {placeholderText}
        </span>
      ) : (
        <>
          <span className='font-mono text-[11px] uppercase text-(--text-muted)'>
            {title}
          </span>
          <span className='font-mono text-xs font-semibold uppercase text-accent'>
            preview placeholder
          </span>
        </>
      )}
    </div>
  )

  if (state === 'closed') {
    return (
      <>
        <div
          className={cn(
            'window-stack',
            hideClosedOnMobile && 'max-md:hidden',
            className
          )}
        >
          {placeholder}
        </div>
        <div
          className={cn(
            'window-minimized-slot',
            hideClosedOnMobile && 'max-md:hidden'
          )}
          data-hide-mobile={hideClosedOnMobile ? 'true' : undefined}
          style={{ '--tab-index': tabIndex } as CSSProperties}
        >
          <button
            aria-label={`Restore ${title}`}
            className='window-tab'
            onClick={restoreWindow}
            type='button'
          >
            {title}
          </button>
        </div>
      </>
    )
  }

  return (
    <div className={cn('window-stack', className)}>
      {placeholder}
      <Card
        ref={windowRef}
        className='fake-window relative z-10 flex min-w-0 flex-col gap-0 overflow-hidden rounded-lg border-border bg-(--surface) py-0 text-foreground shadow-2xl'
        data-window-state={state}
        style={{ '--tab-index': tabIndex } as CSSProperties}
      >
        <CardHeader
          className={cn(
            'flex flex-row items-center justify-between border-b border-border px-4 py-3 lg:py-4',
            headerClassName
          )}
        >
          <div className='flex gap-2'>
            <button
              aria-label={`Close ${title}`}
              className='window-control window-control-static'
              style={{ backgroundColor: 'rgb(239 68 68 / 0.72)' }}
              type='button'
            />
            <button
              aria-label={`Minimize ${title}`}
              className='window-control window-control-minimize'
              onClick={closeWindow}
              style={{ backgroundColor: 'rgb(234 179 8 / 0.72)' }}
              type='button'
            />
            <button
              aria-label={`Focus ${title}`}
              className='window-control window-control-static'
              style={{ backgroundColor: 'rgb(34 197 94 / 0.72)' }}
              type='button'
            />
          </div>
          <span className='font-mono text-[11px] uppercase text-(--text-muted)'>
            {title}
          </span>
        </CardHeader>
        <CardContent className={contentClassName}>{children}</CardContent>
      </Card>
    </div>
  )
}

function ProfileWindow({
  className,
  onClose,
  onRestore,
  tabIndex
}: {
  className?: string
  onClose: (title: string) => void
  onRestore: (title: string) => void
  tabIndex: number
}) {
  return (
    <WindowShell
      className={className}
      contentClassName='px-4 pb-4'
      headerClassName='mb-3 lg:mb-4'
      onClose={onClose}
      onRestore={onRestore}
      placeholderImageSrc='/ui/hole.png'
      tabIndex={tabIndex}
      title='profile.json'
    >
      <div className='font-mono text-[12px] font-semibold leading-6 text-(--text-secondary) lg:text-[13px] lg:leading-7'>
        <div>{'{'}</div>
        <div className='pl-3'>
          <JsonLine keyName='name' value='Jordan Castiglioni' comma />
          <JsonLine keyName='role' value='Full Stack Dev and Tech Lead' comma />
          <JsonLine keyName='experience' value='~10 years' comma />
          <JsonLine
            keyName='focus'
            value='Web Apps, AI products, delivery systems'
            comma
          />
          <JsonLine
            keyName='stack'
            value='Next.js, Python, Terraform, AWS, Azure'
            comma
          />
          <JsonLine
            keyName='education'
            value='Computer Science, thesis in progress'
            comma
          />
          <JsonLine keyName='mode' value='Hands-on builder / lead' />
        </div>
        <div>{'}'}</div>
      </div>
    </WindowShell>
  )
}

function PortraitWindow({
  className,
  onClose,
  onRestore,
  tabIndex
}: {
  className?: string
  onClose: (title: string) => void
  onRestore: (title: string) => void
  tabIndex: number
}) {
  return (
    <WindowShell
      className={className}
      contentClassName='flex-1 p-0'
      hideClosedOnMobile
      onClose={onClose}
      onRestore={onRestore}
      placeholderText='// @TODO fix fake window'
      tabIndex={tabIndex}
      title='portrait.jpg'
    >
      <div className='hero-portrait'>
        <Image
          alt='Portrait of Jordan Castiglioni'
          className='object-cover object-[center_25%]'
          draggable={false}
          fill
          priority
          sizes='(min-width: 1024px) 160px, 100vw'
          src='/portrait/jordan-castiglioni.jpg'
        />
      </div>
    </WindowShell>
  )
}

function JsonLine({
  keyName,
  value,
  comma = false
}: {
  keyName: string
  value: string
  comma?: boolean
}) {
  return (
    <div className='grid grid-cols-[max-content_1fr] gap-x-1'>
      <span className='text-accent'>&quot;{keyName}&quot;</span>
      <span className='min-w-0 wrap-break-word'>
        <span>: </span>
        <span>&quot;{value}&quot;</span>
        {comma ? <span>,</span> : null}
      </span>
    </div>
  )
}
