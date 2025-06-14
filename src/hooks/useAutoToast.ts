
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AutoToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export function useAutoToast() {
  const { toast } = useToast();

  const showAutoToast = (options: AutoToastOptions) => {
    const { duration = 3000, ...toastOptions } = options;
    
    const toastInstance = toast(toastOptions);
    
    // Auto dismiss after the specified duration
    setTimeout(() => {
      toastInstance.dismiss();
    }, duration);

    return toastInstance;
  };

  return { showAutoToast };
}
