export const metadata = {
  title: 'Archive — The Daily Matrix',
  description: 'Browse previous editions of The Daily Matrix',
}

export default function ArchivePage() {
  // For now, show a placeholder. Later we can add real archive data storage
  const recentDays = [];
  const today = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    recentDays.push({
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      isoDate: date.toISOString().split('T')[0]
    });
  }

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
            <a href="/archive" className="nav-link active">Archive</a>
            <a href="/about" className="nav-link">About</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="masthead" style={{ paddingBottom: '32px' }}>
          <h1 className="masthead-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>Archive</h1>
          <p className="masthead-subtitle">
            Browse previous editions of The Daily Matrix
          </p>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Recent Editions</h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gap: '1px', 
            background: 'var(--border)', 
            border: '1px solid var(--border)' 
          }}>
            {recentDays.map((day, index) => (
              <div 
                key={day.isoDate}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 24px',
                  background: 'var(--bg-card)',
                  cursor: index === 0 ? 'pointer' : 'default',
                  opacity: index === 0 ? 1 : 0.5
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem' }}>
                    {day.date}
                  </div>
                  {index === 0 && (
                    <div style={{ 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '11px', 
                      color: 'var(--accent)',
                      marginTop: '4px'
                    }}>
                      Coming soon
                    </div>
                  )}
                </div>
                {index === 0 && (
                  <span style={{ color: 'var(--text-muted)' }}>→</span>
                )}
              </div>
            ))}
          </div>

          <div style={{ 
            marginTop: '48px', 
            padding: '32px', 
            background: 'var(--bg-secondary)',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.25rem',
              marginBottom: '12px'
            }}>
              Archive Coming Soon
            </h3>
            <p style={{ 
              color: 'var(--text-secondary)', 
              maxWidth: '500px', 
              margin: '0 auto',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              We're building a complete archive of previous Daily Matrix editions. 
              Soon you'll be able to browse historical market data, weather, 
              and daily facts from any date.
            </p>
          </div>
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
