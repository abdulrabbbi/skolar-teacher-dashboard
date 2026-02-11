import Card from '../../../shared/components/ui/Card';

type Props = {
  data: {
    skolarPerformance: {
      avgConfidence: number;
      highConfidence: number;
      lowConfidence: number;
    };
    markingProgress: {
      completed: string;
      inProgress: number;
      remaining: number;
    };
    agreementMetrics: {
      markerAgreement: number;
      aiHumanAgreement: number;
      disputes: number;
    };
  };
};

export default function CrossMarkingBottomStats({ data }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      
      {/* SKOLAR PERFORMANCE */}
      <Card className="space-y-3">
        <div className="text-sm font-semibold text-slate-900">
          SKOLAR Performance
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Avg Confidence</span>
          <span className="font-semibold">{data.skolarPerformance.avgConfidence}%</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">High Confidence (&gt;80%)</span>
          <span className="font-semibold">{data.skolarPerformance.highConfidence}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Low Confidence (&lt;60%)</span>
          <span className="font-semibold">{data.skolarPerformance.lowConfidence}</span>
        </div>
      </Card>

      {/* MARKING PROGRESS */}
      <Card className="space-y-3">
        <div className="text-sm font-semibold text-slate-900">
          Marking Progress
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Completed</span>
          <span className="font-semibold">{data.markingProgress.completed}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">In Progress</span>
          <span className="font-semibold">{data.markingProgress.inProgress}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Remaining</span>
          <span className="font-semibold">{data.markingProgress.remaining}</span>
        </div>
      </Card>

      {/* AGREEMENT METRICS */}
      <Card className="space-y-3">
        <div className="text-sm font-semibold text-slate-900">
          Agreement Metrics
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Marker Agreement</span>
          <span className="font-semibold">{data.agreementMetrics.markerAgreement}%</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">AI-Human Agreement</span>
          <span className="font-semibold">{data.agreementMetrics.aiHumanAgreement}%</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Disputes</span>
          <span className="font-semibold">{data.agreementMetrics.disputes}</span>
        </div>
      </Card>
    </div>
  );
}
