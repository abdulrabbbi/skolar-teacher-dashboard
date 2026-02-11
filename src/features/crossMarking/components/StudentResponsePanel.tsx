import Badge from '../../../shared/components/ui/Badge';
import Card from '../../../shared/components/ui/Card';
import type { StudentResponseItem } from '../data/crossMarking.mock';

type Props = {
  responses: StudentResponseItem[];
};

export default function StudentResponsePanel({ responses }: Props) {
  return (
    <Card className="space-y-6">
      <h3 className="text-base font-semibold text-slate-900">
        Student Response
      </h3>

      <div className="space-y-5">
        {responses.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-slate-50 p-4 sm:p-5"
          >
            {/* HEADER */}
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">
                {item.question}
              </p>

              <Badge variant="neutral">{item.marks} marks</Badge>
            </div>

            {/* QUESTION TEXT */}
            <p className="mt-2 text-sm text-slate-500">
              {getQuestionText(item.question)}
            </p>

            {/* ANSWER */}
            <div className="mt-3 rounded-lg bg-slate-100 p-3 text-sm text-slate-800 whitespace-pre-line">
              {item.response}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function getQuestionText(question: string) {
  switch (question) {
    case 'Question 1':
      return 'Find the derivative of f(x) = x^3 + 2x^2 - 5x + 1';
    case 'Question 2':
      return 'Use the chain rule to differentiate g(x) = (2x^2 + 3x)^5';
    case 'Question 3':
      return 'Evaluate the definite integral int_0^2 (3x^2 + 2x) dx';
    default:
      return '';
  }
}



