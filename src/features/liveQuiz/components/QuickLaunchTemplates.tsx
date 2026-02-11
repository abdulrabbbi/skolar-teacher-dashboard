import {
  Target,
  Brain,
  Zap,
  ChevronRight,
  Clock,
  HelpCircle,
} from 'lucide-react';
import Card from '../../../shared/components/ui/Card';
import type { QuickLaunchTemplate } from '../data/liveQuiz.mock';

export type QuickLaunchTemplatesProps = {
  templates: QuickLaunchTemplate[];
};

const ICONS = {
  differentiation: {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    bg: 'bg-blue-100',
  },
  integration: {
    icon: <Brain className="h-5 w-5 text-purple-600" />,
    bg: 'bg-purple-100',
  },
  probability: {
    icon: <Zap className="h-5 w-5 text-emerald-600" />,
    bg: 'bg-emerald-100',
  },
} as const;

export default function QuickLaunchTemplates({
  templates,
}: QuickLaunchTemplatesProps) {
  return (
    <section>
      {/* ONE MAIN CARD */}
      <Card className="p-4 h-full flex flex-col">
        {/* SMALL HEADING */}
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Quick Launch Templates
        </h3>

        {/* INNER ITEMS */}
        <div className="space-y-2 flex-1">
          {templates.map((template) => {
            const config = ICONS[template.type];

            return (
              <button
                key={template.id}
                className="w-full flex items-center justify-between gap-4 rounded-lg p-3 text-left transition hover:bg-slate-50"
              >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${config.bg}`}
                  >
                    {config.icon}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {template.title}
                    </p>

                    <div className="mt-1 flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <HelpCircle className="h-3.5 w-3.5" />
                        {template.questions} questions
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {template.minutes} minutes
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
              </button>
            );
          })}
        </div>
      </Card>
    </section>
  );
}
