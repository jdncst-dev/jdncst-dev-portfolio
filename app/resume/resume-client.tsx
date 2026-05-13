'use client'

import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

const experience = [
  {
    role: 'Freelance Full Stack Developer / Tech Lead',
    org: 'Viewtoo S.r.l.',
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
    period: 'May 2021 - Sep 2023',
    bullets: [
      'Prepared high school and university students for exams in technical IT subjects.'
    ]
  }
]

const skills = [
  {
    label: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'HTML', 'CSS']
  },
  {
    label: 'Backend',
    items: ['Python', 'Node.js', 'API design', 'SQL']
  },
  {
    label: 'Cloud / DevOps',
    items: [
      'Cloud services',
      'AWS',
      'Docker',
      'Terraform',
      'GitHub Actions',
      'Linux'
    ]
  },
  {
    label: 'AI',
    items: ['AI product workflows', 'LLM apps', 'Agentic systems']
  }
]

export default function ResumeClientPage() {
  return (
    <main className='resume-shell'>
      <div className='resume-toolbar no-print'>
        <Button
          asChild
          className='button-secondary bg-transparent'
          variant='outline'
        >
          <Link href='/'>
            <ArrowLeft className='h-4 w-4' />
            Back to portfolio
          </Link>
        </Button>
        <Button asChild className='button-primary'>
          <a
            href='/resume/Jordan-Castiglioni-CV.pdf'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Download className='h-4 w-4' />
            Download PDF
          </a>
        </Button>
      </div>

      <article className='resume-page'>
        <header className='resume-header'>
          <div className='resume-name-lockup'>
            <div className='resume-avatar'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt='Portrait of Jordan Castiglioni'
                draggable={false}
                src='/portrait/jordan-castiglioni-cv.jpg'
              />
            </div>
            <div>
              <h1>Jordan Castiglioni</h1>
              <p>Full Stack Developer and Tech Lead</p>
            </div>
          </div>
          <div className='resume-contact'>
            <a href='mailto:jordan@jdncst.dev'>jordan@jdncst.dev</a>
            <a href='tel:+39379157712'>+39 379 157 7712</a>
            <span>Milano, Italy</span>
            <a href='https://jdncst.dev'>jdncst.dev</a>
          </div>
        </header>

        <div className='resume-body'>
          <main>
            <section className='resume-section resume-summary'>
              <h2>Profile</h2>
              <p>
                Full stack developer and tech lead with almost 10 years of
                experience building production web applications, AI-enabled
                products and cloud delivery systems. Hybrid builder/leader,
                comfortable owning implementation, infrastructure, DevOps and
                team enablement from idea to production.
              </p>
            </section>

            <section className='resume-section'>
              <h2>Experience</h2>
              <div className='resume-stack'>
                {experience.map((item) => (
                  <section
                    className='resume-item'
                    key={`${item.org}-${item.role}`}
                  >
                    <div className='resume-item-header'>
                      <div>
                        <h3>{item.role}</h3>
                        <p>{item.org}</p>
                      </div>
                      <span>{item.period}</span>
                    </div>
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>

            <section className='resume-section'>
              <h2>Education</h2>
              <div className='resume-education-list'>
                <div className='resume-education'>
                  <h3>Computer Science</h3>
                  <p>Università di Milano-Bicocca</p>
                  <span>Thesis in progress</span>
                </div>
                <div className='resume-education'>
                  <h3>Technical High School Diploma - Computer Science</h3>
                  <p>ITI P. Hensemberger</p>
                  <span>2019</span>
                </div>
              </div>
            </section>
            <p className='resume-gdpr'>
              I authorize the processing of my personal data contained in this
              CV pursuant to Legislative Decree 196/2003, as amended by
              Legislative Decree 101/2018, and Regulation (EU) 2016/679 (GDPR),
              for personnel research and selection purposes.
            </p>
          </main>

          <aside>
            <section className='resume-panel'>
              <h2>Core Skills</h2>
              <div className='resume-skill-groups'>
                {skills.map((group) => (
                  <div className='resume-skill-group' key={group.label}>
                    <h3>{group.label}</h3>
                    <div className='resume-skills'>
                      {group.items.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className='resume-panel'>
              <h2>Communication</h2>
              <div className='resume-skills'>
                <span>Technical communication</span>
                <span>Cross-functional delivery</span>
                <span>Team collaboration</span>
                <span>Client communication</span>
                <span>Developer mentoring</span>
              </div>
            </section>

            <section className='resume-panel'>
              <h2>Languages</h2>
              <div className='resume-fact'>
                <strong>Italian</strong>
                <span>Native</span>
              </div>
              <div className='resume-fact'>
                <strong>English</strong>
                <span>C1</span>
              </div>
            </section>
          </aside>
        </div>
      </article>
    </main>
  )
}
