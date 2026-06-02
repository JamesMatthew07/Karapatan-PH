"use client";

import { motion } from "motion/react";
import NextLink from "next/link";
import type { RightsCard } from "@/content/schema/card.schema";
import type { ModuleTheme } from "@/src/lib/module-colors";

interface Props {
  cards: RightsCard[];
  locale: string;
  lang: "fil" | "en";
  theme: ModuleTheme;
  moduleTitle: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function ModuleCardGrid({ cards, locale, lang, theme, moduleTitle }: Props) {
  return (
    <nav aria-label={`${moduleTitle} rights`}>
      <motion.ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 list-none p-0 m-0"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {cards.map((c, idx) => {
          const isDraft = c.verification !== "verified";
          return (
            <motion.li key={c.id} variants={card}>
              <NextLink
                href={`/${locale}/card/${c.id}`}
                className="group relative block h-full overflow-hidden rounded-2xl bg-white kph-shine transition-all hover:-translate-y-1 active:scale-[0.99]"
                style={{
                  border: "1px solid rgba(232,237,247,0.9)",
                  boxShadow: "0 4px 16px rgba(27,50,114,0.06)",
                }}
              >
                {/* Top color strip */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all group-hover:h-2"
                  style={{
                    background: isDraft
                      ? "linear-gradient(90deg, #F5A623, #B45309)"
                      : `linear-gradient(90deg, ${theme.color}, ${theme.border})`,
                  }}
                />

                <div className="relative p-5 md:p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-xs font-extrabold shrink-0"
                      style={{
                        background: isDraft ? "#FEF3C7" : theme.light,
                        color: isDraft ? "#B45309" : theme.color,
                      }}
                      aria-hidden="true"
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    {isDraft ? (
                      <span
                        className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest rounded-full px-2 py-1"
                        style={{ background: "#FEF3C7", color: "#B45309" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"
                          aria-hidden="true"
                        />
                        {lang === "fil" ? "Draft" : "Draft"}
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest rounded-full px-2 py-1"
                        style={{ background: "#DCFCE7", color: "#166534" }}
                      >
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {lang === "fil" ? "Verified" : "Verified"}
                      </span>
                    )}
                  </div>

                  <h3
                    className="font-extrabold text-base md:text-lg leading-snug mb-2"
                    style={{ color: isDraft ? "#92400E" : theme.dark }}
                  >
                    {lang === "fil" ? c.right.fil : c.right.en}
                  </h3>

                  {c.situationTags[0] && (
                    <p className="text-xs md:text-sm text-gray-500 leading-snug flex-1 line-clamp-2">
                      {lang === "fil" ? c.situationTags[0].fil : c.situationTags[0].en}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: theme.color, opacity: 0.7 }}
                    >
                      {lang === "fil" ? "Basahin →" : "Read →"}
                    </span>
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1"
                      style={{ background: theme.light, color: theme.color }}
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
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </NextLink>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
