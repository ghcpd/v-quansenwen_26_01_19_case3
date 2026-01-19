import { ToastMessage } from '../hooks/useToast';
import styles from './ToastStack.module.css';

const ToastStack = ({ toasts }: { toasts: ToastMessage[] }) => {
  return (
    <div className={styles.stack} aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.kind]}`}>
          {toast.text}
        </div>
      ))}
    </div>
  );
};

export default ToastStack;
