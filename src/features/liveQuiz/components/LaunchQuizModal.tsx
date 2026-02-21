import { X, Sparkles } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import SelectField from '../../../shared/components/ui/SelectField';
import ToggleRow from '../../../shared/components/ui/ToggleRow';
import type {
  DifficultyOption,
  LiveQuizSelectOption,
  QuizSummary,
  ToggleSetting,
} from '../data/liveQuiz.mock';

export type LaunchQuizModalProps = {
  isOpen: boolean;
  onClose: () => void;
  classOptions: LiveQuizSelectOption[];
  topicOptions: LiveQuizSelectOption[];
  questionOptions: LiveQuizSelectOption[];
  timerOptions: LiveQuizSelectOption[];
  difficultyOptions: DifficultyOption[];
  reasoningToggle: ToggleSetting;
  summary: QuizSummary;
};

export default function LaunchQuizModal({
  isOpen,
  onClose,
  classOptions,
  topicOptions,
  questionOptions,
  timerOptions,
  difficultyOptions,
  reasoningToggle,
  summary,
}: LaunchQuizModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* MODAL */}
      <Card className="relative z-10 w-full max-w-xl max-h-[90vh] p-6 flex flex-col transition-all duration-200">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Launch New Quiz
            </h2>
            <p className="text-sm text-slate-500">
              Configure your live quiz settings before launching
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-slate-100"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-5">
          {/* FORM */}
          <div className="grid grid-cols-1 gap-4">
            <SelectField label="Select Class" defaultValue="">
              {classOptions.map((o) => (
                <option key={o.id} value={o.value} disabled={!o.value}>
                  {o.label}
                </option>
              ))}
            </SelectField>

            <SelectField label="Select Topic / AOS" defaultValue="">
              {topicOptions.map((o) => (
                <option key={o.id} value={o.value} disabled={!o.value}>
                  {o.label}
                </option>
              ))}
            </SelectField>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                label="Number of Questions"
                defaultValue={questionOptions[0]?.value}
              >
                {questionOptions.map((o) => (
                  <option key={o.id} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </SelectField>

              <SelectField
                label="Timer per Question (seconds)"
                defaultValue={timerOptions[0]?.value}
              >
                {timerOptions.map((o) => (
                  <option key={o.id} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>

          {/* DIFFICULTY */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Difficulty
            </p>
            <div className="flex flex-wrap gap-2">
              {difficultyOptions.map((option) => (
                <Button
                  key={option.id}
                  size="sm"
                  variant={option.selected ? 'success' : 'outline'}
                  className="transition-all duration-200 hover:-translate-y-0.5"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* TOGGLE */}
          <ToggleRow
            title={reasoningToggle.title}
            description={reasoningToggle.description}
            enabled={reasoningToggle.enabled}
          />

          {/* SUMMARY */}
          <Card className="flex gap-3 border border-emerald-200 bg-emerald-50 p-4 shadow-none transition-all duration-200">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-semibold text-emerald-900">
                Quiz Summary
              </h3>

              <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div>
                  <p className="text-xs text-emerald-700">Questions</p>
                  <p className="font-semibold text-emerald-900">
                    {summary.questions}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-700">Difficulty</p>
                  <p className="font-semibold text-emerald-900">
                    {summary.difficulty}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-700">Time per Q</p>
                  <p className="font-semibold text-emerald-900">
                    {summary.timePerQuestion}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-700">Total Time</p>
                  <p className="font-semibold text-emerald-900">
                    {summary.totalTime}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="transition-all duration-200 hover:-translate-y-0.5"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="transition-all duration-200 hover:-translate-y-0.5"
          >
            Start Live Quiz
          </Button>
        </div>
      </Card>
    </div>
  );
}



// import { X, Sparkles } from "lucide-react";
// import Button from "../../../shared/components/ui/Button";
// import Card from "../../../shared/components/ui/Card";
// import SelectField from "../../../shared/components/ui/SelectField";
// import ToggleRow from "../../../shared/components/ui/ToggleRow";
// import type {
//   DifficultyOption,
//   LiveQuizSelectOption,
//   QuizSummary,
//   ToggleSetting,
// } from "../data/liveQuiz.mock";

// export type LaunchQuizModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   classOptions: LiveQuizSelectOption[];
//   topicOptions: LiveQuizSelectOption[];
//   questionOptions: LiveQuizSelectOption[];
//   timerOptions: LiveQuizSelectOption[];
//   difficultyOptions: DifficultyOption[];
//   reasoningToggle: ToggleSetting;
//   summary: QuizSummary;
// };

// export default function LaunchQuizModal({
//   isOpen,
//   onClose,
//   classOptions,
//   topicOptions,
//   questionOptions,
//   timerOptions,
//   difficultyOptions,
//   reasoningToggle,
//   summary,
// }: LaunchQuizModalProps) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       {/* BACKDROP */}
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />

//       {/* MODAL (✅ smaller width) */}
//       <Card
//         className="
//           relative z-10 w-full
//           max-w-[520px] sm:max-w-[560px]   /* ✅ mini width */
//           max-h-[90vh]
//           p-5 sm:p-6
//           flex flex-col
//           transition-all duration-200
//         "
//       >
//         {/* HEADER */}
//         <div className="flex items-start justify-between">
//           <div>
//             <h2 className="text-lg font-semibold text-slate-900">
//               Launch New Quiz
//             </h2>
//             <p className="text-sm text-slate-500">
//               Configure your live quiz settings before launching
//             </p>
//           </div>

//           <button
//             onClick={onClose}
//             className="rounded-md p-1 hover:bg-slate-100"
//             aria-label="Close"
//           >
//             <X className="h-4 w-4 text-slate-500" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto pr-1 space-y-5">
//           {/* FORM */}
//           <div className="grid grid-cols-1 gap-4">
//             <SelectField label="Select Class" defaultValue="">
//               {classOptions.map((o) => (
//                 <option key={o.id} value={o.value} disabled={!o.value}>
//                   {o.label}
//                 </option>
//               ))}
//             </SelectField>

//             <SelectField label="Select Topic / AOS" defaultValue="">
//               {topicOptions.map((o) => (
//                 <option key={o.id} value={o.value} disabled={!o.value}>
//                   {o.label}
//                 </option>
//               ))}
//             </SelectField>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <SelectField
//                 label="Number of Questions"
//                 defaultValue={questionOptions[0]?.value}
//               >
//                 {questionOptions.map((o) => (
//                   <option key={o.id} value={o.value}>
//                     {o.label}
//                   </option>
//                 ))}
//               </SelectField>

//               <SelectField
//                 label="Timer per Question (seconds)"
//                 defaultValue={timerOptions[0]?.value}
//               >
//                 {timerOptions.map((o) => (
//                   <option key={o.id} value={o.value}>
//                     {o.label}
//                   </option>
//                 ))}
//               </SelectField>
//             </div>
//           </div>

//           {/* DIFFICULTY */}
//           <div className="space-y-2">
//             <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//               Difficulty
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {difficultyOptions.map((option) => (
//                 <Button
//                   key={option.id}
//                   size="sm"
//                   variant={option.selected ? "success" : "outline"}
//                   className="transition-all duration-200 hover:-translate-y-0.5"
//                 >
//                   {option.label}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* TOGGLE */}
//           <ToggleRow
//             title={reasoningToggle.title}
//             description={reasoningToggle.description}
//             enabled={reasoningToggle.enabled}
//           />

//           {/* SUMMARY */}
//           <Card className="flex gap-3 border border-emerald-200 bg-emerald-50 p-4 shadow-none transition-all duration-200">
//             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
//               <Sparkles className="h-4 w-4" />
//             </div>

//             <div className="flex-1 space-y-2">
//               <h3 className="text-sm font-semibold text-emerald-900">
//                 Quiz Summary
//               </h3>

//               <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
//                 <div>
//                   <p className="text-xs text-emerald-700">Questions</p>
//                   <p className="font-semibold text-emerald-900">
//                     {summary.questions}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-emerald-700">Difficulty</p>
//                   <p className="font-semibold text-emerald-900">
//                     {summary.difficulty}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-emerald-700">Time per Q</p>
//                   <p className="font-semibold text-emerald-900">
//                     {summary.timePerQuestion}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-emerald-700">Total Time</p>
//                   <p className="font-semibold text-emerald-900">
//                     {summary.totalTime}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* FOOTER */}
//         <div className="flex justify-end gap-2 pt-2">
//           <Button
//             variant="secondary"
//             onClick={onClose}
//             className="transition-all duration-200 hover:-translate-y-0.5"
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="success"
//             className="transition-all duration-200 hover:-translate-y-0.5"
//           >
//             Start Live Quiz
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }



// import React from "react";
// import { Clock3, Users, Pause, Play, X } from "lucide-react";

// import Card from "../../../shared/components/ui/Card";
// import Button from "../../../shared/components/ui/Button";
// import { cn } from "../../../shared/lib/cn";

// export type LiveQuizTopBarProps = {
//   // left stats
//   currentQuestion: number; // 1-based (1..totalQuestions)
//   totalQuestions: number;
//   timeRemainingSec: number; // countdown in seconds
//   answered: number;
//   totalStudents: number;

//   // right actions
//   isPaused?: boolean;
//   onTogglePause?: () => void;
//   onNextQuestion?: () => void;
//   onEndQuiz?: () => void;

//   disablePause?: boolean;
//   disableNext?: boolean;
//   disableEnd?: boolean;

//   className?: string;
// };

// function formatMMSS(totalSec: number) {
//   const s = Math.max(0, Math.floor(totalSec));
//   const mm = Math.floor(s / 60);
//   const ss = s % 60;
//   return `${mm}:${String(ss).padStart(2, "0")}`;
// }

// function Stat({
//   label,
//   value,
//   icon,
//   className,
// }: {
//   label: string;
//   value: React.ReactNode;
//   icon?: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <div className={cn("px-4 py-2", className)}>
//       <p className="text-xs text-slate-500">{label}</p>
//       <div className="mt-1 flex items-center gap-2">
//         {icon}
//         <p className="text-lg font-semibold leading-none text-slate-900">
//           {value}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function LiveQuizTopBar({
//   currentQuestion,
//   totalQuestions,
//   timeRemainingSec,
//   answered,
//   totalStudents,

//   isPaused = false,
//   onTogglePause,
//   onNextQuestion,
//   onEndQuiz,

//   disablePause,
//   disableNext,
//   disableEnd,

//   className,
// }: LiveQuizTopBarProps) {
//   return (
//     <Card
//       className={cn(
//         "w-full rounded-2xl border border-slate-200 bg-white shadow-sm",
//         className,
//       )}
//     >
//       <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
//         {/* LEFT: Stats */}
//         <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-0">
//           <Stat
//             label="Question Progress"
//             value={
//               <>
//                 {currentQuestion} <span className="text-slate-400">/</span>{" "}
//                 {totalQuestions}
//               </>
//             }
//             className="sm:border-r sm:border-slate-200"
//           />

//           <Stat
//             label="Time Remaining"
//             value={formatMMSS(timeRemainingSec)}
//             icon={<Clock3 className="h-4 w-4 text-emerald-600" />}
//             className="sm:border-r sm:border-slate-200"
//           />

//           <Stat
//             label="Students Answered"
//             value={
//               <>
//                 {answered} <span className="text-slate-400">/</span>{" "}
//                 {totalStudents}
//               </>
//             }
//             icon={<Users className="h-4 w-4 text-emerald-600" />}
//           />
//         </div>

//         {/* RIGHT: Actions (3 buttons only) */}
//         <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
//           <Button
//             variant="secondary"
//             onClick={onTogglePause}
//             disabled={disablePause}
//             className="rounded-xl"
//           >
//             {isPaused ? (
//               <>
//                 <Play className="mr-2 h-4 w-4" />
//                 Resume
//               </>
//             ) : (
//               <>
//                 <Pause className="mr-2 h-4 w-4" />
//                 Pause
//               </>
//             )}
//           </Button>

//           <Button
//             variant="success"
//             onClick={onNextQuestion}
//             disabled={disableNext}
//             className="rounded-xl"
//           >
//             <Play className="mr-2 h-4 w-4" />
//             Next Question
//           </Button>

//           {/* If your Button doesn't have a "danger" variant, we style it manually */}
//           <Button
//             onClick={onEndQuiz}
//             disabled={disableEnd}
//             className="rounded-xl bg-rose-600 text-white hover:bg-rose-700"
//           >
//             <X className="mr-2 h-4 w-4" />
//             End Quiz
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// }
