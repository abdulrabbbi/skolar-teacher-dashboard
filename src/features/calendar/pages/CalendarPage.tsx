import { useState } from "react";

import Card from "../../../shared/components/ui/Card";
import AddEventModal from "../components/AddEventModal";
import CalendarHeader from "../components/CalendarHeader";
import EventTypes from "../components/EventTypes";
import MonthGrid from "../components/MonthGrid";
import UpcomingEvents from "../components/UpcomingEvents";
import WeeklyView from "../components/WeeklyView";

import {
  calendarEvents,
  calendarMonth,
  eventTypes,
  upcomingEvents,
} from "../data/calendar.mock";
import {
  weeklyDays,
  weeklyHeaderLabel,
  weeklyStats,
} from "../data/calendar.weekly.mock";

export default function CalendarPage() {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"monthly" | "weekly">("weekly");

  const onPrevWeek = () => {};
  const onNextWeek = () => {};

  return (
    <div className="space-y-4">
      <Card className="p-4 sm:p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <CalendarHeader
          monthLabel={calendarMonth}
          viewMode={viewMode}
          onViewChange={setViewMode}
          onAddEvent={() => setIsAddEventOpen(true)}
          weekLabel={weeklyHeaderLabel}
          onPrevWeek={onPrevWeek}
          onNextWeek={onNextWeek}
        />
      </Card>

      {viewMode === "monthly" && (
        <div className="grid grid-cols-12 items-start gap-4">
          <div className="col-span-12 min-w-0 lg:col-span-9">
            <MonthGrid
              events={calendarEvents}
              eventTypes={eventTypes}
              monthLabel={calendarMonth}
            />
          </div>

          <div className="col-span-12 space-y-4 lg:col-span-3">
            <EventTypes types={eventTypes} />
            <UpcomingEvents events={upcomingEvents} eventTypes={eventTypes} />
          </div>
        </div>
      )}

      {viewMode === "weekly" && (
        <WeeklyView
          headerLabel={weeklyHeaderLabel}
          stats={weeklyStats}
          days={weeklyDays}
        />
      )}

      <AddEventModal
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
      />
    </div>
  );
}
