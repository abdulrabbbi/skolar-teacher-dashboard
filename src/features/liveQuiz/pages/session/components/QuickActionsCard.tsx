import Card from '../../../../../shared/components/ui/Card';
import Button from '../../../../../shared/components/ui/Button';

export type QuickActionsCardProps = {
  actions: string[];
};

export default function QuickActionsCard({ actions }: QuickActionsCardProps) {
  return (
    <Card className="p-4 space-y-2 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>

      <div className="space-y-2">
        {actions.map((label) => (
          <Button
            key={label}
            variant="outline"
            fullWidth
            className="transition-all duration-200 hover:-translate-y-0.5"
          >
            {label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
