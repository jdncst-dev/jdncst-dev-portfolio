export type ProjectSlide = {
  label: string
  type: 'image' | 'video' | 'placeholder'
  src?: string
  alt?: string
  value?: string
  caption?: string
}

export type Project = {
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
  slides: ProjectSlide[]
}

export type SkillItem = {
  label: string
  value: string
}

export type ExperienceItem = {
  role: string
  org: string
  period: string
  mode: string
  summary: string
  highlights: string[]
  tags: string[]
}

export type StatItem = {
  label: string
  value: string
}

export type ClientLogo = {
  name: string
  src: string
  darkSrc: string
}
