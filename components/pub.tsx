import type { ReactNode } from "react";

type PubProps = {
  name: string;
  conference: string;
  authors: string;
  pdfUrl?: string;
  codeUrl?: string;
};

function formatAuthors(authors: string): ReactNode[] {
  return authors.split("Bolin Shen").flatMap((part, index, parts) =>
    index === parts.length - 1
      ? [part]
      : [part, <strong key={`author-${index}`}>Bolin Shen</strong>],
  );
}

export function Pub({
  name,
  conference,
  authors,
  pdfUrl = "https://arxiv.org",
  codeUrl = "https://github.com/LabRAI",
}: PubProps) {
  return (
    <>
      <div className="bg-white p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
        <div className="flex items-center text-sm mt-1 link-invert">
          <p className="text-gray-500 italic mr-4">{conference}</p>
          <a
            className="px-2.5 py-1 rounded-lg text-xs text-slate-500 font-medium !bg-gray-200/80 capitalize mr-2"
            href={pdfUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            PDF
          </a>
          <a
            className="px-2.5 py-1 rounded-lg text-xs text-slate-500 font-medium !bg-gray-200/80 capitalize mr-2"
            href={codeUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Code
          </a>
        </div>
        <p className="text-gray-700 text-sm mt-2">{formatAuthors(authors)}</p>
      </div>

      <div className="border-t border-gray-300 my-6" />
    </>
  );
}
