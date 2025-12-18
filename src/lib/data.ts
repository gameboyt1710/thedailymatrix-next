// Data fetching functions for The Daily Matrix

export interface CryptoData {
  name: string;
  symbol: string;
  price: number;
  change24h: string;
  change7d: string;
  marketCap: string;
  volume: string;
}

export interface FearGreedData {
  value: number;
  classification: string;
  emoji: string;
}

export interface GlobalMarketData {
  totalMarketCap: string;
  totalVolume: string;
  btcDominance: string;
  ethDominance: string;
}

export interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  condition: string;
  high: number;
  low: number;
  sunrise: string;
  sunset: string;
}

export interface HistoryEvent {
  year: number;
  text: string;
}

export interface Birthday {
  year: number;
  name: string;
}

export interface WordData {
  word: string;
  phonetic?: string;
  partOfSpeech: string;
  definition: string;
  example?: string;
  synonyms: string[];
}

export interface QuoteData {
  quote: string;
  author: string;
}

export interface MoonData {
  phase: string;
  emoji: string;
  illumination: number;
}

export interface NumberFact {
  number: number;
  fact: string;
}

export interface DailyData {
  crypto: CryptoData[];
  fearGreed: FearGreedData;
  globalMarkets: GlobalMarketData | null;
  weather: WeatherData[];
  history: HistoryEvent[];
  birthdays: Birthday[];
  word: WordData;
  quote: QuoteData;
  moon: MoonData;
  numberFact: NumberFact;
  fetchedAt: string;
}

export async function getCrypto(): Promise<CryptoData[]> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=24h,7d',
      { next: { revalidate: 900 } } // 15 min cache
    );
    const data = await res.json();
    return data.map((coin: any) => ({
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h?.toFixed(2) || '0',
      change7d: coin.price_change_percentage_7d_in_currency?.toFixed(2) || '0',
      marketCap: (coin.market_cap / 1e9).toFixed(2),
      volume: (coin.total_volume / 1e9).toFixed(2),
    }));
  } catch (e) {
    console.error('Crypto fetch failed:', e);
    return [];
  }
}

export async function getFearGreedIndex(): Promise<FearGreedData> {
  try {
    const res = await fetch('https://api.alternative.me/fng/?limit=1', {
      next: { revalidate: 900 },
    });
    const data = await res.json();
    const item = data.data[0];
    const value = parseInt(item.value);
    return {
      value,
      classification: item.value_classification,
      emoji: value <= 25 ? '😱' : value <= 45 ? '😰' : value <= 55 ? '😐' : value <= 75 ? '😊' : '🤑',
    };
  } catch (e) {
    return { value: 0, classification: 'Unknown', emoji: '❓' };
  }
}

export async function getGlobalMarkets(): Promise<GlobalMarketData | null> {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/global', {
      next: { revalidate: 900 },
    });
    const data = await res.json();
    return {
      totalMarketCap: (data.data.total_market_cap.usd / 1e12).toFixed(2),
      totalVolume: (data.data.total_volume.usd / 1e9).toFixed(0),
      btcDominance: data.data.market_cap_percentage.btc.toFixed(1),
      ethDominance: data.data.market_cap_percentage.eth.toFixed(1),
    };
  } catch (e) {
    return null;
  }
}

export async function getWeather(): Promise<WeatherData[]> {
  const cities = [
    { name: 'New York', lat: 40.71, lon: -74.01, tz: 'America/New_York' },
    { name: 'London', lat: 51.51, lon: -0.13, tz: 'Europe/London' },
    { name: 'Tokyo', lat: 35.68, lon: 139.69, tz: 'Asia/Tokyo' },
    { name: 'Sydney', lat: -33.87, lon: 151.21, tz: 'Australia/Sydney' },
    { name: 'Dubai', lat: 25.27, lon: 55.3, tz: 'Asia/Dubai' },
    { name: 'Singapore', lat: 1.35, lon: 103.82, tz: 'Asia/Singapore' },
  ];

  const weatherCodes: Record<number, string> = {
    0: '☀️ Clear', 1: '🌤️ Mostly Clear', 2: '⛅ Partly Cloudy', 3: '☁️ Cloudy',
    45: '🌫️ Foggy', 48: '🌫️ Icy Fog', 51: '🌧️ Light Drizzle', 53: '🌧️ Drizzle',
    55: '🌧️ Heavy Drizzle', 61: '🌧️ Light Rain', 63: '🌧️ Rain', 65: '🌧️ Heavy Rain',
    71: '🌨️ Light Snow', 73: '🌨️ Snow', 75: '🌨️ Heavy Snow', 80: '🌦️ Showers',
    95: '⛈️ Thunderstorm', 96: '⛈️ Hail Storm',
  };

  try {
    const results = await Promise.all(
      cities.map(async (city) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=${encodeURIComponent(city.tz)}`;
        const res = await fetch(url, { next: { revalidate: 1800 } }); // 30 min cache
        const data = await res.json();
        return {
          city: city.name,
          temp: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          humidity: data.current.relative_humidity_2m,
          wind: Math.round(data.current.wind_speed_10m),
          condition: weatherCodes[data.current.weather_code] || '🌡️ Unknown',
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
          sunrise: data.daily.sunrise[0].split('T')[1],
          sunset: data.daily.sunset[0].split('T')[1],
        };
      })
    );
    return results;
  } catch (e) {
    console.error('Weather fetch failed:', e);
    return [];
  }
}

export async function getOnThisDay(): Promise<HistoryEvent[]> {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`,
      { next: { revalidate: 3600 } } // 1 hour cache
    );
    const data = await res.json();
    return data.events?.slice(0, 8).map((e: any) => ({ year: e.year, text: e.text })) || [];
  } catch (e) {
    return [];
  }
}

export async function getBirthdays(): Promise<Birthday[]> {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${month}/${day}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return data.births?.slice(0, 6).map((b: any) => ({
      year: b.year,
      name: b.text.split(' was ')[0].split(',')[0],
    })) || [];
  } catch (e) {
    return [];
  }
}

export async function getWordOfTheDay(): Promise<WordData> {
  try {
    const randomRes = await fetch('https://api.datamuse.com/words?sp=?????&max=100', {
      next: { revalidate: 3600 },
    });
    const words = await randomRes.json();
    const word = words[Math.floor(Math.random() * words.length)]?.word || 'serendipity';

    const defRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const defData = await defRes.json();

    if (defData[0]?.meanings?.[0]) {
      const meaning = defData[0].meanings[0];
      return {
        word,
        partOfSpeech: meaning.partOfSpeech,
        definition: meaning.definitions[0]?.definition || 'A wonderful word.',
        example: meaning.definitions[0]?.example || undefined,
        synonyms: meaning.definitions[0]?.synonyms?.slice(0, 3) || [],
      };
    }
    return { word, partOfSpeech: 'noun', definition: 'An interesting word.', synonyms: [] };
  } catch (e) {
    return { word: 'matrix', partOfSpeech: 'noun', definition: 'An environment in which something develops.', synonyms: [] };
  }
}

export async function getQuoteOfTheDay(): Promise<QuoteData> {
  try {
    const res = await fetch('https://zenquotes.io/api/today', {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return {
      quote: data[0]?.q || 'The only way to do great work is to love what you do.',
      author: data[0]?.a || 'Steve Jobs',
    };
  } catch (e) {
    return { quote: 'Data is the new oil.', author: 'Clive Humby' };
  }
}

export function getMoonPhase(): MoonData {
  const today = new Date();
  const lunarCycle = 29.53059;
  const knownNewMoon = new Date('2024-01-11');
  const daysSince = (today.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const phase = (daysSince % lunarCycle) / lunarCycle;

  let phaseName: string, emoji: string;
  if (phase < 0.03 || phase > 0.97) { phaseName = 'New Moon'; emoji = '🌑'; }
  else if (phase < 0.22) { phaseName = 'Waxing Crescent'; emoji = '🌒'; }
  else if (phase < 0.28) { phaseName = 'First Quarter'; emoji = '🌓'; }
  else if (phase < 0.47) { phaseName = 'Waxing Gibbous'; emoji = '🌔'; }
  else if (phase < 0.53) { phaseName = 'Full Moon'; emoji = '🌕'; }
  else if (phase < 0.72) { phaseName = 'Waning Gibbous'; emoji = '🌖'; }
  else if (phase < 0.78) { phaseName = 'Last Quarter'; emoji = '🌗'; }
  else { phaseName = 'Waning Crescent'; emoji = '🌘'; }

  return {
    phase: phaseName,
    emoji,
    illumination: Math.round(Math.abs(Math.cos(phase * 2 * Math.PI)) * 100),
  };
}

export async function getNumberFact(): Promise<NumberFact> {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  try {
    const res = await fetch(`http://numbersapi.com/${dayOfYear}/date?json`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return { number: dayOfYear, fact: data.text };
  } catch (e) {
    return { number: dayOfYear, fact: `Today is day ${dayOfYear} of the year.` };
  }
}

export async function getAllData(): Promise<DailyData> {
  const [crypto, fearGreed, globalMarkets, weather, history, birthdays, word, quote, numberFact] =
    await Promise.all([
      getCrypto(),
      getFearGreedIndex(),
      getGlobalMarkets(),
      getWeather(),
      getOnThisDay(),
      getBirthdays(),
      getWordOfTheDay(),
      getQuoteOfTheDay(),
      getNumberFact(),
    ]);

  const moon = getMoonPhase();

  return {
    crypto,
    fearGreed,
    globalMarkets,
    weather,
    history,
    birthdays,
    word,
    quote,
    moon,
    numberFact,
    fetchedAt: new Date().toISOString(),
  };
}
