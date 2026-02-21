import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../../shared/components/ui/Card';
import PageHeader from '../../../shared/components/ui/PageHeader';

import CurriculumSidebar from '../components/CurriculumSidebar';
import CurriculumTopicList from '../components/CurriculumTopicList';
import { curriculumSubjectsMock } from '../data/curriculum.mock';
import {
  getAreasForUnit,
  getCurriculumSubjectById,
  getCurriculumUnitById,
  getInitialCurriculumSelection,
} from '../utils/curriculum.utils';

export default function CurriculumPage() {
  const navigate = useNavigate();
  const initialSelection = getInitialCurriculumSelection(curriculumSubjectsMock);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialSelection.subjectId,
  );
  const [selectedUnitId, setSelectedUnitId] = useState<string>(
    initialSelection.unitId,
  );

  const selectedSubject = useMemo(
    () => getCurriculumSubjectById(selectedSubjectId, curriculumSubjectsMock),
    [selectedSubjectId],
  );

  const selectedUnit = useMemo(
    () => getCurriculumUnitById(selectedSubject, selectedUnitId),
    [selectedSubject, selectedUnitId],
  );

  const areas = getAreasForUnit(selectedUnit);

  function handleSelectSubject(subjectId: string) {
    const subject = getCurriculumSubjectById(subjectId, curriculumSubjectsMock);

    setSelectedSubjectId(subjectId);
    setSelectedUnitId(subject?.units[0]?.id ?? '');
  }

  function handleSelectUnit(unitId: string) {
    setSelectedUnitId(unitId);
  }

  function handleOpenDetail() {
    if (!selectedSubject || !selectedUnit) {
      return;
    }

    navigate(`/teacher/curriculum/${selectedSubject.id}/${selectedUnit.id}`);
  }

  return (
    <section className="space-y-6">
      <Card className="rounded-2xl border-slate-200 p-4 sm:p-5">
        <PageHeader
          title="Curriculum"
          subtitle="Explore units, areas of study and outcomes by subject"
        />
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
        <CurriculumSidebar
          subjects={curriculumSubjectsMock}
          selectedSubjectId={selectedSubjectId}
          selectedUnitId={selectedUnitId}
          onSelectSubject={handleSelectSubject}
          onSelectUnit={handleSelectUnit}
        />

        <CurriculumTopicList
          unit={selectedUnit}
          onOpenDetail={() => handleOpenDetail()}
        />
      </div>

      {selectedUnit && !areas.length ? (
        <Card className="rounded-2xl border-slate-200 p-5 text-sm text-slate-500">
          No areas configured for {selectedUnit.label} yet.
        </Card>
      ) : null}
    </section>
  );
}
