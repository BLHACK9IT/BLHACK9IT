"use client";

// Persistent resume access: hover actions on desktop and a direct bubble on mobile.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import dynamic from "next/dynamic";

// PDF.js requires browser APIs, so its module is loaded only after hydration.
const MobileResumeViewer = dynamic(
  () => import("@/components/ui/MobileResumeViewer"),
  {
    ssr: false,
    loading: () => (
      <p className="py-10 text-center text-xs text-white/45 md:hidden">
        Loading resume...
      </p>
    ),
  },
);

const resumeUrl = "/ADEYERI%20DANIEL.pdf";

export default function ResumeControl() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Lock the document behind the preview and support the expected Escape shortcut.
  useEffect(() => {
    if (!isPreviewOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPreviewOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isPreviewOpen]);

  return (
    <>
      {/* Desktop: icon aligns with the social control and reveals both actions on hover. */}
      <div className="group fixed right-[6.75rem] top-6 z-[100] hidden pb-3 md:block">
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          aria-label="View résumé"
          className="relative grid h-[52px] w-[52px] place-items-center rounded-full border border-neutral-800 bg-neutral-950/95 text-neutral-400 shadow-2xl backdrop-blur-md transition hover:border-[#ff8a24]/35 hover:text-[#ffae6e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a24]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        >
          <span className="absolute inset-0 rounded-full bg-[#ff5014]/0 blur-md transition group-hover:bg-[#ff5014]/10" />
          <FileText className="relative h-[21px] w-[21px]" />
        </button>

        <div className="pointer-events-none absolute right-0 top-[58px] w-48 translate-y-2 rounded-2xl border border-white/10 bg-neutral-950/95 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs text-white/60 transition hover:bg-[#ff5014]/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff8a24]/60"
          >
            <FileText className="h-4 w-4 text-[#ff8a24]" />
            {/*
            View résumé
          </button>
            */}
            View resume
          </button>
          <a
            href={resumeUrl}
            download="Adeyeri-Daniel-Resume.pdf"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-xs text-white/60 transition hover:bg-[#ff5014]/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff8a24]/60"
          >
            <Download className="h-4 w-4 text-[#ff8a24]" />
            Download
          </a>
        </div>
      </div>

      {/* Mobile: visible wording avoids hiding an important action behind hover. */}
      <button
        type="button"
        onClick={() => setIsPreviewOpen(true)}
        className="resume-mobile-trigger fixed right-[5.25rem] top-6 z-[99] inline-flex min-h-12 items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/95 px-4 text-[11px] font-medium text-white/70 shadow-2xl backdrop-blur-md transition active:scale-[.97] md:hidden"
        aria-label="View résumé"
      >
        <FileText className="h-4 w-4 text-[#ff8a24]" />
        View résumé
      </button>

      {/* Shared responsive PDF preview. */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[220] grid place-items-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsPreviewOpen(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="resume-preview-title"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#090909] shadow-[0_30px_100px_rgba(0,0,0,.7)]"
            >
              <div className="flex min-h-16 items-center justify-between gap-3 border-b border-white/10 px-4 sm:px-6">
                <div className="min-w-0">
                  <p className="resume-preview-label font-mono text-[9px] uppercase tracking-[.18em] text-[#ff8a24]">
                    Résumé preview
                  </p>
                  <h2
                    id="resume-preview-title"
                    className="truncate text-sm font-medium text-white sm:text-base"
                  >
                    Adeyeri Daniel
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open résumé in a new tab"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/50 transition hover:border-[#ff8a24]/40 hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={resumeUrl}
                    download="Adeyeri-Daniel-Resume.pdf"
                    className="hidden min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-[#ff8a24] to-[#ff5014] px-4 text-xs font-medium text-white sm:inline-flex"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(false)}
                    aria-label="Close résumé preview"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/50 transition hover:border-white/25 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="resume-viewer relative min-h-0 flex-1 overflow-y-auto bg-[#151515] p-2 sm:p-3">
                {/* Mobile renders each page into the document flow for natural vertical scrolling. */}
                <MobileResumeViewer file={resumeUrl} />

                {/* Desktop retains the browser's efficient native PDF viewer. */}
                <iframe
                  src={`${resumeUrl}#view=FitH&zoom=page-width`}
                  title="Adeyeri Daniel résumé"
                  className="hidden h-full w-full rounded-xl bg-white md:block"
                />
              </div>

              <a
                href={resumeUrl}
                download="Adeyeri-Daniel-Resume.pdf"
                className="resume-mobile-download mx-3 mb-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff8a24] to-[#ff5014] px-5 text-sm font-medium text-white sm:hidden"
              >
                <Download className="h-4 w-4" />
                Download résumé
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        .resume-viewer .react-pdf__Page {
          overflow: hidden;
          border-radius: 0.5rem;
          background: white;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28);
        }
        .resume-viewer .react-pdf__Page__canvas {
          width: 100% !important;
          height: auto !important;
        }

        /* Replacement labels prevent legacy encoding from reaching the UI. */
        .resume-mobile-trigger,
        .resume-preview-label,
        .resume-mobile-download {
          font-size: 0;
        }

        .resume-mobile-trigger::after {
          content: "View resume";
          font-size: 11px;
        }

        .resume-preview-label::after {
          content: "Resume preview";
          font-size: 9px;
        }

        .resume-mobile-download::after {
          content: "Download resume";
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
