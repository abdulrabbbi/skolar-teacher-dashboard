
import Card from '../../../shared/components/ui/Card';
import Section from '../../../shared/components/ui/Section';
import ToggleRow from '../../../shared/components/ui/ToggleRow';
import type { ToggleSetting } from '../data/settings.mock';

export type NotificationSettingsProps = {
  items: ToggleSetting[];
};

export default function NotificationSettings({ items }: NotificationSettingsProps) {
  return (
    <Section>
      <Card className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
          >
            <ToggleRow
              title={item.title}
              description={item.description}
              enabled={item.enabled}
            />
          </div>
        ))}
      </Card>
    </Section>
  );
}
