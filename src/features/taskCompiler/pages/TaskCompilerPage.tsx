import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

import Card from '../../../shared/components/ui/Card';
import Button from '../../../shared/components/ui/Button';
import PageHeader from '../../../shared/components/ui/PageHeader';

import SubjectCards from '../components/SubjectCards';
import AreaOfStudyList from '../components/AreaOfStudyList';
import AreaOfStudyDetail from '../pages/AreaOfStudyDetail';
import TaskCompilerStats from '../components/TaskCompilerStats';
import TaskCompilerActions, {
  type TaskCompilerTab,
} from '../components/TaskCompilerActions';
import GenerateQuickContentPage from './GenerateQuickContentPage';
import TaskHistoryPage from './TaskHistoryPage';

import {
  areaOfStudyItems,
  subjectAreas,
  subjectCards,
  taskCompilerCopy,
  taskCompilerStats,
  type SubjectCard,
  type AreaOfStudyItem,
} from '../data/taskCompiler.mock';

export default function TaskCompilerPage() {
  const [selectedSubject, setSelectedSubject] =
    useState<SubjectCard | null>(null);

  const [selectedArea, setSelectedArea] =
    useState<AreaOfStudyItem | null>(null);

  const [activeTab, setActiveTab] = useState<TaskCompilerTab>('by-subject');

  const areas = useMemo(() => {
    if (!selectedSubject) return [];
    return subjectAreas[selectedSubject.id] ?? areaOfStudyItems;
  }, [selectedSubject]);

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <Card className="p-4 sm:p-5">
        <PageHeader title={taskCompilerCopy.pageTitle} />
      </Card>

      {/* TOP STATS */}
      <TaskCompilerStats stats={taskCompilerStats} />

      {/* ✅ ACTION BUTTONS — CORRECT POSITION */}
      <TaskCompilerActions
        activeTab={activeTab}
        onTabChange={(tab) => {
          console.log(`Tab selected: ${tab}`);
          setActiveTab(tab);
        }}
      />

      {activeTab === 'by-subject' ? (
        selectedSubject && selectedArea ? (
          <AreaOfStudyDetail
            subject={selectedSubject}
            area={selectedArea}
            onBack={() => setSelectedArea(null)}
            onGenerateQuickContent={() => {
              console.log('Tab selected: quick-content');
              setActiveTab('quick-content');
            }}
          />
        ) : selectedSubject ? (
          /* LEVEL 2: AREA LIST */
          <div className="space-y-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedSubject(null);
                setSelectedArea(null);
              }}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{taskCompilerCopy.backToSubjects}</span>
            </Button>

            <AreaOfStudyList
              subject={selectedSubject}
              areas={areas}
              onSelectArea={setSelectedArea}
            />
          </div>
        ) : (
          /* LEVEL 1: SUBJECTS */
          <SubjectCards
            subjects={subjectCards}
            onSelect={setSelectedSubject}
          />
        )
      ) : activeTab === 'quick-content' ? (
        <GenerateQuickContentPage
          onBack={() => {
            console.log('Tab selected: by-subject');
            setActiveTab('by-subject');
          }}
        />
      ) : (
        <TaskHistoryPage />
      )}
    </div>
  );
}
