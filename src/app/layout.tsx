import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Daily Matrix — Your Daily Data Command Center',
  description: 'Your daily command center for crypto markets, world weather, historical events, and curated data.',
  openGraph: {
    title: 'The Daily Matrix',
    description: 'Your daily dose of data, trends, and trivia.',
    url: 'https://thedailymatrix.com',
    siteName: 'The Daily Matrix',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Daily Matrix',
    description: 'Your daily dose of data, trends, and trivia.',
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
        <nav className="nav">
          <div className="nav-inner">
            <a href="/" className="logo">◉ The Daily Matrix</a>
            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/about">About</a>
            </div>
          </div>
        </nav>
        <main className="main">
          {children}
        </main>
        <footer className="footer">
          <p>© {new Date().getFullYear()} The Daily Matrix · Data updated every 15 minutes</p>
        </footer>
      </body>
    </html>
  )
}
