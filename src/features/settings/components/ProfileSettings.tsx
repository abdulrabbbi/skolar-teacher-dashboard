import { Upload } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import InputField from "../../../shared/components/ui/InputField";
import Section from "../../../shared/components/ui/Section";
import type { ProfileSettingsData } from "../data/settings.mock";

export type ProfileSettingsProps = {
  profile: ProfileSettingsData;
};

export default function ProfileSettings({ profile }: ProfileSettingsProps) {
  return (
    <Card className="space-y-6">
      {/* TOP ROW (avatar + name + change photo button) */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* ✅ green avatar like figma */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
            {profile.initials}
          </div>

          <div>
            <p className="text-lg font-semibold text-slate-900">{profile.name}</p>
            <p className="text-sm text-slate-500">{profile.role}</p>
          </div>
        </div>

        {/* ✅ Change Photo button (missing) */}
        <Button
          variant="outline"
          className="h-10 gap-2 rounded-xl px-4"
          type="button"
        >
          <Upload className="h-4 w-4" />
          Change Photo
        </Button>
      </div>

      <Section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {profile.fields.map((field) => (
            <div
              key={field.id}
              className={field.fullWidth ? "md:col-span-2" : undefined}
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