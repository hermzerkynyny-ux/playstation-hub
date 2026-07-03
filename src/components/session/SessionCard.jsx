import Card from '../common/Card';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import { formatTimeRemaining, formatCurrency } from '../../utils/formatting';
import { Pause, Play, Plus, X } from 'lucide-react';

function SessionCard({ session, onPause, onResume, onExtend, onEnd }) {
  const { gameName, playerName, remainingMinutes, totalMinutesPaid, amountPaid, isPaused } = session;

  const progressPercentage = remainingMinutes / totalMinutesPaid;
  const isWarning = remainingMinutes <= 5;
  const isExpired = remainingMinutes <= 0;

  return (
    <Card className={`mb-4 ${isExpired ? 'border-red-500 bg-red-950' : isWarning ? 'border-yellow-500' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-slate-100">{gameName}</h3>
          <p className="text-sm text-slate-400">{playerName}</p>
        </div>
        {isWarning && !isExpired && <span className="text-yellow-500 text-lg">⚠️</span>}
        {isExpired && <span className="text-red-500 text-lg">⏹</span>}
      </div>

      <ProgressBar current={remainingMinutes} total={totalMinutesPaid} className="mb-3" />

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-2xl font-bold text-orange-500">
            {formatTimeRemaining(remainingMinutes)}
          </p>
          <p className="text-xs text-slate-400">{totalMinutesPaid} mins paid</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-slate-100">{formatCurrency(amountPaid)}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {isPaused ? (
          <Button variant="secondary" size="sm" onClick={() => onResume(session.id)} className="flex-1">
            <Play size={16} className="inline mr-1" /> Resume
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={() => onPause(session.id)} className="flex-1">
            <Pause size={16} className="inline mr-1" /> Pause
          </Button>
        )}
        <Button variant="secondary" size="sm" onClick={() => onExtend(session.id)} className="flex-1">
          <Plus size={16} className="inline mr-1" /> Extend
        </Button>
        <Button variant="danger" size="sm" onClick={() => onEnd(session.id)}>
          <X size={16} />
        </Button>
      </div>
    </Card>
  );
}

export default SessionCard;
