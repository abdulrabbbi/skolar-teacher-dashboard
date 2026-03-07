import { useMemo, useState } from "react";

import Card from "../../../shared/components/ui/Card";
import AddEventModal, { type AddEventFormValues } from "../components/AddEventModal";
import CalendarHeader from "../components/CalendarHeader";
import EventTypes from "../components/EventTypes";
import MonthGrid from "../components/MonthGrid";
import UpcomingEvents from "../components/UpcomingEvents";
import WeeklyView from "../components/WeeklyView";

import {
  calendarEvents,
  eventTypes,
  upcomingEvents,
  type CalendarEvent,
  type EventType,
  type EventTypeConfig,
  type UpcomingEvent,
} from "../data/calendar.mock";
import {
  weeklyDays as weeklyTemplateDays,
  type WeeklyDay,
  type WeeklyEvent,
  type WeeklyEventType,
  type WeeklyStats,
} from "../data/calendar.weekly.mock";

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromISODate(dateISO: string): Date {
  return new Date(`${dateISO}T00:00:00`);
}

function addDays(date: Date, value: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + value);
  return next;
}

function addMonths(date: Date, value: number): Date {
  const next = new Date(date);
  next.setDate(1);
  next.setMonth(next.getMonth() + value);
  return next;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfWeekMonday(date: Date): Date {
  const start = new Date(date);
  const diff = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

function formatMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatWeekday(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
}

function formatMonthDay(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(date);
}

function formatWeekLabel(weekStart: Date): string {
  const weekEnd = addDays(weekStart, 6);
  const startMonth = new Intl.DateTimeFormat("en-US", { month: "short" }).format(weekStart);
  const endMonth = new Intl.DateTimeFormat("en-US", { month: "short" }).format(weekEnd);
  const startDay = String(weekStart.getDate()).padStart(2, "0");
  const endDay = String(weekEnd.getDate()).padStart(2, "0");

  if (startMonth === endMonth) {
    return `Week of ${startMonth} ${startDay} - ${endDay}`;
  }

  return `Week of ${startMonth} ${startDay} - ${endMonth} ${endDay}`;
}

function formatTime(time24: string): string {
  if (!time24) return "All Day";

  const [hoursText, minutesText] = time24.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return "All Day";
  }

  const sample = new Date();
  sample.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(sample);
}

function parseMinutes(duration: string): number {
  const match = duration.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function getInitialCompletionMap(): Record<string, boolean> {
  const map: Record<string, boolean> = {};

  for (const day of weeklyTemplateDays) {
    for (const event of day.events) {
      map[event.id] = Boolean(event.completed);
    }
  }

  return map;
}

function mapToWeeklyEventType(type: EventType): WeeklyEventType {
  if (type === "Exam") return "Exam";
  if (type === "Deadline") return "Deadline";
  return "Class";
}

function toMonthISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}-01`;
}

function sortUpcomingEvents(events: UpcomingEvent[]): UpcomingEvent[] {
  return [...events].sort((first, second) => {
    const firstValue = first.dateISO ?? "9999-12-31";
    const secondValue = second.dateISO ?? "9999-12-31";

    if (firstValue === secondValue) {
      return first.title.localeCompare(second.title);
    }

    return firstValue.localeCompare(secondValue);
  });
}

export default function CalendarPage() {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"monthly" | "weekly">("weekly");

  const [monthCursor, setMonthCursor] = useState<Date>(() => startOfMonth(new Date("2026-01-01")));
  const [weekCursor, setWeekCursor] = useState<Date>(() => startOfWeekMonday(new Date("2026-01-01")));

  const [types, setTypes] = useState<EventTypeConfig[]>(eventTypes);
  const [monthlyEvents, setMonthlyEvents] = useState<CalendarEvent[]>(calendarEvents);
  const [upcoming, setUpcoming] = useState<UpcomingEvent[]>(upcomingEvents);
  const [weeklyCompletion, setWeeklyCompletion] = useState<Record<string, boolean>>(
    getInitialCompletionMap,
  );
  const [customWeeklyByDate, setCustomWeeklyByDate] = useState<Record<string, WeeklyEvent[]>>({});

  const monthLabel = useMemo(() => formatMonthLabel(monthCursor), [monthCursor]);
  const monthISO = useMemo(() => toMonthISO(monthCursor), [monthCursor]);
  const weekLabel = useMemo(() => formatWeekLabel(weekCursor), [weekCursor]);

  const activeTypeIds = useMemo(() => {
    return new Set(types.filter((item) => item.checked).map((item) => item.id));
  }, [types]);

  const visibleMonthEvents = useMemo(() => {
    return monthlyEvents.filter((event) => activeTypeIds.has(event.type));
  }, [monthlyEvents, activeTypeIds]);

  const visibleUpcomingEvents = useMemo(() => {
    return upcoming.filter((event) => activeTypeIds.has(event.type));
  }, [upcoming, activeTypeIds]);

  const weeklyDays = useMemo<WeeklyDay[]>(() => {
    return weeklyTemplateDays.map((templateDay, index) => {
      const date = addDays(weekCursor, index);
      const dateISO = toISODate(date);

      const baseEvents = templateDay.events.map((event) => ({
        ...event,
        completed: weeklyCompletion[event.id] ?? Boolean(event.completed),
      }));

      const customEvents = (customWeeklyByDate[dateISO] ?? []).map((event) => ({
        ...event,
        completed: weeklyCompletion[event.id] ?? false,
      }));

      const events = [...baseEvents, ...customEvents];

      const minutesTotal = events.reduce((sum, event) => sum + parseMinutes(event.duration), 0);
      const minutesDone = events.reduce(
        (sum, event) => sum + (event.completed ? parseMinutes(event.duration) : 0),
        0,
      );

      return {
        ...templateDay,
        label: formatWeekday(date),
        date: formatMonthDay(date),
        minutesDone,
        minutesTotal,
        events,
      };
    });
  }, [customWeeklyByDate, weekCursor, weeklyCompletion]);

  const weeklyStats = useMemo<WeeklyStats>(() => {
    const totalMinutes = weeklyDays.reduce((sum, day) => sum + day.minutesTotal, 0);
    const completedMinutes = weeklyDays.reduce((sum, day) => sum + day.minutesDone, 0);
    const completionRate =
      totalMinutes === 0 ? 0 : Math.round((completedMinutes / totalMinutes) * 100);

    return {
      totalPlanned: `${totalMinutes} min`,
      completed: `${completedMinutes} min`,
      completionRate,
    };
  }, [weeklyDays]);

  const onPrevWeek = () => {
    setWeekCursor((prev) => addDays(prev, -7));
  };

  const onNextWeek = () => {
    setWeekCursor((prev) => addDays(prev, 7));
  };

  const onPrevMonth = () => {
    setMonthCursor((prev) => addMonths(prev, -1));
  };

  const onNextMonth = () => {
    setMonthCursor((prev) => addMonths(prev, 1));
  };

  const onToggleType = (id: string) => {
    setTypes((prev) => prev.map((type) => (type.id === id ? { ...type, checked: !type.checked } : type)));
  };

  const onToggleWeeklyEvent = (id: string) => {
    setWeeklyCompletion((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const onAddEvent = (values: AddEventFormValues) => {
    const timestamp = Date.now();
    const baseId = `custom-${timestamp}`;
    const eventTime = formatTime(values.time);
    const eventDate = fromISODate(values.date);
    const eventTitle = values.title || values.type;

    setMonthlyEvents((prev) => [
      ...prev,
      {
        id: `${baseId}-month`,
        dateISO: values.date,
        time: eventTime === "All Day" ? undefined : eventTime,
        title: eventTitle,
        type: values.type,
      },
    ]);

    setUpcoming((prev) => {
      const next: UpcomingEvent[] = [
        ...prev,
        {
          id: `${baseId}-upcoming`,
          title: eventTitle,
          time: `${formatMonthDay(eventDate)} - ${eventTime}`,
          type: values.type,
          className: values.className || undefined,
          dateISO: values.date,
        },
      ];

      return sortUpcomingEvents(next);
    });

    const weeklyEvent: WeeklyEvent = {
      id: `${baseId}-weekly`,
      title: eventTitle,
      duration: "30 min",
      type: mapToWeeklyEventType(values.type),
      completed: false,
    };

    setCustomWeeklyByDate((prev) => ({
      ...prev,
      [values.date]: [...(prev[values.date] ?? []), weeklyEvent],
    }));

    setWeeklyCompletion((prev) => ({
      ...prev,
      [weeklyEvent.id]: false,
    }));
  };

  return (
    <div className="space-y-4">
      <Card
        className="p-4 sm:p-5
          transition-all duration-300 ease-in-out
          hover:shadow-lg"
      >
        <CalendarHeader
          monthLabel={monthLabel}
          viewMode={viewMode}
          onViewChange={setViewMode}
          onAddEvent={() => setIsAddEventOpen(true)}
          weekLabel={weekLabel}
          onPrevWeek={onPrevWeek}
          onNextWeek={onNextWeek}
        />
      </Card>

      {viewMode === "monthly" && (
        <div className="grid grid-cols-12 items-start gap-4">
          <div className="col-span-12 min-w-0 lg:col-span-9">
            <MonthGrid
              events={visibleMonthEvents}
              eventTypes={types}
              monthISO={monthISO}
              monthLabel={monthLabel}
              onPrevMonth={onPrevMonth}
              onNextMonth={onNextMonth}
            />
          </div>

          <div className="col-span-12 space-y-4 lg:col-span-3">
            <EventTypes types={types} onToggleType={onToggleType} />
            <UpcomingEvents events={visibleUpcomingEvents} eventTypes={types} />
          </div>
        </div>
      )}

      {viewMode === "weekly" && (
        <WeeklyView
          headerLabel={weekLabel}
          stats={weeklyStats}
          days={weeklyDays}
          onToggleEvent={onToggleWeeklyEvent}
        />
      )}

      <AddEventModal
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onSubmit={onAddEvent}
      />
    </div>
  );
}
