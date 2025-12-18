interface SnapshotCardProps {
  icon: string;
  label: string;
  value: string;
  change?: string;
  sublabel?: string;
  className?: string;
}

export function SnapshotCard({ icon, label, value, change, sublabel, className }: SnapshotCardProps) {
  const changeNum = change ? parseFloat(change) : null;
  const isPositive = changeNum !== null && changeNum > 0;
  const isNegative = changeNum !== null && changeNum < 0;

  return (
    <div className={`snapshot-card ${className || ''}`}>
      <div className="snapshot-icon">{icon}</div>
      <div className="snapshot-content">
        <span className="snapshot-label">{label}</span>
        <span className="snapshot-value">{value}</span>
        {change && (
          <span className={`snapshot-change ${isPositive ? 'positive' : isNegative ? 'negative' : ''}`}>
            {isPositive ? '▲' : isNegative ? '▼' : ''} {change}%
          </span>
        )}
        {sublabel && <span className="snapshot-sublabel">{sublabel}</span>}
      </div>
    </div>
  );
}
