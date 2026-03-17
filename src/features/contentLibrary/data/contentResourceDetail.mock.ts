import type { ContentResource } from "../types/contentLibrary.types";

import bigPng from "../../../assets/images/big.png";
import scaryPng from "../../../assets/images/scary.png";

export type ContentResourceMedia = {
  id: string;
  kind: "image" | "pdf";
  title: string;
  fileName: string;
  src?: string;
};

export type ContentResourceQuestion = {
  id: string;
  prompt: string;
  type: "multipleChoice" | "shortAnswer" | "extendedResponse";
  options?: string[];
};

export type ContentResourceDetail = {
  authorName: string;
  updatedAt: string;
  questions: ContentResourceQuestion[];
  media: ContentResourceMedia[];
};

const detailById: Record<string, ContentResourceDetail> = {
  "res-eng-1": {
    authorName: "Rita Azer",
    updatedAt: "2026-03-06T08:30:00.000Z",
    media: [
      {
        id: "m-1",
        kind: "image",
        title: "Article excerpt",
        fileName: "argument-article.jpg",
        src: bigPng,
      },
      {
        id: "m-2",
        kind: "pdf",
        title: "Worksheet pack",
        fileName: "argument-analysis-pack.pdf",
      },
    ],
    questions: [
      {
        id: "q1",
        type: "shortAnswer",
        prompt:
          "Identify the writer’s contention and two persuasive techniques used to support it.",
      },
      {
        id: "q2",
        type: "multipleChoice",
        prompt: "Which tone best describes the writer’s attitude?",
        options: ["Empathetic", "Sarcastic", "Neutral", "Optimistic"],
      },
      {
        id: "q3",
        type: "extendedResponse",
        prompt:
          "Write a paragraph analysing how language choices position the reader. Use evidence from the text.",
      },
    ],
  },
  "res-methods-2": {
    authorName: "SKOLAR Team",
    updatedAt: "2026-03-05T12:00:00.000Z",
    media: [
      {
        id: "m-1",
        kind: "image",
        title: "Worked example",
        fileName: "derivatives-worked-example.png",
        src: scaryPng,
      },
    ],
    questions: [
      {
        id: "q1",
        type: "shortAnswer",
        prompt:
          "Differentiate the function and find the gradient at the given point.",
      },
      {
        id: "q2",
        type: "extendedResponse",
        prompt:
          "Set up and solve an optimisation problem using derivatives. Explain each step clearly.",
      },
    ],
  },
};

function fallbackQuestions(resource: ContentResource): ContentResourceQuestion[] {
  const subject = resource.subjectName;
  const type = resource.type;

  return [
    {
      id: `${resource.id}-q1`,
      type: "shortAnswer",
      prompt: `Based on this ${type.toLowerCase()}, summarise the key concept(s) from ${subject}.`,
    },
    {
      id: `${resource.id}-q2`,
      type: "extendedResponse",
      prompt:
        "Answer the following using full working / evidence. Explain your reasoning.",
    },
  ];
}

export function getContentResourceDetail(resource: ContentResource): ContentResourceDetail {
  const known = detailById[resource.id];
  if (known) return known;

  return {
    authorName: "SKOLAR Team",
    updatedAt: resource.createdAt,
    media: [
      {
        id: `${resource.id}-pdf`,
        kind: "pdf",
        title: "Printable resource",
        fileName: `${resource.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.pdf`,
      },
    ],
    questions: fallbackQuestions(resource),
  };
}

