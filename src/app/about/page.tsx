export const metadata = {
  title: 'About — The Daily Matrix',
  description: 'About The Daily Matrix - your daily data snapshot',
}

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="site-logo">
            <span className="logo-dot"></span>
            The Daily Matrix
          </a>
          <nav className="site-nav">
            <a href="/" className="nav-link">Today</a>
            <a href="/archive" className="nav-link">Archive</a>
            <a href="/about" className="nav-link active">About</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="masthead" style={{ paddingBottom: '32px' }}>
          <h1 className="masthead-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>About</h1>
          <p className="masthead-subtitle">
            Your daily snapshot of the world
          </p>
        </section>

        <section className="section">
          <article style={{ maxWidth: '650px' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.75rem',
              marginBottom: '24px'
            }}>
              What is The Daily Matrix?
            </h2>
            
            <p style={{ 
              fontSize: '1.0625rem', 
              lineHeight: '1.8', 
              marginBottom: '24px',
              color: 'var(--text-secondary)'
            }}>
              The Daily Matrix is a daily snapshot of the world's data. Every 15 minutes, 
              we pull together cryptocurrency prices, global weather, historical events, 
              and curated trivia into a single, clean page.
            </p>

            <p style={{ 
              fontSize: '1.0625rem', 
              lineHeight: '1.8', 
              marginBottom: '24px',
              color: 'var(--text-secondary)'
            }}>
              Think of it as your morning newspaper for the digital age — no algorithms, 
              no infinite scroll, just the facts.
            </p>

            <h3 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.25rem',
              marginTop: '40px',
              marginBottom: '16px'
            }}>
              Data Sources
            </h3>

            <ul style={{ 
              listStyle: 'none',
              padding: 0,
              display: 'grid',
              gap: '12px'
            }}>
              {[
                { name: 'CoinGecko', desc: 'Cryptocurrency prices and market data' },
                { name: 'Open-Meteo', desc: 'Global weather conditions' },
                { name: 'Wikipedia', desc: 'On This Day historical events' },
                { name: 'ZenQuotes', desc: 'Daily inspirational quotes' },
                { name: 'Numbers API', desc: 'Interesting number facts' },
                { name: 'Free Dictionary', desc: 'Word of the day definitions' },
              ].map((source) => (
                <li key={source.name} style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px',
                  background: 'var(--bg-secondary)'
                }}>
                  <span style={{ 
                    fontWeight: '600',
                    minWidth: '120px'
                  }}>
                    {source.name}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {source.desc}
                  </span>
                </li>
              ))}
            </ul>

            <h3 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.25rem',
              marginTop: '40px',
              marginBottom: '16px'
            }}>
              How It Works
            </h3>

            <p style={{ 
              fontSize: '1.0625rem', 
              lineHeight: '1.8', 
              marginBottom: '24px',
              color: 'var(--text-secondary)'
            }}>
              The site automatically updates every 15 minutes using Next.js Incremental 
              Static Regeneration. No cron jobs, no manual updates — just always-fresh data.
            </p>
          </article>
        </section>

        <a href="/" className="archive-banner" style={{ marginTop: '48px' }}>
          <div>
            <div className="archive-label">Return to Today</div>
            <div className="archive-title">View Today's Matrix →</div>
          </div>
          <div className="archive-arrow">→</div>
        </a>
      </main>

      <footer className="site-footer">
        <div className="footer-timestamp">
          The Daily Matrix · Updated every 15 minutes
        </div>
      </footer>
    </>
  );
}
