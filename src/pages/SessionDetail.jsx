import { useParams, useNavigate } from 'react-router-dom';
import useSessionStore from '../store/sessionStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import TimerDisplay from '../components/session/TimerDisplay';
import { formatCurrency, formatDateTime } from '../utils/formatting';
import { ArrowLeft } from 'lucide-react';

function SessionDetail() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const activeSessions = useSessionStore((state) => state.activeSessions);
  const session = activeSessions.find((s) => s.id === sessionId);

  if (!session) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Session not found</p>
        <Button
          variant="secondary"
          onClick={() => navigate('/')}
          className="mt-4"
        >
          <ArrowLeft size={16} className="inline mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const isExpired = session.remainingMinutes <= 0;
  const isWarning = session.remainingMinutes <= 5 && session.remainingMinutes > 0;

  return (
    <div className="pb-4">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Back
      </Button>

      {/* Game Info */}
      <Card className="mb-6">
        <h2 className="text-2xl font-bold text-orange-500 mb-2">
          {session.gameName}
        </h2>
        <p className="text-lg text-slate-100 mb-4">Player: {session.playerName}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400">Total Paid</p>
            <p className="text-xl font-bold text-orange-500">
              {formatCurrency(session.amountPaid)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Duration</p>
            <p className="text-xl font-bold text-slate-100">
              {session.totalMinutesPaid} minutes
            </p>
          </div>
        </div>
      </Card>

      {/* Timer Display */}
      <TimerDisplay
        minutes={session.remainingMinutes}
        warning={isWarning}
        expired={isExpired}
      />

      {/* Session Status */}
      <Card className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400">Status</p>
            <p className="text-lg font-semibold text-slate-100">
              {session.isPaused ? '⏸ Paused' : '▶️ Active'}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Started</p>
            <p className="text-sm text-slate-100">{formatDateTime(session.startTime)}</p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <Button variant="secondary" onClick={() => navigate('/')}>
          Edit Session
        </Button>
        <Button variant="danger" onClick={() => navigate('/')}
        >
          End Session
        </Button>
      </div>
    </div>
  );
}

export default SessionDetail;
