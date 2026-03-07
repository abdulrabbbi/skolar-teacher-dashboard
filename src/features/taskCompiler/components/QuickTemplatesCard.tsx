import {
  ClipboardList,
  FileText,
  Sparkles,
  Target,
  Clock,
  FileText as DocIcon,
} from "lucide-react";

import Card from "../../../shared/components/ui/Card";

type DifficultyLevel = "Easy" | "Medium" | "Hard" | "Mixed";

export type QuickTemplatePreset = {
  id: string;
  title: string;
  studyDesignCode: string;
  targetClass: string;
  duration: string;
  difficulty: DifficultyLevel;
  includeMarkingGuide: boolean;
  generateDifferentiated: boolean;
  targetWeakPoints: boolean;
};

export type TemplateItem = {
  id: string;
  title: string;
  marks: string;
  durationLabel: string;
  difficultyLabel: string;
  icon: typeof ClipboardList;
  preset: QuickTemplatePreset;
};

const templates: TemplateItem[] = [
  {
    id: "template-1",
    title: "SAC Practice Paper",
    marks: "40 marks",
    durationLabel: "60 minutes",
    difficultyLabel: "Mixed difficulty",
    icon: ClipboardList,
    preset: {
      id: "template-1",
      title: "SAC Practice Paper",
      studyDesignCode: "vce-methods-2025",
      targetClass: "Year 12 Methods",
      duration: "60 minutes",
      difficulty: "Mixed",
      includeMarkingGuide: true,
      generateDifferentiated: false,
      targetWeakPoints: true,
    },
  },
  {
    id: "template-2",
    title: "Quick Quiz",
    marks: "40 marks",
    durationLabel: "30 minutes",
    difficultyLabel: "All Levels",
    icon: Target,
    preset: {
      id: "template-2",
      title: "Quick Quiz",
      studyDesignCode: "vce-methods-2025",
      targetClass: "Year 12 Methods",
      duration: "30 minutes",
      difficulty: "Mixed",
      includeMarkingGuide: false,
      generateDifferentiated: false,
      targetWeakPoints: true,
    },
  },
  {
    id: "template-3",
    title: "Exam Revision",
    marks: "40 marks",
    durationLabel: "60 minutes",
    difficultyLabel: "Exam style",
    icon: FileText,
    preset: {
      id: "template-3",
      title: "Exam Revision",
      studyDesignCode: "vce-methods-2024",
      targetClass: "Year 12 Methods",
      duration: "60 minutes",
      difficulty: "Hard",
      includeMarkingGuide: true,
      generateDifferentiated: true,
      targetWeakPoints: false,
    },
  },
  {
    id: "template-4",
    title: "Extension Challenge",
    marks: "40 marks",
    durationLabel: "45 minutes",
    difficultyLabel: "Hard",
    icon: Sparkles,
    preset: {
      id: "template-4",
      title: "Extension Challenge",
      studyDesignCode: "vce-methods-2025",
      targetClass: "Year 12 Methods",
      duration: "45 minutes",
      difficulty: "Hard",
      includeMarkingGuide: true,
      generateDifferentiated: true,
      targetWeakPoints: false,
    },
  },
];

export type QuickTemplatesCardProps = {
  selectedTemplateId?: string | null;
  onSelectTemplate?: (preset: QuickTemplatePreset) => void;
};

export default function QuickTemplatesCard({
  selectedTemplateId,
  onSelectTemplate,
}: QuickTemplatesCardProps) {
  return (
    <Card className="space-y-4 p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-900">Quick Templates</h3>
      </div>

      <div className="space-y-3">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplateId === template.id;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelectTemplate?.(template.preset)}
              aria-pressed={isSelected}
              className={`group flex w-full items-start gap-3 rounded-lg border bg-white p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                isSelected
                  ? "border-[#00B96B] bg-[#00B96B14]"
                  : "border-slate-200 hover:border-[#00B96B] hover:bg-[#00B96B14]"
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00B96B1A] text-[#00B96B] transition-transform duration-200 group-hover:scale-110">
                <Icon className="h-4 w-4" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900">
                  {template.title}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <DocIcon className="h-4 w-4 text-slate-400" />
                    {template.marks}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    {template.durationLabel}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Target className="h-4 w-4 text-slate-400" />
                    {template.difficultyLabel}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
