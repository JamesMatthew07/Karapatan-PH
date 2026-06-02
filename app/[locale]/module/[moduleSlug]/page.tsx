import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/src/components/ui/Link";
import { Spotlight } from "@/src/components/ui/Spotlight";
import { ModuleCardGrid } from "@/src/components/module/ModuleCardGrid";
import { getCardsByModule, MODULE_META } from "@/src/lib/content/loader";
import { MODULE_THEME } from "@/src/lib/module-colors";
import { Module } from "@/content/schema/card.schema";
import { locales } from "@/src/lib/i18n/config";

interface Props {
  params: Promise<{ locale: string; moduleSlug: string }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    for (const mod of Object.keys(MODULE_META)) {
      params.push({ locale, moduleSlug: mod });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, moduleSlug } = await params;
  const meta = MODULE_META[moduleSlug as Module];
  if (!meta) return {};
  const lang = locale as "fil" | "en";
  return { title: meta.title[lang], description: meta.description[lang] };
}

export default async function ModulePage({ params }: Props) {
  const { locale, moduleSlug } = await params;

  const parsed = Module.safeParse(moduleSlug);
  if (!parsed.success) notFound();

  const moduleId = parsed.data;
  const meta = MODULE_META[moduleId];
  const theme = MODULE_THEME[moduleId];
  const cards = getCardsByModule(moduleId);
  const lang = locale as "fil" | "en";

  return (
    <div>
      {/* ════════════════════════════════════════════ HERO BANNER */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(140deg, ${theme.dark} 0%, ${theme.color} 60%, ${theme.border} 100%)`,
        }}
      >
        {/* Spotlight */}
        <Spotlight className="-top-40 -left-20" fill="rgba(255,255,255,0.35)" />

        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full opacity-20 animate-blob"
          style={{ background: theme.border, filter: "blur(40px)" }}
        />
        <div
          aria-hidden="true"
          className="absolute -left-10 bottom-0 w-72 h-72 rounded-full opacity-15 animate-blob"
          style={{ background: "#fff", filter: "blur(60px)", animationDelay: "-5s" }}
        />

        {/* Grid overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundSize: "32px 32px",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-12 pb-10 md:pb-14">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-semibold mb-6 min-h-0 min-w-0 transition-colors"
            aria-label={lang === "fil" ? "Bumalik sa home" : "Back to home"}
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
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            {lang === "fil" ? "Bumalik sa Home" : "Back to Home"}
          </Link>

          <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center text-4xl md:text-5xl shrink-0 shadow-2xl"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                  aria-hidden="true"
                >
                  {meta.icon}
                </div>
                <div>
                  <p className="text-white/60 text-[10px] md:text-xs font-extrabold uppercase tracking-[0.2em] mb-1">
                    {lang === "fil" ? "Moduyo" : "Module"}
                  </p>
                  <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                    {meta.title[lang]}
                  </h1>
                </div>
              </div>
              <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-2xl">
                {meta.description[lang]}
              </p>
            </div>

            {/* Stats badges */}
            <div className="md:col-span-4 flex md:flex-col gap-3 md:justify-self-end">
              <div
                className="flex-1 md:flex-none rounded-2xl px-4 py-3 md:px-5 md:py-4"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <p className="text-white text-2xl md:text-3xl font-extrabold leading-none">
                  {cards.length}
                </p>
                <p className="text-white/70 text-[10px] md:text-xs font-semibold mt-1.5 uppercase tracking-wider">
                  {lang === "fil" ? "Karapatan" : "Rights"}
                </p>
              </div>
              <div
                className="flex-1 md:flex-none rounded-2xl px-4 py-3 md:px-5 md:py-4"
                style={{
                  background: "rgba(245,164,30,0.18)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(245,164,30,0.3)",
                }}
              >
                <p className="text-white text-xl md:text-2xl font-extrabold leading-none flex items-center gap-1.5">
                  <span aria-hidden="true">🛡️</span>
                  {cards.filter((c) => c.verification === "verified").length}
                </p>
                <p className="text-white/80 text-[10px] md:text-xs font-semibold mt-1.5 uppercase tracking-wider">
                  {lang === "fil" ? "Na-verify" : "Verified"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 60"
          className="block w-full h-8 md:h-12"
          preserveAspectRatio="none"
        >
          <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#FBFCFF" />
        </svg>
      </div>

      {/* ════════════════════════════════════════════ CARDS */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {cards.length === 0 ? (
          <div
            className="rounded-3xl p-8 md:p-12 text-center max-w-md mx-auto"
            style={{
              background: theme.light,
              border: `2px dashed ${theme.color}40`,
            }}
          >
            <p className="text-5xl mb-4" aria-hidden="true">
              📋
            </p>
            <p className="text-base md:text-lg font-bold" style={{ color: theme.color }}>
              {lang === "fil" ? "Wala pang verified na nilalaman." : "No verified content yet."}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {lang === "fil" ? "Coming soon!" : "Coming soon!"}
            </p>
          </div>
        ) : (
          <ModuleCardGrid
            cards={cards}
            locale={locale}
            lang={lang}
            theme={theme}
            moduleTitle={meta.title[lang]}
          />
        )}
      </div>
    </div>
  );
}
