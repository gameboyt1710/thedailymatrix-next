# The Daily Matrix

Your daily command center for crypto markets, world weather, historical events, and curated data — all in one place.

## 🚀 Features

- **📊 Live Crypto Prices** - 15+ cryptocurrencies with real-time prices and 24h changes from CoinGecko
- **😱 Fear & Greed Index** - Market sentiment indicator
- **🌍 World Weather** - Current conditions for major cities around the globe
- **📜 On This Day** - Historical events and famous birthdays
- **🌙 Moon Phase** - Current lunar phase and illumination
- **📖 Word of the Day** - Expand your vocabulary
- **🔢 Number Facts** - Fascinating trivia
- **💬 Daily Quote** - Inspirational quotes

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vercel** - Hosting with ISR (Incremental Static Regeneration)

## ⚡ Auto-Updates

The site automatically revalidates every **15 minutes** using Next.js ISR. No cron jobs needed!

## 🎨 Design

Premium dark theme with:
- Glassmorphism effects
- Gradient accents (cyan/purple/pink)
- Responsive dashboard layout
- Smooth animations

## 📦 APIs Used

- [CoinGecko](https://www.coingecko.com/en/api) - Cryptocurrency data
- [Open-Meteo](https://open-meteo.com/) - Weather data
- [Wikipedia](https://en.wikipedia.org/api/rest_v1/) - On This Day events
- [ZenQuotes](https://zenquotes.io/) - Daily quotes
- [Alternative.me](https://alternative.me/crypto/fear-and-greed-index/) - Fear & Greed Index
- [Free Dictionary API](https://dictionaryapi.dev/) - Word definitions
- [Numbers API](http://numbersapi.com/) - Number facts

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment

This project is designed for Vercel deployment. Simply:

1. Push to GitHub
2. Connect repo to Vercel
3. Deploy!

The ISR revalidation handles keeping data fresh automatically.

## 📝 License

MIT
