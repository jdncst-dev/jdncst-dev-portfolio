'use client'

import { useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const newTabProps = {
  target: '_blank',
  rel: 'noopener noreferrer'
}

export function ContactSection() {
  const contactChannelsRef = useRef<HTMLDivElement>(null)

  const focusContactChannels = () => {
    contactChannelsRef.current?.focus()
  }

  return (
    <section
      className='border-t border-border bg-(--surface-low) px-4 py-20 sm:px-6'
      id='contact'
    >
      <div className='mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]'>
        <div className='rounded-lg border border-border bg-(--surface) p-6 sm:p-8'>
          <span className='micro-label'>004 // Contact</span>
          <h2 className='mt-3 max-w-2xl text-3xl font-semibold tracking-normal text-foreground sm:text-4xl'>
            Let&apos;s talk about the next system to ship.
          </h2>
          <p className='mt-5 max-w-2xl text-base leading-8 text-(--text-secondary)'>
            I&apos;m open to senior full stack and tech lead work across product
            engineering, applied AI and production infrastructure.
          </p>
          <button
            className='mt-8 flex w-full cursor-pointer items-center gap-3 font-mono text-xs uppercase text-(--text-secondary) transition hover:text-accent'
            onClick={focusContactChannels}
            type='button'
          >
            <span className='h-px flex-1 bg-accent' />
            <span className='shrink-0 text-right'>Contact me</span>
            <ArrowDown className='h-4 w-4 shrink-0 text-accent lg:hidden' />
            <ArrowRight className='hidden h-4 w-4 shrink-0 text-accent lg:block' />
          </button>
        </div>
        <Card
          className='h-full gap-0 rounded-lg border-border bg-(--surface) py-0 text-foreground focus:outline-2 focus:outline-offset-4 focus:outline-accent'
          ref={contactChannelsRef}
          tabIndex={-1}
        >
          <CardHeader className='border-b border-border px-5 py-4'>
            <span className='micro-label'>Contact channels</span>
          </CardHeader>
          <CardContent className='grid flex-1 grid-rows-3 gap-0 p-0'>
            <ContactRow
              action='Send an email'
              href='mailto:jordan@jdncst.dev'
              label='Email'
              value='jordan@jdncst.dev'
            />
            <ContactRow
              action='Start a chat / call'
              href='https://wa.me/39379157712'
              label='Phone / WhatsApp'
              value='+39 379 157 7712'
            />
            <ContactRow
              action='Send a message'
              href='https://www.linkedin.com/in/jordan-castiglioni/'
              label='LinkedIn'
              value='jordan-castiglioni'
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
        <span className='min-w-0 truncate text-sm font-medium text-foreground'>
          {value}
        </span>
        {action ? (
          <span className='hidden whitespace-nowrap font-mono text-[10px] font-semibold uppercase text-accent sm:inline-flex sm:items-center sm:gap-2'>
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
        className='grid content-center gap-1 border-b border-border px-5 py-3 transition hover:bg-(--accent-faint) hover:shadow-[inset_3px_0_0_var(--accent)] last:border-b-0'
        href={href}
        {...newTabProps}
      >
        {content}
      </a>
    )
  }

  return (
    <div className='grid content-center gap-1 border-b border-border px-5 py-3 last:border-b-0'>
      {content}
    </div>
  )
}
