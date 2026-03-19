import type { Difficulty } from "./types";
import { escapeHtml } from "./utils";

type IncludedArea = { unit: string; title: string };

export function printSelectedContentTask({
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
}: {
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
}) {
  const titleText =
    includedAreas.length > 1
      ? `${subjectTitle || "Task Compiler"} — Multi-area task`
      : areaTitle || "Printable Task";

  const toListItems = (items: string[]) =>
    items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  const printWindow = window.open("", "_blank", "noopener,noreferrer");
  if (!printWindow) return;

  const printableMarkup = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(titleText)}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 32px; color: #0f172a; }
      h1 { margin: 0 0 8px; font-size: 24px; }
      h2 { margin: 24px 0 10px; font-size: 18px; }
      p { margin: 0 0 8px; color: #334155; }
      ul { margin: 0; padding-left: 20px; }
      li { margin: 6px 0; line-height: 1.4; }
      .meta { margin-top: 12px; display: grid; gap: 6px; }
      .guide { margin-top: 24px; border-top: 1px solid #cbd5e1; padding-top: 16px; }
      .line { border-bottom: 1px solid #cbd5e1; height: 28px; margin: 8px 0; }
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
      <p><strong>Include Marking Guide:</strong> ${
        includeMarkingGuide ? "Yes" : "No"
      }</p>
    </div>

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

  printWindow.document.open();
  printWindow.document.write(printableMarkup);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

