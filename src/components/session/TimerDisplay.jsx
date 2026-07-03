import { formatTimeRemaining } from '../../utils/formatting';

function TimerDisplay({ minutes, seconds = 0, warning = false, expired = false }) {
  let textColor = 'text-orange-500';
  if (warning && !expired) textColor = 'text-yellow-500';
  if (expired) textColor = 'text-red-500';

  return (
    <div className={`text-center p-8 bg-slate-700 rounded-lg ${warning && !expired ? 'animate-pulse-soft' : ''} ${expired ? 'animate-pulse-aggressive' : ''}`}>
      <div className={`${textColor} text-7xl font-bold font-mono tracking-tight`}>
        {formatTimeRemaining(minutes, seconds)}
      </div>
      {expired && (
        <p className="text-red-500 font-semibold mt-4 text-lg">TIME EXPIRED</p>
      )}
      {warning && !expired && (
        <p className="text-yellow-500 font-semibold mt-4 text-lg">⚠️ Time Running Low</p>
      )}
    </div>
  );
}

export default TimerDisplay;
