import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, Eye, Pencil, MoreVertical, ChevronDown } from "lucide-react";
import Badge, { type BadgeVariant } from "../../../shared/components/ui/Badge";
import Card from "../../../shared/components/ui/Card";
import Table from "../../../shared/components/ui/Table";
import type { AssessmentRow, AssessmentStatus } from "../data/assessments.mock";

export type AssessmentsTableProps = {
  rows: AssessmentRow[];
};

const statusVariant: Record<
  AssessmentStatus,
  "success" | "warning" | "neutral" | "danger"
> = {
  Marking: "warning",
  Active: "success",
  Draft: "neutral",
  Complete: "success",
};

const typeVariant: Record<string, BadgeVariant> = {
  SAC: "warning",
  Test: "neutral",
  Exam: "danger",
};

type FilterDropdownProps = {
  id: string;
  label: string;
  isOpen: boolean;
  options: string[];
  selected: string;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

function FilterDropdown({
  id,
  label,
  isOpen,
  options,
  selected,
  onToggle,
  onSelect,
}: FilterDropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onToggle}
        className="
          inline-flex items-center gap-2
          rounded-xl bg-slate-100
          px-4 py-2 text-sm font-semibold text-slate-700
          hover:bg-slate-200/60 transition
          whitespace-nowrap
        "
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          id={id}
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-[180px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
        >
          {options.map((option) => {
            const isSelected = option === selected;

            return (
              <button
                key={option}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => onSelect(option)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                  isSelected
                    ? "bg-slate-100 font-semibold text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{option}</span>
                {isSelected ? (
                  <Check className="h-4 w-4 text-[#00B96B]" />
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ActionIconButton({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="
        grid h-9 w-9 place-items-center
        rounded-xl border border-slate-200 bg-white
        hover:bg-slate-50 transition
        outline-none focus:outline-none focus:ring-0
      "
    >
      {children}
    </button>
  );
}

export default function AssessmentsTable({ rows }: AssessmentsTableProps) {
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [openDropdown, setOpenDropdown] = useState<"status" | "class" | null>(
    null,
  );
  const rootRef = useRef<HTMLDivElement | null>(null);

  const statusOptions = useMemo(
    () => ["All Status", ...Array.from(new Set(rows.map((row) => row.status)))],
    [rows],
  );
  const classOptions = useMemo(
    () => [
      "All Classes",
      ...Array.from(new Set(rows.map((row) => row.className))),
    ],
    [rows],
  );

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const statusMatch =
          selectedStatus === "All Status" || row.status === selectedStatus;
        const classMatch =
          selectedClass === "All Classes" || row.className === selectedClass;

        return statusMatch && classMatch;
      }),
    [rows, selectedClass, selectedStatus],
  );

  useEffect(() => {
    if (!statusOptions.includes(selectedStatus)) {
      setSelectedStatus("All Status");
    }
  }, [selectedStatus, statusOptions]);

  useEffect(() => {
    if (!classOptions.includes(selectedClass)) {
      setSelectedClass("All Classes");
    }
  }, [classOptions, selectedClass]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={rootRef}>
      <Card className="w-full overflow-hidden border border-slate-200 bg-white p-0">
      <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Assessments
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <FilterDropdown
            id="assessments-status-filter"
            label={selectedStatus}
            isOpen={openDropdown === "status"}
            options={statusOptions}
            selected={selectedStatus}
            onToggle={() =>
              setOpenDropdown((current) =>
                current === "status" ? null : "status",
              )
            }
            onSelect={(value) => {
              setSelectedStatus(value);
              setOpenDropdown(null);
            }}
          />
          <FilterDropdown
            id="assessments-class-filter"
            label={selectedClass}
            isOpen={openDropdown === "class"}
            options={classOptions}
            selected={selectedClass}
            onToggle={() =>
              setOpenDropdown((current) => (current === "class" ? null : "class"))
            }
            onSelect={(value) => {
              setSelectedClass(value);
              setOpenDropdown(null);
            }}
          />
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      <div className="block lg:hidden">
        <div className="divide-y divide-slate-100">
          {filteredRows.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-slate-500">
              No assessments found for the selected filters.
            </div>
          ) : (
            filteredRows.map((row) => (
            <div key={row.id} className="px-6 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-900 break-words">
                    {row.title}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant={typeVariant[row.type] ?? "neutral"}>
                      {row.type}
                    </Badge>
                    <Badge variant={statusVariant[row.status]}>
                      {row.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <ActionIconButton ariaLabel="View">
                    <Eye className="h-4 w-4 text-slate-700" />
                  </ActionIconButton>
                  <ActionIconButton ariaLabel="Edit">
                    <Pencil className="h-4 w-4 text-slate-700" />
                  </ActionIconButton>
                  <ActionIconButton ariaLabel="More">
                    <MoreVertical className="h-4 w-4 text-slate-700" />
                  </ActionIconButton>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="text-slate-500">Class</div>
                <div className="text-slate-900 break-words">{row.className}</div>

                <div className="text-slate-500">Due Date</div>
                <div className="text-slate-900">{row.dueDate}</div>

                <div className="text-slate-500">Submissions</div>
                <div className="text-slate-900">{row.submissions}</div>

                <div className="text-slate-500">Marked</div>
                <div className="text-slate-900">{row.marked}</div>

                <div className="text-slate-500">Avg Score</div>
                <div className="font-semibold text-slate-900">{row.avgScore}</div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block">
        <Table
          headers={[
            "Assessment",
            "Type",
            "Class",
            "Due Date",
            "Status",
            "Submissions",
            "Marked",
            "Avg Score",
            "Actions",
          ]}
          className="
            w-full
            !border-0 !rounded-none
            [&_thead]:text-slate-500
            [&_thead_th]:normal-case
            [&_thead_th]:font-medium
            [&_thead_th]:text-sm
            [&_thead_tr]:border-b
            [&_thead_tr]:border-slate-200/60
            [&_tbody_tr:hover]:bg-slate-50
          "
        >
          {filteredRows.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="px-6 py-10 text-center text-sm text-slate-500"
              >
                No assessments found for the selected filters.
              </td>
            </tr>
          ) : (
            filteredRows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 align-middle">
                <td className="px-6 py-5 w-[38%]">
                  <div className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                    {row.title}
                  </div>
                </td>

                <td className="px-4 py-5 whitespace-nowrap">
                  <Badge variant={typeVariant[row.type] ?? "neutral"}>
                    {row.type}
                  </Badge>
                </td>

                <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
                  {row.className}
                </td>

                <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
                  {row.dueDate}
                </td>

                <td className="px-4 py-5 whitespace-nowrap">
                  <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
                </td>

                <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
                  {row.submissions}
                </td>

                <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
                  {row.marked}
                </td>

                <td className="px-4 py-5 whitespace-nowrap text-sm font-semibold text-slate-900">
                  {row.avgScore}
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-3">
                    <ActionIconButton ariaLabel="View">
                      <Eye className="h-4 w-4 text-slate-700" />
                    </ActionIconButton>
                    <ActionIconButton ariaLabel="Edit">
                      <Pencil className="h-4 w-4 text-slate-700" />
                    </ActionIconButton>
                    <ActionIconButton ariaLabel="More">
                      <MoreVertical className="h-4 w-4 text-slate-700" />
                    </ActionIconButton>
                  </div>
                </td>
              </tr>
            ))
          )}
        </Table>
      </div>
      </Card>
    </div>
  );
}
