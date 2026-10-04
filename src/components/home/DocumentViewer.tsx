"use client";

import { useState } from "react";
import { Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * In-page PDF viewer. The PDF is only fetched when the visitor asks to read it, so it
 * costs nothing for people who don’t. Always paired with a download and open-in-tab link.
 */
export function DocumentViewer({ file, title }: { file: string; title: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-sand-300 bg-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-200 px-5 py-4">
        <p className="flex items-center gap-2 font-semibold">
          <FileText aria-hidden="true" className="size-5 text-primary-700" />
          {title}
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-sand-300 px-4 text-sm font-semibold hover:bg-primary-50"
          >
            <ExternalLink aria-hidden="true" className="size-4" />
            Open in new tab<span className="sr-only"> (PDF)</span>
          </a>
          <a
            href={file}
            download
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary-700 px-4 text-sm font-semibold text-white hover:bg-primary-800"
          >
            <Download aria-hidden="true" className="size-4" />
            Download PDF
          </a>
        </div>
      </div>

      {open ? (
        <iframe title={`${title} (PDF viewer)`} src={`${file}#view=FitH`} className="h-[75vh] min-h-[32rem] w-full bg-sand-100" />
      ) : (
        <div className="flex min-h-[18rem] flex-col items-center justify-center gap-4 bg-sand-100 p-8 text-center">
          <FileText aria-hidden="true" className="size-14 text-primary-700/60" strokeWidth={1.25} />
          <p className="max-w-md text-muted">Read the document here, or download it to keep a copy.</p>
          <Button onClick={() => setOpen(true)}>Read the constitution online</Button>
        </div>
      )}
    </div>
  );
}
