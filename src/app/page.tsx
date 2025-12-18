import { getAllData } from '@/lib/data';

// Revalidate every 15 minutes
export const revalidate = 900;

export default async function Home() {
  const data = await getAllData();
  
  const btcData = data.crypto.find(c => c.symbol === 'BTC');
  const ethData = data.crypto.find(c => c.symbol === 'ETH');
  const gainers = data.crypto.filter(c => parseFloat(c.change24h) > 0).length;
  const losers = data.crypto.length - gainers;
  
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

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
            <a href="/" className="nav-link active">Today</a>
            <a href="/archive" className="nav-link">Archive</a>
            <a href="/about" className="nav-link">About</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Masthead */}
        <section className="masthead">
          <div className="masthead-date">{dateStr}</div>
          <h1 className="masthead-title">The Daily Matrix</h1>
          <p className="masthead-subtitle">
            Your daily snapshot of markets, weather, history, and curiosities
          </p>
          <div className="edition-info">
            <div className="edition-badge">
              <span className="live-dot"></span>
              Live Data
            </div>
            <div className="edition-badge">
              Updated every 15 minutes
            </div>
          </div>
        </section>

        {/* Quote of the Day */}
        <section className="quote-banner">
          <div className="quote-inner">
            <p className="quote-text">"{data.quote.quote}"</p>
            <span className="quote-author">— {data.quote.author}</span>
          </div>
        </section>

        {/* Market Snapshot */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Markets</h2>
            <span className="section-number">01</span>
          </div>

          <div className="snapshot-row">
            <div className="snapshot-item">
              <div className="snapshot-label">Bitcoin</div>
              <div className="snapshot-value">
                ${btcData?.price.toLocaleString() || 'N/A'}
              </div>
              {btcData && (
                <div className={`snapshot-change ${parseFloat(btcData.change24h) >= 0 ? 'positive' : 'negative'}`}>
                  {parseFloat(btcData.change24h) >= 0 ? '↑' : '↓'} {btcData.change24h}%
                </div>
              )}
            </div>
            <div className="snapshot-item">
              <div className="snapshot-label">Ethereum</div>
              <div className="snapshot-value">
                ${ethData?.price.toLocaleString() || 'N/A'}
              </div>
              {ethData && (
                <div className={`snapshot-change ${parseFloat(ethData.change24h) >= 0 ? 'positive' : 'negative'}`}>
                  {parseFloat(ethData.change24h) >= 0 ? '↑' : '↓'} {ethData.change24h}%
                </div>
              )}
            </div>
            <div className="snapshot-item">
              <div className="snapshot-label">Fear & Greed</div>
              <div className="snapshot-value">{data.fearGreed.value}</div>
              <div className="snapshot-sub">{data.fearGreed.classification}</div>
            </div>
            <div className="snapshot-item">
              <div className="snapshot-label">Market Cap</div>
              <div className="snapshot-value">${data.globalMarkets?.totalMarketCap}T</div>
            </div>
            <div className="snapshot-item">
              <div className="snapshot-label">BTC Dominance</div>
              <div className="snapshot-value">{data.globalMarkets?.btcDominance}%</div>
            </div>
            <div className="snapshot-item">
              <div className="snapshot-label">24h Volume</div>
              <div className="snapshot-value">${data.globalMarkets?.totalVolume}B</div>
            </div>
          </div>

          <h3 style={{ marginTop: '32px', marginBottom: '16px', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
            Top Cryptocurrencies
          </h3>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>24h</th>
                  <th>7d</th>
                  <th>Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {data.crypto.slice(0, 10).map((coin, index) => {
                  const change24h = parseFloat(coin.change24h);
                  const change7d = parseFloat(coin.change7d);
                  return (
                    <tr key={coin.symbol}>
                      <td>
                        <span className="coin-rank">{index + 1}</span>
                      </td>
                      <td>
                        <div className="coin-info">
                          <span className="coin-symbol">{coin.symbol}</span>
                          <span className="coin-name">{coin.name}</span>
                        </div>
                      </td>
                      <td className="price-cell">${coin.price.toLocaleString()}</td>
                      <td className={`change-cell ${change24h >= 0 ? 'positive' : 'negative'}`}>
                        {change24h >= 0 ? '+' : ''}{coin.change24h}%
                      </td>
                      <td className={`change-cell ${change7d >= 0 ? 'positive' : 'negative'}`}>
                        {change7d >= 0 ? '+' : ''}{coin.change7d}%
                      </td>
                      <td>${coin.marketCap}B</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="market-summary">
            <span className="summary-up">↑ {gainers} gaining</span>
            <span className="summary-down">↓ {losers} declining</span>
          </div>
        </section>

        {/* Weather */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">World Weather</h2>
            <span className="section-number">02</span>
          </div>

          <div className="weather-grid">
            {data.weather.map((w) => (
              <div key={w.city} className="weather-item">
                <div className="weather-city">{w.city}</div>
                <div className="weather-temp">
                  {w.temp}<span className="weather-unit">°C</span>
                </div>
                <div className="weather-condition">{w.condition}</div>
                <div className="weather-details">
                  <span>💨 {w.wind}km/h</span>
                  <span>💧 {w.humidity}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Celestial */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Moon Phase</h2>
            <span className="section-number">03</span>
          </div>

          <div className="moon-display">
            <div className="moon-visual">{data.moon.emoji}</div>
            <div className="moon-info">
              <div className="moon-phase-name">{data.moon.phase}</div>
              <div className="moon-illumination">{data.moon.illumination}% illuminated</div>
            </div>
          </div>
        </section>

        {/* On This Day */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">On This Day</h2>
            <span className="section-number">04</span>
          </div>

          <div className="timeline">
            {data.history.map((event, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{event.year}</div>
                <div className="timeline-text">{event.text}</div>
              </div>
            ))}
          </div>

          {data.birthdays.length > 0 && (
            <>
              <h3 style={{ margin: '32px 0 16px', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
                Born Today
              </h3>
              <div className="birthdays-grid">
                {data.birthdays.map((b, i) => (
                  <span key={i} className="birthday-tag">
                    <span className="birthday-year">{b.year}</span>
                    <span>{b.name}</span>
                  </span>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Word of the Day */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Word of the Day</h2>
            <span className="section-number">05</span>
          </div>

          <div className="word-display">
            <div className="word-left">
              <div className="word-text">{data.word.word}</div>
              {data.word.phonetic && (
                <div className="word-phonetic">{data.word.phonetic}</div>
              )}
            </div>
            <div className="word-right">
              <div className="word-pos">{data.word.partOfSpeech}</div>
              <div className="word-definition">{data.word.definition}</div>
              {data.word.example && (
                <div className="word-example">"{data.word.example}"</div>
              )}
            </div>
          </div>
        </section>

        {/* Number of the Day */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Number of the Day</h2>
            <span className="section-number">06</span>
          </div>

          <div className="number-display">
            <div className="number-big">{data.numberFact.number}</div>
            <div className="number-fact-text">{data.numberFact.fact}</div>
          </div>
        </section>

        {/* Archive Link */}
        <a href="/archive" className="archive-banner">
          <div>
            <div className="archive-label">Browse Previous Days</div>
            <div className="archive-title">View the Archive →</div>
          </div>
          <div className="archive-arrow">→</div>
        </a>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-timestamp">
          Data fetched at {new Date(data.fetchedAt).toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
          })} UTC · Auto-refreshes every 15 minutes
        </div>
      </footer>
    </>
  );
}
