import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

import Button from '../../../shared/components/ui/Button';

import type { SubjectCard, AreaOfStudyItem } from '../data/taskCompiler.mock';
import {
  outcomes,
  keyKnowledge,
  keySkills,
} from '../data/areaOfStudyDetail.mock';
import SelectableListCard from '../components/SelectableListCard';
import ContentSummaryCard from '../components/ContentSummaryCard';
import TaskSettingsCard, {
  type DifficultyLevel,
} from '../components/TaskSettingsCard';

export type AreaOfStudyDetailProps = {
  subject: SubjectCard;
  area: AreaOfStudyItem;
  onBack: () => void;
  onGenerateQuickContent: () => void;
};

export default function AreaOfStudyDetail({
  subject,
  area,
  onBack,
  onGenerateQuickContent,
}: AreaOfStudyDetailProps) {
  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([]);
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Mixed');
  const [duration, setDuration] = useState('45 minutes');
  const [includeMarkingGuide, setIncludeMarkingGuide] = useState(false);

  const areaOutcomes = useMemo(
    () => outcomes.filter((item) => item.areaId === area.id),
    [area.id]
  );

  const areaKnowledge = useMemo(
    () => keyKnowledge.filter((item) => item.areaId === area.id),
    [area.id]
  );

  const areaSkills = useMemo(
    () => keySkills.filter((item) => item.areaId === area.id),
    [area.id]
  );

  const totalSelections =
    selectedOutcomes.length +
    selectedKnowledge.length +
    selectedSkills.length;

  const toggleSelection = (setSelected: Dispatch<SetStateAction<string[]>>) => {
    return (id: string) => {
      setSelected((prev) =>
        prev.includes(id)
          ? prev.filter((itemId) => itemId !== id)
          : [...prev, id]
      );
    };
  };

  return (
    <section className="space-y-6">
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="flex w-fit items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Areas
      </Button>

      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">
          {area.title}
        </h2>
        <p className="text-sm text-slate-500">
          {subject.title} - {area.unit}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <SelectableListCard
            title="Outcomes"
            subtitle="Select outcomes to assess"
            items={areaOutcomes}
            selectedIds={selectedOutcomes}
            onToggle={toggleSelection(setSelectedOutcomes)}
          />

          <SelectableListCard
            title="Key Knowledge"
            subtitle="Select key knowledge points"
            items={areaKnowledge}
            selectedIds={selectedKnowledge}
            onToggle={toggleSelection(setSelectedKnowledge)}
          />

          <SelectableListCard
            title="Key Skills"
            subtitle="Select key skills to test"
            items={areaSkills}
            selectedIds={selectedSkills}
            onToggle={toggleSelection(setSelectedSkills)}
          />
        </div>

        <div className="space-y-6">
          <ContentSummaryCard
            outcomesCount={selectedOutcomes.length}
            knowledgeCount={selectedKnowledge.length}
            skillsCount={selectedSkills.length}
          />

          <TaskSettingsCard
            duration={duration}
            onDurationChange={setDuration}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            includeMarkingGuide={includeMarkingGuide}
            onIncludeMarkingGuideChange={setIncludeMarkingGuide}
          />

          <Button
            variant="success"
            fullWidth
            disabled={totalSelections === 0}
            className="flex items-center gap-2"
            onClick={() => {
              console.log('Generate Quick Content clicked');
              onGenerateQuickContent();
            }}
          >
            <FileText className="h-4 w-4" />
            Generate Quick Content
          </Button>
        </div>
      </div>
    </section>
  );
}
