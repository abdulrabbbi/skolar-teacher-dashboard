import ProgressBar from "../../../shared/components/ui/ProgressBar";
import Card from "../../../shared/components/ui/Card";
import Badge from "../../../shared/components/ui/Badge";
import Button from "../../../shared/components/ui/Button";
import type { TopicPerformanceItem } from "../data/dashboard.mock";

export type TopicPerformanceProps = {
  topics: TopicPerformanceItem[];
};

const getVariant = (percent: number) => {
  if (percent >= 80) return "green" as const;
  if (percent >= 60) return "orange" as const;
  return "red" as const;
};

export default function TopicPerformance({ topics }: TopicPerformanceProps) {
  return (
    <section className="space-y-2 w-full">
      <h2 className="text-base font-semibold text-slate-900">
        Topic Performance
      </h2>

      <p className="text-sm text-slate-500">
        This week's pain points
      </p>

      <Card
        className="
          space-y-6 w-full p-5
          transition-all duration-300 ease-in-out
          hover:-translate-y-1 hover:shadow-xl
        "
      >
        {topics.map((topic) => (
          <div key={topic.id} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-slate-900">
                  {topic.topic}
                </span>

                {topic.tags?.map((tag) => (
                  <Badge key={tag} variant="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>

              <span className="text-slate-500">
                {topic.percent}%
              </span>
            </div>

            <ProgressBar
              value={topic.percent}
              variant={getVariant(topic.percent)}
            />
          </div>
        ))}

        <Button
          variant="success"
          size="sm"
          className="w-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
        >
          Generate targeted worksheet for weak topics
        </Button>
      </Card>
    </section>
  );
}
