export type EventType = "SAC" | "Exam" | "Deadline" | "Class" | "Meeting";

export type CalendarEvent = {
  id: string;
  day?: number;
  dateISO?: string;
  title?: string;
  time?: string;
  type: EventType;
};

export type EventTypeConfig = {
  id: EventType;
  label: string;
  badgeClass: string;
  dotClass: string;
  checked: boolean;
};

export type UpcomingEvent = {
  id: string;
  title: string;
  time: string;
  type: EventType;
  className?: string;
  dateISO?: string;
};

export const calendarMonth = "January 2026";

export const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);

export const eventTypes: EventTypeConfig[] = [
  {
    id: "SAC",
    label: "SAC",
    badgeClass: "bg-purple-100 text-purple-700",
    dotClass: "bg-purple-500",
    checked: true,
  },
  {
    id: "Exam",
    label: "Exam",
    badgeClass: "bg-rose-100 text-rose-700",
    dotClass: "bg-rose-500",
    checked: true,
  },
  {
    id: "Deadline",
    label: "Deadline",
    badgeClass: "bg-orange-100 text-orange-700",
    dotClass: "bg-orange-500",
    checked: true,
  },
  {
    id: "Class",
    label: "Class",
    badgeClass: "bg-blue-100 text-blue-700",
    dotClass: "bg-blue-500",
    checked: true,
  },
  {
    id: "Meeting",
    label: "Meeting",
    badgeClass: "bg-[#00B96B1A] text-[#00B96B]",
    dotClass: "bg-[#00B96B]",
    checked: true,
  },
];

export const calendarEvents: CalendarEvent[] = [
  { id: "jan-14-class", day: 14, title: "Year 12 Methods", time: "11:00 AM", type: "Class" },
  { id: "jan-15-exam", day: 15, title: "Biology Exam", time: "10:30 AM", type: "Exam" },
  { id: "jan-16-class-1", day: 16, title: "Year 11 Methods", time: "09:00 AM", type: "Class" },
  { id: "jan-16-class-2", day: 16, title: "Year 12 Methods", time: "02:00 PM", type: "Class" },
  { id: "jan-17-deadline", day: 17, title: "Physics Marking", time: "05:00 PM", type: "Deadline" },
  { id: "jan-18-deadline", day: 18, title: "Assessment Review", time: "04:00 PM", type: "Deadline" },
  { id: "jan-20-sac", day: 20, title: "SAC 2: Calculus", time: "09:00 PM", type: "SAC" },
  { id: "jan-21-meeting", day: 21, title: "Department Meeting", time: "03:30 PM", type: "Meeting" },
  { id: "jan-22-exam", day: 22, title: "Chemistry Exam", time: "12:00 PM", type: "Exam" },
  { id: "jan-28-meeting", day: 28, title: "Parent Meeting", time: "01:00 PM", type: "Meeting" },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: "year-12-methods-am",
    title: "Year 12 Methods",
    time: "Jan 16 - 11:00 AM",
    type: "Class",
    className: "Year 12 Methods",
    dateISO: "2026-01-16",
  },
  {
    id: "year-11-methods-pm",
    title: "Year 11 Methods",
    time: "Jan 16 - 2:00 PM",
    type: "Class",
    className: "Year 11 Methods",
    dateISO: "2026-01-16",
  },
  {
    id: "marking-deadline",
    title: "Marking Deadline",
    time: "Jan 17 - 5:00 PM",
    type: "Deadline",
    dateISO: "2026-01-17",
  },
  {
    id: "sac-2-calculus",
    title: "SAC 2: Calculus",
    time: "Jan 20 - 9:00 PM",
    type: "SAC",
    className: "Year 12 Methods",
    dateISO: "2026-01-20",
  },
  {
    id: "department-meeting",
    title: "Department Meeting",
    time: "Jan 21 - 3:30 PM",
    type: "Meeting",
    dateISO: "2026-01-21",
  },
];


