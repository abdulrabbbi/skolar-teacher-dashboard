import { Outlet } from "react-router-dom";

import PageHeader from "../../../shared/components/ui/PageHeader";
import TaskCompilerStats from "../components/TaskCompilerStats";
import TaskCompilerActions from "../components/TaskCompilerActions";

import { taskCompilerCopy, taskCompilerStats } from "../data/taskCompiler.mock";

export default function TaskCompilerPage() {
  return (
    <div className="space-y-4">
      {/* Header card (matches Figma top bar) */}
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
        <PageHeader 
          title={taskCompilerCopy.pageTitle}
          subtitle="AI-powered worksheet and assessment generator"
        />
      </div>

      {/* Stats row */}
      <TaskCompilerStats stats={taskCompilerStats} />

      {/* Tabs (route-based) */}
      <TaskCompilerActions />

      {/* Route content */}
      <Outlet />
    </div>
  );
}