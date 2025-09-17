'use client';

import { useToast } from '@/components/toast-context';

export function Toaster() {
  const { toasts } = useToast();
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(({ id, title, description, variant }) => (
        <div
          key={id}
          className={`
            rounded-lg border p-4 shadow-lg transition-all duration-300
            ${variant === 'destructive' 
              ? 'bg-destructive text-destructive-foreground border-destructive' 
              : 'bg-background border'}
          `}
        >
          <div className="flex items-start">
            <div className="flex-1 space-y-1">
              {title && (
                <h3 className="text-sm font-medium">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm opacity-90">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}