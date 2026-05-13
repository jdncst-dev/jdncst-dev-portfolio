import type { Metadata } from 'next'
import ResumeClientPage from './resume-client'

export const metadata: Metadata = {
  title: 'Resume',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true
    }
  }
}

export default function ResumePage() {
  return <ResumeClientPage />
}
