import Card from "../../../shared/components/ui/Card";
import GenerateQuickContentForm from "../components/GenerateQuickContentForm";
import ClassWeakPointsCard from "../components/ClassWeakPointsCard";
import QuickTemplatesCard from "../components/QuickTemplatesCard";

export default function GenerateQuickContentPage() {
  return (
    <section className="space-y-6">
      <Card className="rounded-2xl bg-white p-5 shadow-sm sm:p-6 lg:p-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">
            Generate Content
          </h2>
          <p className="text-sm text-slate-500">
            Create worksheets aligned to VCAA outcomes
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <GenerateQuickContentForm />
          <div className="space-y-6">
            <ClassWeakPointsCard />
            <QuickTemplatesCard />
          </div>
        </div>
      </Card>
    </section>
  );
}