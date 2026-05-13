import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jdncst.dev'),
  title: {
    default: 'Jordan Castiglioni | Full Stack Developer and Tech Lead',
    template: '%s | Jordan Castiglioni'
  },
  description:
    'Portfolio of Jordan Castiglioni, full stack developer and tech lead building production web applications, AI-enabled products and cloud delivery systems.',
  applicationName: 'Jordan Castiglioni Portfolio',
  authors: [{ name: 'Jordan Castiglioni', url: 'https://jdncst.dev' }],
  creator: 'Jordan Castiglioni',
  publisher: 'Jordan Castiglioni',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Jordan Castiglioni | Full Stack Developer and Tech Lead',
    description:
      'I build modern web applications, AI-enabled products and delivery systems from idea to production.',
    url: 'https://jdncst.dev',
    siteName: 'Jordan Castiglioni Portfolio',
    images: [
      {
        url: '/brand/thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: 'Jordan Castiglioni portfolio thumbnail'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jordan Castiglioni | Full Stack Developer and Tech Lead',
    description:
      'Portfolio of Jordan Castiglioni, full stack developer and tech lead building production web applications and AI-enabled products.',
    images: ['/brand/thumbnail.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  icons: {
    icon: '/brand/favicon.svg'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      data-scroll-behavior='smooth'
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className='min-h-full flex flex-col'>
        <ThemeProvider attribute='data-theme' defaultTheme='light' enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
