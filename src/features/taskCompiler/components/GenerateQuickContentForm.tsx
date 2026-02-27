import { useState } from 'react';

import Card from '../../../shared/components/ui/Card';
import Button from '../../../shared/components/ui/Button';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

export type GenerateQuickContentFormProps = {
  onGenerate?: () => void;
};

export default function GenerateQuickContentForm({
  onGenerate,
}: GenerateQuickContentFormProps) {
  const [studyDesignCode, setStudyDesignCode] = useState('');
  const [targetClass, setTargetClass] = useState('Year 12 Methods');
  const [duration, setDuration] = useState('45 minutes');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Mixed');
  const [includeMarkingGuide, setIncludeMarkingGuide] = useState(true);
  const [generateDifferentiated, setGenerateDifferentiated] = useState(false);
  const [targetWeakPoints, setTargetWeakPoints] = useState(true);

  return (
    <Card
      className="
        space-y-5 p-5
        transition-all duration-300 ease-in-out
        hover:shadow-lg
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* HEADER */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-900">
          Generate Content
        </h2>
        <p className="text-sm text-slate-500">
          Create worksheets aligned to VCAA outcomes
        </p>
      </div>

      {/* FORM FIELDS */}
      <div className="space-y-4">
        {/* Study Design */}
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Study Design Code
          </label>
          <select
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            value={studyDesignCode}
            onChange={(event) => setStudyDesignCode(event.target.value)}
          >
            <option value="" disabled>
              Select code (optional)
            </option>
            <option value="vce-methods-2025">VCE Methods 2025</option>
            <option value="vce-methods-2024">VCE Methods 2024</option>
          </select>
        </div>

        {/* Target Class */}
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Target Class
          </label>
          <select
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            value={targetClass}
            onChange={(event) => setTargetClass(event.target.value)}
          >
            <option value="Year 12 Methods">Year 12 Methods</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Target Duration
          </label>
          <select
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          >
            <option value="30 minutes">30 minutes</option>
            <option value="45 minutes">45 minutes</option>
            <option value="60 minutes">60 minutes</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Difficulty
          </label>
          <div className="flex flex-wrap gap-2">
            {(['Easy', 'Medium', 'Hard', 'Mixed'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`
                  rounded-full border px-4 py-1.5 text-xs font-semibold
                  transition-all duration-200 ease-in-out
                  hover:scale-105 hover:-translate-y-0.5
                  ${
                    difficulty === level
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }
                `}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      ADVANCED OPTIONS
      <div className="space-y-3 border-t border-slate-200 pt-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Advanced Options
        </div>

        {[{
          label: 'Include Marking Guide',
          value: includeMarkingGuide,
          setter: setIncludeMarkingGuide
        },
        {
          label: 'Generate Differentiated Versions',
          value: generateDifferentiated,
          setter: setGenerateDifferentiated
        },
        {
          label: 'Target Class Weak Points',
          value: targetWeakPoints,
          setter: setTargetWeakPoints
        }].map(({ label, value, setter }) => (
          <label
            key={label}
            className="flex items-center gap-2 text-sm text-slate-700 transition hover:text-slate-900"
          >
          <input
  type="checkbox"
  className="
    h-4 w-4 rounded border-slate-300
    accent-black
    focus:ring-0 focus:ring-transparent focus:outline-none
  "
  checked={value}
  onChange={(event) => setter(event.target.checked)}
/>
            {label}
          </label>
        ))}
      </div>

      {/* GENERATE BUTTON */}
      <Button
        variant="success"
        fullWidth
        className="xl:w-auto transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
        onClick={onGenerate}
      >
        Generate Worksheet
      </Button>
    </Card>
  );
}
