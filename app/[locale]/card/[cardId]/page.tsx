import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCardById, getAllCardIds } from "@/src/lib/content/loader";
import { MODULE_META } from "@/src/lib/module-meta";
import { MODULE_THEME } from "@/src/lib/module-colors";
import { RightsCard } from "@/src/components/cards/RightsCard";
import { Link } from "@/src/components/ui/Link";
import { locales } from "@/src/lib/i18n/config";

interface Props {
  params: Promise<{ locale: string; cardId: string }>;
  searchParams: Promise<{ eli5?: string }>;
}

export async function generateStaticParams() {
  const ids = getAllCardIds();
  return locales.flatMap((locale) => ids.map((cardId) => ({ locale, cardId })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, cardId } = await params;
  const card = getCardById(cardId);
  if (!card) return {};
  const lang = locale as "fil" | "en";
  return {
    title: lang === "fil" ? card.right.fil : card.right.en,
    description: lang === "fil" ? card.whatThisMeans.fil : card.whatThisMeans.en,
  };
}

export default async function CardPage({ params, searchParams }: Props) {
  const { locale, cardId } = await params;
  const { eli5 } = await searchParams;

  const card = getCardById(cardId);
  if (!card) notFound();

  const lang = locale as "fil" | "en";
  const meta = MODULE_META[card.module];
  const theme = MODULE_THEME[card.module];
  const showEli5 = eli5 === "1";

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6 flex-wrap">
        <Link
          href={`/${locale}`}
          className="text-xs font-semibold transition-colors min-h-0 min-w-0 hover:underline"
          style={{ color: theme.color }}
        >
          Home
        </Link>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke={theme.color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="opacity-40"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <Link
          href={`/${locale}/module/${card.module}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors min-h-0 min-w-0 hover:underline"
          style={{ color: theme.color }}
        >
          <span aria-hidden="true">{meta.icon}</span>
          {meta.title[lang]}
        </Link>
      </nav>

      {/* ELI5 toggle */}
      {card.eli5 && (
        <div
          className="flex gap-1 mb-6 p-1 rounded-full max-w-sm"
          style={{
            background: theme.light,
            border: `1px solid ${theme.color}20`,
          }}
          role="group"
          aria-label={lang === "fil" ? "Pumili ng uri ng paliwanag" : "Choose explanation type"}
        >
          <Link
            href={`/${locale}/card/${cardId}`}
            className="flex-1 text-center text-xs font-extrabold px-3 py-2 rounded-full transition-all min-h-0 min-w-0 leading-none"
            style={{
              background: !showEli5
                ? `linear-gradient(135deg, ${theme.color} 0%, ${theme.border} 100%)`
                : "transparent",
              color: !showEli5 ? "#fff" : theme.color,
              boxShadow: !showEli5 ? `0 4px 12px ${theme.color}40` : "none",
            }}
            aria-current={!showEli5 ? "true" : undefined}
          >
            {lang === "fil" ? "Detalyado" : "Standard"}
          </Link>
          <Link
            href={`/${locale}/card/${cardId}?eli5=1`}
            className="flex-1 text-center text-xs font-extrabold px-3 py-2 rounded-full transition-all min-h-0 min-w-0 leading-none"
            style={{
              background: showEli5
                ? `linear-gradient(135deg, ${theme.color} 0%, ${theme.border} 100%)`
                : "transparent",
              color: showEli5 ? "#fff" : theme.color,
              boxShadow: showEli5 ? `0 4px 12px ${theme.color}40` : "none",
            }}
            aria-current={showEli5 ? "true" : undefined}
          >
            {lang === "fil" ? "Simpleng paliwanag" : "Simpler"}
          </Link>
        </div>
      )}

      {/* The card */}
      <RightsCard card={card} locale={locale} showEli5={showEli5} />

      {/* Related */}
      {card.relatedCardIds.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: theme.color }}
              aria-hidden="true"
            />
            <h2
              id="related-heading"
              className="text-[10px] font-extrabold uppercase tracking-[0.2em]"
              style={{ color: theme.color }}
            >
              {lang === "fil" ? "Kaugnay na Karapatan" : "Related Rights"}
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {card.relatedCardIds.map((relId) => {
              const rel = getCardById(relId);
              if (!rel) return null;
              return (
                <li key={relId}>
                  <Link
                    href={`/${locale}/card/${relId}`}
                    className="group flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 hover:shadow-lg active:scale-[0.99] transition-all"
                    style={{
                      border: "1px solid rgba(232,237,247,0.9)",
                      borderLeft: `3px solid ${theme.color}50`,
                    }}
                  >
                    <span
                      className="flex-1 text-sm font-semibold leading-snug"
                      style={{ color: theme.dark }}
                    >
                      {lang === "fil" ? rel.right.fil : rel.right.en}
                    </span>
                    <span
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform"
                      style={{ background: theme.light, color: theme.color }}
                      aria-hidden="true"
                    >
                      <svg
                        width="13"
                        height="13"
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
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
