import SubjectCards from "../components/SubjectCards";
import { subjectCards } from "../data/taskCompiler.mock";
import { useNavigate } from "react-router-dom";

export default function SubjectSelectPage() {
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-slate-900">Select Your subject</h2>
        <p className="text-sm text-slate-500">Choose a subject to generate aligned content</p>
      </div>

      <div className="mt-4">
        <SubjectCards
          subjects={subjectCards}
          onSelect={(subject) => navigate(`${subject.id}`)}
        />
      </div>
    </section>
  );
}