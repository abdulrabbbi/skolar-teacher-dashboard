import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Plus,
} from 'lucide-react';
import Button from '../../../shared/components/ui/Button';
import PageHeader from '../../../shared/components/ui/PageHeader';

export type CalendarHeaderProps = {
  monthLabel: string;
  viewMode: 'monthly' | 'weekly';
  onViewChange: (mode: 'monthly' | 'weekly') => void;
  onAddEvent: () => void;
};

export default function CalendarHeader({
  monthLabel,
  viewMode,
  onViewChange,
  onAddEvent,
}: CalendarHeaderProps) {
  return (
    <PageHeader
      title="Calendar"
      subtitle={monthLabel}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          {/* VIEW SWITCH */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
            <Button
              size="sm"
              variant={viewMode === 'weekly' ? 'secondary' : 'ghost'}
              onClick={() => onViewChange('weekly')}
              className="transition-all duration-200 hover:-translate-y-0.5"
            >
              Weekly
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'monthly' ? 'secondary' : 'ghost'}
              onClick={() => onViewChange('monthly')}
              className="transition-all duration-200 hover:-translate-y-0.5"
            >
              Monthly
            </Button>
          </div>

          {/* NAV BUTTONS */}
          <Button
            size="sm"
            variant="outline"
            className="group transition-all duration-200 hover:-translate-y-0.5"
          >
            <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="group transition-all duration-200 hover:-translate-y-0.5"
          >
            <CalendarDays className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            <span className="hidden sm:inline">Today</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="group transition-all duration-200 hover:-translate-y-0.5"
          >
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </Button>

          {/* ADD EVENT (PRIMARY) */}
          <Button
            size="sm"
            onClick={onAddEvent}
            className="
              bg-emerald-600 text-white
              hover:bg-emerald-700
              focus:ring-2 focus:ring-emerald-500
              flex items-center gap-1
              group transition-all duration-200 hover:-translate-y-0.5
            "
          >
            <Plus className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            <span className="hidden sm:inline">Add Event</span>
          </Button>
        </div>
      }
    />
  );
}
