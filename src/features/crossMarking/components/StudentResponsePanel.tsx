import type { StudentResponseItem } from "../data/crossMarking.mock";

type Props = {
  responses: StudentResponseItem[];
};

export default function StudentResponsePanel({ responses }: Props) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-[#0F143C0D] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-base font-semibold text-slate-900">Student Responses</h2>
      
      </div>

      {/* Questions */}
      <div className="divide-y divide-slate-100">
        {responses.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-slate-400">
            No responses available.
          </p>
        ) : (
          responses.map((item) => (
            <div key={item.id} className="px-6 py-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {item.marks} marks
                </span>
              </div>

              {item.questionText && (
                <p className="text-sm text-slate-500">{item.questionText}</p>
              )}

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono leading-relaxed">
                  {item.response}
                </pre>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
