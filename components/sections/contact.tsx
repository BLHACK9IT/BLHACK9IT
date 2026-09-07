"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Send,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { SiGooglechat } from "react-icons/si";

// SECTION PURPOSE: one adaptive console for email, WhatsApp, and Google Chat.
type Channel = "email" | "whatsapp" | "google-chat";

const channels = [
  { id: "email" as const, label: "Email", Icon: Mail },
  { id: "whatsapp" as const, label: "WhatsApp", Icon: MessageCircle },
  { id: "google-chat" as const, label: "Google Chat", Icon: MessagesSquare },
];

// Replace these placeholders with your real contact destinations before launch.
const contactLinks = {
  email: "hello@example.com",
  whatsapp: "https://wa.me/2340000000000",
  googleChat: "https://chat.google.com/",
};

const defaultWhatsAppMessage =
  "Hi, I'd like to discuss a project. I can share the goal, current stage, and expected timeline.";

const panelMotion = {
  initial: { opacity: 0, x: 28, filter: "blur(5px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -20, filter: "blur(4px)" },
};

export const Contact = () => {
  const [active, setActive] = useState<Channel>("email");
  const [whatsAppMessage, setWhatsAppMessage] = useState(
    defaultWhatsAppMessage,
  );
  const whatsappHref = `${contactLinks.whatsapp}?text=${encodeURIComponent(whatsAppMessage)}`;
  const OrbitalIcon =
    active === "email"
      ? Mail
      : active === "whatsapp"
        ? FaWhatsapp
        : SiGooglechat;

  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white sm:px-10 md:py-32 lg:px-24 xl:px-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5014]/[0.045] blur-[170px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:30px_30px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em] text-[#ffae6e] sm:text-sm"
        >
          <span className="h-px w-9 bg-[#ff6a1a]" />
          06 — Let&apos;s connect
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mt-8 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-.05em] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Let&apos;s build something people will{" "}
          <span className="bg-gradient-to-r from-[#ffa032] via-[#ff5014] to-[#ffaa33] bg-clip-text text-transparent">
            actually enjoy using.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="contact-shell relative mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909] shadow-[0_30px_100px_rgba(0,0,0,.45)] md:mt-20 lg:grid lg:min-h-[42rem] lg:grid-cols-[.36fr_.64fr]"
        >
          <span className="contact-border-trail pointer-events-none absolute inset-0 z-30 rounded-[2rem]" />

          {/* Atmospheric status display becomes a watermark behind content on mobile. */}
          <aside className="relative hidden overflow-hidden border-r border-white/10 bg-[#070707] p-10 lg:flex lg:flex-col lg:justify-between">
            <div className="pointer-events-none absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:36px_36px]" />
            <div className="relative flex flex-1 items-center justify-center">
              <div className="contact-orbit relative aspect-square w-[82%] max-w-[19rem] rounded-full border border-[#ff7a24]/20">
                <span className="absolute inset-[14%] rounded-full border border-white/10" />
                <span className="absolute inset-[30%] rounded-full border border-[#ff7a24]/25" />
                <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5b18]/20 shadow-[0_0_55px_rgba(255,80,20,.55)]" />
                <span className="contact-orbit-dot absolute left-1/2 top-[-.3rem] h-2.5 w-2.5 rounded-full bg-[#ff8a24] shadow-[0_0_16px_#ff5014]" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    initial={{ opacity: 0, scale: 0.55, rotate: -18 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.55, rotate: 18 }}
                    transition={{ duration: 0.28 }}
                    className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center"
                  >
                    <OrbitalIcon className="h-7 w-7 text-[#ffb06e]" />
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <div className="relative space-y-4 border-t border-white/10 pt-7 text-xs text-white/45">
              <p className="flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff6a1a] shadow-[0_0_12px_#ff5014]" />
                Available for selected projects
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#ff8a24]" />
                Lagos, Nigeria · WAT
              </p>
              <p className="flex items-center gap-3">
                <Clock3 className="h-4 w-4 text-[#ff8a24]" />
                Usually replies within 24 hours
              </p>
            </div>
          </aside>

          <div className="relative flex min-h-[38rem] flex-col p-4 sm:p-7 md:p-9 lg:p-10">
            <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#ff5014]/[0.07] blur-[80px] lg:hidden" />
            <div
              role="tablist"
              aria-label="Choose a contact method"
              className="relative grid grid-cols-3 gap-2 rounded-2xl border border-white/[0.08] bg-black/30 p-1.5 sm:gap-3"
            >
              {channels.map(({ id, label, Icon }) => {
                const selected = active === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`contact-panel-${id}`}
                    onClick={() => setActive(id)}
                    className={`relative flex min-h-14 items-center justify-center gap-2 overflow-hidden rounded-xl px-2 text-[11px] transition sm:px-4 sm:text-xs ${selected ? "text-white" : "text-white/35 hover:text-white/65"}`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="contact-active-tab"
                        className="absolute inset-0 rounded-xl border border-[#ff8a24]/45 bg-[#ff6a1a]/10 shadow-[inset_0_-2px_18px_rgba(255,80,20,.12),0_8px_25px_rgba(255,80,20,.08)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <Icon
                      className={`relative h-4 w-4 shrink-0 ${selected ? "text-[#ff9a4d]" : ""}`}
                    />
                    <span
                      className={`relative ${selected ? "hidden min-[390px]:inline" : "hidden sm:inline"}`}
                    >
                      {label}
                    </span>
                    {selected && (
                      <span className="absolute bottom-0 left-1/2 h-px w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ff8a24] to-transparent" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="relative mt-5 flex flex-1 overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.018] p-6 sm:mt-7 sm:p-8">
              <span className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t border-[#ff8a24]/35" />
              <span className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-[#ff8a24]/35" />
              <AnimatePresence mode="wait">
                {active === "email" && (
                  <motion.div
                    key="email"
                    id="contact-panel-email"
                    role="tabpanel"
                    {...panelMotion}
                    transition={{ duration: 0.32 }}
                    className="flex w-full flex-col"
                  >
                    <ChannelHeading
                      icon={Mail}
                      eyebrow="Detailed enquiries"
                      title="Send a project brief"
                    />
                    <form
                      action={`mailto:${contactLinks.email}`}
                      method="post"
                      encType="text/plain"
                      className="mt-7 grid gap-4 sm:grid-cols-2"
                    >
                      <Field
                        label="Your name"
                        name="name"
                        placeholder="How should I address you?"
                      />
                      <Field
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                      />
                      <label className="sm:col-span-2">
                        <span className="mb-2 block text-[10px] uppercase tracking-[.18em] text-white/35">
                          Project type
                        </span>
                        <select
                          name="project-type"
                          className="min-h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#0b0b0b] px-4 text-sm text-white/65 outline-none transition focus:border-[#ff8a24]/55"
                        >
                          <option>Website or web application</option>
                          <option>Product design and development</option>
                          <option>AI-powered experience</option>
                          <option>Something else</option>
                        </select>
                      </label>
                      <label className="sm:col-span-2">
                        <span className="mb-2 block text-[10px] uppercase tracking-[.18em] text-white/35">
                          Message
                        </span>
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Tell me about the people, problem, and outcome."
                          className="w-full resize-none rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white/75 outline-none transition placeholder:text-white/20 focus:border-[#ff8a24]/55"
                        />
                      </label>
                      <button
                        type="submit"
                        className="group mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff8a24] to-[#ff5014] px-6 text-sm font-medium shadow-[0_12px_35px_rgba(255,80,20,.16)] sm:col-span-2 sm:justify-self-start"
                      >
                        Send project brief
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {active === "whatsapp" && (
                  <motion.div
                    key="whatsapp"
                    id="contact-panel-whatsapp"
                    role="tabpanel"
                    {...panelMotion}
                    transition={{ duration: 0.32 }}
                    className="flex w-full flex-col justify-center"
                  >
                    <ChannelHeading
                      icon={MessageCircle}
                      eyebrow="Quick conversation"
                      title="Start with WhatsApp"
                    />
                    <label className="mt-8 block">
                      <span className="mb-2 block text-[10px] uppercase tracking-[.18em] text-white/35">
                        Your WhatsApp message
                      </span>
                      <textarea
                        value={whatsAppMessage}
                        onChange={(event) =>
                          setWhatsAppMessage(event.target.value)
                        }
                        rows={5}
                        className="w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm leading-7 text-white/65 outline-none transition focus:border-[#ff8a24]/55"
                      />
                    </label>
                    <p className="mt-6 flex items-center gap-2 text-xs text-white/35">
                      <Clock3 className="h-4 w-4 text-[#ff8a24]" />
                      Best for a quick introduction and early questions.
                    </p>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group mt-8 inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-gradient-to-r from-[#ff8a24] to-[#ff5014] px-6 text-sm font-medium ${whatsAppMessage.trim() ? "" : "pointer-events-none opacity-40"}`}
                      aria-disabled={!whatsAppMessage.trim()}
                    >
                      Continue to WhatsApp
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </motion.div>
                )}

                {active === "google-chat" && (
                  <motion.div
                    key="google-chat"
                    id="contact-panel-google-chat"
                    role="tabpanel"
                    {...panelMotion}
                    transition={{ duration: 0.32 }}
                    className="flex w-full flex-col justify-center"
                  >
                    <ChannelHeading
                      icon={MessagesSquare}
                      eyebrow="Workspace conversation"
                      title="Meet in Google Chat"
                    />
                    <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-5 sm:p-6">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#ff8a24]/25 bg-[#ff5014]/10">
                        <SiGooglechat className="h-7 w-7 text-[#ff9a4d]" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white/75">
                          Google Chat workspace
                        </p>
                        <p className="mt-1 text-xs leading-5 text-white/35">
                          Opens the configured conversation in Google Chat.
                        </p>
                      </div>
                    </div>
                    <p className="mt-6 max-w-lg text-sm leading-7 text-white/45">
                      A useful option for teams already collaborating inside
                      Google Workspace.
                    </p>
                    <a
                      href={contactLinks.googleChat}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-gradient-to-r from-[#ff8a24] to-[#ff5014] px-6 text-sm font-medium"
                    >
                      Open Google Chat
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .contact-border-trail {
          padding: 1px;
          background: conic-gradient(
            from var(--contact-angle),
            transparent 0 72%,
            rgba(255, 160, 50, 0.08) 78%,
            #ff8a24 86%,
            #ff5014 90%,
            transparent 97%
          );
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
          animation: contact-border-spin 8s linear infinite;
        }
        .contact-orbit {
          animation: contact-orbit-turn 18s linear infinite;
        }
        .contact-orbit-dot {
          transform-origin: 0 calc(9.5rem + 0.3rem);
        }
        @property --contact-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes contact-border-spin {
          to {
            --contact-angle: 360deg;
          }
        }
        @keyframes contact-orbit-turn {
          to {
            transform: rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-border-trail,
          .contact-orbit {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

function ChannelHeading({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: typeof Mail;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#ff8a24]/25 bg-[#ff5014]/10 shadow-[0_0_30px_rgba(255,80,20,.1)]">
        <Icon className="h-5 w-5 text-[#ff9a4d]" />
      </span>
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[.2em] text-[#ff9a4d]">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-2xl font-medium tracking-[-.035em] sm:text-3xl">
          {title}
        </h3>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-[10px] uppercase tracking-[.18em] text-white/35">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="min-h-12 w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 text-sm text-white/75 outline-none transition placeholder:text-white/20 focus:border-[#ff8a24]/55"
      />
    </label>
  );
}
