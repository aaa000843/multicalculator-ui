'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorColor?: string;
  value?: number | null;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, indicatorColor, ...props }, ref) => {
  // Ensure value is a valid number between 0 and 100
  const validatedValue = React.useMemo(() => {
    if (typeof value !== 'number') return 0;
    return Math.min(Math.max(value, 0), 100);
  }, [value]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        className
      )}
      value={validatedValue}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full w-full flex-1 transition-all',
          indicatorColor || 'bg-primary'
        )}
        style={{ transform: `translateX(-${100 - validatedValue}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
