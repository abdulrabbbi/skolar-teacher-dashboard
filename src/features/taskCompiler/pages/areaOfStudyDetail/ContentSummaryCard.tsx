function CountPill({ value }: { value: number }) {
  return (
    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#00B96B1A] px-2 text-xs font-semibold text-[#00B96B]">
      {value}
    </span>
  );
}

export default function ContentSummaryCard({
  outcomes,
  knowledge,
  skills,
}: {
  outcomes: number;
  knowledge: number;
  skills: number;
}) {
  return (
    <div className="rounded-2xl border border-[#00B96B] bg-[#00B96B1A] p-5">
      <p className="text-sm font-semibold text-slate-900">Content Summary</p>

      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Outcomes selected:</span>
          <CountPill value={outcomes} />
        </div>
        <div className="flex items-center justify-between">
          <span>Key knowledge selected:</span>
          <CountPill value={knowledge} />
        </div>
        <div className="flex items-center justify-between">
          <span>Key skills selected:</span>
          <CountPill value={skills} />
        </div>
      </div>
    </div>
  );
}

