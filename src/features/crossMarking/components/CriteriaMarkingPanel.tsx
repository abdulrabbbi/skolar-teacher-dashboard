
import Card from '../../../shared/components/ui/Card';
import Button from '../../../shared/components/ui/Button';
import type { CriteriaMarkItem } from '../data/crossMarking.mock';

export type CriteriaMarkingPanelProps = {
  criteria: CriteriaMarkItem[];
  totalScore: number;
  totalMax: number;
  confidence: number;
};

export default function CriteriaMarkingPanel({
  criteria,
  totalScore,
  totalMax,
  confidence,
}: CriteriaMarkingPanelProps) {
  return (
    <section className="space-y-4">
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Mark by Criterion
        </h2>
        <p className="text-sm text-slate-500">
          Adjust Skolar suggestions or confirm marks
        </p>
      </div>

      {/* CRITERIA LIST */}
      <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        {criteria.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 p-4 space-y-3"
          >
            {/* TITLE */}
            <div>
              <p className="font-semibold text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-500">
                SKOLAR Score: {item.score} / {item.maxScore}
              </p>
            </div>

            {/* INPUT + ACTIONS */}
            <div className="flex flex-wrap items-center gap-3">
              {/* SCORE INPUT */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.score}
                  className="
                    w-16 rounded-lg border border-slate-200
                    px-2 py-1 text-sm text-slate-900
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                  "
                  readOnly
                />
                <span className="text-sm text-slate-500">
                  / {item.maxScore}
                </span>
              </div>

              {/* LINKS & BUTTONS */}
              <div className="flex flex-wrap items-center gap-2 ml-auto">
                <button className="text-xs font-medium text-purple-600 transition-all duration-200 hover:-translate-y-0.5 hover:underline">
                  Skolar justification
                </button>

                <Button
                  size="sm"
                  variant="outline"
                  className="transition-all duration-200 hover:-translate-y-0.5"
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  className="bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* TOTAL MARK */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-900">
                Total Mark
              </p>
              <p className="text-xs text-emerald-700">
                Confidence: {confidence}%
              </p>
            </div>

            <p className="text-lg font-semibold text-emerald-900">
              {totalScore} / {totalMax}
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
