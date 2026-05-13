'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { projects } from '@/content/portfolio-content'
import type { Project } from '@/components/home/types'

export function ProjectsSection({
  onSelect
}: {
  onSelect: (project: Project) => void
}) {
  return (
    <section className='mx-auto max-w-7xl px-4 py-20 sm:px-6' id='work'>
      <div className='mb-9 flex flex-col justify-between gap-5 border-l-4 border-accent pl-5 md:flex-row md:items-end'>
        <div>
          <span className='micro-label'>001 // Selected work</span>
          <h2 className='mt-2 text-3xl font-semibold tracking-normal text-foreground'>
            Production work, not concept pieces.
          </h2>
          <p className='mt-3 max-w-2xl text-sm leading-6 text-(--text-secondary)'>
            Selected projects across AI retail experiences, live AR engagement,
            native kiosk applications, education platforms and production
            infrastructure.
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {projects.map((project) => (
          <button
            className='group flex min-h-80 cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-(--surface) text-left transition duration-200 hover:-translate-y-0.5 hover:border-accent'
            key={project.id}
            onClick={() => onSelect(project)}
            type='button'
          >
            <div className='relative flex aspect-video items-center justify-center overflow-hidden border-b border-border bg-(--surface-low)'>
              <Image
                alt={`${project.visual} project visual`}
                className='object-cover object-center transition-transform duration-300 group-hover:scale-105'
                draggable={false}
                fill
                loading='eager'
                sizes='(min-width: 1280px) 420px, (min-width: 768px) 540px, 100vw'
                src={project.visual}
              />
            </div>
            <div className='flex flex-1 flex-col p-4'>
              <div className='mb-3 flex items-start justify-between gap-4'>
                <div>
                  <h3 className='text-lg font-semibold tracking-normal text-foreground transition group-hover:text-accent'>
                    {project.name}
                  </h3>
                  <p className='meta-label mt-1'>{project.client}</p>
                </div>
                <span className='font-mono text-lg text-(--text-muted) transition group-hover:text-accent'>
                  ↗
                </span>
              </div>
              <p className='mb-4 text-sm leading-6 text-(--text-secondary)'>
                {project.summary}
              </p>
              <div className='mt-auto flex flex-wrap gap-2'>
                {project.stack.slice(0, 4).map((item) => (
                  <Badge className='chip' key={item} variant='outline'>
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
