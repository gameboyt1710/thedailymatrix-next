import { getAllData } from '@/lib/data';
import { SnapshotCard } from '@/components/SnapshotCard';
import { CryptoTable } from '@/components/CryptoTable';
import { WeatherGrid } from '@/components/WeatherGrid';
import { Timeline } from '@/components/Timeline';
import { WordCard } from '@/components/WordCard';
import { MoonCard } from '@/components/MoonCard';
import { QuoteBanner } from '@/components/QuoteBanner';
import { FeatureGrid } from '@/components/FeatureGrid';

// Revalidate every 15 minutes
export const revalidate = 900;

export default async function Home() {
  const data = await getAllData();
  
  const btcData = data.crypto.find(c => c.symbol === 'BTC');
  const ethData = data.crypto.find(c => c.symbol === 'ETH');
  const gainers = data.crypto.filter(c => parseFloat(c.change24h) > 0).length;
  const losers = data.crypto.length - gainers;

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🔴 Live Data · Updates Every 15 Minutes</div>
          <h1 className="hero-title">
            <span className="hero-icon">◉</span>
            The Daily Matrix
          </h1>
          <p className="hero-tagline">
            Your daily command center for crypto markets, world weather, historical events, and curated data — all in one place.
          </p>
        </div>
        <div className="hero-glow"></div>
      </section>

      {/* Today's Snapshot */}
      <section className="today-snapshot">
        <h2 className="section-title">
          <span className="section-icon">📡</span>
          Live Dashboard
        </h2>

        <div className="snapshot-grid">
          <SnapshotCard
            icon="₿"
            label="Bitcoin"
            value={btcData ? `$${btcData.price.toLocaleString()}` : 'N/A'}
            change={btcData?.change24h}
            className="bitcoin"
          />
          <SnapshotCard
            icon="Ξ"
            label="Ethereum"
            value={ethData ? `$${ethData.price.toLocaleString()}` : 'N/A'}
            change={ethData?.change24h}
            className="ethereum"
          />
          <SnapshotCard
            icon={data.fearGreed.emoji}
            label="Fear & Greed"
            value={data.fearGreed.value.toString()}
            sublabel={data.fearGreed.classification}
            className="fear-greed"
          />
          <SnapshotCard
            icon="📊"
            label="Total Market"
            value={data.globalMarkets ? `$${data.globalMarkets.totalMarketCap}T` : 'N/A'}
            className="market"
          />
          <SnapshotCard
            icon="🌡️"
            label={data.weather[0]?.city || 'Weather'}
            value={data.weather[0] ? `${data.weather[0].temp}°C` : 'N/A'}
            className="weather"
          />
          <SnapshotCard
            icon={data.moon.emoji}
            label="Moon Phase"
            value={data.moon.phase}
            className="moon"
          />
        </div>

        <QuoteBanner quote={data.quote.quote} author={data.quote.author} />
      </section>

      {/* Market Overview */}
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon">📊</span>
          Market Overview
        </h2>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Market Cap</span>
            <span className="stat-value">${data.globalMarkets?.totalMarketCap || 'N/A'}T</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">24h Volume</span>
            <span className="stat-value">${data.globalMarkets?.totalVolume || 'N/A'}B</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">BTC Dominance</span>
            <span className="stat-value">{data.globalMarkets?.btcDominance || 'N/A'}%</span>
          </div>
          <div className={`stat-card feargreed ${data.fearGreed.value <= 25 ? 'extreme-fear' : data.fearGreed.value <= 45 ? 'fear' : data.fearGreed.value <= 55 ? 'neutral' : data.fearGreed.value <= 75 ? 'greed' : 'extreme-greed'}`}>
            <span className="stat-label">Fear & Greed</span>
            <span className="stat-value">{data.fearGreed.emoji} {data.fearGreed.value}</span>
            <span className="stat-sublabel">{data.fearGreed.classification}</span>
          </div>
        </div>

        <h3>Top Cryptocurrencies</h3>
        <CryptoTable crypto={data.crypto.slice(0, 12)} />

        <div className="market-summary">
          <span className="gainers">📈 {gainers} Gainers</span>
          <span className="losers">📉 {losers} Losers</span>
        </div>
      </section>

      {/* Weather */}
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon">🌍</span>
          World Weather
        </h2>
        <WeatherGrid weather={data.weather} />
      </section>

      {/* Celestial */}
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon">🌙</span>
          Celestial
        </h2>
        <MoonCard moon={data.moon} />
      </section>

      {/* History */}
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon">📜</span>
          On This Day in History
        </h2>
        <Timeline events={data.history} />
        
        {data.birthdays.length > 0 && (
          <>
            <h3>🎂 Born on This Day</h3>
            <div className="birthdays">
              {data.birthdays.map((b, i) => (
                <span key={i} className="birthday-item">
                  <strong>{b.year}</strong>: {b.name}
                </span>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Word of the Day */}
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon">📖</span>
          Word of the Day
        </h2>
        <WordCard word={data.word} />
      </section>

      {/* Number of the Day */}
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon">🔢</span>
          Number of the Day
        </h2>
        <div className="number-card">
          <span className="number">{data.numberFact.number}</span>
          <p>{data.numberFact.fact}</p>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon">✨</span>
          What's Inside
        </h2>
        <FeatureGrid />
      </section>

      {/* Footer Note */}
      <section className="section">
        <p className="footer-note">
          Data fetched at {new Date(data.fetchedAt).toLocaleString('en-US', { 
            dateStyle: 'full', 
            timeStyle: 'short',
            timeZone: 'UTC'
          })} UTC · Auto-refreshes every 15 minutes
        </p>
      </section>
    </>
  );
}
