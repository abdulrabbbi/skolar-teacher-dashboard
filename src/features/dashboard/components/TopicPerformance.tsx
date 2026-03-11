import { useMemo, useState } from "react";
import Badge from "../../../shared/components/ui/Badge";
import Button from "../../../shared/components/ui/Button";
import ProgressBar from "../../../shared/components/ui/ProgressBar";
import type { TopicPerformanceItem } from "../data/dashboard.mock";
import GenerateWorksheetModal, {
  type GenerateWorksheetPayload,
} from "./GenerateWorksheetModal";

export type TopicPerformanceProps = {
  topics: TopicPerformanceItem[];
};

const getVariant = (percent: number) => {
  if (percent >= 80) return "green" as const;
  if (percent >= 60) return "orange" as const;
  return "red" as const;
};

export default function TopicPerformance({
  topics,
}: TopicPerformanceProps) {
  const [worksheetOpen, setWorksheetOpen] = useState(false);

  const worksheetTopics = useMemo(() => {
    return topics.map((topic) => ({
      id: topic.id,
      label: topic.topic,
      checked: topic.percent < 60,
    }));
  }, [topics]);

  const handleGenerateWorksheet = (payload: GenerateWorksheetPayload) => {
    console.log("Generate worksheet payload:", payload);
    alert(`Worksheet requested for: ${payload.topics.join(", ")}`);
  };

  return (
    <>
      <section className="w-full space-y-6">
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-emerald-950">
            Topic Performance
          </h2>
          <p className="text-sm text-emerald-900/70">This week's pain points</p>
        </div>

        <div className="space-y-6">
          {topics.map((topic) => (
            <div key={topic.id} className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-semibold text-slate-900 sm:text-[15px]">
                    {topic.topic}
                  </span>

                  {topic.tags?.map((tag) => (
                    <Badge key={tag} variant="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <span className="shrink-0 text-sm font-medium text-slate-500">
                  {topic.percent}%
                </span>
              </div>

              <ProgressBar
                value={topic.percent}
                variant={getVariant(topic.percent)}
              />
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="success"
          size="sm"
          className="w-full"
          onClick={() => {
            console.log("Generate targeted worksheet button clicked");
            setWorksheetOpen(true);
          }}
        >
          Generate targeted worksheet for weak topics
        </Button>
      </section>

      <GenerateWorksheetModal
        open={worksheetOpen}
        topics={worksheetTopics}
        onClose={() => setWorksheetOpen(false)}
        onGenerate={handleGenerateWorksheet}
      />
    </>
  );
}
