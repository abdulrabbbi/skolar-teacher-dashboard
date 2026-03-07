import cardDesign from "./Card.svg";
import type { StudentResponseItem } from "../data/crossMarking.mock";

type Props = {
  responses: StudentResponseItem[];
};

export default function StudentResponsePanel({ responses }: Props) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-[#0F143C0D] bg-white">
      <img
        src={cardDesign}
        alt="Student response design card"
        className="block w-full h-auto"
        draggable={false}
      />

      {/* Keep response data available for assistive technologies. */}
      <ul className="sr-only">
        {responses.map((item) => (
          <li key={item.id}>
            {item.question}: {item.response} ({item.marks} marks)
          </li>
        ))}
      </ul>
    </section>
  );
}
