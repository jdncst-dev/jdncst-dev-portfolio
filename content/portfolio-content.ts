import type {
  ClientLogo,
  ExperienceItem,
  Project,
  SkillItem,
  StatItem
} from '@/components/home/types'

export const projects: Project[] = [
  {
    id: 'frame-ai',
    name: 'FRAME - AI Virtual Try-On',
    client: 'Viewtoo',
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
    visual: '/projects/frame-ai/frame-ai-thumb.jpg',
    slides: [
      {
        label: 'Activation demo 1',
        type: 'video',
        src: '/projects/frame-ai/slides/frame-ai-1.mp4'
      }
    ]
  },
  {
    id: 'ac-milan',
    name: 'AC Milan - AR Fan Cam @ San Siro',
    client: 'AC Milan / Viewtoo',
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
      'Direction',
      'Live video',
      'Stadium'
    ],
    proof: [
      'Serie A and EuroLeague matchdays',
      'Average stadium audience around 72,000',
      'Public case study'
    ],
    url: 'https://www.viewtoo.it/portfolio/engagement/ac-milan',
    visual: '/projects/ac-milan/ac-milan-thumb.jpg',
    slides: [
      {
        label: 'Activation footage',
        type: 'video',
        src: '/projects/ac-milan/slides/ac-milan-1.mp4'
      },
      {
        label: 'Work in progress footage 1',
        type: 'video',
        src: '/projects/ac-milan/slides/ac-milan-2.mp4'
      },
      {
        label: 'Work in progress footage 2',
        type: 'image',
        src: '/projects/ac-milan/slides/ac-milan-3.jpg'
      }
    ]
  },
  {
    id: 'aw-lab',
    name: 'AW LAB - AI Retail Activation',
    client: 'AW LAB / Viewtoo',
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
    visual: '/projects/aw-lab/aw-lab-thumb.jpg',
    slides: [
      {
        label: 'Activation footage 1',
        type: 'video',
        src: '/projects/aw-lab/slides/aw-lab-1.mp4'
      },
      {
        label: 'Activation footage 2',
        type: 'video',
        src: '/projects/aw-lab/slides/aw-lab-2.mp4'
      },
      {
        label: 'Work in progress footage',
        type: 'video',
        src: '/projects/aw-lab/slides/aw-lab-3.mp4'
      }
    ]
  },
  {
    id: 'vanini',
    name: 'Vanini - AR Mirror @ TuttoFood',
    client: 'Vanini / Viewtoo',
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
    visual: '/projects/vanini/vanini-thumb.jpg',
    slides: [
      {
        label: 'Activation footage',
        type: 'video',
        src: '/projects/vanini/slides/vanini-1.mp4'
      }
    ]
  },
  {
    id: 'iepf',
    name: 'InsiemeÈ+Facile - Tutoring Platform',
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
    visual: '/projects/iepf/iepf-thumb.jpg',
    slides: [
      {
        label: 'Project surface',
        type: 'placeholder',
        value: '/projects/iepf/iepf-thumb.jpg',
        caption:
          'A focused look at the public-facing experience and the system built around it.'
      }
    ]
  },
  {
    id: 'viewtoo-infra',
    name: 'Viewtoo - AWS Infrastructure',
    client: 'Viewtoo',
    period: 'Jan 2025 - May 2026',
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
    visual: '/projects/viewtoo-infra/viewtoo-infra-thumb.jpg',
    slides: [
      {
        label: 'Project surface',
        type: 'placeholder',
        value: '/projects/viewtoo-infra/viewtoo-infra-thumb.jpg',
        caption:
          'A focused look at the public-facing experience and the system built around it.'
      }
    ]
  }
]

export const skills: SkillItem[] = [
  {
    label: 'Frontend',
    value: 'Next.js, React, TypeScript, HTML, CSS'
  },
  {
    label: 'Backend',
    value: 'Python, Node.js, Hono, Express, SQL, NoSQL, GraphQL, REST'
  },
  {
    label: 'Cloud / DevOps',
    value:
      'AWS, Google Cloud, Azure, Docker, Terraform, GitHub Actions, SSM'
  },
  {
    label: 'Artificial Intelligence',
    value:
      'AI product workflows, image-generation pipelines, LLM apps and agents, chatbots'
  },
]

export const experience: ExperienceItem[] = [
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
      'Prepared high school and university students for exams in technical IT subjects.',
    highlights: [
      'Covered technical IT topics across first to fifth year high school, first to third year university.',
      'Prepared students for computer science exam requirements.',
      'Strengthened the communication side of technical work through teaching.'
    ],
    tags: ['Computer science', 'Teaching', 'Communication']
  }
]

export const experienceStats: StatItem[] = [
  { label: 'Developer experience', value: 'Almost 10 years' },
  { label: 'Current setup', value: 'Freelance contractor' },
  { label: 'Delivery profile', value: 'Builder + lead' }
]

export const clientLogos: ClientLogo[] = [
  {
    name: 'Vanini',
    src: '/marquee/vanini.png',
    darkSrc: '/marquee/vanini-dark.png'
  },
  {
    name: 'Amazon',
    src: '/marquee/amazon.png',
    darkSrc: '/marquee/amazon-dark.png'
  },
  {
    name: 'AW LAB',
    src: '/marquee/awlab.png',
    darkSrc: '/marquee/awlab-dark.png'
  },
  {
    name: 'Barilla',
    src: '/marquee/barilla.png',
    darkSrc: '/marquee/barilla-dark.png'
  },
  {
    name: 'Inter',
    src: '/marquee/inter.png',
    darkSrc: '/marquee/inter-dark.png'
  },
  {
    name: 'Miele',
    src: '/marquee/miele.png',
    darkSrc: '/marquee/miele-dark.png'
  },
  {
    name: 'AC Milan',
    src: '/marquee/acmilan.png',
    darkSrc: '/marquee/acmilan-dark.png'
  },
  { name: 'IP', src: '/marquee/ip.png', darkSrc: '/marquee/ip-dark.png' }
]

export const clientLogoTrack = [...clientLogos, ...clientLogos]

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jordan Castiglioni',
  url: 'https://jdncst.dev',
  image: 'https://jdncst.dev/portrait/jordan-castiglioni.jpg',
  jobTitle: 'Full Stack Developer and Tech Lead',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Milano',
    addressCountry: 'IT'
  },
  email: 'mailto:jordan@jdncst.dev',
  telephone: '+39 379 157 7712',
  sameAs: ['https://www.linkedin.com/in/jordan-castiglioni/'],
  knowsAbout: [
    'Full stack web development',
    'Technical leadership',
    'AI product development',
    'Cloud infrastructure',
    'DevOps',
    'Next.js',
    'React',
    'Python'
  ]
}

export const navSections = [
  { label: 'Work', href: '#work' },
  { label: 'Profile', href: '#profile' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
]
