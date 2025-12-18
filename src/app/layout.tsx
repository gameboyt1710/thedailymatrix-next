import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Daily Matrix — Your Daily Data Snapshot',
  description: 'Your daily snapshot of crypto markets, world weather, historical events, and curiosities.',
  openGraph: {
    title: 'The Daily Matrix',
    description: 'Your daily snapshot of markets, weather, history, and curiosities.',
    url: 'https://thedailymatrix.com',
    siteName: 'The Daily Matrix',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Daily Matrix',
    description: 'Your daily snapshot of markets, weather, history, and curiosities.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
