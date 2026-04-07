import { codeToHtml } from "shiki";

interface Props {
  code: string;
  lang: string;
}

export async function CodeBlock({ code, lang }: Props) {
  let html: string;
  try {
    html = await codeToHtml(code, {
      lang: lang || "text",
      theme: "github-dark-dimmed",
    });
  } catch {
    // fallback for unknown languages
    html = await codeToHtml(code, {
      lang: "text",
      theme: "github-dark-dimmed",
    });
  }

  return (
    <div className="not-prose my-6">
      {lang && (
        <div className="flex items-center rounded-t-xl bg-zinc-700 px-4 py-2">
          <span className="text-xs font-medium text-zinc-400">{lang}</span>
        </div>
      )}
      <div
        className={`overflow-x-auto text-sm [&>pre]:m-0 [&>pre]:p-5 [&>pre]:rounded-none ${
          lang ? "[&>pre]:rounded-b-xl" : "[&>pre]:rounded-xl"
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
