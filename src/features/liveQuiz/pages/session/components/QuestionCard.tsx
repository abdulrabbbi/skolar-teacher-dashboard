import Card from '../../../../../shared/components/ui/Card';
import type { LiveQuizAnswerOption } from '../../../data/liveQuizSession.mock';

export type QuestionCardProps = {
  title: string;
  topic: string;
  text: string;
  timeLimit: string;
  options: LiveQuizAnswerOption[];
};

export default function QuestionCard({
  title,
  topic,
  text,
  timeLimit,
  options,
}: QuestionCardProps) {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">{topic}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {timeLimit}
        </span>
      </div>

      <p className="text-base font-medium text-slate-900">{text}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <div
            key={option.id}
            className={`rounded-lg border p-3 text-sm ${
              option.isCorrect
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="font-semibold">{option.id}.</span>
              <span className="leading-relaxed">{option.text}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
