// import { ArrowLeft } from 'lucide-react';

// import Button from '../../../shared/components/ui/Button';
// import GenerateQuickContentForm from '../components/GenerateQuickContentForm';
// import ClassWeakPointsCard from '../components/ClassWeakPointsCard';
// import QuickTemplatesCard from '../components/QuickTemplatesCard';

// export type GenerateQuickContentPageProps = {
//   onBack?: () => void;
//   showBack?: boolean;
// };

// export default function GenerateQuickContentPage({
//   onBack,
//   showBack = false,
// }: GenerateQuickContentPageProps) {
//   return (
//     <section className="space-y-6">
//       {showBack && onBack ? (
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={onBack}
//           className="flex w-fit items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Areas
//         </Button>
//       ) : null}

//       <h2 className="text-xl font-semibold text-slate-900">
//         Generate Quick Content
//       </h2>

//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <GenerateQuickContentForm />

//         <div className="space-y-6">
//           <ClassWeakPointsCard />
//           <QuickTemplatesCard />
//         </div>
//       </div>
//     </section>
//   );
// }

import GenerateQuickContentForm from "../components/GenerateQuickContentForm";
import ClassWeakPointsCard from "../components/ClassWeakPointsCard";
import QuickTemplatesCard from "../components/QuickTemplatesCard";

export default function GenerateQuickContentPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">
          Generate Content
        </h2>
        <p className="text-sm text-slate-500">
          Create worksheets aligned to VCAA outcomes
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <GenerateQuickContentForm />
        <div className="space-y-6">
          <ClassWeakPointsCard />
          <QuickTemplatesCard />
        </div>
      </div>
    </section>
  );
}
