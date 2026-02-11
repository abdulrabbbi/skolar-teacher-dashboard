
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import InputField from '../../../shared/components/ui/InputField';
import Section from '../../../shared/components/ui/Section';
import type { ProfileSettingsData } from '../data/settings.mock';

export type ProfileSettingsProps = {
  profile: ProfileSettingsData;
};

export default function ProfileSettings({ profile }: ProfileSettingsProps) {
  return (
    <Card className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          {profile.initials}
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-900">{profile.name}</p>
          <p className="text-sm text-slate-500">{profile.role}</p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {profile.fields.map((field) => (
            <div
              key={field.id}
              className={field.fullWidth ? 'md:col-span-2' : undefined}
            >
              <InputField
                label={field.label}
                defaultValue={field.value}
                type={field.type}
                helperText={field.helperText}
                disabled={field.disabled}
              />
            </div>
          ))}
        </div>
      </Section>

      <div className="flex justify-end">
        <Button>{profile.buttonLabel}</Button>
      </div>
    </Card>
  );
}
