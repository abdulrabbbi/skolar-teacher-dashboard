import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type MathAnswerCardProps = HTMLAttributes<HTMLDivElement> & {
  answer: string;
  working?: string[];
};

export default function MathAnswerCard({
  answer,
  working = [],
  className,
  ...props
}: MathAnswerCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-purple-200 bg-purple-50 p-3 text-sm text-purple-700',
        className,
      )}
      {...props}
    >
      <div className="font-mono whitespace-pre-line">{answer}</div>

      {working.length > 0 ? (
        <div className="mt-3 space-y-1 font-mono text-xs text-purple-700">
          {working.map((step, index) => (
            <div key={`${index}-${step}`} className="whitespace-pre-line">
              {step}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
