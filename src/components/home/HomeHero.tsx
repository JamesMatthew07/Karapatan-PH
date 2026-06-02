"use client";

import { motion } from "motion/react";
import NextLink from "next/link";
import { BackgroundBeams } from "@/src/components/ui/BackgroundBeams";

interface Props {
  locale: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  titleSuffix: string;
  subtitle: string;
  searchCta: string;
  emergencyCta: string;
  logo: React.ReactNode;
}

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 + i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function HomeHero({
  locale,
  eyebrow,
  title,
  titleAccent,
  titleSuffix,
  subtitle,
  searchCta,
  emergencyCta,
  logo,
}: Props) {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Aurora gradient backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(27,50,114,0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 80% 20%, rgba(245,164,30,0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 20% 30%, rgba(204,30,30,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Dot grid (Aceternity) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundSize: "26px 26px",
          backgroundImage: "radial-gradient(rgba(27,50,114,0.18) 1px, transparent 1px)",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Animated beams (subtle) */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <BackgroundBeams />
      </div>

      {/* Gold sun glow behind logo */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 520,
          height: 520,
          background:
            "radial-gradient(ellipse at center, rgba(245,164,30,0.20) 0%, rgba(245,164,30,0.06) 40%, transparent 70%)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              custom={0}
              variants={reveal}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(27,50,114,0.10)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#F5A41E" }}
                aria-hidden="true"
              />
              <span
                className="text-[10px] md:text-xs font-extrabold uppercase tracking-[0.2em]"
                style={{ color: "#1B3272" }}
              >
                {eyebrow}
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              custom={1}
              variants={reveal}
              initial="hidden"
              animate="show"
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight"
              style={{ color: "#0E1F4A" }}
            >
              {title}
              <span className="kph-gradient-text">{titleAccent}</span>
              {titleSuffix}
            </motion.h1>

            <motion.p
              custom={2}
              variants={reveal}
              initial="hidden"
              animate="show"
              className="mt-5 md:mt-6 text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0"
            >
              {subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={reveal}
              initial="hidden"
              animate="show"
              className="mt-7 md:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3"
            >
              <NextLink
                href={`/${locale}/search`}
                className="group relative flex items-center gap-3 rounded-2xl px-5 py-4 transition-all overflow-hidden w-full sm:w-auto sm:min-w-[320px]"
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(27,50,114,0.12)",
                  boxShadow: "0 10px 30px rgba(27,50,114,0.10), 0 1px 3px rgba(27,50,114,0.06)",
                }}
              >
                <span
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(245,164,30,0.18), rgba(27,50,114,0.10), rgba(204,30,30,0.12))",
                  }}
                  aria-hidden="true"
                />
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 group-hover:stroke-ph-navy transition-colors relative z-10"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <span className="text-sm text-gray-500 group-hover:text-gray-800 transition-colors flex-1 text-left relative z-10">
                  {searchCta}
                </span>
                <kbd
                  className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md relative z-10"
                  style={{
                    background: "#F4F7FF",
                    color: "#1B3272",
                    border: "1px solid #E8EDF7",
                  }}
                  aria-hidden="true"
                >
                  ⌘ K
                </kbd>
              </NextLink>

              <NextLink
                href={`/${locale}/emergency`}
                className="group relative flex items-center justify-center gap-2.5 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #CC1E1E 0%, #F5A41E 100%)",
                  boxShadow: "0 10px 30px rgba(204,30,30,0.30), 0 4px 12px rgba(245,164,30,0.20)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #B71818 0%, #D48B10 100%)",
                  }}
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10 animate-bounce-slow"
                  aria-hidden="true"
                >
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span className="relative z-10">{emergencyCta}</span>
              </NextLink>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              custom={4}
              variants={reveal}
              initial="hidden"
              animate="show"
              className="mt-8 flex items-center justify-center lg:justify-start gap-6 flex-wrap"
            >
              {[
                { icon: "🛡️", label: locale === "fil" ? "Verified ng abogado" : "Lawyer-verified" },
                { icon: "🇵🇭", label: locale === "fil" ? "Filipino & English" : "Bilingual" },
                { icon: "📱", label: locale === "fil" ? "Mobile-first" : "Mobile-first" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-500"
                >
                  <span aria-hidden="true" className="text-sm">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — logo card (desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 hidden lg:flex justify-center"
          >
            <div className="relative">
              {/* Glowing ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full blur-3xl opacity-40 animate-pulse"
                style={{
                  background: "conic-gradient(from 0deg, #1B3272, #F5A41E, #CC1E1E, #1B3272)",
                }}
              />
              <div
                className="relative rounded-[2rem] p-10 kph-glass"
                style={{
                  boxShadow: "0 20px 60px rgba(27,50,114,0.18), 0 4px 16px rgba(27,50,114,0.08)",
                }}
              >
                {logo}
              </div>
              {/* Floating accent */}
              <motion.div
                aria-hidden="true"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full text-xs font-extrabold text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #CC1E1E, #F5A41E)" }}
              >
                {locale === "fil" ? "Libre forever" : "Free forever"}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
