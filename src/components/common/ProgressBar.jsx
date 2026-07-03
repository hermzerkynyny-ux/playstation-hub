function ProgressBar({ current, total, className = '' }) {
  const percentage = (current / total) * 100;

  return (
    <div className={`w-full bg-slate-700 rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className="bg-orange-500 h-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default ProgressBar;
