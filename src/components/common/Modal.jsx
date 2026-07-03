import { X } from 'lucide-react';

function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-xs',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
      <div className={`${sizeClasses[size]} w-full bg-slate-800 rounded-t-xl p-6 shadow-2xl`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-96">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
