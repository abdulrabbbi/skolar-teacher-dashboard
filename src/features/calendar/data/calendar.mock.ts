
export type EventType = 'SAC' | 'Exam' | 'Deadline' | 'Class' | 'Meeting';

export type CalendarEvent = {
  id: string;
  day: number;
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
};

export const calendarMonth = 'January 2026';

export const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);

export const eventTypes: EventTypeConfig[] = [
  {
    id: 'SAC',
    label: 'SAC',
    badgeClass: 'bg-purple-100 text-purple-700',
    dotClass: 'bg-purple-500',
    checked: true,
  },
  {
    id: 'Exam',
    label: 'Exam',
    badgeClass: 'bg-rose-100 text-rose-700',
    dotClass: 'bg-rose-500',
    checked: true,
  },
  {
    id: 'Deadline',
    label: 'Deadline',
    badgeClass: 'bg-orange-100 text-orange-700',
    dotClass: 'bg-orange-500',
    checked: true,
  },
  {
    id: 'Class',
    label: 'Class',
    badgeClass: 'bg-blue-100 text-blue-700',
    dotClass: 'bg-blue-500',
    checked: true,
  },
  {
    id: 'Meeting',
    label: 'Meeting',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    dotClass: 'bg-emerald-500',
    checked: true,
  },
];

export const calendarEvents: CalendarEvent[] = [
  { id: 'jan-14-class', day: 14, type: 'Class' },
  { id: 'jan-15-exam', day: 15, type: 'Exam' },
  { id: 'jan-16-class-1', day: 16, type: 'Class' },
  { id: 'jan-16-class-2', day: 16, type: 'Class' },
  { id: 'jan-17-deadline', day: 17, type: 'Deadline' },
  { id: 'jan-18-deadline', day: 18, type: 'Deadline' },
  { id: 'jan-20-sac', day: 20, type: 'SAC' },
  { id: 'jan-21-meeting', day: 21, type: 'Meeting' },
  { id: 'jan-22-exam', day: 22, type: 'Exam' },
  { id: 'jan-28-meeting', day: 28, type: 'Meeting' },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 'year-12-methods-am',
    title: 'Year 12 Methods',
    time: 'Jan 16 � 11:00 AM',
    type: 'Class',
    className: 'Year 12 Methods',
  },
  {
    id: 'year-11-methods-pm',
    title: 'Year 11 Methods',
    time: 'Jan 16 � 2:00 PM',
    type: 'Class',
    className: 'Year 11 Methods',
  },
  {
    id: 'marking-deadline',
    title: 'Marking Deadline',
    time: 'Jan 17 � 5:00 PM',
    type: 'Deadline',
  },
  {
    id: 'sac-2-calculus',
    title: 'SAC 2: Calculus',
    time: 'Jan 20 � 9:00 PM',
    type: 'SAC',
    className: 'Year 12 Methods',
  },
  {
    id: 'department-meeting',
    title: 'Department Meeting',
    time: 'Jan 21 � 3:30 PM',
    type: 'Meeting',
  },
];
