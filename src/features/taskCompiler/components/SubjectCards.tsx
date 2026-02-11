/* eslint-disable no-shadow-restricted-names */
import {
  ChevronRight,
  FlaskConical,
  Infinity,
  Leaf,
  PenLine,
  Sigma,
} from 'lucide-react';

import Badge from '../../../shared/components/ui/Badge';
import type {
  SubjectCard,
  SubjectCardColor,
  SubjectCardIcon,
} from '../data/taskCompiler.mock';
import { taskCompilerCopy } from '../data/taskCompiler.mock';
import type { JSX } from 'react/jsx-runtime';

const iconMap: Record<SubjectCardIcon, JSX.Element> = {
  sigma: <Sigma className="h-5 w-5" />,
  leaf: <Leaf className="h-5 w-5" />,
  flask: <FlaskConical className="h-5 w-5" />,
  infinity: <Infinity className="h-5 w-5" />,
  pen: <PenLine className="h-5 w-5" />,
};

const bgClasses: Record<SubjectCardColor, string> = {
  blue: 'bg-blue-50 border-blue-300',
  green: 'bg-emerald-50 border-emerald-300',
  purple: 'bg-purple-50 border-purple-300',
  orange: 'bg-orange-50 border-orange-300',
  pink: 'bg-pink-50 border-pink-300',
};

const iconBgClasses: Record<SubjectCardColor, string> = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-emerald-100 text-emerald-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
  pink: 'bg-pink-100 text-pink-600',
};

export default function SubjectCards({
  subjects,
  onSelect,
}: {
  subjects: SubjectCard[];
  onSelect: (subject: SubjectCard) => void;
}) {
  return (
    <section className="space-y-2">
      {/* SMALL HEADING */}
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-slate-900">
          {taskCompilerCopy.subjectSelectionTitle}
        </h2>
        <p className="text-sm text-slate-500">
          {taskCompilerCopy.subjectSelectionSubtitle}
        </p>
      </div>

      {/* SUBJECT CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(subject)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(subject);
              }
            }}
            className={`
              ${bgClasses[subject.color]}
              flex items-center justify-between gap-4
              rounded-xl border p-5
              cursor-pointer
              transition hover:shadow-md
            `}
          >
            <div className="flex items-center gap-4">
              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center ${iconBgClasses[subject.color]}`}
              >
                {iconMap[subject.icon]}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {subject.title}
                </p>
                <Badge variant="neutral">
                  {taskCompilerCopy.unitsLabel}: {subject.unitsCompleted} /{" "}
                  {subject.unitsTotal}
                </Badge>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-600" />
          </div>
        ))}
      </div>
    </section>
  );
}
