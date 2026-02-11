import Badge from '../../../shared/components/ui/Badge';
import Card from '../../../shared/components/ui/Card';

export type ContentSummaryCardProps = {
  outcomesCount: number;
  knowledgeCount: number;
  skillsCount: number;
};

export default function ContentSummaryCard({
  outcomesCount,
  knowledgeCount,
  skillsCount,
}: ContentSummaryCardProps) {
  return (
    <Card className="space-y-2 border-emerald-200 bg-emerald-50 p-4">
      <h3 className="text-sm font-semibold text-slate-900">
        Content Summary
      </h3>

      <div className="space-y-2 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Outcomes selected</span>
          <Badge variant="success">{outcomesCount}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span>Key knowledge selected</span>
          <Badge variant="success">{knowledgeCount}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span>Key skills selected</span>
          <Badge variant="success">{skillsCount}</Badge>
        </div>
      </div>
    </Card>
  );
}
