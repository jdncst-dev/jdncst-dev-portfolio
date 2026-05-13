export const resumeExperience = [
  {
    role: 'Freelance Full Stack Developer / Tech Lead',
    org: 'Viewtoo S.r.l.',
    location: 'Milano, Italy',
    period: 'Sep 2019 - Present',
    bullets: [
      'Lead full stack, AI, infrastructure and DevOps delivery for brand engagement products and client activations.',
      'Managed end-to-end technical delivery for AI virtual try-on, retail activation, live AR stadium and native kiosk projects.',
      'Designed modular product architecture for reusable AI-powered visual experiences and multiple deployments.',
      'Designed AWS production and distribution infrastructure with SSO, MFA, environment separation, Terraform and containerized delivery.'
    ]
  },
  {
    role: 'Project Lead / Full Stack Developer',
    org: 'ITI P. Hensemberger',
    location: 'Monza, Italy',
    period: 'Sep 2018 - Present',
    bullets: [
      'Designed, rebuilt and maintain a tutoring platform for students, tutors, operators and administrators.',
      'Replaced a legacy HTML/PHP workflow with a modern Next.js system, custom authentication and on-prem data isolation.',
      'Supported 500+ users and 2,000+ lesson bookings, with qualitative improvements observed in student outcomes.'
    ]
  },
  {
    role: 'Teacher of Computer Science and IT Technologies',
    org: 'Centro Studi Modus',
    location: 'Monza, Italy',
    period: 'May 2021 - Sep 2023',
    bullets: [
      'Prepared high school and university students for exams in technical IT subjects.'
    ]
  }
] as const

export const resumeSkills = [
  {
    label: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'HTML', 'CSS']
  },
  {
    label: 'Backend',
    items: ['Python', 'Node.js', 'Hono', 'Express', 'SQL', 'NoSQL', 'GraphQL', 'REST']
  },
  {
    label: 'Cloud / DevOps',
    items: [
      'AWS',
      'Google Cloud',
      'Azure',
      'Docker',
      'Terraform',
      'GitHub Actions',
      'SSM'
    ]
  },
  {
    label: 'Artificial Intelligence',
    items: [
      'AI product workflows',
      'Image-generation pipelines',
      'LLM apps and agents',
      'Chatbots'
    ]
  }
] as const
