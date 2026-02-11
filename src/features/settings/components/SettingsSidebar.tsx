
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import { cn } from '../../../shared/lib/cn';
import type { SettingsTab, SettingsTabItem } from '../data/settings.mock';

export type SettingsSidebarProps = {
  tabs: SettingsTabItem[];
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
};

export default function SettingsSidebar({
  tabs,
  activeTab,
  onTabChange,
}: SettingsSidebarProps) {
  return (
    <Card className="space-y-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <Button
            key={tab.id}
            type="button"
            fullWidth
            variant={isActive ? 'secondary' : 'ghost'}
            className={cn('justify-start', isActive && 'text-slate-900')}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </Button>
        );
      })}
    </Card>
  );
}
