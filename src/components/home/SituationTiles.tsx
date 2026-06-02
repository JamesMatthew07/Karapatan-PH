"use client";

import { motion } from "motion/react";
import NextLink from "next/link";
import { MODULE_META } from "@/src/lib/module-meta";
import { MODULE_THEME } from "@/src/lib/module-colors";
import type { Module } from "@/content/schema/card.schema";

const MODULES: Module[] = ["police", "lto", "labor", "barangay", "consumer"];

interface Props {
  locale: string;
  lang: "fil" | "en";
  label?: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const tile = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function SituationTiles({ locale, lang }: Props) {
  return (
    <motion.ul
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      aria-label={lang === "fil" ? "Mga karaniwang sitwasyon" : "Common situations"}
    >
      {MODULES.map((mod, idx) => {
        const theme = MODULE_THEME[mod];
        const meta = MODULE_META[mod];
        const situation = meta.situations[0]?.[lang] ?? meta.title[lang];
        const isLast = idx === MODULES.length - 1 && MODULES.length % 2 !== 0;

        return (
          <motion.li key={mod} variants={tile} className={isLast ? "sm:col-span-2" : ""}>
            <NextLink
              href={`/${locale}/module/${mod}`}
              className="group relative block overflow-hidden rounded-2xl bg-white kph-shine transition-all hover:-translate-y-0.5 active:scale-[0.99]"
              style={{
                border: "1px solid rgba(232,237,247,0.9)",
                boxShadow: "0 4px 16px rgba(27,50,114,0.06)",
              }}
            >
              {/* Color flash on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${theme.light} 0%, transparent 60%)`,
                }}
              />

              {/* Big watermark icon */}
              <div
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 text-7xl opacity-[0.06] group-hover:opacity-[0.12] transition-opacity"
                style={{ filter: "blur(0.5px)" }}
              >
                {meta.icon}
              </div>

              <div className="relative flex items-center gap-4 px-4 py-4 md:px-5 md:py-5">
                {/* Icon tile */}
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `linear-gradient(135deg, ${theme.light} 0%, #ffffff 100%)`,
                    border: `1.5px solid ${theme.color}25`,
                    boxShadow: `0 4px 14px ${theme.color}20`,
                  }}
                  aria-hidden="true"
                >
                  {meta.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[10px] font-extrabold uppercase tracking-widest"
                    style={{ color: theme.color, opacity: 0.7 }}
                  >
                    {meta.title[lang]}
                  </span>
                  <p
                    className="text-sm md:text-base font-bold leading-snug mt-0.5"
                    style={{ color: theme.dark }}
                  >
                    {situation}
                  </p>
                </div>

                {/* Arrow */}
                <span
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:translate-x-0.5"
                  style={{
                    background: theme.light,
                    color: theme.color,
                  }}
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>

              {/* Bottom gradient border */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-[3px] transition-opacity opacity-60 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${theme.color} 50%, transparent 100%)`,
                }}
              />
            </NextLink>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
