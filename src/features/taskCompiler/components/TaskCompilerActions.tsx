import { Layers, Zap, History } from 'lucide-react';

export type TaskCompilerTab =
  | 'by-subject'
  | 'quick-content'
  | 'history';

const actions = [
  { id: 'by-subject', label: 'By Subject & Study Design', icon: Layers },
  { id: 'quick-content', label: 'Generate Quick Content', icon: Zap },
  { id: 'history', label: 'Task History', icon: History },
];

export type TaskCompilerActionsProps = {
  activeTab: TaskCompilerTab;
  onTabChange: (tab: TaskCompilerTab) => void;
};

export default function TaskCompilerActions({
  activeTab,
  onTabChange,
}: TaskCompilerActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        const isActive = activeTab === action.id;
        return (
          <button
            key={action.id}
            type="button"
            onClick={() => onTabChange(action.id as TaskCompilerTab)}
            className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all duration-200 hover:-translate-y-0.5 ${
              isActive
                ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
            aria-pressed={isActive}
          >
            <Icon className="h-4 w-4 text-slate-500 transition-transform duration-200 group-hover:scale-110" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
