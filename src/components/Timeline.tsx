import { HistoryEvent } from '@/lib/data';

interface TimelineProps {
  events: HistoryEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="timeline">
      {events.map((event, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-year">{event.year}</div>
          <div className="timeline-dot"></div>
          <div className="timeline-content">{event.text}</div>
        </div>
      ))}
    </div>
  );
}
