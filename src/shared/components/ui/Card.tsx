

import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export function Card({ className, hover = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white p-4 shadow-sm',
        hover &&
          'transition-all duration-300 ease-out  hover:border-slate-300',
        className,
      )}
      {...props}
    />
  );
}

export default Card;
