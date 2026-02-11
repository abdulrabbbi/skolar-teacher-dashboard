
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import TextArea from '../../../shared/components/ui/TextArea';

export type FeedbackPanelProps = {
  placeholder: string;
};

export default function FeedbackPanel({ placeholder }: FeedbackPanelProps) {
  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-slate-900">Feedback</h3>
        <p className="text-sm text-slate-500">
          Provide student feedback before submitting marks.
        </p>
      </div>

      <TextArea label="Feedback" placeholder={placeholder} />

      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="secondary">Save Draft</Button>
        <Button variant="success">Submit Mark</Button>
      </div>
    </Card>
  );
}
