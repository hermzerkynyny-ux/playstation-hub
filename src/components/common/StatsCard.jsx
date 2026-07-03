import Card from './Card';
import Button from './Button';

function StatsCard({ title, value, subtitle = '' }) {
  return (
    <Card className="text-center">
      <p className="text-slate-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-orange-500 mb-1">{value}</p>
      {subtitle && <p className="text-slate-400 text-xs">{subtitle}</p>}
    </Card>
  );
}

export default StatsCard;
