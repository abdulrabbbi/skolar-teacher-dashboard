// src/app/router/routes.ts
export const TEACHER_ROUTE_PREFIX = '/teacher';

export type TeacherRouteGroup = 'Main' | 'Tools' | 'Resources' | 'Bottom';

export interface TeacherRouteItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  slug: string;
  label: string;
  fullPath: string;
  group: TeacherRouteGroup;
}

const buildTeacherRoute = (slug: string) => `${TEACHER_ROUTE_PREFIX}/${slug}`;

export const ROUTES = {
  splash: "/",
  onboarding: "/onboarding",
  authAccountType: "/auth/account-type",
  authWelcome: "/auth/welcome",
  authLogin: "/auth/login",
  authSignup: "/auth/signup",
  authVerifyEmail: "/auth/verify-email",
  authSetupEducation: "/auth/setup/education",
  authSetupSubjects: "/auth/setup/subjects",
  authSetupTarget: "/auth/setup/target-atar",
  authSetupPreferences: "/auth/setup/preferences",
  dashboard: buildTeacherRoute('dashboard'),
  classes: buildTeacherRoute('classes'),
  analytics: buildTeacherRoute('analytics'),
  calendar: buildTeacherRoute('calendar'),
  games: buildTeacherRoute('games'),
  assessments: buildTeacherRoute('assessments'),
  crossMarking: buildTeacherRoute('cross-marking'),
  taskCompiler: buildTeacherRoute('task-compiler'),
  liveQuiz: buildTeacherRoute('live-quiz'),
  liveQuizSession: (id: string) =>
    buildTeacherRoute(`live-quiz/session/${id}`),
  contentLibrary: buildTeacherRoute('content-library'),
  curriculum: buildTeacherRoute('curriculum'),
  settings: buildTeacherRoute('settings'),
  profile: buildTeacherRoute('profile'),
  planner: buildTeacherRoute('planner'),
  progress: buildTeacherRoute('progress'),
  exam: buildTeacherRoute('exam'),
  ask: buildTeacherRoute('ask'),
  subject: (id: string) => `${TEACHER_ROUTE_PREFIX}/subject/${id}`,
};

export const teacherRoutes: TeacherRouteItem[] = [
  {
    slug: 'dashboard',
    label: 'Dashboard',
    fullPath: buildTeacherRoute('dashboard'),
    group: 'Main',
  },
  {
    slug: 'classes',
    label: 'My Classes',
    fullPath: buildTeacherRoute('classes'),
    group: 'Main',
  },
  {
    slug: 'analytics',
    label: 'Analytics',
    fullPath: buildTeacherRoute('analytics'),
    group: 'Main',
  },
  {
    slug: 'calendar',
    label: 'Calendar',
    fullPath: buildTeacherRoute('calendar'),
    group: 'Main',
  },
  {
    slug: 'games',
    label: 'Games',
    fullPath: buildTeacherRoute('games'),
    group: 'Main',
  },
  {
    slug: 'assessments',
    label: 'Assessments',
    fullPath: buildTeacherRoute('assessments'),
    group: 'Tools',
  },
  {
    slug: 'cross-marking',
    label: 'Cross-Marking',
    fullPath: buildTeacherRoute('cross-marking'),
    group: 'Tools',
  },
  {
    slug: 'task-compiler',
    label: 'Task Compiler',
    fullPath: buildTeacherRoute('task-compiler'),
    group: 'Tools',
  },
  {
    slug: 'live-quiz',
    label: 'Live Quiz',
    fullPath: buildTeacherRoute('live-quiz'),
    group: 'Tools',
  },
  {
    slug: 'content-library',
    label: 'Content Library',
    fullPath: buildTeacherRoute('content-library'),
    group: 'Resources',
  },
  {
    slug: 'curriculum',
    label: 'Curriculum',
    fullPath: buildTeacherRoute('curriculum'),
    group: 'Resources',
  },
  {
    slug: 'settings',
    label: 'Settings',
    fullPath: buildTeacherRoute('settings'),
    group: 'Bottom',
  },
];

export interface SidebarSection {
  title: TeacherRouteGroup;
  items: TeacherRouteItem[];
}

const teacherRouteGroups: TeacherRouteGroup[] = [
  'Main',
  'Tools',
  'Resources',
  'Bottom',
];

export const teacherSidebarSections: SidebarSection[] = teacherRouteGroups.map(
  (group) => ({
    title: group,
    items: teacherRoutes.filter((route) => route.group === group),
  }),
);
