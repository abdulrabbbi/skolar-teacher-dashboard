import { CalendarDays, Clock3, Copy, Download, Eye, FileText } from 'lucide-react';

import Badge from '../../../shared/components/ui/Badge';
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';

import { formatResourceDate } from '../utils/contentLibrary.utils';
import type { ContentDifficulty, ContentResource } from '../types/contentLibrary.types';

const difficultyTone: Record<ContentDifficulty, string> = {
  Easy: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-sky-100 text-sky-700',
  Hard: 'bg-rose-100 text-rose-700',
  Mixed: 'bg-amber-100 text-amber-700',
};

type ResourceCardProps = {
  resource: ContentResource;
  onView?: (resource: ContentResource) => void;
  onDuplicate?: (resource: ContentResource) => void;
  onDownload?: (resource: ContentResource) => void;
};

export default function ResourceCard({
  resource,
  onView,
  onDuplicate,
  onDownload,
}: ResourceCardProps) {
  return (
    <Card className="rounded-2xl border-slate-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-slate-900">{resource.title}</h3>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neutral">{resource.type}</Badge>
            <Badge variant="neutral">{resource.subjectName}</Badge>
            <Badge className={difficultyTone[resource.difficulty]}>{resource.difficulty}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 text-xs text-slate-500 sm:grid-cols-3">
          <div className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            <span>{resource.durationMins} mins</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            <span>{resource.marks} marks</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{formatResourceDate(resource.createdAt)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-slate-200 text-slate-700"
            onClick={() => onView?.(resource)}
          >
            <Eye className="h-4 w-4" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-slate-200 text-slate-700"
            onClick={() => onDuplicate?.(resource)}
          >
            <Copy className="h-4 w-4" />
            Duplicate
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-slate-200 text-slate-700"
            onClick={() => onDownload?.(resource)}
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
}
