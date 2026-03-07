import { Bell, Settings as Cog, User } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import { cn } from "../../../shared/lib/cn";
import type { SettingsTab, SettingsTabItem } from "../data/settings.mock";

export type SettingsSidebarProps = {
  tabs: SettingsTabItem[];
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
};

function getTabIcon(tab: SettingsTabItem) {
  const key = String(tab.id ?? tab.label).toLowerCase();

  if (key.includes("profile")) return User;
  if (key.includes("notification")) return Bell;
  if (key.includes("preference")) return Cog;

  return Cog;
}

export default function SettingsSidebar({
  tabs,
  activeTab,
  onTabChange,
}: SettingsSidebarProps) {
  return (
    <Card className="space-y-2 p-3">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const Icon = getTabIcon(tab);

        return (
          <Button
            key={tab.id}
            type="button"
            fullWidth
            variant="ghost"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative h-12 justify-start gap-3 ",
              " shadow-none hover:bg-[#009f5c]",
             
              isActive &&
                "bg-[#00B96B1A] text-[#00B96B] hover:bg-[#00B96B1A]"
            )}
          >
            {/* ✅ green left bar (only active) */}
            {isActive ? (
              <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-[#00B96B]" />
            ) : null}

            <Icon
              className={cn(
                "h-5 w-5",
                isActive ? "text-[#00B96B]" : "text-slate-400"
              )}
            />

            <span
              className={cn(
                "text-sm font-semibold",
                isActive ? "text-[#00B96B]" : "text-slate-600"
              )}
            >
              {tab.label}
            </span>
          </Button>
        );
      })}
    </Card>
  );
}
