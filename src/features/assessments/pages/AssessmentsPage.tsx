
import { useState } from 'react';
import Card from '../../../shared/components/ui/Card';
import Button from '../../../shared/components/ui/Button';
import PageHeader from '../../../shared/components/ui/PageHeader';
import AssessmentStats from '../components/AssessmentStats';
import AssessmentsTable from '../components/AssessmentsTable';
import AssessmentSidePanels from '../components/AssessmentSidePanels';
import CreateAssessmentModal from '../components/CreateAssessmentModal';
import MarkingQueue from '../components/MarkingQueue';
import {
  assessmentClassOptions,
  assessmentModalDefaults,
  assessmentStats,
  assessmentTypeOptions,
  assessmentsTable,
  assessmentTypes,
  deadlinesThisWeek,
  markingQueue,
  recentActivity,
} from '../data/assessments.mock';

export default function AssessmentsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="  p-4 sm:p-5
          transition-all duration-300 ease-in-out
          hover:shadow-lg">
        <PageHeader
          title="Assessments"
          subtitle="Create and manage SACs, exams, and practice tests"
          actions={(
            <Button
              variant="success"
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
              className="transition-all duration-200 hover:-translate-y-0.5"
            >
              + Create Assessment
            </Button>
          )}
        />
      </Card>

      <AssessmentStats stats={assessmentStats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(1fr)_320px]">
        <div className="space-y-6">
          <MarkingQueue items={markingQueue} />
          <AssessmentsTable rows={assessmentsTable} />
        </div>

        <AssessmentSidePanels
          deadlines={deadlinesThisWeek}
          activity={recentActivity}
          types={assessmentTypes}
        />
      </div>

      <CreateAssessmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        typeOptions={assessmentTypeOptions}
        classOptions={assessmentClassOptions}
        defaultType={assessmentModalDefaults.type}
        defaultClass={assessmentModalDefaults.className}
      />
    </div>
  );
}
