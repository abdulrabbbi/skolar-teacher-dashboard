export type PrintToPdfOptions = {
  title: string;
  subtitle?: string;
  bodyHtml: string;
  autoPrint?: boolean;
};

function escapeHtml(value: string) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function openPrintToPdfWindow({
  title,
  subtitle,
  bodyHtml,
  autoPrint = true,
}: PrintToPdfOptions) {
  const win = window.open("", "_blank", "noopener,noreferrer");
  if (!win) return null;

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root { color-scheme: light; }
      body { font-family: Arial, sans-serif; margin: 24px; color: #0f172a; }
      h1 { margin: 0 0 6px; font-size: 22px; }
      .sub { margin: 0 0 14px; color: #475569; font-size: 13px; }
      h2 { margin: 18px 0 8px; font-size: 15px; }
      p { margin: 0 0 8px; color: #334155; }
      .meta { display: grid; gap: 6px; margin: 12px 0 14px; }
      .pill { display: inline-block; border: 1px solid #cbd5e1; border-radius: 999px; padding: 4px 10px; margin-right: 8px; font-size: 12px; color: #0f172a; }
      .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
      .thumb { border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
      .thumb img { display: block; width: 100%; height: 120px; object-fit: cover; }
      .thumb .cap { padding: 8px 10px; font-size: 12px; color: #475569; }
      ol { margin: 0; padding-left: 18px; }
      li { margin: 8px 0; line-height: 1.35; }
      .opt { margin-top: 6px; padding-left: 14px; color: #475569; font-size: 12.5px; }
      .hr { margin: 16px 0; border-top: 1px solid #e2e8f0; }
      @media print {
        body { margin: 14mm; }
        a { color: inherit; text-decoration: none; }
      }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(title)}</h1>
    ${subtitle ? `<p class="sub">${escapeHtml(subtitle)}</p>` : ""}
    ${bodyHtml}
  </body>
</html>`;

  win.document.open();
  win.document.write(html);
  win.document.close();
  win.focus();

  if (autoPrint) {
    win.setTimeout(() => {
      try {
        win.print();
      } catch {
        // ignore
      }
    }, 250);
  }

  return win;
}

