import { useCallback, useState } from 'react';

export type ToastKind = 'success' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  text: string;
  kind: ToastKind;
}

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string, kind: ToastKind = 'info') => {
    const id = createId();
    setToasts((prev) => [...prev, { id, text, kind }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2400);
  }, []);

  return { toasts, showToast };
};
