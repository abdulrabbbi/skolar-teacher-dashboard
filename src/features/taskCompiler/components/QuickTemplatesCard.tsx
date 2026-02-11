import { ClipboardList, FileText, Sparkles, Target } from 'lucide-react';

import Card from '../../../shared/components/ui/Card';

export type TemplateItem = {
  id: string;
  title: string;
  marks: string;
  duration: string;
  difficulty: string;
  icon: typeof ClipboardList;
};

const templates: TemplateItem[] = [
  {
    id: 'template-1',
    title: 'SAC Practice Paper',
    marks: '40 marks',
    duration: '60 minutes',
    difficulty: 'Mixed difficulty',
    icon: ClipboardList,
  },
  {
    id: 'template-2',
    title: 'Quick Quiz',
    marks: '40 marks',
    duration: '60 minutes',
    difficulty: 'All Levels',
    icon: Target,
  },
  {
    id: 'template-3',
    title: 'Exam Revision',
    marks: '40 marks',
    duration: '60 minutes',
    difficulty: 'Exam style',
    icon: FileText,
  },
  {
    id: 'template-4',
    title: 'Extension Challenge',
    marks: '40 marks',
    duration: '60 minutes',
    difficulty: 'Hard',
    icon: Sparkles,
  },
];

export default function QuickTemplatesCard() {
  return (
    <Card className="space-y-4 p-5">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-900">
          Quick Templates
        </h3>
      </div>

      <div className="space-y-3">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              type="button"
              className="flex w-full items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900">
                  {template.title}
                </p>
                <p className="text-xs text-slate-500">
                  {template.marks} | {template.duration} |{' '}
                  {template.difficulty}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

