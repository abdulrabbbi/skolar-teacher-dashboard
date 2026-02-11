import { ArrowLeft } from 'lucide-react';
import Button from '../../../../../shared/components/ui/Button';

export type SessionTopBarProps = {
  onBack: () => void;
};

export default function SessionTopBar({ onBack }: SessionTopBarProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
    </div>
  );
}
