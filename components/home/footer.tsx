'use client'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className='border-t border-border bg-background px-4 py-6 sm:px-6'>
      <div className='mx-auto flex max-w-7xl flex-col gap-2 text-center font-mono text-[11px] uppercase text-(--text-muted) sm:flex-row sm:items-center sm:justify-between sm:text-left'>
        <span>© {year} Jordan Castiglioni</span>
        <span>Full Stack Developer and Tech Lead</span>
      </div>
    </footer>
  )
}
