import { Target, Brain, Zap, ChevronRight, Clock, HelpCircle } from "lucide-react";
import Card from "../../../shared/components/ui/Card";
import type { QuickLaunchTemplate } from "../data/liveQuiz.mock";

export type QuickLaunchTemplatesProps = {
  templates: QuickLaunchTemplate[];
  onLaunchTemplate?: (template: QuickLaunchTemplate) => void;
};

const ICONS = {
  differentiation: {
    icon: <Target className="h-5 w-5 text-white" />,
    tile: "bg-blue-600",
  },
  integration: {
    icon: <Brain className="h-5 w-5 text-white" />,
    tile: "bg-purple-600",
  },
  probability: {
    icon: <Zap className="h-5 w-5 text-white" />,
    tile: "bg-[#00B96B]",
  },
} as const;

export default function QuickLaunchTemplates({
  templates,
  onLaunchTemplate,
}: QuickLaunchTemplatesProps) {
  return (
    <section className="w-full h-full">
      {/* h-full + flex so it stretches same height as left */}
      <Card className="h-full p-4 sm:p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900">
          Quick Launch Templates
        </h3>

        {/* flex-1 + overflow for small screens */}
        <div className="mt-4 space-y-4 flex-1 min-h-0 overflow-auto pr-1">
          {templates.map((template) => {
            const config = ICONS[template.type];

            return (
              <button
                key={template.id}
                type="button"
                onClick={() => onLaunchTemplate?.(template)}
                className="
                  group w-full
                  rounded-2xl border border-slate-200 bg-white
                  px-4 py-4 sm:px-5
                  text-left
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:shadow-md
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className={[
                        "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
                        config.tile,
                        "shadow-sm",
                      ].join(" ")}
                    >
                      {config.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-slate-900">
                        {template.title}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-slate-400" />
                          {template.questions} questions
                        </span>

                        <span className="inline-flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          {template.minutes} minutes
                        </span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </section>
  );
}
