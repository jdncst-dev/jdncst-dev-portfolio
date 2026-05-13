'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { clientLogoTrack } from '@/content/portfolio-content'

export function ClientProof() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const useDarkLogos = mounted && resolvedTheme === 'dark'

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <section className='overflow-hidden border-y border-border bg-(--surface-low) px-4 py-10 sm:px-6'>
      <div className='mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center'>
        <span className='mb-2 shrink-0 text-center font-mono text-xs uppercase text-(--text-muted) md:mb-0 md:w-36 md:text-left'>
          I worked with
        </span>
        <div className='logo-marquee'>
          <div className='logo-track'>
            {clientLogoTrack.map((client, index) => (
              <span className='logo-placeholder' key={`${client.name}-${index}`}>
                <Image
                  alt={`${client.name} logo`}
                  className='object-contain'
                  draggable={false}
                  fill
                  loading='eager'
                  sizes='154px'
                  src={useDarkLogos ? client.darkSrc : client.src}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
