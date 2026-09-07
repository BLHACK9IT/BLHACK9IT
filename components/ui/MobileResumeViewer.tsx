"use client";

// Browser-only renderer: PDF.js depends on DOMMatrix and must never run during SSR.
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function MobileResumeViewer({ file }: { file: string }) {
  const [pageCount, setPageCount] = useState(0);

  return (
    <Document
      file={file}
      onLoadSuccess={({ numPages }) => setPageCount(numPages)}
      loading={
        <p className="py-10 text-center text-xs text-white/45">
          Loading resume...
        </p>
      }
      error={
        <p className="py-10 text-center text-xs text-white/55">
          The preview could not load. Use Open or Download above.
        </p>
      }
      className="space-y-3 md:hidden"
    >
      {Array.from({ length: pageCount }, (_, index) => (
        <Page
          key={`resume-page-${index + 1}`}
          pageNumber={index + 1}
          scale={1.4}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      ))}
    </Document>
  );
}
