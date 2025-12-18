import { MoonData } from '@/lib/data';

interface MoonCardProps {
  moon: MoonData;
}

export function MoonCard({ moon }: MoonCardProps) {
  return (
    <div className="moon-card">
      <div className="moon-emoji">{moon.emoji}</div>
      <div className="moon-info">
        <div className="moon-phase">{moon.phase}</div>
        <div className="moon-illumination">{moon.illumination}% illuminated</div>
      </div>
    </div>
  );
}
