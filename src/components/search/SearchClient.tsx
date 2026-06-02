"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import Fuse from "fuse.js";
import NextLink from "next/link";
import { Link } from "@/src/components/ui/Link";
import { MODULE_THEME } from "@/src/lib/module-colors";
import type { Module } from "@/content/schema/card.schema";

interface SearchableCard {
  id: string;
  module: string;
  verification: string;
  situationTagsFil: string;
  situationTagsEn: string;
  keywords: string;
  rightFil: string;
  rightEn: string;
  whatThisMeansFil: string;
  whatThisMeansEn: string;
}

interface Props {
  searchIndex: SearchableCard[];
}

export function SearchClient({ searchIndex }: Props) {
  const locale = useLocale();
  const lang = locale as "fil" | "en";
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd+K focus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: lang === "fil" ? "situationTagsFil" : "situationTagsEn", weight: 3 },
          { name: "keywords", weight: 2 },
          { name: lang === "fil" ? "rightFil" : "rightEn", weight: 1.5 },
          { name: lang === "fil" ? "rightEn" : "rightFil", weight: 0.5 },
        ],
        threshold: 0.4,
        includeScore: true,
      }),
    [searchIndex, lang],
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 12);
  }, [fuse, query]);

  const placeholder =
    lang === "fil"
      ? "Hanapin ang iyong sitwasyon o karapatan..."
      : "Search your situation or right...";

  const noResults =
    lang === "fil"
      ? "Walang nahanap. Subukan ang ibang salita."
      : "No results found. Try different words.";

  const MODULE_LABELS: Record<string, string> = {
    police: lang === "fil" ? "Pakikitungo sa Pulis" : "Police Encounters",
    lto: lang === "fil" ? "LTO / Trapiko" : "LTO / Traffic",
    labor: lang === "fil" ? "Trabaho" : "Labor",
    barangay: lang === "fil" ? "Barangay" : "Barangay",
    consumer: lang === "fil" ? "Konsyumer" : "Consumer",
  };

  // Popular suggestions
  const popular =
    lang === "fil"
      ? [
          "Hinarang ng pulis",
          "Kinuha ang lisensya",
          "Tinanggal sa trabaho",
          "13th month pay",
          "Depektibo ang produkto",
        ]
      : [
          "Police stopped me",
          "Took my license",
          "Got fired",
          "13th month pay",
          "Defective product",
        ];

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "#F5A41E" }}
            aria-hidden="true"
          />
          <span
            className="text-[10px] font-extrabold uppercase tracking-[0.2em]"
            style={{ color: "#1B3272" }}
          >
            {lang === "fil" ? "Hanapan" : "Search"}
          </span>
        </div>
        <h1
          className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3"
          style={{ color: "#0E1F4A" }}
        >
          {lang === "fil" ? "Hanapin ang iyong " : "Find your "}
          <span className="kph-gradient-text">{lang === "fil" ? "karapatan" : "right"}</span>
        </h1>
        <p className="text-base text-gray-500 mb-6">
          {lang === "fil"
            ? 'Mag-type ng salita o sitwasyon, halimbawa: "hinarang ng pulis".'
            : 'Type a word or situation, e.g. "police stopped me".'}
        </p>
      </motion.div>

      {/* Search input */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative mb-6"
      >
        <div
          className="absolute -inset-0.5 rounded-2xl opacity-50 blur"
          style={{
            background:
              "linear-gradient(120deg, rgba(245,164,30,0.30), rgba(27,50,114,0.30), rgba(204,30,30,0.25))",
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <label htmlFor="search-input" className="sr-only">
            {placeholder}
          </label>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1B3272"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-60"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-4 md:py-5 bg-white rounded-2xl text-sm md:text-base font-medium transition-all"
            style={{
              border: "2px solid #E8EDF7",
              color: "#0D1F3C",
              outline: "none",
              boxShadow: "0 10px 30px rgba(27,50,114,0.10)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#1B3272";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#E8EDF7";
            }}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={lang === "fil" ? "Burahin ang hanapan" : "Clear search"}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <kbd
              className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md"
              style={{
                background: "#F4F7FF",
                color: "#1B3272",
                border: "1px solid #E8EDF7",
              }}
              aria-hidden="true"
            >
              ⌘ K
            </kbd>
          )}
        </div>
      </motion.div>

      {/* Popular suggestions */}
      {!query.trim() && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-3">
            {lang === "fil" ? "Sikat na hanapan" : "Popular searches"}
          </p>
          <div className="flex flex-wrap gap-2">
            {popular.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  setQuery(q);
                  inputRef.current?.focus();
                }}
                className="text-xs font-bold px-3 py-2 rounded-full transition-all min-h-0 min-w-0 hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  color: "#1B3272",
                  border: "1px solid rgba(232,237,247,0.9)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* No results */}
      <AnimatePresence>
        {query.trim() && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-14 rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px dashed rgba(232,237,247,0.9)",
            }}
          >
            <p className="text-4xl mb-3" aria-hidden="true">
              🔍
            </p>
            <p role="status" aria-live="polite" className="text-base font-bold text-gray-700">
              {noResults}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {lang === "fil"
                ? "I-try ang ibang salita o magbrowse ng moduyo."
                : "Try different words or browse modules."}
            </p>
            <NextLink
              href={`/${locale}`}
              className="inline-flex items-center gap-2 mt-5 text-sm font-bold px-5 py-2.5 rounded-full text-white transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #1B3272 0%, #2543A8 100%)",
              }}
            >
              {lang === "fil" ? "Bumalik sa Home" : "Back to Home"} →
            </NextLink>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {results.length > 0 && (
        <section aria-label="Search results" aria-live="polite">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-3">
            {results.length} {lang === "fil" ? "resulta" : "results"}
          </p>
          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.04 } },
            }}
          >
            {results.map(({ item }) => {
              const theme = MODULE_THEME[item.module as Module] ?? MODULE_THEME.police;
              const isDraft = item.verification !== "verified";
              return (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={`/${locale}/card/${item.id}`}
                    className="group relative h-full flex items-start gap-3 bg-white rounded-2xl px-4 py-4 md:px-5 md:py-5 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] transition-all"
                    style={{
                      border: "1px solid rgba(232,237,247,0.9)",
                      borderLeft: `4px solid ${isDraft ? "#F5A623" : theme.color}`,
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-extrabold text-sm md:text-base leading-snug"
                        style={{ color: theme.dark }}
                      >
                        {lang === "fil" ? item.rightFil : item.rightEn}
                      </p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span
                          className="text-[10px] font-extrabold uppercase tracking-wider rounded-full px-2 py-0.5"
                          style={{ background: theme.light, color: theme.color }}
                        >
                          {MODULE_LABELS[item.module] ?? item.module}
                        </span>
                        {isDraft && (
                          <span
                            className="text-[10px] font-extrabold uppercase tracking-wider rounded-full px-2 py-0.5"
                            style={{ background: "#FEF3C7", color: "#B45309" }}
                          >
                            Draft
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 group-hover:translate-x-1 transition-transform"
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
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </section>
      )}
    </div>
  );
}
