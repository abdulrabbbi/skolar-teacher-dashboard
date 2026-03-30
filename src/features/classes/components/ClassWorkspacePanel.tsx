import type { ReactNode } from "react";
import { LayoutGrid, Plus, Settings, Users } from "lucide-react";

import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";

const shellCardClass =
  "rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]";

type WorkspaceFeatureCardProps = {
  icon: ReactNode;
  iconClassName: string;
  title: string;
  description: string;
};

function WorkspaceFeatureCard({
  icon,
  iconClassName,
  title,
  description,
}: WorkspaceFeatureCardProps) {
  return (
    <Card hover={false} className={`${shellCardClass} p-6`}>
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconClassName}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-bold text-slate-900 sm:text-lg">
            {title}
          </h3>
          <p className="mt-2 text-base leading-8 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default function ClassWorkspacePanel() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.9fr)_minmax(320px,0.95fr)]">
      <Card
        hover={false}
        className={`${shellCardClass} px-6 py-10 sm:px-10 sm:py-14`}
      >
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="relative">
            <div className="flex h-30 w-30 items-center justify-center rounded-full bg-[#EEF4FF] sm:h-40 sm:w-40">
              <LayoutGrid className="h-10 w-10 text-[#2563EB]" />
            </div>
            <div className="absolute bottom-4 right-0 flex h-14 w-14 items-center justify-center rounded-full bg-[#DDF8EC] text-[#00B96B] sm:h-16 sm:w-16">
              <Plus className="h-7 w-7" />
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Create Your First Student Workspace
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">
            Workspaces are curated learning environments where you can organize
            study materials and share them with your students. Create modules,
            add study tools, and give your class instant access to all the
            resources they need.
          </p>

          <Button
            size="lg"
            variant="primary"
            className="mt-8 h-10 rounded-2xl bg-[#2563EB] px-8 text-base font-semibold hover:bg-[#1D4ED8] focus-visible:ring-[#2563EB]"
          >
            <Plus className="h-5 w-5" />
            Create Your First Workspace
          </Button>
        </div>
      </Card>

      <div className="space-y-6">
        <WorkspaceFeatureCard
          icon={<LayoutGrid className="h-7 w-7 text-[#2563EB]" />}
          iconClassName="bg-[#EEF4FF]"
          title="Organize Content"
          description="Create modules and organize study materials in one central location"
        />

        <WorkspaceFeatureCard
          icon={<Users className="h-7 w-7 text-[#00B96B]" />}
          iconClassName="bg-[#E7FAF2]"
          title="Easy Sharing"
          description="Students can instantly access and clone materials you've prepared"
        />

        <WorkspaceFeatureCard
          icon={<Settings className="h-7 w-7 text-slate-600" />}
          iconClassName="bg-slate-100"
          title="All Study Tools"
          description="Add flashcards, quizzes, tests, and more to enhance learning"
        />
      </div>
    </div>
  );
}
