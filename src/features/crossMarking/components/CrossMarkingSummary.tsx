import Card from '../../../shared/components/ui/Card';

export type CrossMarkingSummaryProps = {
  performance: {
    avgConfidence: number;
    highConfidence: number;
    lowConfidence: number;
  };
  progress: {
    completed: number;
    inProgress: number;
    remaining: number;
    total: number;
  };
  agreement: {
    markerAgreement: number;
    aiHumanAgreement: number;
    disputes: number;
  };
};

export default function CrossMarkingSummary({
  performance,
  progress,
  agreement,
}: CrossMarkingSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* =====================
          SKOLAR PERFORMANCE
      ===================== */}
      <Card className="space-y-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <h3 className="text-sm font-semibold text-slate-900">
          SKOLAR Performance
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Avg Confidence</span>
            <span className="font-semibold text-slate-900">
              {performance.avgConfidence}%
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">High Confidence (&gt;80%)</span>
            <span className="font-semibold text-slate-900">
              {performance.highConfidence}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Low Confidence (&lt;60%)</span>
            <span className="font-semibold text-slate-900">
              {performance.lowConfidence}
            </span>
          </div>
        </div>
      </Card>

      {/* =====================
          MARKING PROGRESS
      ===================== */}
      <Card className="space-y-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <h3 className="text-sm font-semibold text-slate-900">
          Marking Progress
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Completed</span>
            <span className="font-semibold text-slate-900">
              {progress.completed} / {progress.total}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">In Progress</span>
            <span className="font-semibold text-slate-900">
              {progress.inProgress}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Remaining</span>
            <span className="font-semibold text-slate-900">
              {progress.remaining}
            </span>
          </div>
        </div>
      </Card>

      {/* =====================
          AGREEMENT METRICS
      ===================== */}
      <Card className="space-y-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <h3 className="text-sm font-semibold text-slate-900">
          Agreement Metrics
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Marker Agreement</span>
            <span className="font-semibold text-slate-900">
              {agreement.markerAgreement}%
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">AI-Human Agreement</span>
            <span className="font-semibold text-slate-900">
              {agreement.aiHumanAgreement}%
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Disputes</span>
            <span className="font-semibold text-slate-900">
              {agreement.disputes}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

