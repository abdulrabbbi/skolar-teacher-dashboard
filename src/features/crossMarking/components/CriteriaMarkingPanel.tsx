
import { useState } from 'react';
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
  const [confirmedByCriterionId, setConfirmedByCriterionId] = useState<
    Record<string, boolean>
  >({});

  const handleConfirm = (criterionId: string) => {
    setConfirmedByCriterionId((previous) => ({
      ...previous,
      [criterionId]: true,
    }));
  };

  const handleEdit = (criterionId: string) => {
    setConfirmedByCriterionId((previous) => ({
      ...previous,
      [criterionId]: false,
    }));
  };

  return (
    <section className="space-y-4">
      {/* MAIN */}
      <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
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
        {criteria.map((item) => {
          const isConfirmed = Boolean(confirmedByCriterionId[item.id]);

          return (
            <div
              key={item.id}
              className={`rounded-xl border p-4 space-y-3 transition-colors ${
                isConfirmed
                  ? 'border-slate-300 bg-slate-100'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {/* TITLE */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-semibold text-slate-900">{item.label}</p>
                {isConfirmed ? (
                  <span className="rounded-full border border-slate-300 bg-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-700">
                    Confirmed
                  </span>
                ) : null}
              </div>
              <div>
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
                    disabled={isConfirmed}
                    className="
                    w-16 rounded-lg border border-slate-200
                    px-2 py-1 text-sm text-slate-900
                    focus:outline-none focus:ring-2 focus:ring-[#00B96B]
                  "
                    readOnly
                  />
                  <span className="text-sm text-slate-500">
                    / {item.maxScore}
                  </span>
                </div>

                {/* LINKS & BUTTONS */}
                <div className="ml-auto flex flex-wrap items-center gap-2">
                  <button className="text-xs font-medium border border-gray-200 px-2 h-8 rounded-lg -gray-400 text-purple-600 transition-all duration-200 hover:-translate-y-0.5 hover:underline">
                    Skolar justification
                  </button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(item.id)}
                    className="h-8 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => handleConfirm(item.id)}
                    disabled={isConfirmed}
                    className="bg-[#00B96B] text-white hover:bg-[#009f5c] transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {isConfirmed ? 'Confirmed' : 'Confirm'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

      </Card>

      {/* TOTAL MARK */}
      <div className="rounded-xl border border-[#BFD9CF] bg-green-50 px-6 py-5">
        <p className="text-[22px] font-semibold leading-none text-[#0A8A54]">
          Total Mark
        </p>

        <div className="mt-4 flex items-end gap-2 text-[#0A8A54]">
          <span className="text-[30px] font-bold leading-none">{totalScore}</span>
          <span className="pb-1 text-[20px] font-medium leading-none">
            / {totalMax}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-[18px] leading-none text-[#00A95D]">
            Confidence:
          </span>
          <span className="rounded-xl bg-[#00B96B] px-4 py-1 text-[15px] font-semibold leading-none text-white">
            {confidence}%
          </span>
        </div>
      </div>
    </section>
  );
}
