import { AlertCircle } from 'lucide-react';

function Alert({ type = 'info', title, message, onClose }) {
  const typeClasses = {
    info: 'bg-blue-900 border-blue-700 text-blue-100',
    warning: 'bg-yellow-900 border-yellow-700 text-yellow-100',
    error: 'bg-red-900 border-red-700 text-red-100',
    success: 'bg-green-900 border-green-700 text-green-100',
  };

  return (
    <div className={`border rounded-lg p-4 flex items-start gap-3 ${typeClasses[type]}`}>
      <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-lg font-semibold opacity-70 hover:opacity-100"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Alert;
