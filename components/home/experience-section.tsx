'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { experience, experienceStats } from '@/content/portfolio-content'

export function ExperienceSection() {
  return (
    <section className='mx-auto max-w-7xl px-4 py-20 sm:px-6' id='experience'>
      <div className='mb-10 grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-end'>
        <div className='max-w-2xl'>
          <span className='micro-label'>003 // Experience</span>
          <h2 className='mt-2 text-3xl font-semibold tracking-normal text-foreground'>
            Experience shaped by ownership.
          </h2>
          <p className='mt-3 text-sm leading-6 text-(--text-secondary)'>
            I work closest to projects where senior engineering, technical
            leadership and production delivery need to stay connected.
          </p>
        </div>
        <div className='grid gap-3 sm:grid-cols-3'>
          {experienceStats.map((stat) => (
            <Card
              className='rounded-lg border-border bg-(--surface) p-4 py-4 text-foreground'
              key={stat.label}
            >
              <span className='meta-label'>{stat.label}</span>
              <p className='mt-2 text-sm font-semibold text-foreground'>
                {stat.value}
              </p>
            </Card>
          ))}
        </div>
      </div>
      <div className='relative grid gap-5 before:absolute before:bottom-3 before:left-3.25 before:top-3 before:w-px before:bg-[linear-gradient(to_bottom,transparent,var(--accent-soft)_10%,var(--accent-soft)_90%,transparent)] sm:before:left-4'>
        {experience.map((item) => (
          <div
            className='relative pl-8 sm:pl-10'
            key={`${item.role}-${item.org}`}
          >
            <span className='absolute left-2 top-7 z-10 h-2.75 w-2.75 rounded-full border-2 border-background bg-accent shadow-[0_0_0_4px_var(--background)] sm:left-2.75' />
            <Card className='group gap-0 overflow-hidden rounded-lg border-border bg-(--surface) py-0 text-foreground transition duration-200 hover:border-(--accent-soft)'>
              <CardContent className='p-5 sm:p-6'>
                <div className='flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between'>
                  <div className='min-w-0'>
                    <p className='font-mono text-xs font-semibold uppercase text-accent'>
                      {item.org}
                    </p>
                    <h3 className='mt-2 text-[1.12rem] font-semibold tracking-normal text-foreground transition group-hover:text-accent sm:text-[1.18rem]'>
                      {item.role}
                    </h3>
                  </div>
                  <div className='flex shrink-0 flex-wrap items-center gap-2 sm:max-w-60 sm:justify-end'>
                    <span className='meta-label whitespace-nowrap'>
                      {item.period}
                    </span>
                    <Badge
                      className='rounded border-border bg-(--surface-low) px-2 py-1 text-left font-mono text-[10px] uppercase leading-4 text-(--text-secondary)'
                      variant='outline'
                    >
                      {item.mode}
                    </Badge>
                  </div>
                </div>
                <p className='mt-4 max-w-4xl text-sm leading-7 text-(--text-secondary)'>
                  {item.summary}
                </p>
                <div className='mt-5 grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-end'>
                  <ul className='space-y-3'>
                    {item.highlights.map((highlight) => (
                      <li
                        className='flex gap-3 text-sm leading-6 text-(--text-secondary)'
                        key={highlight}
                      >
                        <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent' />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className='flex flex-wrap gap-2 lg:justify-end'>
                    {item.tags.map((tag) => (
                      <Badge className='chip' key={tag} variant='outline'>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}
