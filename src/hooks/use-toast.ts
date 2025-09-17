import { useState } from 'react';

type ToastVariant = 'default' | 'destructive';

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const toast = (props: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, ...props };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto dismiss after duration
    if (props.duration !== Infinity) {
      const duration = props.duration || 5000;
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }
    
    return {
      dismiss: () => dismiss(id)
    };
  };
  
  const dismiss = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return { toasts, toast, dismiss };
}