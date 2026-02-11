
import Card from '../../../shared/components/ui/Card';
import InputField from '../../../shared/components/ui/InputField';
import Section from '../../../shared/components/ui/Section';
import ToggleRow from '../../../shared/components/ui/ToggleRow';
import type { PreferenceSettingsData } from '../data/settings.mock';

export type PreferenceSettingsProps = {
  preferences: PreferenceSettingsData;
};

export default function PreferenceSettings({ preferences }: PreferenceSettingsProps) {
  return (
    <div className="space-y-6">
      <Section>
        <Card className="space-y-4">
          {preferences.toggles.map((item) => (
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

      <Section title="Default Quiz Settings">
        <Card className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {preferences.defaultQuizSettings.map((field) => (
            <InputField
              key={field.id}
              label={field.label}
              defaultValue={field.value}
            />
          ))}
        </Card>
      </Section>
    </div>
  );
}
