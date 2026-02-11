import Card from '../../../../../shared/components/ui/Card';
import Badge from '../../../../../shared/components/ui/Badge';
import ProgressBar from '../../../../../shared/components/ui/ProgressBar';
import type { LiveQuizAnswerDistribution } from '../../../data/liveQuizSession.mock';

export type AnswerDistributionCardProps = {
  items: LiveQuizAnswerDistribution[];
};

export default function AnswerDistributionCard({
  items,
}: AnswerDistributionCardProps) {
  return (
    <Card className="p-4 space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-sm font-semibold text-slate-900">
        Answer Distribution
      </h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">
                  {item.id}
                </span>
                {item.isCorrect ? (
                  <Badge variant="success">Correct</Badge>
                ) : null}
              </div>
              <span>
                {item.students} students · {item.percent}%
              </span>
            </div>
            <ProgressBar
              value={item.percent}
              variant={item.isCorrect ? 'green' : 'orange'}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
