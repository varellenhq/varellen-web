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

import { getBaseUrl } from '@/lib/utils'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'Varellen Technologies | Intelligence, Engineered.',
    template: '%s | Varellen Technologies',
  },
  description:
    'Founded by Ashok Raj Pasala, Varellen Technologies builds intelligent systems, enterprise software, cloud infrastructure, and cybersecurity solutions for the organizations shaping tomorrow.',
  keywords: [
    'Ashok Raj Pasala',
    'Ashok Pasala',
    'Varellen Technologies',
    'Varellen',
    'Artificial Intelligence',
    'Software Engineering',
    'Enterprise Cloud',
    'Cybersecurity',
  ],
  authors: [{ name: 'Ashok Raj Pasala' }],
  creator: 'Ashok Raj Pasala | Varellen Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: getBaseUrl(),
    title: 'Varellen Technologies | Founded by Ashok Raj Pasala',
    description:
      'Founded by Ashok Raj Pasala, Varellen Technologies builds intelligent systems, enterprise software, cloud infrastructure, and cybersecurity solutions for the organizations shaping tomorrow.',
    siteName: 'Varellen Technologies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varellen Technologies | Founded by Ashok Raj Pasala',
    description:
      'Founded by Ashok Raj Pasala, Varellen Technologies builds intelligent systems, enterprise software, cloud infrastructure, and cybersecurity solutions.',
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
  // JSON-LD Structured Data to strictly bind Ashok Raj Pasala to Varellen Technologies for Google's Knowledge Graph
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Varellen Technologies',
    alternateName: 'Varellen',
    url: getBaseUrl(),
    logo: `${getBaseUrl()}/logo.png`,
    sameAs: [
      'https://github.com/varellenhq',
      'https://linkedin.com/in/varellen-technologies-8ab599417/',
      'https://x.com/varellenhq'
    ],
    founder: {
      '@type': 'Person',
      name: 'Ashok Raj Pasala',
      alternateName: 'Ashok Pasala',
      jobTitle: 'Founder & CEO',
      worksFor: {
        '@type': 'Organization',
        name: 'Varellen Technologies'
      }
    }
  }

  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased theme-transition">
        {/* Inject JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
