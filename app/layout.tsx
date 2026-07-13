import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { EB_Garamond, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  weight: ['400', '500', '600'],
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Budarina — Roofs of the World',
  description:
    'An interactive travel journal. Stories hang beneath ancient roofs like curtains of text — brush through them.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#e3d7ba',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${ebGaramond.variable} ${plexMono.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
