"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import type { RightsCard as RightsCardType, Bilingual } from "@/content/schema/card.schema";
import { MODULE_THEME } from "@/src/lib/module-colors";
import { MODULE_META } from "@/src/lib/module-meta";

interface Props {
  card: RightsCardType;
  locale: string;
  showEli5?: boolean;
}

function text(field: Bilingual, locale: string) {
  return locale === "en" ? field.en : field.fil;
}

export function RightsCard({ card, locale, showEli5 = false }: Props) {
  const t = useTranslations("card");
  const tDis = useTranslations("disclaimer");
  const lang = locale as "fil" | "en";
  const isDraft = card.verification !== "verified";
  const theme = MODULE_THEME[card.module];
  const meta = MODULE_META[card.module];

  /* Cursor spotlight */
  const cardRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, show: false });
  const body = showEli5 && card.eli5 ? text(card.eli5, locale) : text(card.whatThisMeans, locale);

  const headerGradient = isDraft
    ? "linear-gradient(135deg, #78350F 0%, #B45309 100%)"
    : `linear-gradient(135deg, ${theme.dark} 0%, ${theme.color} 100%)`;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        setMouse({ x: e.clientX - r.left, y: e.clientY - r.top, show: true });
      }}
      onMouseLeave={() => setMouse((m) => ({ ...m, show: false }))}
      lang={lang === "en" ? "en" : "tl"}
      aria-labelledby={`right-${card.id}`}
      className="relative rounded-3xl overflow-hidden"
      style={{ boxShadow: "0 8px 40px rgba(27,50,114,0.12), 0 2px 8px rgba(27,50,114,0.06)" }}
    >
      {/* Cursor glow overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none rounded-3xl transition-opacity duration-300"
        style={{
          opacity: mouse.show ? 1 : 0,
          background: `radial-gradient(420px circle at ${mouse.x}px ${mouse.y}px, rgba(245,164,30,0.06), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* ── 1. GRADIENT HERO HEADER ─────────────────── */}
      <div className="relative px-5 pt-5 pb-6" style={{ background: headerGradient }}>
        {/* Decorative blur circle */}
        <div
          className="absolute -right-8 -top-8 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.12)", filter: "blur(20px)" }}
          aria-hidden="true"
        />

        {/* Module badge + verification badge */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div
            className="flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)" }}
          >
            <span className="text-sm leading-none" aria-hidden="true">
              {meta.icon}
            </span>
            <span className="text-white text-[10px] font-extrabold uppercase tracking-widest">
              {meta.title[lang]}
            </span>
          </div>

          {isDraft ? (
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                background: "rgba(245,164,30,0.25)",
                border: "1px solid rgba(245,164,30,0.45)",
              }}
            >
              <span
                className="text-[9px] font-extrabold uppercase tracking-widest"
                style={{ color: "#FDE68A" }}
              >
                ⏳ {lang === "fil" ? "Naghihintay" : "Draft"}
              </span>
            </div>
          ) : (
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                background: "rgba(74,222,128,0.2)",
                border: "1px solid rgba(74,222,128,0.4)",
              }}
            >
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4ADE80"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span
                className="text-[9px] font-extrabold uppercase tracking-widest"
                style={{ color: "#4ADE80" }}
              >
                {t("verifiedBadge")}
              </span>
            </div>
          )}
        </div>

        {/* The right — large, white */}
        <h1
          id={`right-${card.id}`}
          className="relative z-10 text-white font-extrabold leading-snug"
          style={{ fontSize: "1.08rem", textShadow: "0 1px 6px rgba(0,0,0,0.15)" }}
        >
          {text(card.right, locale)}
        </h1>
      </div>

      {/* Draft alert */}
      {isDraft && (
        <div
          role="alert"
          className="flex items-start gap-3 px-5 py-3"
          style={{ background: "#FFFBEB", borderBottom: "1px solid #FDE68A" }}
        >
          <span className="text-base shrink-0 mt-0.5" aria-hidden="true">
            ⚠️
          </span>
          <p className="text-xs font-medium leading-snug" style={{ color: "#92400E" }}>
            {t("draftWarning")}
          </p>
        </div>
      )}

      {/* ── 2. WHAT THIS MEANS ─── */}
      <div className="bg-white px-5 py-5" style={{ borderBottom: "1px solid #F4F7FF" }}>
        <p className="text-[10px] font-extrabold uppercase tracking-widest mb-3 text-gray-300">
          📖 {t("whatThisMeans")}
        </p>
        <p className="text-sm leading-relaxed text-gray-600">{body}</p>
      </div>

      {/* ── 3. THEY CANNOT ─── */}
      {card.theyCannot.length > 0 && (
        <div>
          <div className="flex items-center gap-2.5 px-5 py-3" style={{ background: "#7F1D1D" }}>
            <span className="text-sm leading-none" aria-hidden="true">
              🚫
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90">
              {t("theyCannot")}
            </span>
          </div>
          <div className="px-4 py-3 space-y-2.5" style={{ background: "#FEF2F2" }}>
            {card.theyCannot.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.3, ease: "easeOut" }}
                className="flex items-start gap-3 bg-white rounded-xl px-4 py-3.5 shadow-sm"
                style={{ borderLeft: "3px solid #DC2626" }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "#FEE2E2", minWidth: "1.25rem" }}
                  aria-hidden="true"
                >
                  <svg
                    width="7"
                    height="7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C01919"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-sm leading-snug" style={{ color: "#7F1D1D" }}>
                  {text(item, locale)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── 4. YOU CAN ─── */}
      {card.youCan.length > 0 && (
        <div>
          <div className="flex items-center gap-2.5 px-5 py-3" style={{ background: "#14532D" }}>
            <span className="text-sm leading-none" aria-hidden="true">
              ✅
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90">
              {t("youCan")}
            </span>
          </div>
          <div className="px-4 py-3 space-y-3" style={{ background: "#F0FDF4" }}>
            {card.youCan.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.3, ease: "easeOut" }}
                className="flex items-start gap-3"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-extrabold text-white text-xs shadow-sm"
                  style={{ background: "#15803D", minWidth: "1.5rem" }}
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <p className="text-sm leading-snug pt-0.5" style={{ color: "#14532D" }}>
                  {text(item, locale)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. LEGAL BASIS ─── */}
      <div style={{ background: "#0E1F4A" }}>
        <div
          className="flex items-center gap-2.5 px-5 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span className="text-sm leading-none" aria-hidden="true">
            📚
          </span>
          <span
            className="text-[10px] font-extrabold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {t("legalBasis")}
          </span>
        </div>
        <div className="px-5 py-4 flex flex-col gap-2">
          {card.citations.map((c, i) => (
            <a
              key={i}
              href={c.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 rounded-xl px-3.5 py-3 text-xs font-medium leading-snug transition-colors hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "#F5A41E",
                border: "1px solid rgba(245,164,30,0.2)",
              }}
              aria-label={`${text(c.label, locale)} — ${lang === "fil" ? "Buksan ang batas sa bagong tab" : "Open source law in new tab"}`}
            >
              <ExternalLink size={11} className="shrink-0 mt-0.5 opacity-60" aria-hidden="true" />
              <span>{text(c.label, locale)}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── 6. SCOPE NOTES ─── */}
      {card.scopeNotes && (
        <div
          className="px-5 py-4"
          style={{ background: "#F4F7FF", borderTop: "1px solid #E8EDF7" }}
        >
          <p className="text-[10px] font-extrabold uppercase tracking-widest mb-2 text-gray-300">
            ℹ️ {t("scopeNotes")}
          </p>
          <p className="text-xs leading-relaxed text-gray-500">{text(card.scopeNotes, locale)}</p>
        </div>
      )}

      {/* ── 7. FOOTER ─── */}
      <div className="px-5 py-4" style={{ background: "#FFFBEB", borderTop: "1px solid #FDE68A" }}>
        <p className="text-xs leading-snug mb-3" style={{ color: "#92400E" }}>
          ⚠️ {tDis("consultLawyer")}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-300">
            {t("lastVerified")}: {card.lastVerified}
          </span>
          <button
            type="button"
            className="text-[10px] underline transition-colors min-h-0 min-w-0 text-gray-300 hover:text-gray-500"
            aria-label={
              lang === "fil" ? "I-flag ang card na ito bilang mali" : "Flag this card as incorrect"
            }
          >
            {t("flagAsIncorrect")}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
