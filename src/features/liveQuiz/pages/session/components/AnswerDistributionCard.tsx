import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import Card from '../../../../../shared/components/ui/Card';
import type {
  AnswerOptionId,
  LiveQuizAnswerDistribution,
} from '../../../data/liveQuizSession.mock';

type DummyStudentProfile = {
  id: string;
  name: string;
  profile: string;
};

const DUMMY_STUDENTS_BY_OPTION: Record<AnswerOptionId, DummyStudentProfile[]> = {
  A: [
    { id: 'a-1', name: 'Olivia White', profile: 'Grade 10 - Section A' },
    { id: 'a-2', name: 'Noah Martinez', profile: 'Grade 10 - Section A' },
    { id: 'a-3', name: 'Ava Johnson', profile: 'Grade 10 - Section B' },
    { id: 'a-4', name: 'Liam Harris', profile: 'Grade 10 - Section B' },
    { id: 'a-5', name: 'Mia Clark', profile: 'Grade 10 - Section C' },
  ],
  B: [
    { id: 'b-1', name: 'Lucas Robinson', profile: 'Grade 10 - Section A' },
    { id: 'b-2', name: 'Amelia Lewis', profile: 'Grade 10 - Section A' },
    { id: 'b-3', name: 'Ethan Walker', profile: 'Grade 10 - Section B' },
    { id: 'b-4', name: 'Harper Hall', profile: 'Grade 10 - Section B' },
    { id: 'b-5', name: 'Mason Allen', profile: 'Grade 10 - Section B' },
    { id: 'b-6', name: 'Charlotte Young', profile: 'Grade 10 - Section C' },
    { id: 'b-7', name: 'Logan Hernandez', profile: 'Grade 10 - Section C' },
    { id: 'b-8', name: 'Ella King', profile: 'Grade 10 - Section C' },
  ],
  C: [
    { id: 'c-1', name: 'James Wright', profile: 'Grade 10 - Section A' },
    { id: 'c-2', name: 'Grace Lopez', profile: 'Grade 10 - Section B' },
    { id: 'c-3', name: 'Benjamin Scott', profile: 'Grade 10 - Section C' },
  ],
  D: [
    { id: 'd-1', name: 'Chloe Green', profile: 'Grade 10 - Section A' },
    { id: 'd-2', name: 'Henry Adams', profile: 'Grade 10 - Section B' },
    { id: 'd-3', name: 'Zoe Baker', profile: 'Grade 10 - Section C' },
  ],
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export type AnswerDistributionCardProps = {
  items: LiveQuizAnswerDistribution[];
  timerLabel?: string;
};

export default function AnswerDistributionCard({
  items,
  timerLabel = '60 seconds',
}: AnswerDistributionCardProps) {
  const [selectedOption, setSelectedOption] =
    useState<LiveQuizAnswerDistribution | null>(null);

  useEffect(() => {
    if (!selectedOption) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedOption(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedOption]);

  useEffect(() => {
    if (!selectedOption) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedOption]);

  const selectedStudents = useMemo(() => {
    if (!selectedOption) {
      return [];
    }

    return DUMMY_STUDENTS_BY_OPTION[selectedOption.id] ?? [];
  }, [selectedOption]);

  return (
    <>
      <Card className="rounded-xl border border-slate-200 p-6 shadow-none">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[15px]/none font-semibold text-[#181f49]">
              Answer Distribution
            </h3>
            <p className="mt-1 text-[15px] text-slate-500">Live</p>
          </div>

          <span className="inline-flex items-center rounded-xl bg-[#00B96B1A] px-4 py-2 text-[15px] font-medium text-[#00B96B]">
            {timerLabel}
          </span>
        </div>

        <div className="mt-7 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="space-y-3">
              <button
                type="button"
                onClick={() => setSelectedOption(item)}
                className="w-full rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B96B]"
                aria-label={`View students who selected option ${item.id}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-medium text-slate-900">
                      {item.id}
                    </span>
                    {item.isCorrect ? (
                      <span className="inline-flex items-center rounded-full bg-[#00B96B1A] px-3 py-1 text-[15px] font-medium text-[#00B96B]">
                        Correct
                      </span>
                    ) : null}
                  </div>
                  <span className="text-[15px] text-slate-500">
                    {item.students} students ({item.percent}%)
                  </span>
                </div>

                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-300">
                  <div
                    className={
                      item.isCorrect ? 'h-full bg-[#00B96B]' : 'h-full bg-[#020422]'
                    }
                    style={{ width: `${item.percent}%` }}
                    aria-label={`${item.id} selected by ${item.percent}%`}
                    role="progressbar"
                    aria-valuenow={item.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </Card>

      {selectedOption && typeof document !== 'undefined'
        ? createPortal(
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/35 px-4 backdrop-blur-sm"
          onClick={() => setSelectedOption(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Students who selected option ${selectedOption.id}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  Students Who Answered ({selectedOption.id})
                </h4>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedStudents.length} students selected this option
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOption(null)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                aria-label="Close students popup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-1">
              {selectedStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/40 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00B96B1A] text-sm font-semibold text-[#00B96B]">
                      {getInitials(student.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {student.name}
                      </p>
                      <p className="text-xs text-slate-500">{student.profile}</p>
                    </div>
                  </div>

                  <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                    Profile
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
            ,
            document.body,
          )
        : null}
    </>
  );
}
