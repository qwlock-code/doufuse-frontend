import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Do-U-Fuse - Free Online Fuse Bead Pattern Designer',
  description: 'Create amazing fuse bead designs with our free 29x29 grid editor. Choose from 48 colors, multiple templates, and export as PNG.',
  keywords: 'fuse beads, perler beads, hama beads, bead patterns, pixel art, craft, DIY, iron beads',
  authors: [{ name: 'Do-U-Fuse Team' }],
  openGraph: {
    title: 'Do-U-Fuse - Free Online Fuse Bead Pattern Designer',
    description: 'Create amazing fuse bead designs with our free 29x29 grid editor.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Do-U-Fuse - Free Online Fuse Bead Pattern Designer',
    description: 'Create amazing fuse bead designs with our free 29x29 grid editor.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
