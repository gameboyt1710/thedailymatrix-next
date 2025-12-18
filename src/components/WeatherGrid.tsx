import { WeatherData } from '@/lib/data';

interface WeatherGridProps {
  weather: WeatherData[];
}

export function WeatherGrid({ weather }: WeatherGridProps) {
  return (
    <div className="weather-grid">
      {weather.map((w) => (
        <div key={w.city} className="weather-card">
          <div className="weather-city">{w.city}</div>
          <div className="weather-temp">{w.temp}°C</div>
          <div className="weather-desc">{w.condition}</div>
          <div className="weather-details">
            <span>💨 {w.wind} km/h</span>
            <span>💧 {w.humidity}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
