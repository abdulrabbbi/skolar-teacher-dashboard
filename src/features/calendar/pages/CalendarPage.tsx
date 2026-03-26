/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";

import Card from "../../../shared/components/ui/Card";
import AddEventModal, {
  type AddEventFormValues,
} from "../components/AddEventModal";
import CalendarHeader from "../components/CalendarHeader";
import EventTypes from "../components/EventTypes";
import MonthEventDetailsModal from "../components/MonthEventDetailsModal";
import MonthGrid from "../components/MonthGrid";
import UpcomingEvents from "../components/UpcomingEvents";
import WeeklyEventDetailsModal from "../components/WeeklyEventDetailsModal";
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
  const startMonth = new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(weekStart);
  const endMonth = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    weekEnd,
  );
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

function diffMinutes(startDateTimeLocal: string, endDateTimeLocal: string): number {
  const start = new Date(startDateTimeLocal);
  const end = new Date(endDateTimeLocal);
  const ms = end.getTime() - start.getTime();
  if (Number.isNaN(ms)) return 0;
  return Math.max(0, Math.round(ms / 60000));
}

function addMinutesToDateTimeLocal(dateTimeLocal: string, minutesToAdd: number): string {
  const d = new Date(dateTimeLocal);
  if (Number.isNaN(d.getTime())) return dateTimeLocal;
  d.setMinutes(d.getMinutes() + minutesToAdd);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day}T${hh}:${mm}`;
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

function resolveCalendarEventDateISO(event: CalendarEvent, monthISO: string): string {
  const anyEvent = event as any;

  if (anyEvent.dateISO) return anyEvent.dateISO;

  const base = new Date(monthISO);
  const year = base.getFullYear();
  const month = base.getMonth();
  const day = Number(anyEvent.day ?? 1);

  return toISODate(new Date(year, month, day));
}

function resolveCalendarEventTitle(event: CalendarEvent, fallback = "Event"): string {
  const anyEvent = event as any;
  return String(anyEvent.title ?? anyEvent.name ?? anyEvent.subject ?? fallback);
}

function resolveCalendarEventClassName(event: CalendarEvent): string {
  const anyEvent = event as any;
  return String(anyEvent.className ?? anyEvent.subject ?? anyEvent.name ?? "");
}

function toTimeInputValue(displayTime?: string): string {
  if (!displayTime) return "";

  const raw = displayTime.trim().toLowerCase();

  const match24 = raw.match(/^(\d{1,2}):(\d{2})$/);
  if (match24) {
    const hours = String(Number(match24[1])).padStart(2, "0");
    const minutes = match24[2];
    return `${hours}:${minutes}`;
  }

  const match12 = raw.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (match12) {
    let hours = Number(match12[1]);
    const minutes = match12[2] ?? "00";
    const meridiem = match12[3];

    if (meridiem === "pm" && hours !== 12) hours += 12;
    if (meridiem === "am" && hours === 12) hours = 0;

    return `${String(hours).padStart(2, "0")}:${minutes}`;
  }

  return "";
}

function getCustomBaseIdFromMonthId(eventId: string): string | null {
  if (eventId.startsWith("custom-") && eventId.endsWith("-month")) {
    return eventId.slice(0, -"-month".length);
  }

  return null;
}

function removeWeeklyCustomEvent(
  prev: Record<string, WeeklyEvent[]>,
  eventId: string,
): Record<string, WeeklyEvent[]> {
  let changed = false;
  const next: Record<string, WeeklyEvent[]> = {};

  for (const [dateISO, events] of Object.entries(prev)) {
    const filtered = events.filter((event) => event.id !== eventId);
    if (filtered.length !== events.length) changed = true;
    if (filtered.length > 0) next[dateISO] = filtered;
  }

  return changed ? next : prev;
}

export default function CalendarPage() {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"monthly" | "weekly">("weekly");

  const [monthCursor, setMonthCursor] = useState<Date>(() =>
    startOfMonth(new Date("2026-01-01")),
  );
  const [weekCursor, setWeekCursor] = useState<Date>(() =>
    startOfWeekMonday(new Date("2026-01-01")),
  );

  const [types, setTypes] = useState<EventTypeConfig[]>(eventTypes);
  const [monthlyEvents, setMonthlyEvents] = useState<CalendarEvent[]>(calendarEvents);
  const [upcoming, setUpcoming] = useState<UpcomingEvent[]>(upcomingEvents);
  const [weeklyCompletion, setWeeklyCompletion] = useState<Record<string, boolean>>(
    getInitialCompletionMap,
  );
  const [customWeeklyByDate, setCustomWeeklyByDate] = useState<
    Record<string, WeeklyEvent[]>
  >({});
  const [weeklyDeleted, setWeeklyDeleted] = useState<Record<string, true>>({});

  const [selectedDateISO, setSelectedDateISO] = useState<string | null>(null);
  const [selectedMonthEvent, setSelectedMonthEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [editingMonthEvent, setEditingMonthEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [selectedWeeklyEvent, setSelectedWeeklyEvent] = useState<WeeklyEvent | null>(
    null,
  );
  const [editingWeeklyEvent, setEditingWeeklyEvent] = useState<WeeklyEvent | null>(
    null,
  );
  const [selectedWeeklyDateISO, setSelectedWeeklyDateISO] = useState<string | null>(
    null,
  );
  const [weeklyEditsById, setWeeklyEditsById] = useState<
    Record<
      string,
      Partial<
        Pick<WeeklyEvent, "title" | "subtitle" | "duration" | "type"> & {
          eventMode: "event" | "task";
          className: string;
          icon: string;
          color: string;
          description: string;
          startTime: string;
          endTime: string;
          recurring: boolean;
          reminders: string[];
          tags: string[];
        }
      >
    >
  >({});

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

      const applyWeeklyEdits = (event: WeeklyEvent) => {
        const patch = weeklyEditsById[event.id];
        return patch ? ({ ...event, ...patch } as WeeklyEvent) : event;
      };

      const baseEvents = templateDay.events
        .filter((event) => !weeklyDeleted[event.id])
        .map((event) => ({
          ...event,
          dateISO,
          completed: weeklyCompletion[event.id] ?? Boolean(event.completed),
        }))
        .map(applyWeeklyEdits);

      const customEvents = (customWeeklyByDate[dateISO] ?? [])
        .filter((event) => !weeklyDeleted[event.id])
        .map((event) => ({
          ...event,
          dateISO,
          completed: weeklyCompletion[event.id] ?? false,
        }))
        .map(applyWeeklyEdits);

      const events = [...baseEvents, ...customEvents];

      const minutesTotal = events.reduce(
        (sum, event) => sum + parseMinutes(event.duration),
        0,
      );
      const minutesDone = events.reduce(
        (sum, event) =>
          sum + (event.completed ? parseMinutes(event.duration) : 0),
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
  }, [
    customWeeklyByDate,
    weekCursor,
    weeklyCompletion,
    weeklyDeleted,
    weeklyEditsById,
  ]);

  const weeklyStats = useMemo<WeeklyStats>(() => {
    const totalMinutes = weeklyDays.reduce((sum, day) => sum + day.minutesTotal, 0);
    const completedMinutes = weeklyDays.reduce(
      (sum, day) => sum + day.minutesDone,
      0,
    );
    const completionRate =
      totalMinutes === 0 ? 0 : Math.round((completedMinutes / totalMinutes) * 100);

    return {
      totalPlanned: `${totalMinutes} min`,
      completed: `${completedMinutes} min`,
      completionRate,
    };
  }, [weeklyDays]);

  const addEventInitialValues = useMemo<Partial<AddEventFormValues> | null>(() => {
    if (editingMonthEvent) {
      const dateISO = resolveCalendarEventDateISO(editingMonthEvent, monthISO);
      const timeVal = toTimeInputValue((editingMonthEvent as any).time) || "09:00";
      return {
        type: (editingMonthEvent as any).type as EventType,
        title: resolveCalendarEventTitle(
          editingMonthEvent,
          String((editingMonthEvent as any).type ?? "Event"),
        ),
        startTime: `${dateISO}T${timeVal}`,
        endTime: `${dateISO}T${timeVal}`,
        className: resolveCalendarEventClassName(editingMonthEvent),
      };
    }

    if (editingWeeklyEvent) {
      const anyWeekly = editingWeeklyEvent as any;
      const patch = weeklyEditsById[editingWeeklyEvent.id] as any;

      const dateISO =
        patch?.startTime?.split("T")[0] ??
        anyWeekly.dateISO ??
        selectedWeeklyDateISO ??
        toISODate(new Date());

      const minutes = parseMinutes(patch?.duration ?? editingWeeklyEvent.duration) || 30;
      const startTime = patch?.startTime ?? `${dateISO}T09:00`;
      const endTime = patch?.endTime ?? addMinutesToDateTimeLocal(startTime, minutes);

      return {
        eventMode: patch?.eventMode ?? "event",
        type: (patch?.type ?? editingWeeklyEvent.type) as unknown as EventType,
        title: patch?.title ?? editingWeeklyEvent.title,
        className:
          patch?.className ?? patch?.subtitle ?? editingWeeklyEvent.subtitle ?? "",
        icon: patch?.icon ?? "AtSign",
        color: patch?.color ?? "#1363FF",
        description: patch?.description ?? "",
        startTime,
        endTime,
        recurring: patch?.recurring ?? false,
        reminders: patch?.reminders ?? [],
        tags: patch?.tags ?? [],
      };
    }

    if (selectedDateISO) {
      return {
        type: "Class",
        title: "",
        startTime: `${selectedDateISO}T09:00`,
        endTime: `${selectedDateISO}T10:00`,
        className: "",
      };
    }

    return null;
  }, [
    editingMonthEvent,
    editingWeeklyEvent,
    monthISO,
    selectedDateISO,
    selectedWeeklyDateISO,
    weeklyEditsById,
  ]);

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
    setTypes((prev) =>
      prev.map((type) =>
        type.id === id ? { ...type, checked: !type.checked } : type,
      ),
    );
  };

  const onToggleWeeklyEvent = (id: string) => {
    setWeeklyCompletion((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const deleteWeeklyEvent = (id: string) => {
    setWeeklyDeleted((prev) => (prev[id] ? prev : { ...prev, [id]: true }));

    setCustomWeeklyByDate((prev) => {
      let changed = false;
      const next: Record<string, WeeklyEvent[]> = {};

      for (const [dateISO, events] of Object.entries(prev)) {
        const filtered = events.filter((event) => event.id !== id);
        if (filtered.length !== events.length) changed = true;
        if (filtered.length > 0) next[dateISO] = filtered;
      }

      return changed ? next : prev;
    });

    setWeeklyCompletion((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });

    if (id.startsWith("custom-") && id.endsWith("-weekly")) {
      const baseId = id.slice(0, -"-weekly".length);
      setMonthlyEvents((prev) =>
        prev.filter((event) => event.id !== `${baseId}-month`),
      );
      setUpcoming((prev) =>
        prev.filter((event) => event.id !== `${baseId}-upcoming`),
      );
    }
  };

  const openAddModalForDate = (dateISO: string) => {
    setSelectedMonthEvent(null);
    setEditingMonthEvent(null);
    setSelectedWeeklyEvent(null);
    setEditingWeeklyEvent(null);
    setSelectedWeeklyDateISO(null);
    setSelectedDateISO(dateISO);
    setIsAddEventOpen(true);
  };

  const openAddModalFromHeader = () => {
    setSelectedMonthEvent(null);
    setEditingMonthEvent(null);
    setSelectedWeeklyEvent(null);
    setEditingWeeklyEvent(null);
    setSelectedWeeklyDateISO(null);
    setSelectedDateISO(null);
    setIsAddEventOpen(true);
  };

  const openEventDetails = (event: CalendarEvent) => {
    setSelectedMonthEvent(event);
  };

  const openEditMonthEvent = (event: CalendarEvent) => {
    setSelectedMonthEvent(null);
    setEditingMonthEvent(event);
    setSelectedWeeklyEvent(null);
    setEditingWeeklyEvent(null);
    setSelectedWeeklyDateISO(null);
    setSelectedDateISO(resolveCalendarEventDateISO(event, monthISO));
    setIsAddEventOpen(true);
  };

  const openWeeklyEventDetails = (event: WeeklyEvent) => {
    setSelectedWeeklyEvent(event);
    setSelectedWeeklyDateISO((event as any).dateISO ?? null);
  };

  const openEditWeeklyEvent = (event: WeeklyEvent) => {
    setSelectedMonthEvent(null);
    setEditingMonthEvent(null);
    setSelectedWeeklyEvent(null);
    setEditingWeeklyEvent(event);
    setSelectedWeeklyDateISO((event as any).dateISO ?? null);
    setSelectedDateISO(null);
    setIsAddEventOpen(true);
  };

  const closeAddModal = () => {
    setIsAddEventOpen(false);
    setEditingMonthEvent(null);
    setEditingWeeklyEvent(null);
    setSelectedDateISO(null);
    setSelectedWeeklyDateISO(null);
  };

  const startEditingSelectedEvent = () => {
    if (!selectedMonthEvent) return;
    setEditingMonthEvent(selectedMonthEvent);
    setSelectedDateISO(resolveCalendarEventDateISO(selectedMonthEvent, monthISO));
    setSelectedMonthEvent(null);
    setIsAddEventOpen(true);
  };

  const startEditingSelectedWeeklyEvent = () => {
    if (!selectedWeeklyEvent) return;
    openEditWeeklyEvent(selectedWeeklyEvent);
  };

  const handleDeleteSelectedWeeklyEvent = () => {
    if (!selectedWeeklyEvent) return;
    deleteWeeklyEvent(selectedWeeklyEvent.id);
    setSelectedWeeklyEvent(null);
  };

  const handleDeleteSelectedMonthEvent = () => {
    if (!selectedMonthEvent) return;

    const eventId = String((selectedMonthEvent as any).id ?? "");
    const customBaseId = getCustomBaseIdFromMonthId(eventId);

    setMonthlyEvents((prev) =>
      prev.filter((event) => String((event as any).id ?? "") !== eventId),
    );

    if (customBaseId) {
      const weeklyId = `${customBaseId}-weekly`;
      const upcomingId = `${customBaseId}-upcoming`;

      setUpcoming((prev) => prev.filter((event) => event.id !== upcomingId));

      setCustomWeeklyByDate((prev) => removeWeeklyCustomEvent(prev, weeklyId));

      setWeeklyCompletion((prev) => {
        if (!(weeklyId in prev)) return prev;
        const next = { ...prev };
        delete next[weeklyId];
        return next;
      });
    } else {
      setUpcoming((prev) => prev.filter((event) => event.id !== eventId));
    }

    setSelectedMonthEvent(null);
  };

  const handleSubmitEvent = (values: AddEventFormValues) => {
    const dateStr = values.startTime ? values.startTime.split("T")[0] : toISODate(new Date());
    const timeStr = values.startTime ? (values.startTime.split("T")[1]?.substring(0, 5) ?? "") : "";
    const eventDate = fromISODate(dateStr);
    const eventTitle = values.title.trim() || values.type;
    const displayTime = formatTime(timeStr);
    const durationMinutes = diffMinutes(values.startTime, values.endTime) || 30;
    const derivedDuration = `${durationMinutes} min`;

    if (editingWeeklyEvent) {
      const id = String((editingWeeklyEvent as any).id ?? editingWeeklyEvent.id);
      const nextType = mapToWeeklyEventType(values.type);
      const minutesFromTimes = diffMinutes(values.startTime, values.endTime);
      const minutes =
        minutesFromTimes ||
        parseMinutes((editingWeeklyEvent as any).duration ?? "30 min") ||
        30;
      const nextDuration = `${minutes} min`;

      setWeeklyEditsById((prev) => ({
        ...prev,
        [id]: {
          ...(prev[id] ?? {}),
          title: eventTitle,
          subtitle: values.className || undefined,
          className: values.className,
          duration: nextDuration,
          type: nextType as WeeklyEventType,
          eventMode: values.eventMode,
          icon: values.icon,
          color: values.color,
          description: values.description,
          startTime: values.startTime,
          endTime: values.endTime,
          recurring: values.recurring,
          reminders: values.reminders,
          tags: values.tags,
        },
      }));

      if (id.startsWith("custom-") && id.endsWith("-weekly")) {
        const baseId = id.slice(0, -"-weekly".length);
        const monthId = `${baseId}-month`;
        const upcomingId = `${baseId}-upcoming`;

        setMonthlyEvents((prev) =>
          prev.map((event) =>
            String((event as any).id ?? "") === monthId
              ? ({
                  ...event,
                  type: values.type,
                  title: eventTitle,
                  dateISO: dateStr,
                  ...(displayTime === "All Day" ? { time: undefined } : { time: displayTime }),
                  ...(values.className ? { className: values.className } : {}),
                } as CalendarEvent)
              : event,
          ),
        );

        setUpcoming((prev) =>
          prev.map((item) =>
            item.id === upcomingId
              ? {
                  ...item,
                  title: eventTitle,
                  time: `${formatMonthDay(eventDate)} - ${displayTime}`,
                  type: values.type,
                  className: values.className || undefined,
                  dateISO: dateStr,
                }
              : item,
          ),
        );

        setCustomWeeklyByDate((prev) => {
          const cleaned = removeWeeklyCustomEvent(prev, id);
          const updatedWeeklyEvent: WeeklyEvent = {
            id,
            title: eventTitle,
            subtitle: values.className || undefined,
            duration: nextDuration,
            type: nextType as WeeklyEventType,
            completed: weeklyCompletion[id] ?? false,
            ...(values.icon ? { icon: values.icon } : {}),
            ...(values.color ? { color: values.color } : {}),
            ...(values.description ? { description: values.description } : {}),
            ...(values.startTime ? { startTime: values.startTime } : {}),
            ...(values.endTime ? { endTime: values.endTime } : {}),
            ...(values.recurring ? { recurring: values.recurring } : {}),
            ...(values.reminders?.length ? { reminders: values.reminders } : {}),
            ...(values.tags?.length ? { tags: values.tags } : {}),
            ...(values.eventMode ? { eventMode: values.eventMode } : {}),
            ...(values.className ? { className: values.className } : {}),
          } as any;

          return {
            ...cleaned,
            [dateStr]: [...(cleaned[dateStr] ?? []), updatedWeeklyEvent],
          };
        });
      }

      closeAddModal();
      return;
    }

    if (editingMonthEvent) {
      const eventId = String((editingMonthEvent as any).id ?? "");
      const customBaseId = getCustomBaseIdFromMonthId(eventId);

      setMonthlyEvents((prev) =>
        prev.map((event) => {
          if (String((event as any).id ?? "") !== eventId) return event;

          return {
            ...event,
            type: values.type,
            title: eventTitle,
            dateISO: dateStr,
            ...(displayTime === "All Day" ? { time: undefined } : { time: displayTime }),
            ...(values.className ? { className: values.className } : {}),
          } as CalendarEvent;
        }),
      );

      if (customBaseId) {
        const weeklyId = `${customBaseId}-weekly`;
        const upcomingId = `${customBaseId}-upcoming`;

        setUpcoming((prev) =>
          prev.map((item) =>
            item.id === upcomingId
              ? {
                  ...item,
                  title: eventTitle,
                  time: `${formatMonthDay(eventDate)} - ${displayTime}`,
                  type: values.type,
                  className: values.className || undefined,
                  dateISO: dateStr,
                }
              : item,
          ),
        );

        setCustomWeeklyByDate((prev) => {
          const cleaned = removeWeeklyCustomEvent(prev, weeklyId);
          const updatedWeeklyEvent: WeeklyEvent = {
            id: weeklyId,
            title: eventTitle,
            subtitle: values.className || undefined,
            duration: derivedDuration,
            type: mapToWeeklyEventType(values.type),
            completed: weeklyCompletion[weeklyId] ?? false,
            ...(values.icon ? { icon: values.icon } : {}),
            ...(values.color ? { color: values.color } : {}),
            ...(values.description ? { description: values.description } : {}),
            ...(values.startTime ? { startTime: values.startTime } : {}),
            ...(values.endTime ? { endTime: values.endTime } : {}),
            ...(values.recurring ? { recurring: values.recurring } : {}),
            ...(values.reminders?.length ? { reminders: values.reminders } : {}),
            ...(values.tags?.length ? { tags: values.tags } : {}),
            ...(values.eventMode ? { eventMode: values.eventMode } : {}),
            ...(values.className ? { className: values.className } : {}),
          };

          return {
            ...cleaned,
            [dateStr]: [...(cleaned[dateStr] ?? []), updatedWeeklyEvent],
          };
        });
      }

      setMonthCursor(startOfMonth(eventDate));
      setWeekCursor(startOfWeekMonday(eventDate));
      closeAddModal();
      return;
    }

    const timestamp = Date.now();
    const baseId = `custom-${timestamp}`;

    setMonthlyEvents((prev) => [
      ...prev,
      {
        id: `${baseId}-month`,
        dateISO: dateStr,
        title: eventTitle,
        type: values.type,
        ...(displayTime === "All Day" ? {} : { time: displayTime }),
        ...(values.className ? { className: values.className } : {}),
      } as CalendarEvent,
    ]);

    setUpcoming((prev) => {
      const next: UpcomingEvent[] = [
        ...prev,
        {
          id: `${baseId}-upcoming`,
          title: eventTitle,
          time: `${formatMonthDay(eventDate)} - ${displayTime}`,
          type: values.type,
          className: values.className || undefined,
          dateISO: dateStr,
        },
      ];

      return sortUpcomingEvents(next);
    });

    const weeklyEvent: WeeklyEvent = {
      id: `${baseId}-weekly`,
      title: eventTitle,
      duration: derivedDuration,
      type: mapToWeeklyEventType(values.type),
      completed: false,
      ...(values.icon ? { icon: values.icon } : {}),
      ...(values.color ? { color: values.color } : {}),
      ...(values.description ? { description: values.description } : {}),
      ...(values.startTime ? { startTime: values.startTime } : {}),
      ...(values.endTime ? { endTime: values.endTime } : {}),
      ...(values.recurring ? { recurring: values.recurring } : {}),
      ...(values.reminders?.length ? { reminders: values.reminders } : {}),
      ...(values.tags?.length ? { tags: values.tags } : {}),
      ...(values.eventMode ? { eventMode: values.eventMode } : {}),
      ...(values.className ? { className: values.className } : {}),
    };

    setCustomWeeklyByDate((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] ?? []), weeklyEvent],
    }));

    setWeeklyCompletion((prev) => ({
      ...prev,
      [weeklyEvent.id]: false,
    }));

    setMonthCursor(startOfMonth(eventDate));
    setWeekCursor(startOfWeekMonday(eventDate));
    closeAddModal();
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 transition-all duration-300 ease-in-out hover:shadow-lg sm:p-5">
        <CalendarHeader
          monthLabel={monthLabel}
          viewMode={viewMode}
          onViewChange={setViewMode}
          onAddEvent={openAddModalFromHeader}
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
              onSelectDay={openAddModalForDate}
              onSelectEvent={openEventDetails}
              onEditEvent={openEditMonthEvent}
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
          onDeleteEvent={deleteWeeklyEvent}
          onSelectEvent={openWeeklyEventDetails}
          onEditEvent={openEditWeeklyEvent}
        />
      )}

      <AddEventModal
        isOpen={isAddEventOpen}
        onClose={closeAddModal}
        onSubmit={handleSubmitEvent}
        mode={editingMonthEvent || editingWeeklyEvent ? "edit" : "add"}
        initialValues={addEventInitialValues}
      />

      <MonthEventDetailsModal
        open={Boolean(selectedMonthEvent)}
        event={selectedMonthEvent}
        monthISO={monthISO}
        eventTypes={types}
        onClose={() => setSelectedMonthEvent(null)}
        onEdit={startEditingSelectedEvent}
        onDelete={handleDeleteSelectedMonthEvent}
      />

      <WeeklyEventDetailsModal
        open={Boolean(selectedWeeklyEvent)}
        event={selectedWeeklyEvent}
        onClose={() => setSelectedWeeklyEvent(null)}
        onEdit={startEditingSelectedWeeklyEvent}
        onDelete={handleDeleteSelectedWeeklyEvent}
      />
    </div>
  );
}
