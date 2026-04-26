'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Carousel,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Check, Laptop, Moon, Sun, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'

type Project = {
  id: string
  name: string
  client: string
  period: string
  status: string
  role: string
  summary: string
  contribution: string[]
  stack: string[]
  proof: string[]
  url?: string
  visual: string
}

const projects: Project[] = [
  {
    id: 'frame-ai',
    name: 'Frame AI Virtual Try-On',
    client: 'Viewtoo S.r.l.',
    period: 'Sep 2025 - Present',
    status: 'Multiple deployments',
    role: 'Tech Lead / Full Stack / AI / Infra',
    summary:
      'AI-powered virtual try-on product for fashion activations, built as a configurable experience with onboarding templates, image generation, QR delivery and reusable infrastructure.',
    contribution: [
      'Managed delivery end to end across product, engineering, AI, infrastructure and deployment.',
      'Built the Next.js and Python-based product pipeline with cloud services, storage, monitoring and CI/CD.',
      'Designed a modular feature-block architecture for different client needs and pricing tiers.',
      'Designed consent and personal-data isolation flows for GDPR-aware activations.'
    ],
    stack: [
      'Next.js',
      'Python',
      'Cloud services',
      'DynamoDB',
      'S3',
      'App Runner',
      'EC2',
      'GitHub Actions'
    ],
    proof: ['Public product page', 'Press coverage', 'Multiple deployments'],
    url: 'https://www.viewtoo.it/frame-ai-virtual-try-on',
    visual: 'AI VTO'
  },
  {
    id: 'ac-milan',
    name: 'AC Milan AR Fan Cam',
    client: 'AC Milan / Viewtoo S.r.l.',
    period: 'Aug 2024 - Present',
    status: 'Live stadium operations',
    role: 'AR Effects / Stadium Infra / Control Room',
    summary:
      'Live AR fan engagement experience used during matchdays at San Siro, bringing real-time filters, mini-games, quizzes and virtual try-on effects to stadium screens.',
    contribution: [
      'Developed AR effects and interaction formats for live matchday use.',
      'Built and operated in-stadium capture and video-feed distribution infrastructure.',
      'Managed control-room operation, fallback videos and live troubleshooting during events.',
      'Coordinated with camera operators and third parties under real-time production constraints.'
    ],
    stack: [
      'AR effects',
      'AJA 4K IO',
      'Apple Silicon Mac',
      'Live video',
      'Stadium workflow'
    ],
    proof: [
      'Serie A and EuroLeague matchdays',
      'Average stadium audience around 72,000',
      'Public case study'
    ],
    url: 'https://www.viewtoo.it/portfolio/engagement/ac-milan',
    visual: 'LIVE AR'
  },
  {
    id: 'aw-lab',
    name: 'AW LAB Engagement',
    client: 'AW LAB / Viewtoo S.r.l.',
    period: 'Oct 2025',
    status: 'Single-day activation',
    role: 'Tech Lead / Full Stack / AI',
    summary:
      'AI retail activation for AW LAB stores in Milan and Barcelona, combining quiz-based personalization, virtual try-on generation and QR-based mobile sharing.',
    contribution: [
      'Led the technical delivery for a one-week turnaround activation.',
      'Built the customer-facing experience and AI generation flow with the project team.',
      'Coordinated product, UI/UX, communication and marketing needs into a single live experience.',
      'Optimized the waiting flow around image quality, capture hardware and generation time.'
    ],
    stack: [
      'Next.js',
      'n8n',
      'Cloud services',
      'Object storage',
      'Monitoring',
      'AI image workflow'
    ],
    proof: [
      'Hundreds of unique users',
      'Strong save/share behavior',
      'Public case study'
    ],
    url: 'https://www.viewtoo.it/portfolio/engagement/aw-lab',
    visual: 'RETAIL AI'
  },
  {
    id: 'vanini',
    name: 'Vanini Engagement',
    client: 'Vanini / Viewtoo S.r.l.',
    period: 'May 2025',
    status: 'Trade-show kiosk',
    role: 'macOS App / Backend / Infra',
    summary:
      'Native macOS kiosk experience for TuttoFood, combining AR interaction, touchless hand-tracking control, photo capture and web sharing through QR flow.',
    contribution: [
      'Developed the native macOS kiosk application deployed on Apple Silicon hardware.',
      'Integrated Snap CameraKit for AR effects and touchless interaction constraints.',
      'Built backend and web-sharing flow for post-experience access from smartphone.',
      'Supported CRM-oriented data capture before generated content access.'
    ],
    stack: [
      'Swift',
      'Snap CameraKit',
      'Node.js',
      'Express',
      'VPS',
      'App Store Connect'
    ],
    proof: [
      'Apple Silicon kiosk',
      'TuttoFood stand activation',
      'Public case study'
    ],
    url: 'https://www.viewtoo.it/portfolio/engagement/vanini',
    visual: 'KIOSK AR'
  },
  {
    id: 'iepf',
    name: 'InsiemeÈ+Facile Platform',
    client: 'ITI P. Hensemberger',
    period: '2017 - Present',
    status: 'Maintained platform',
    role: 'Project Lead / Full Stack',
    summary:
      'Tutoring platform for students, tutors, operators and administrators, rebuilt from a manual legacy workflow into a secure booking and lesson-management system.',
    contribution: [
      'Redesigned and rebuilt the legacy HTML/PHP workflow into a modern web platform.',
      'Implemented booking, attendance, feedback and role-based operational workflows.',
      'Built custom token-based authentication and on-prem data isolation for student data.',
      'Continue to maintain the platform and operational reliability over time.'
    ],
    stack: [
      'Next.js',
      'Node.js',
      'Hono',
      'PostgreSQL',
      'Drizzle',
      'Docker',
      'VPS'
    ],
    proof: [
      '500+ users',
      '2,000+ lesson bookings',
      'Meaningful student-outcome improvements observed'
    ],
    url: 'https://iepf.hensemberger.it/',
    visual: 'EDU OPS'
  },
  {
    id: 'viewtoo-infra',
    name: 'Viewtoo AWS Infrastructure',
    client: 'Viewtoo S.r.l.',
    period: 'Jan 2025 - Apr 2026',
    status: 'Internal platform',
    role: 'Infrastructure / DevOps / Team Enablement',
    summary:
      'Internal AWS production and distribution infrastructure transformation, moving from shared root-account workflows to safer and repeatable deployment practices.',
    contribution: [
      'Introduced SSO, MFA, least-privilege access and stronger environment separation.',
      'Designed Terraform-based provisioning and containerized deployment workflows.',
      'Set up production-oriented practices across GitHub Actions, AWS services, monitoring and secrets.',
      'Trained the team on development practices, distribution flow and DevOps standards.'
    ],
    stack: [
      'AWS',
      'Terraform',
      'Docker',
      'GitHub Actions',
      'CloudWatch',
      'S3',
      'DynamoDB',
      'RDS'
    ],
    proof: [
      'SSO and MFA',
      'Environment separation',
      'Repeatable deployment workflow'
    ],
    visual: 'AWS FLOW'
  }
]

const skills = [
  {
    label: 'Frontend',
    value: 'Next.js, React, TypeScript, HTML, CSS'
  },
  {
    label: 'Backend',
    value: 'Python, Node.js, Hono, Express, SQL'
  },
  {
    label: 'Cloud / DevOps',
    value:
      'Cloud platforms, Google Cloud, Azure, Docker, Terraform, GitHub Actions, monitoring'
  },
  {
    label: 'Infrastructure',
    value: 'Linux, VPS, DNS, VPN, VLANs, managed switches'
  },
  {
    label: 'Applied AI',
    value:
      'AI product workflows, image-generation pipelines, LLM apps and agents'
  },
  {
    label: 'Delivery',
    value:
      'Tech leadership, modular architecture, live operations, team enablement'
  }
]

const experience = [
  {
    role: 'Freelance Full Stack Developer and Tech Lead',
    org: 'Viewtoo S.r.l.',
    period: 'Sep 2018 - Present',
    mode: 'Current freelance contractor',
    summary:
      'Long-running collaboration on immersive, AI-powered and live engagement products, working across product engineering, full stack development, infrastructure and delivery.',
    highlights: [
      'Led or owned technical delivery for AI virtual try-on, retail activation, stadium AR and native kiosk projects.',
      'Designed reusable product architecture and cloud delivery infrastructure for production and distribution.',
      'Trained the development team on modern development practices, deployment flow and DevOps.'
    ],
    tags: ['AI products', 'Web applications', 'Cloud', 'Tech leadership']
  },
  {
    role: 'Project Lead and Full Stack Developer',
    org: 'ITI P. Hensemberger',
    period: 'Sep 2017 - Present',
    mode: 'Long-term platform owner',
    summary:
      'Designed, rebuilt and maintain the InsiemeÈ+Facile tutoring platform for students, tutors, operators and administrators.',
    highlights: [
      'Replaced a manual legacy workflow with a modern booking, attendance and lesson-management platform.',
      'Built custom authentication and on-prem data isolation for student data.',
      'Maintained an operational system used by 500+ users and 2,000+ lesson bookings.'
    ],
    tags: ['Next.js', 'Custom auth', 'Data isolation']
  },
  {
    role: 'Teacher of Computer Science and IT Technologies',
    org: 'Centro Studi Modus',
    period: 'May 2021 - Sep 2023',
    mode: 'Teaching',
    summary:
      'Supported high school students in technical IT subjects and prepared students for the Italian state exam in computer science.',
    highlights: [
      'Covered technical IT topics across first to fifth year.',
      'Prepared students for computer science exam requirements.',
      'Strengthened the communication side of technical work through teaching.'
    ],
    tags: ['Computer science', 'Teaching', 'Communication']
  }
]

const experienceStats = [
  { label: 'Developer experience', value: 'Almost 10 years' },
  { label: 'Current setup', value: 'Freelance contractor' },
  { label: 'Delivery profile', value: 'Builder + lead' }
]

const clientLogos = [
  { name: 'Vanini', src: '/vanini.png', darkSrc: '/vanini-dark.png' },
  { name: 'Amazon', src: '/amazon.png', darkSrc: '/amazon-dark.png' },
  { name: 'AW LAB', src: '/awlab.png', darkSrc: '/awlab-dark.png' },
  { name: 'Barilla', src: '/barilla.png', darkSrc: '/barilla-dark.png' },
  { name: 'Inter', src: '/inter.png', darkSrc: '/inter-dark.png' },
  { name: 'Miele', src: '/miele.png', darkSrc: '/miele-dark.png' },
  { name: 'AC Milan', src: '/acmilan.png', darkSrc: '/acmilan-dark.png' },
  { name: 'IP', src: '/ip.png', darkSrc: '/ip-dark.png' }
]
const clientLogoTrack = [...clientLogos, ...clientLogos]
const newTabProps = {
  target: '_blank',
  rel: 'noopener noreferrer'
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const activeProject = useMemo(
    () => selectedProject ?? projects[0],
    [selectedProject]
  )

  return (
    <main className='min-h-screen bg-[var(--background)] text-[var(--text-primary)]'>
      <Header />
      <Intro />
      <Projects onSelect={setSelectedProject} />
      <Profile />
      <Experience />
      <Contact />
      <Footer />
      {selectedProject ? (
        <ProjectModal
          project={activeProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </main>
  )
}

function Intro() {
  return (
    <div className='relative flex min-h-screen flex-col' id='top'>
      <Hero />
      <ScrollHint />
      <ClientProof />
    </div>
  )
}

function ScrollHint() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(true)
    }

    window.addEventListener('scroll', handleScroll, {
      once: true,
      passive: true
    })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      aria-hidden='true'
      className={`scroll-hint pointer-events-none absolute bottom-[12.5rem] left-1/2 z-40 flex -translate-x-1/2 items-center justify-center ${hasScrolled ? 'scroll-hint--hide' : ''}`}
    >
      <span className='scroll-hint-mark' />
    </div>
  )
}

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className='border-t border-[var(--border)] bg-[var(--background)] px-4 py-6 sm:px-6'>
      <div className='mx-auto flex max-w-7xl flex-col gap-2 font-mono text-[11px] uppercase text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between'>
        <span>© {year} Jordan Castiglioni</span>
        <span>Full Stack Developer and Tech Lead</span>
      </div>
    </footer>
  )
}

function Header() {
  return (
    <header className='fixed left-0 top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background-elevated)]/85 px-4 backdrop-blur-md sm:px-6'>
      <div className='mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center'>
        <a
          className='justify-self-start font-mono text-sm font-semibold text-[var(--text-primary)]'
          href='#top'
        >
          JORDAN CASTIGLIONI // FULL STACK
        </a>
        <nav className='hidden items-center gap-6 justify-self-center font-mono text-xs uppercase text-[var(--text-muted)] md:flex'>
          <a className='transition hover:text-[var(--accent)]' href='#work'>
            Work
          </a>
          <a className='transition hover:text-[var(--accent)]' href='#profile'>
            Profile
          </a>
          <a
            className='transition hover:text-[var(--accent)]'
            href='#experience'
          >
            Experience
          </a>
          <a className='transition hover:text-[var(--accent)]' href='#contact'>
            Contact
          </a>
        </nav>
        <div className='justify-self-end'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const currentTheme = theme ?? 'system'
  const options = [
    { value: 'system', label: 'System', icon: Laptop },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'light', label: 'Light', icon: Sun }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label='Select color theme'
          className='icon-link'
          size='icon'
          type='button'
          variant='outline'
        >
          <SunMoon aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='min-w-36 border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]'
      >
        {options.map((option) => {
          const Icon = option.icon
          const active = currentTheme === option.value

          return (
            <DropdownMenuItem
              className='gap-2 font-mono text-xs uppercase text-[var(--text-secondary)] focus:bg-[var(--accent-faint)] focus:text-[var(--accent)]'
              key={option.value}
              onClick={() => setTheme(option.value)}
            >
              <Icon className='h-4 w-4' />
              <span>{option.label}</span>
              {active ? (
                <Check className='ml-auto h-3.5 w-3.5 text-[var(--accent)]' />
              ) : null}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Hero() {
  return (
    <section className='relative flex flex-1 items-center overflow-hidden px-4 pb-10 pt-20 sm:px-6 lg:pb-8 lg:pt-16'>
      <div className='absolute inset-0 opacity-[0.16]'>
        <div className='hero-grid h-full w-full' />
      </div>
      <div className='absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--background)] to-transparent' />
      <div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center'>
        <div className='relative z-10 lg:col-span-6'>
          <div className='mb-5 flex items-center gap-3'>
            <span className='h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]' />
            <span className='font-mono text-xs uppercase text-[var(--accent)]'>
              Italy-based (Milano) // Remote worldwide // Work travel
            </span>
          </div>
          <p className='font-mono text-base font-semibold uppercase text-[var(--accent)] sm:text-lg'>
            Full Stack Developer and Tech Lead
          </p>
          <h1 className='mt-3 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-normal text-[var(--text-primary)] sm:text-5xl lg:text-[3.65rem]'>
            Jordan Castiglioni
          </h1>
          <p className='mt-5 max-w-xl text-lg leading-7 text-[var(--text-primary)] sm:text-xl sm:leading-8'>
            I lead and build modern web applications, AI-enabled products and
            delivery systems from idea to production.
          </p>
          <div className='mt-5 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-3'>
            {[
              'Web app delivery',
              'Technical leadership',
              'AI product systems'
            ].map((item) => (
              <span
                className='rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-mono text-[11px] font-semibold uppercase text-[var(--text-secondary)]'
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
            <Button asChild className='button-primary h-11 px-4' size='lg'>
              <a href='#work'>Explore my works</a>
            </Button>
            <Button
              asChild
              className='button-secondary h-11 bg-transparent px-4'
              size='lg'
              variant='outline'
            >
              <a href='#'>View resume / CV</a>
            </Button>
          </div>
        </div>
        <div className='relative z-10 min-w-0 space-y-3 lg:col-span-6'>
          <div className='grid min-w-0 gap-3 md:grid-cols-[0.46fr_1fr]'>
            <PortraitWindow />
            <Card className='min-w-0 gap-0 rounded-lg border-[var(--border)] bg-[var(--surface)] py-0 text-[var(--text-primary)] shadow-2xl'>
              <CardHeader className='mb-4 flex flex-row items-center justify-between border-b border-[var(--border)] px-4 py-4'>
                <div className='flex gap-2'>
                  <span className='h-2.5 w-2.5 rounded-full bg-red-500/60' />
                  <span className='h-2.5 w-2.5 rounded-full bg-yellow-500/60' />
                  <span className='h-2.5 w-2.5 rounded-full bg-green-500/60' />
                </div>
                <span className='font-mono text-[11px] uppercase text-[var(--text-muted)]'>
                  profile.json
                </span>
              </CardHeader>
              <CardContent className='px-4 pb-4'>
                <div className='font-mono text-[13px] leading-7 text-[var(--text-secondary)]'>
                  <div>{'{'}</div>
                  <div className='pl-3'>
                    <JsonLine keyName='name' value='Jordan Castiglioni' comma />
                    <JsonLine
                      keyName='role'
                      value='Senior Full Stack and Tech Lead'
                      comma
                    />
                    <JsonLine
                      keyName='focus'
                      value='AI products + delivery systems'
                      comma
                    />
                    <JsonLine
                      keyName='stack'
                      value='Next.js, Python, cloud, Docker'
                      comma
                    />
                    <JsonLine keyName='mode' value='hands-on builder / lead' />
                  </div>
                  <div>{'}'}</div>
                </div>
              </CardContent>
            </Card>
          </div>
          <SystemStatus />
        </div>
      </div>
    </section>
  )
}

function PortraitWindow() {
  return (
    <Card className='min-w-0 gap-0 overflow-hidden rounded-lg border-[var(--border)] bg-[var(--surface)] py-0 text-[var(--text-primary)] shadow-2xl'>
      <CardHeader className='flex flex-row items-center justify-between border-b border-[var(--border)] px-4 py-4'>
        <div className='flex gap-2'>
          <span className='h-2.5 w-2.5 rounded-full bg-red-500/60' />
          <span className='h-2.5 w-2.5 rounded-full bg-yellow-500/60' />
          <span className='h-2.5 w-2.5 rounded-full bg-green-500/60' />
        </div>
        <span className='font-mono text-[11px] uppercase text-[var(--text-muted)]'>
          portrait.jpg
        </span>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='hero-portrait'>
          <Image
            alt='Portrait of Jordan Castiglioni'
            className='object-cover object-center'
            draggable={false}
            fill
            priority
            sizes='(min-width: 1024px) 160px, 100vw'
            src='/jordan-castiglioni.jpg'
          />
        </div>
      </CardContent>
    </Card>
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
      <span className='text-[var(--accent)]'>&quot;{keyName}&quot;</span>
      <span className='min-w-0 break-words'>
        <span>: </span>
        <span>&quot;{value}&quot;</span>
        {comma ? <span>,</span> : null}
      </span>
    </div>
  )
}

function ClientProof() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const useDarkLogos = !mounted || resolvedTheme !== 'light'

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true))

    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <section className='overflow-hidden border-y border-[var(--border)] bg-[var(--surface-low)] px-4 py-10 sm:px-6'>
      <div className='mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center'>
        <span className='shrink-0 font-mono text-xs uppercase text-[var(--text-muted)] md:w-36'>
          I worked with
        </span>
        <div className='logo-marquee'>
          <div className='logo-track'>
            {clientLogoTrack.map((client, index) => (
              <span
                className='logo-placeholder'
                key={`${client.name}-${index}`}
              >
                <Image
                  alt={`${client.name} logo`}
                  className='object-contain'
                  draggable={false}
                  fill
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

function Projects({ onSelect }: { onSelect: (project: Project) => void }) {
  return (
    <section className='mx-auto max-w-7xl px-4 py-20 sm:px-6' id='work'>
      <div className='mb-9 flex flex-col justify-between gap-5 border-l-4 border-[var(--accent)] pl-5 md:flex-row md:items-end'>
        <div>
          <span className='micro-label'>001 // Selected work</span>
          <h2 className='mt-2 text-3xl font-semibold tracking-normal text-[var(--text-primary)]'>
            Production work, not concept pieces.
          </h2>
          <p className='mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]'>
            Selected projects across AI retail experiences, live AR engagement,
            native kiosk applications, education platforms and production
            infrastructure.
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {projects.map((project) => (
          <button
            className='group flex min-h-[320px] flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] text-left transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]'
            key={project.id}
            onClick={() => onSelect(project)}
            type='button'
          >
            <div className='relative flex aspect-video items-center justify-center overflow-hidden border-b border-[var(--border)] bg-[var(--surface-low)]'>
              <div className='project-visual absolute inset-0' />
              <span className='relative z-10 font-mono text-sm uppercase text-[var(--accent)]'>
                {project.visual}
              </span>
              <Badge className='absolute right-3 top-3 rounded border-[var(--accent-soft)] bg-[var(--background)]/70 px-2 py-0.5 font-mono text-[10px] uppercase text-[var(--accent)]'>
                {project.status}
              </Badge>
            </div>
            <div className='flex flex-1 flex-col p-4'>
              <div className='mb-3 flex items-start justify-between gap-4'>
                <div>
                  <h3 className='text-lg font-semibold tracking-normal text-[var(--text-primary)] transition group-hover:text-[var(--accent)]'>
                    {project.name}
                  </h3>
                  <p className='meta-label mt-1'>{project.client}</p>
                </div>
                <span className='font-mono text-lg text-[var(--text-muted)] transition group-hover:text-[var(--accent)]'>
                  ↗
                </span>
              </div>
              <p className='mb-4 text-sm leading-6 text-[var(--text-secondary)]'>
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

function Profile() {
  return (
    <section
      className='border-y border-[var(--border)] bg-[var(--surface-low)] px-4 py-20 sm:px-6'
      id='profile'
    >
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12'>
        <div className='lg:col-span-5'>
          <span className='micro-label'>002 // Profile</span>
          <h2 className='mt-2 text-3xl font-semibold tracking-normal text-[var(--text-primary)]'>
            Hybrid builder and leader.
          </h2>
          <p className='mt-5 text-base leading-8 text-[var(--text-secondary)]'>
            Nearly 10 years working as a developer, with recent ownership across
            AI visual products, immersive experiences, backend systems, cloud
            infrastructure and delivery workflows. I work as a freelance
            contractor while operating close to internal product and engineering
            teams.
          </p>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:col-span-7'>
          {skills.map((skill) => (
            <div
              className='rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4'
              key={skill.label}
            >
              <span className='micro-label text-[0.7rem]'>{skill.label}</span>
              <p className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
                {skill.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className='mx-auto max-w-7xl px-4 py-20 sm:px-6' id='experience'>
      <div className='mb-10 grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-end'>
        <div className='max-w-2xl'>
          <span className='micro-label'>003 // Experience</span>
          <h2 className='mt-2 text-3xl font-semibold tracking-normal text-[var(--text-primary)]'>
            Experience shaped by ownership.
          </h2>
          <p className='mt-3 text-sm leading-6 text-[var(--text-secondary)]'>
            I work closest to projects where senior engineering, technical
            leadership and production delivery need to stay connected.
          </p>
        </div>
        <div className='grid gap-3 sm:grid-cols-3'>
          {experienceStats.map((stat) => (
            <Card
              className='rounded-lg border-[var(--border)] bg-[var(--surface)] p-4 py-4 text-[var(--text-primary)]'
              key={stat.label}
            >
              <span className='meta-label'>{stat.label}</span>
              <p className='mt-2 text-sm font-semibold text-[var(--text-primary)]'>
                {stat.value}
              </p>
            </Card>
          ))}
        </div>
      </div>
      <div className='grid gap-4'>
        {experience.map((item, index) => (
          <Card
            className='group gap-0 overflow-hidden rounded-lg border-[var(--border)] bg-[var(--surface)] py-0 text-[var(--text-primary)] transition duration-200 hover:border-[var(--accent-soft)]'
            key={`${item.role}-${item.org}`}
          >
            <CardContent className='grid gap-0 p-0 md:grid-cols-[14.75rem_1fr]'>
              <div className='border-b border-[var(--border)] bg-[var(--surface-low)] p-5 md:border-b-0 md:border-r'>
                <div className='flex items-center gap-3 md:block'>
                  <span className='font-mono text-2xl font-semibold text-[var(--accent)]'>
                    0{index + 1}
                  </span>
                  <div className='md:mt-5'>
                    <p className='meta-label'>{item.period}</p>
                    <Badge
                      className='mt-2 max-w-full whitespace-normal break-words rounded border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-left font-mono text-[10px] uppercase leading-4 text-[var(--text-secondary)]'
                      variant='outline'
                    >
                      {item.mode}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className='flex min-h-full flex-col p-5 sm:p-6'>
                <div>
                  <p className='font-mono text-xs font-semibold uppercase text-[var(--accent)]'>
                    {item.org}
                  </p>
                  <h3 className='mt-2 text-xl font-semibold tracking-normal text-[var(--text-primary)] transition group-hover:text-[var(--accent)]'>
                    {item.role}
                  </h3>
                  <p className='mt-4 max-w-4xl text-sm leading-7 text-[var(--text-secondary)]'>
                    {item.summary}
                  </p>
                </div>
                <div className='mt-5 grid flex-1 gap-5 lg:grid-cols-[1fr_0.78fr]'>
                  <ul className='space-y-3'>
                    {item.highlights.map((highlight) => (
                      <li
                        className='flex gap-3 text-sm leading-6 text-[var(--text-secondary)]'
                        key={highlight}
                      >
                        <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]' />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className='flex content-end items-end justify-start self-end lg:justify-end'>
                    <div className='flex flex-wrap gap-2 lg:justify-end'>
                      {item.tags.map((tag) => (
                        <Badge className='chip' key={tag} variant='outline'>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section
      className='border-t border-[var(--border)] bg-[var(--surface-low)] px-4 py-20 sm:px-6'
      id='contact'
    >
      <div className='mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]'>
        <div className='rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8'>
          <span className='micro-label'>004 // Contact</span>
          <h2 className='mt-3 max-w-2xl text-3xl font-semibold tracking-normal text-[var(--text-primary)] sm:text-4xl'>
            Let&apos;s talk about the next system to ship.
          </h2>
          <p className='mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]'>
            I&apos;m open to senior full stack and tech lead work across product
            engineering, applied AI and production infrastructure.
          </p>
          <div className='mt-8 flex items-center gap-3 font-mono text-xs uppercase text-[var(--text-secondary)]'>
            <span className='h-px flex-1 bg-[var(--accent)]' />
            <span className='shrink-0 text-right'>Contact me</span>
            <ArrowRight className='h-4 w-4 shrink-0 text-[var(--accent)]' />
          </div>
        </div>
        <Card className='h-full gap-0 rounded-lg border-[var(--border)] bg-[var(--surface)] py-0 text-[var(--text-primary)]'>
          <CardHeader className='border-b border-[var(--border)] px-5 py-4'>
            <span className='micro-label'>Contact channels</span>
          </CardHeader>
          <CardContent className='grid flex-1 grid-rows-3 gap-0 p-0'>
            <ContactRow
              label='Email'
              value='jordan@jdncst.dev'
              href='mailto:jordan@jdncst.dev'
              action='Send an email'
            />
            <ContactRow
              label='Phone / WhatsApp'
              value='+39 379 157 7712'
              href='https://wa.me/39379157712'
              action='Start a chat / call'
            />
            <ContactRow
              label='LinkedIn'
              value='jordan-castiglioni'
              href='https://www.linkedin.com/in/jordan-castiglioni/'
              action='Send a message'
            />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function ContactRow({
  label,
  value,
  href,
  action
}: {
  label: string
  value: string
  href?: string
  action?: string
}) {
  const content = (
    <>
      <span className='meta-label'>{label}</span>
      <span className='grid min-w-0 grid-cols-[1fr_auto] items-center gap-4'>
        <span className='min-w-0 truncate text-sm font-medium text-[var(--text-primary)]'>
          {value}
        </span>
        {action ? (
          <span className='hidden whitespace-nowrap font-mono text-[10px] font-semibold uppercase text-[var(--accent)] sm:inline-flex sm:items-center sm:gap-2'>
            {action}
            <ArrowRight className='h-3.5 w-3.5' />
          </span>
        ) : null}
      </span>
    </>
  )

  if (href) {
    return (
      <a
        className='grid content-center gap-1 border-b border-[var(--border)] px-5 py-3 transition hover:bg-[var(--accent-faint)] hover:shadow-[inset_3px_0_0_var(--accent)] last:border-b-0'
        href={href}
        {...newTabProps}
      >
        {content}
      </a>
    )
  }

  return (
    <div className='grid content-center gap-1 border-b border-[var(--border)] px-5 py-3 last:border-b-0'>
      {content}
    </div>
  )
}

function SystemStatus() {
  return (
    <Card className='gap-0 rounded-lg border-[var(--accent-soft)] bg-[var(--surface)] py-0 text-[var(--text-primary)] shadow-2xl'>
      <CardHeader className='flex flex-row items-center justify-between border-b border-[var(--border)] px-4 py-3'>
        <div className='flex gap-2'>
          <span className='h-2.5 w-2.5 rounded-full bg-red-500/60' />
          <span className='h-2.5 w-2.5 rounded-full bg-yellow-500/60' />
          <span className='h-2.5 w-2.5 rounded-full bg-green-500/60' />
        </div>
        <span aria-hidden='true' />
      </CardHeader>
      <CardContent className='px-4 py-4'>
        <div className='mb-3 font-mono text-xs text-[var(--text-muted)]'>
          <span className='text-[var(--accent)]'>&gt;</span>
          <span> </span>
          <span>status --availability</span>
        </div>
        <ul className='space-y-2 font-mono text-xs uppercase text-[var(--text-secondary)]'>
          <TerminalStatusItem label='availability' value='open to work' />
          <TerminalStatusItem label='location' value='milan, italy' />
          <TerminalStatusItem
            label='work_setup'
            value='on-site + remote / travel'
          />
          <TerminalStatusItem
            label='education'
            value='computer science, thesis in progress'
          />
        </ul>
      </CardContent>
    </Card>
  )
}

function TerminalStatusItem({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <li className='grid grid-cols-[6.8rem_1fr] gap-3'>
      <span className='text-[var(--accent)]'>{label}</span>
      <span className='text-[var(--text-secondary)]'>
        <span className='text-[var(--text-muted)]'>= </span>
        {value}
      </span>
    </li>
  )
}

function ProjectModal({
  project,
  onClose
}: {
  project: Project
  onClose: () => void
}) {
  const slides = getProjectSlides(project)
  const insights = getProjectInsights(project)

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <DialogContent
        className='max-h-[92vh] w-[calc(100vw-1.5rem)] max-w-6xl gap-0 overflow-hidden rounded-lg border-[var(--border)] bg-[var(--surface)] p-0 text-[var(--text-primary)] shadow-2xl sm:w-[calc(100vw-3rem)] sm:max-w-6xl'
        showCloseButton
      >
        <DialogHeader className='border-b border-[var(--border)] bg-[var(--surface-low)] px-4 py-4 sm:px-5'>
          <span className='meta-label'>Project detail</span>
          <DialogTitle className='sr-only'>{project.name}</DialogTitle>
          <DialogDescription className='sr-only'>
            {project.summary}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='max-h-[calc(92vh-57px)]'>
          <div className='grid grid-cols-1 lg:grid-cols-12'>
            <div className='border-b border-[var(--border)] bg-[var(--background)]/35 p-4 lg:col-span-7 lg:border-b-0 lg:border-r sm:p-6'>
              <Carousel
                className='project-carousel'
                opts={{ align: 'start', loop: true }}
              >
                <CarouselContent className='-ml-3'>
                  {slides.map((slide) => (
                    <CarouselItem className='pl-3' key={slide.label}>
                      <div className='relative flex aspect-video items-center justify-center overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface-low)]'>
                        <div className='project-visual absolute inset-0' />
                        <div className='relative z-10 flex h-full w-full flex-col justify-between p-5'>
                          <div className='flex items-center justify-between gap-4'>
                            <span className='meta-label'>{slide.label}</span>
                            <span className='h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]' />
                          </div>
                          <div>
                            <p className='font-mono text-2xl font-semibold uppercase text-[var(--accent)] sm:text-3xl'>
                              {slide.value}
                            </p>
                            <p className='mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)]'>
                              {slide.caption}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className='left-3 top-auto bottom-3 h-8 w-8 border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--accent-faint)] hover:text-[var(--accent)]' />
                <CarouselNext className='right-3 top-auto bottom-3 h-8 w-8 border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--accent-faint)] hover:text-[var(--accent)]' />
              </Carousel>
              <div className='mt-4 grid overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)] md:grid-cols-3'>
                {insights.map((insight, index) => (
                  <div
                    className={`min-h-24 p-4 ${
                      index < insights.length - 1
                        ? 'border-b border-[var(--border)] md:border-b-0 md:border-r'
                        : ''
                    }`}
                    key={insight.label}
                  >
                    <span className='meta-label'>{insight.label}</span>
                    <p className='mt-2 text-sm font-semibold leading-6 text-[var(--text-primary)]'>
                      {insight.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className='p-5 sm:p-7 lg:col-span-5'>
              <div className='mb-7'>
                <h2
                  className='text-3xl font-semibold tracking-normal text-[var(--text-primary)]'
                  id='project-modal-title'
                >
                  {project.name}
                </h2>
                <div className='meta-label mt-3 flex flex-wrap gap-3'>
                  <span>{project.role}</span>
                  <span>{project.period}</span>
                </div>
              </div>
              <Separator className='mb-7 bg-[var(--border)]' />
              <SectionLabel>Summary</SectionLabel>
              <p className='mb-7 text-sm leading-7 text-[var(--text-secondary)]'>
                {project.summary}
              </p>
              <SectionLabel>Key contribution</SectionLabel>
              <ul className='mb-7 space-y-3'>
                {project.contribution.map((item) => (
                  <li
                    className='flex gap-3 text-sm leading-6 text-[var(--text-secondary)]'
                    key={item}
                  >
                    <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]' />
                    {item}
                  </li>
                ))}
              </ul>
              <SectionLabel>Stack</SectionLabel>
              <div className='mb-8 flex flex-wrap gap-2'>
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
              ) : (
                <div className='rounded-md border border-[var(--border)] bg-[var(--surface-low)] p-3 font-mono text-xs uppercase text-[var(--text-muted)]'>
                  Internal project. Public link not available.
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function getProjectSlides(project: Project) {
  return [
    {
      label: 'Project surface',
      value: project.visual,
      caption:
        'A focused look at the public-facing experience and the system built around it.'
    },
    {
      label: 'Delivery mode',
      value: project.status,
      caption:
        'The project context that shaped technical decisions, reliability needs and delivery constraints.'
    },
    {
      label: 'Ownership',
      value: project.role,
      caption:
        'The main engineering responsibilities covered across product, implementation and production delivery.'
    }
  ]
}

function getProjectInsights(project: Project) {
  return [
    {
      label: 'Context',
      value: project.client
    },
    {
      label: 'Delivery',
      value: project.status
    },
    {
      label: 'Foundation',
      value: project.stack.slice(0, 3).join(' + ')
    }
  ]
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h3 className='micro-label mb-3'>{children}</h3>
}
