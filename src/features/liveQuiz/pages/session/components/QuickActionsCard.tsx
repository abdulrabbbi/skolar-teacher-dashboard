import Card from '../../../../../shared/components/ui/Card';
import Button from '../../../../../shared/components/ui/Button';

export type QuickActionsCardProps = {
  actions: string[];
};

export default function QuickActionsCard({ actions }: QuickActionsCardProps) {
  return (
    <Card className="p-4 space-y-2">
      <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>

      <div className="space-y-2">
        {actions.map((label) => (
          <Button key={label} variant="outline" fullWidth>
            {label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
