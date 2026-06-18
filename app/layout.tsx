import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { GsapProvider } from '@/components/gsap-provider'
import { PageFold } from '@/components/page-fold'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://varellen.com'),
  title: {
    default: 'Varellen Technologies | Intelligence, Engineered.',
    template: '%s | Varellen Technologies',
  },
  description:
    'Varellen Technologies builds intelligent systems, enterprise software, cloud infrastructure, and cybersecurity solutions for the organizations shaping tomorrow.',
  keywords: [
    'Artificial Intelligence',
    'Software Engineering',
    'Enterprise Cloud',
    'Cybersecurity',
    'Automation',
    'Tech Consulting',
    'Varellen Technologies',
    'Ashok Pasala',
  ],
  authors: [{ name: 'Ashok Pasala' }],
  creator: 'Varellen Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://varellen.com',
    title: 'Varellen Technologies | Intelligence, Engineered.',
    description:
      'Varellen Technologies builds intelligent systems, enterprise software, cloud infrastructure, and cybersecurity solutions for the organizations shaping tomorrow.',
    siteName: 'Varellen Technologies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varellen Technologies | Intelligence, Engineered.',
    description:
      'Varellen Technologies builds intelligent systems, enterprise software, cloud infrastructure, and cybersecurity solutions for the organizations shaping tomorrow.',
    creator: '@varellenhq',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <GsapProvider>
            <PageFold />
            <SiteHeader />
            {children}
            <SiteFooter />
          </GsapProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
