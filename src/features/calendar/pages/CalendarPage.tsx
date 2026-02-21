
import { useState } from "react";

import Card from "../../../shared/components/ui/Card";
import CalendarHeader from "../components/CalendarHeader";
import EventTypes from "../components/EventTypes";
import MonthGrid from "../components/MonthGrid";
import UpcomingEvents from "../components/UpcomingEvents";
import AddEventModal from "../components/AddEventModal";
import WeeklyView from "../components/WeeklyView";

import {
  calendarDays,
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
  const [viewMode, setViewMode] = useState<"monthly" | "weekly">("monthly");

  // (Optional) week navigation hooks — wire later if you make weekly dynamic
  const onPrevWeek = () => {};
  const onNextWeek = () => {};

  return (
    <div className="space-y-4">
      {/* HEADER */}
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

      {/* CONTENT */}
      {viewMode === "monthly" && (
        <div className="grid grid-cols-1 gap-4 items-start min-w-0 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* LEFT */}
          <div className="self-start min-w-0">
            <MonthGrid
              days={calendarDays}
              events={calendarEvents}
              eventTypes={eventTypes}
            />
          </div>

          {/* RIGHT SIDEBAR (MONTHLY ONLY) */}
          <div className="self-start space-y-4">
            <EventTypes types={eventTypes} />
            <UpcomingEvents events={upcomingEvents} />
          </div>
        </div>
      )}

      {viewMode === "weekly" && (
        <WeeklyView
          headerLabel={weeklyHeaderLabel} // kept for compatibility (your WeeklyView can ignore)
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