'use client'

import { Check, Laptop, Menu, Moon, Sun, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { navSections } from '@/content/portfolio-content'

export function Header() {
  return (
    <header className='fixed left-0 top-0 z-50 w-full border-b border-border bg-(--background-elevated)/85 px-4 backdrop-blur-md sm:px-6'>
      <div className='mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center'>
        <a
          className='flex flex-col justify-self-start font-mono uppercase leading-tight text-foreground'
          href='#top'
        >
          <span className='text-xs font-semibold sm:text-sm'>
            Jordan Castiglioni
          </span>
          <span className='text-[10px] font-semibold text-(--text-muted) sm:text-[11px]'>
            Full stack and tech lead
          </span>
        </a>
        <nav className='col-start-2 hidden items-center gap-6 justify-self-center font-mono text-xs uppercase text-(--text-muted) lg:flex'>
          {navSections.map((section) => (
            <a
              className='transition hover:text-accent'
              href={section.href}
              key={section.href}
            >
              {section.label}
            </a>
          ))}
        </nav>
        <div className='col-start-3 flex items-center gap-2 justify-self-end'>
          <ThemeToggle />
          <div className='lg:hidden'>
            <SectionMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

function SectionMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label='Open section navigation'
          className='icon-link'
          size='icon'
          type='button'
          variant='outline'
        >
          <Menu aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='center'
        className='min-w-40 border-border bg-(--surface) text-foreground'
      >
        {navSections.map((section) => (
          <DropdownMenuItem
            asChild
            className='font-mono text-xs uppercase text-(--text-secondary) focus:bg-(--accent-faint) focus:text-accent'
            key={section.href}
          >
            <a href={section.href}>{section.label}</a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const currentTheme = theme ?? 'system'
  const options = [
    { value: 'system', label: 'System', icon: Laptop },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'light', label: 'Light', icon: Sun }
  ] as const

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
        className='min-w-36 border-border bg-(--surface) text-foreground'
      >
        {options.map((option) => {
          const Icon = option.icon
          const active = currentTheme === option.value

          return (
            <DropdownMenuItem
              className='gap-2 font-mono text-xs uppercase text-(--text-secondary) focus:bg-(--accent-faint) focus:text-accent'
              key={option.value}
              onClick={() => setTheme(option.value)}
            >
              <Icon className='h-4 w-4' />
              <span>{option.label}</span>
              {active ? (
                <Check className='ml-auto h-3.5 w-3.5 text-accent' />
              ) : null}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
