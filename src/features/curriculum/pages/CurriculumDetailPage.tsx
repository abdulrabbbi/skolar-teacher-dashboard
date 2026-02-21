import { ArrowLeft, Sparkles } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Badge from '../../../shared/components/ui/Badge';
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';

import OutcomeRow from '../components/OutcomeRow';
import SubjectIcon from '../../taskCompiler/components/SubjectIcon';
import { curriculumSubjectsMock } from '../data/curriculum.mock';
import {
  getCurriculumSubjectById,
  getCurriculumUnitById,
  getOutcomesForUnit,
  getUnitKnowledge,
  getUnitSkills,
  getUnitSummary,
} from '../utils/curriculum.utils';

export default function CurriculumDetailPage() {
  const navigate = useNavigate();
  const { subjectId, unitId } = useParams<{ subjectId: string; unitId: string }>();

  const subject = useMemo(
    () => getCurriculumSubjectById(subjectId, curriculumSubjectsMock),
    [subjectId],
  );
  const unit = useMemo(() => getCurriculumUnitById(subject, unitId), [subject, unitId]);

  const outcomes = getOutcomesForUnit(unit);
  const keyKnowledge = getUnitKnowledge(unit);
  const keySkills = getUnitSkills(unit);
  const summary = getUnitSummary(unit);

  if (!subjectId || !unitId || !subject || !unit) {
    return (
      <section className="space-y-4">
        <Button
          variant="outline"
          size="sm"
          className="border-slate-200 text-slate-700"
          onClick={() => navigate('/teacher/curriculum')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Curriculum
        </Button>

        <Card className="rounded-2xl border-slate-200 p-6 text-sm text-slate-500">
          Curriculum unit not found.
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <Button
        variant="outline"
        size="sm"
        className="border-slate-200 text-slate-700"
        onClick={() => navigate('/teacher/curriculum')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Curriculum
      </Button>

      <Card className="rounded-2xl border-slate-200 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <SubjectIcon icon={subject.icon} color={subject.color} size={46} />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="neutral">{unit.label}</Badge>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {subject.name}
              </span>
            </div>
            <h1 className="text-xl font-semibold text-slate-900">{unit.title}</h1>
            <p className="text-sm text-slate-500">
              Explore outcomes, key knowledge and key skills for this unit.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="rounded-2xl border-slate-200 p-4 sm:p-5">
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-slate-900">Outcomes</h2>
              <p className="text-sm text-slate-500">Select outcomes for upcoming tasks</p>
            </div>

            <div className="mt-4 space-y-3">
              {outcomes.map((outcome) => (
                <OutcomeRow key={outcome.id} outcome={outcome} />
              ))}
            </div>
          </Card>

          <Card className="rounded-2xl border-slate-200 p-4 sm:p-5">
            <h2 className="text-base font-semibold text-slate-900">Key Knowledge</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {keyKnowledge.map((knowledge) => (
                <li key={knowledge} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
                  {knowledge}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-2xl border-slate-200 p-4 sm:p-5">
            <h2 className="text-base font-semibold text-slate-900">Key Skills</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {keySkills.map((skill) => (
                <li key={skill} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
                  {skill}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-2xl border-slate-200 p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-slate-900">Summary</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Outcomes</span>
                <span className="font-semibold text-slate-900">{summary.outcomes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Key Knowledge</span>
                <span className="font-semibold text-slate-900">{summary.knowledge}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Key Skills</span>
                <span className="font-semibold text-slate-900">{summary.skills}</span>
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border-slate-200 p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-slate-900">Task Compiler</h3>
            <p className="mt-2 text-sm text-slate-500">
              Open this subject directly in Task Compiler to generate aligned content.
            </p>

            <Button
              className="mt-4 w-full"
              onClick={() => navigate(`/teacher/task-compiler/by-subject/${subject.id}`)}
            >
              <Sparkles className="h-4 w-4" />
              Open in Task Compiler
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
