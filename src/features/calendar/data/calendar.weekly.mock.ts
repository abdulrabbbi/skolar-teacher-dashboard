
export type WeeklyEventType = "Exam" | "Class" | "Deadline";
export type WeeklyEvent = {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  type: WeeklyEventType;
  completed?: boolean;
};
export type WeeklyDay = {
  id: string;
  label: string;
  date: string;
  minutesDone: number;
  minutesTotal: number;
  events: WeeklyEvent[];
};
export type WeeklyStats = {
  totalPlanned: string;
  completed: string;
  completionRate: number;
};
export const weeklyHeaderLabel = "Week of Jan 01 - 07";
export const weeklyStats: WeeklyStats = {
  totalPlanned: "265 min",
  completed: "50 min",
  completionRate: 19,
};
const subjectEvent = (id: string): WeeklyEvent => ({
  id,
  title: "Subject Lorem Ipsum",
  duration: "20 min",
  type: "Class",
});
export const weeklyDays: WeeklyDay[] = [
  {
    id: "mon",
    label: "Mon",
    date: "Dec 23",
    minutesDone: 50,
    minutesTotal: 90,
    events: [
      {
        id: "biology-exam",
        title: "Biology Exam",
        duration: "40 min",
        type: "Exam",
      },
      {
        id: "math-class",
        title: "Mathematics Class (Year 12)",
        duration: "50 min",
        type: "Class",
      },
      {
        id: "physics-deadline",
        title: "Physics Marking Deadline",
        duration: "30 min",
        type: "Deadline",
      },
    ],
  },
  {
    id: "tue",
    label: "Tue",
    date: "Dec 24",
    minutesDone: 50,
    minutesTotal: 90,
    events: [subjectEvent("tue-1"), subjectEvent("tue-2")],
  },
  {
    id: "wed",
    label: "Wed",
    date: "Dec 25",
    minutesDone: 50,
    minutesTotal: 90,
    events: [subjectEvent("wed-1"), subjectEvent("wed-2")],
  },
  {
    id: "thu",
    label: "Thu",
    date: "Dec 26",
    minutesDone: 50,
    minutesTotal: 90,
    events: [subjectEvent("thu-1"), subjectEvent("thu-2")],
  },
  {
    id: "fri",
    label: "Fri",
    date: "Dec 27",
    minutesDone: 50,
    minutesTotal: 90,
    events: [subjectEvent("fri-1")],
  },
  {
    id: "sat",
    label: "Sat",
    date: "Dec 28",
    minutesDone: 50,
    minutesTotal: 90,
    events: [subjectEvent("sat-1")],
  },
  {
    id: "sun",
    label: "Sun",
    date: "Dec 29",
    minutesDone: 50,
    minutesTotal: 90,
    events: [subjectEvent("sun-1")],
  },
];
