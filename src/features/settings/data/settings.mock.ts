
export type SettingsTab = 'profile' | 'notifications' | 'preferences';

export type SettingsTabItem = {
  id: SettingsTab;
  label: string;
};

export type ProfileField = {
  id: string;
  label: string;
  value: string;
  type?: string;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
};

export type ProfileSettingsData = {
  name: string;
  role: string;
  initials: string;
  fields: ProfileField[];
  buttonLabel: string;
};

export type ToggleSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export type PreferenceSettingsData = {
  toggles: ToggleSetting[];
  defaultQuizSettings: ProfileField[];
};

export const settingsTabs: SettingsTabItem[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'preferences', label: 'Preferences' },
];

export const profileSettings: ProfileSettingsData = {
  name: 'Ms. Sarah Johnson',
  role: 'Mathematics Teacher',
  initials: 'SJ',
  fields: [
    {
      id: 'first-name',
      label: 'First Name',
      value: 'Sarah',
    },
    {
      id: 'last-name',
      label: 'Last Name',
      value: 'Johnson',
    },
    {
      id: 'email',
      label: 'Email',
      value: 's.johnson@school.edu',
      type: 'email',
    },
    {
      id: 'school',
      label: 'School',
      value: 'Melbourne Grammar School',
      helperText: 'School details are managed by your institution administrator',
      disabled: true,
      fullWidth: true,
    },
  ],
  buttonLabel: 'Save Changes',
};

export const notificationSettings: ToggleSetting[] = [
  {
    id: 'email-notifications',
    title: 'Email Notifications',
    description: 'Receive email updates for important events',
    enabled: true,
  },
  {
    id: 'assignment-reminders',
    title: 'Assignment Reminders',
    description: 'Get notified before assignment due dates',
    enabled: true,
  },
  {
    id: 'student-submissions',
    title: 'Student Submissions',
    description: 'Notify when students submit assignments',
    enabled: true,
  },
  {
    id: 'grade-published',
    title: 'Grade Published',
    description: 'Confirmation when grades are published to students',
    enabled: true,
  },
  {
    id: 'cross-marking-alerts',
    title: 'Cross-Marking Alerts',
    description: 'Notify when moderation is required',
    enabled: true,
  },
  {
    id: 'weekly-digest',
    title: 'Weekly Digest',
    description: 'Receive a weekly summary of class activity',
    enabled: false,
  },
];

export const preferenceSettings: PreferenceSettingsData = {
  toggles: [
    {
      id: 'auto-save-drafts',
      title: 'Auto-save Drafts',
      description: 'Automatically save assessment and feedback drafts',
      enabled: true,
    },
    {
      id: 'skolar-suggestions',
      title: 'Show SKOLAR Suggestions',
      description: 'Display AI-powered recommendations and insights',
      enabled: true,
    },
    {
      id: 'detailed-analytics',
      title: 'Detailed Analytics Dashboard',
      description: 'Show advanced metrics and data visualizations',
      enabled: false,
    },
  ],
  defaultQuizSettings: [
    {
      id: 'default-timer',
      label: 'Default Timer per Question',
      value: '',
    },
    {
      id: 'default-difficulty',
      label: 'Default Difficulty Level',
      value: '',
    },
  ],
};
