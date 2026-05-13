'use client'

import { skills } from '@/content/portfolio-content'

export function ProfileSection() {
  return (
    <section
      className='border-y border-border bg-(--surface-low) px-4 py-20 sm:px-6'
      id='profile'
    >
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12'>
        <div className='lg:col-span-5'>
          <span className='micro-label'>002 // Profile</span>
          <h2 className='mt-2 text-3xl font-semibold tracking-normal text-foreground'>
            Hybrid builder and leader.
          </h2>
          <p className='mt-5 text-base leading-8 text-(--text-secondary)'>
            Nearly 10 years working as a developer, with recent ownership across
            AI visual products, immersive experiences, backend systems, cloud
            infrastructure and delivery workflows. I work operating close to
            internal product and engineering teams.
          </p>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:col-span-7'>
          {skills.map((skill) => (
            <div
              className='rounded-lg border border-border bg-(--surface) p-4'
              key={skill.label}
            >
              <span className='micro-label text-[0.7rem]'>{skill.label}</span>
              <p className='mt-2 text-sm leading-6 text-(--text-secondary)'>
                {skill.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
