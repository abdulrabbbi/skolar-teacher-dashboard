export type ClassDetailTab = "workspaces" | "students" | "settings" | "insights";

export type ClassDetailTabsProps = {
  activeTab: ClassDetailTab;
  onTabChange: (tab: ClassDetailTab) => void;
};

const activeTabClass = "border-[#2563EB] text-[#2563EB]";
const inactiveTabClass =
  "border-transparent text-slate-500 hover:text-slate-900";

const tabs: Array<{ id: ClassDetailTab; label: string }> = [
  { id: "workspaces", label: "Workspaces" },
  { id: "students", label: "Students" },
  { id: "settings", label: "Settings" },
  { id: "insights", label: "Insights" },
];

export default function ClassDetailTabs({
  activeTab,
  onTabChange,
}: ClassDetailTabsProps) {
  return (
    <div className="border-b border-slate-200">
      <div className="flex flex-wrap gap-8 text-[15px] font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`border-b-2 pb-4 transition ${activeTab === tab.id ? activeTabClass : inactiveTabClass}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
