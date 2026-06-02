import type { Metadata } from "next";
import { Link } from "@/src/components/ui/Link";
import { MODULE_META } from "@/src/lib/content/loader";
import { MODULE_THEME } from "@/src/lib/module-colors";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Emergency Rights" };
}

const EMERGENCY_MODULES = ["police", "lto", "labor"] as const;

const HOTLINES = [
  { name: "Philippine National Police", number: "117", icon: "🚔" },
  { name: "Commission on Human Rights", number: "(02) 8294-8704", icon: "🛡️" },
  { name: "DOLE Hotline", number: "1349", icon: "👷" },
  { name: "PAO Hotline", number: "1343", icon: "⚖️" },
];

export default async function EmergencyPage({ params }: Props) {
  const { locale } = await params;
  const lang = locale as "fil" | "en";

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #7F1010 0%, #CC1E1E 50%, #F5A41E 100%)",
        }}
      >
        {/* Pulse aura */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-25 animate-pulse"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundSize: "32px 32px",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-10 md:pt-14 pb-12 md:pb-16 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full bg-white animate-pulse"
              aria-hidden="true"
            />
            <span className="text-white text-[10px] md:text-xs font-extrabold uppercase tracking-[0.2em]">
              {lang === "fil" ? "Mabilis na Tulong" : "Quick Help"}
            </span>
          </div>

          <div className="text-5xl md:text-6xl mb-3 animate-bounce-slow" aria-hidden="true">
            🆘
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
            {lang === "fil" ? "Hinarang ka ngayon?" : "Being stopped right now?"}
          </h1>
          <p className="text-base md:text-lg text-white/85 mt-3 max-w-xl mx-auto">
            {lang === "fil"
              ? "Pumili ng sitwasyon para sa pinakamabilis na access sa iyong mga karapatan."
              : "Select your situation for fastest access to your rights."}
          </p>
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

      {/* Modules */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "#CC1E1E" }}
            aria-hidden="true"
          />
          <h2
            className="text-[10px] font-extrabold uppercase tracking-[0.2em]"
            style={{ color: "#7F1010" }}
          >
            {lang === "fil" ? "Mabilis na Aksyon" : "Quick Action"}
          </h2>
        </div>

        <nav
          aria-label="Emergency situations"
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
        >
          {EMERGENCY_MODULES.map((module) => {
            const meta = MODULE_META[module];
            const theme = MODULE_THEME[module];
            return (
              <Link
                key={module}
                href={`/${locale}/module/${module}`}
                className="group relative block overflow-hidden rounded-3xl bg-white kph-shine transition-all hover:-translate-y-1 active:scale-[0.99]"
                style={{
                  border: "2px solid #FEE2E2",
                  boxShadow: "0 8px 24px rgba(204,30,30,0.10)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{
                    background: `linear-gradient(90deg, ${theme.color}, ${theme.border})`,
                  }}
                />
                <div className="relative p-5 md:p-6 flex flex-col items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `linear-gradient(135deg, ${theme.light} 0%, #fff 100%)`,
                      border: `1.5px solid ${theme.color}30`,
                      boxShadow: `0 6px 20px ${theme.color}25`,
                    }}
                    aria-hidden="true"
                  >
                    {meta.icon}
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-base md:text-lg font-extrabold"
                      style={{ color: theme.dark }}
                    >
                      {meta.title[lang]}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 leading-snug">
                      {meta.situations[0]?.[lang]}
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider"
                    style={{ color: theme.color }}
                  >
                    {lang === "fil" ? "Tingnan Karapatan" : "View Rights"}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Hotlines */}
        <section className="mt-10 md:mt-12">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "#CC1E1E" }}
              aria-hidden="true"
            />
            <h2
              className="text-[10px] font-extrabold uppercase tracking-[0.2em]"
              style={{ color: "#7F1010" }}
            >
              {lang === "fil" ? "Mga Hotline" : "Emergency Hotlines"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {HOTLINES.map((h) => (
              <a
                key={h.number}
                href={`tel:${h.number.replace(/[^0-9+]/g, "")}`}
                className="group flex items-center gap-4 bg-white rounded-2xl p-4 md:p-5 transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  border: "1px solid rgba(232,237,247,0.9)",
                  borderLeft: "4px solid #CC1E1E",
                }}
              >
                <span
                  className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#FEF2F2" }}
                  aria-hidden="true"
                >
                  {h.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500">{h.name}</p>
                  <p
                    className="text-lg md:text-xl font-extrabold tabular-nums"
                    style={{ color: "#7F1010" }}
                  >
                    {h.number}
                  </p>
                </div>
                <span
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #CC1E1E, #F5A41E)",
                    boxShadow: "0 4px 12px rgba(204,30,30,0.35)",
                  }}
                  aria-hidden="true"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Disclaimer card */}
        <div
          className="mt-10 rounded-3xl p-5 md:p-6 flex items-start gap-4"
          style={{
            background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
            border: "1px solid #FDE68A",
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: "rgba(245,164,30,0.18)" }}
            aria-hidden="true"
          >
            ⚠️
          </div>
          <div>
            <p className="text-sm font-extrabold mb-1" style={{ color: "#92400E" }}>
              {lang === "fil" ? "Mahalagang paalala" : "Important reminder"}
            </p>
            <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#92400E" }}>
              {lang === "fil"
                ? "Ang impormasyong ito ay para sa pangkalahatang kaalaman. Para sa iyong specific na sitwasyon, kumonsulta sa abogado."
                : "This information is for general awareness. For your specific situation, consult a lawyer."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
