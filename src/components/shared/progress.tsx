import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../../lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-2 w-full overflow-hidden rounded-full bg-gray-900/20', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator className="h-full w-full bg-blue-500" style={{ width: `${value}%` }} />
  </ProgressPrimitive.Root>
));

Progress.displayName = 'Progress';

export default Progress;
