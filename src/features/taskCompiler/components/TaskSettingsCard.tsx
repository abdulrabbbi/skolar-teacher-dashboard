import Card from '../../../shared/components/ui/Card';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

export type TaskSettingsCardProps = {
  duration: string;
  onDurationChange: (value: string) => void;
  difficulty: DifficultyLevel;
  onDifficultyChange: (value: DifficultyLevel) => void;
  includeMarkingGuide: boolean;
  onIncludeMarkingGuideChange: (value: boolean) => void;
};

const durationOptions = ['30 minutes', '45 minutes', '60 minutes'] as const;

export default function TaskSettingsCard({
  duration,
  onDurationChange,
  difficulty,
  onDifficultyChange,
  includeMarkingGuide,
  onIncludeMarkingGuideChange,
}: TaskSettingsCardProps) {
  return (
    <Card className="space-y-4 p-4">
      <h3 className="text-sm font-semibold text-slate-900">Task Settings</h3>

      <div>
        <label className="mb-1 block text-xs text-slate-500">
          Target Duration
        </label>
        <select
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
          value={duration}
          onChange={(event) => onDurationChange(event.target.value)}
        >
          {durationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs text-slate-500">
          Difficulty Level
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(['Easy', 'Medium', 'Hard', 'Mixed'] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onDifficultyChange(level)}
              className={`rounded-md border px-3 py-2 text-sm transition ${
                difficulty === level
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          checked={includeMarkingGuide}
          onChange={(event) => onIncludeMarkingGuideChange(event.target.checked)}
        />
        Include Marking Guide
      </label>
    </Card>
  );
}
