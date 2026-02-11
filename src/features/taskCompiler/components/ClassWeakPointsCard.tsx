import Card from '../../../shared/components/ui/Card';
import Button from '../../../shared/components/ui/Button';
import Badge from '../../../shared/components/ui/Badge';

export type WeakPointItem = {
  id: string;
  topic: string;
  accuracy: number;
  students: number;
};

const weakPoints: WeakPointItem[] = [
  {
    id: 'wp-1',
    topic: 'Chain Rule Applications',
    accuracy: 58,
    students: 12,
  },
  {
    id: 'wp-2',
    topic: 'Logarithmic Equations',
    accuracy: 64,
    students: 9,
  },
  {
    id: 'wp-3',
    topic: 'Integration by Substitution',
    accuracy: 71,
    students: 7,
  },
];

const accuracyVariant = (accuracy: number) => {
  if (accuracy < 60) return 'danger';
  if (accuracy < 75) return 'warning';
  return 'success';
};

export default function ClassWeakPointsCard() {
  return (
    <Card className="space-y-4 p-5">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-900">
          Class Weak Points
        </h3>
        <p className="text-xs text-slate-500">
          Based on Year 12 Methods analytics
        </p>
      </div>

      <div className="space-y-3">
        {weakPoints.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-slate-200 bg-white p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900">
                {item.topic}
              </p>
              <Badge variant={accuracyVariant(item.accuracy)}>
                {item.accuracy}%
              </Badge>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {item.students} students struggling
            </p>
          </div>
        ))}
      </div>

      <Button variant="success" fullWidth>
        Generate Targeted Practice
      </Button>
    </Card>
  );
}
