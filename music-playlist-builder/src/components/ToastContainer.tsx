import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[280px] max-w-md
                      animate-in slide-in-from-right duration-300
                      ${toast.type === 'success' ? 'bg-green-900/90 border border-green-700' : ''}
                      ${toast.type === 'error' ? 'bg-red-900/90 border border-red-700' : ''}
                      ${toast.type === 'info' ? 'bg-surface-800/90 border border-surface-600' : ''}`}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-primary-400 flex-shrink-0" />}
          
          <span className="text-sm text-white flex-1">{toast.message}</span>
          
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-surface-400 hover:text-white transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
