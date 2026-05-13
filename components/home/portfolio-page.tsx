'use client'

import { useMemo, useState } from 'react'
import type { Project } from '@/components/home/types'
import { Footer } from '@/components/home/footer'
import { Header } from '@/components/home/header'
import { HeroSection } from '@/components/home/hero-section'
import { ClientProof } from '@/components/home/client-proof'
import { ProjectsSection } from '@/components/home/projects-section'
import { ProfileSection } from '@/components/home/profile-section'
import { ExperienceSection } from '@/components/home/experience-section'
import { ContactSection } from '@/components/home/contact-section'
import { ProjectModal } from '@/components/home/project-modal'
import { personJsonLd, projects } from '@/content/portfolio-content'

export function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const activeProject = useMemo(
    () => selectedProject ?? projects[0],
    [selectedProject]
  )

  return (
    <main className='min-h-screen bg-background text-foreground'>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        type='application/ld+json'
      />
      <Header />
      <div className='relative flex min-h-screen flex-col' id='top'>
        <HeroSection />
        <ClientProof />
      </div>
      <ProjectsSection onSelect={setSelectedProject} />
      <ProfileSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      {selectedProject ? (
        <ProjectModal
          onClose={() => setSelectedProject(null)}
          project={activeProject}
        />
      ) : null}
    </main>
  )
}
