const features = [
  {
    icon: '📊',
    title: 'Live Crypto Prices',
    description: '15+ cryptocurrencies with real-time prices and 24h changes'
  },
  {
    icon: '😱',
    title: 'Fear & Greed Index',
    description: 'Market sentiment indicator to gauge investor emotions'
  },
  {
    icon: '🌍',
    title: 'World Weather',
    description: 'Current conditions for major cities around the globe'
  },
  {
    icon: '📜',
    title: 'On This Day',
    description: 'Historical events and famous birthdays from today\'s date'
  },
  {
    icon: '🌙',
    title: 'Moon Phase',
    description: 'Current lunar phase and illumination percentage'
  },
  {
    icon: '📖',
    title: 'Word of the Day',
    description: 'Expand your vocabulary with a new word daily'
  },
  {
    icon: '🔢',
    title: 'Number Facts',
    description: 'Fascinating trivia about random numbers'
  },
  {
    icon: '💬',
    title: 'Daily Quote',
    description: 'Inspirational quotes to start your day right'
  }
];

export function FeatureGrid() {
  return (
    <div className="feature-grid">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="feature-icon">{feature.icon}</div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-desc">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
