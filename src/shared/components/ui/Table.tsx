// src/shared/components/ui/Table.tsx
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type TableProps = {
  headers: ReactNode[];
  children: ReactNode;
  className?: string;
};

export function Table({ headers, children, className }: TableProps) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-lg border border-slate-200', className)}>
      <table className="w-full min-w-[640px] border-collapse bg-white text-left text-sm">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
