import type { Difficulty } from "./types";
import { escapeHtml } from "./utils";

export type IncludedArea = { unit: string; title: string };

export type QuestionTypeBreakdownItem = { title: string; count: number };

export type SelectedContentTaskPrintInput = {
  subjectTitle: string;
  areaTitle: string;
  areaUnitLabel: string;
  includedAreas: IncludedArea[];
  duration: string;
  difficulty: Difficulty;
  includeMarkingGuide: boolean;
  selectedOutcomeLabels: string[];
  selectedKnowledgeLabels: string[];
  selectedSkillLabels: string[];
  questionTypeBreakdown?: QuestionTypeBreakdownItem[];
};

export function buildSelectedContentTaskHtml({
  subjectTitle,
  areaTitle,
  areaUnitLabel,
  includedAreas,
  duration,
  difficulty,
  includeMarkingGuide,
  selectedOutcomeLabels,
  selectedKnowledgeLabels,
  selectedSkillLabels,
  questionTypeBreakdown,
}: SelectedContentTaskPrintInput) {
  const titleText =
    includedAreas.length > 1
      ? `${subjectTitle || "Task Compiler"} — Multi-area task`
      : areaTitle || "Printable Task";

  const toListItems = (items: string[]) =>
    items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  const breakdown = (questionTypeBreakdown ?? []).filter((item) => item.count > 0);
  const totalQuestions = breakdown.reduce((sum, item) => sum + item.count, 0);

  const printableMarkup = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(titleText)}</title>
    <style>
      :root { --ink: #0f172a; --muted: #334155; --line: #cbd5e1; }
      body { font-family: Arial, sans-serif; margin: 32px; color: var(--ink); }
      h1 { margin: 0 0 8px; font-size: 24px; }
      h2 { margin: 24px 0 10px; font-size: 18px; }
      p { margin: 0 0 8px; color: var(--muted); }
      ul { margin: 0; padding-left: 20px; }
      li { margin: 6px 0; line-height: 1.4; }
      .meta { margin-top: 12px; display: grid; gap: 6px; }
      .guide { margin-top: 24px; border-top: 1px solid var(--line); padding-top: 16px; }
      .line { border-bottom: 1px solid var(--line); height: 28px; margin: 8px 0; }
      @media print { body { margin: 14mm; } }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(titleText)}</h1>
    <p>${escapeHtml(subjectTitle || "Task Compiler")}</p>
    ${
      includedAreas.length > 1
        ? `<p><strong>Areas of Study:</strong> ${escapeHtml(
            includedAreas.map((a) => `${a.unit} — ${a.title}`).join(", "),
          )}</p>`
        : `<p>${escapeHtml(areaUnitLabel || "Area")}</p>`
    }

    <div class="meta">
      <p><strong>Target Duration:</strong> ${escapeHtml(duration)}</p>
      <p><strong>Difficulty:</strong> ${escapeHtml(difficulty)}</p>
      <p><strong>Total Questions:</strong> ${escapeHtml(String(totalQuestions))}</p>
      <p><strong>Include Marking Guide:</strong> ${
        includeMarkingGuide ? "Yes" : "No"
      }</p>
    </div>

    ${
      breakdown.length > 0
        ? `<h2>Question Breakdown</h2><ul>${toListItems(
            breakdown.map((item) => `${item.title}: ${item.count}`),
          )}</ul>`
        : ""
    }

    ${
      selectedOutcomeLabels.length > 0
        ? `<h2>Outcomes</h2><ul>${toListItems(selectedOutcomeLabels)}</ul>`
        : ""
    }
    ${
      selectedKnowledgeLabels.length > 0
        ? `<h2>Key Knowledge</h2><ul>${toListItems(selectedKnowledgeLabels)}</ul>`
        : ""
    }
    ${
      selectedSkillLabels.length > 0
        ? `<h2>Key Skills</h2><ul>${toListItems(selectedSkillLabels)}</ul>`
        : ""
    }

    ${
      includeMarkingGuide
        ? `<div class="guide">
            <h2>Marking Guide</h2>
            <p>Use the lines below for criteria and scoring notes.</p>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>`
        : ""
    }
  </body>
</html>`;

  return { titleText, html: printableMarkup };
}

export function printSelectedContentTask(input: SelectedContentTaskPrintInput) {
  const printWindow = window.open("", "_blank", "noopener,noreferrer");
  if (!printWindow) return;

  const { html } = buildSelectedContentTaskHtml(input);

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

