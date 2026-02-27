import Card from "../../../shared/components/ui/Card";
import InputField from "../../../shared/components/ui/InputField";
import Section from "../../../shared/components/ui/Section";
import ToggleRow from "../../../shared/components/ui/ToggleRow";
import type { PreferenceSettingsData } from "../data/settings.mock";

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

      {/* ✅ Match screenshot: title + subtitle inside the panel, inputs stacked */}
      <Section>
        <Card className="space-y-5 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Default Quiz Settings
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Set default values for live quizzes
            </p>
          </div>

          <div className="space-y-5">
            {preferences.defaultQuizSettings.map((field) => (
              <div key={field.id} className="space-y-2">
                <p className="text-sm font-semibold text-slate-900">
                  {field.label}
                </p>

                {/* ✅ White input + light border like screenshot */}
                <InputField
                  label=""
                  defaultValue={field.value}
                  className="!h-12 !bg-white !border-slate-200"
                />
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </div>
  );
}