
import Card from '../../../shared/components/ui/Card';
import CalendarHeader from '../components/CalendarHeader';
import EventTypes from '../components/EventTypes';
import MonthGrid from '../components/MonthGrid';
import UpcomingEvents from '../components/UpcomingEvents';
import {
  calendarDays,
  calendarEvents,
  calendarMonth,
  eventTypes,
  upcomingEvents,
} from '../data/calendar.mock';
import AddEventModal from '../components/AddEventModal';
import WeeklyView from '../components/WeeklyView';
import {
  weeklyDays,
  weeklyHeaderLabel,
  weeklyStats,
} from '../data/calendar.weekly.mock';
import { useState } from 'react';

export default function CalendarPage() {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <Card className="p-4 sm:p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <CalendarHeader
          monthLabel={calendarMonth}
          viewMode={viewMode}
          onViewChange={setViewMode}
          onAddEvent={() => setIsAddEventOpen(true)}
        />
      </Card>

      {/* CONTENT */}
      {viewMode === 'monthly' && (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* LEFT */}
          <MonthGrid
            days={calendarDays}
            events={calendarEvents}
            eventTypes={eventTypes}
          />

          {/* RIGHT SIDEBAR (MONTHLY ONLY) */}
          <div className="space-y-4">
            <EventTypes types={eventTypes} />
            <UpcomingEvents events={upcomingEvents} />
          </div>
        </div>
      )}

      {viewMode === 'weekly' && (
        <WeeklyView
          headerLabel={weeklyHeaderLabel}
          stats={weeklyStats}
          days={weeklyDays}
        />
      )}

      {/* MODAL */}
      <AddEventModal
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
      />
    </div>
  );
}
