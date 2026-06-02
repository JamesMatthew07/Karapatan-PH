import { getTranslations } from "next-intl/server";
import { KarapatanLogo } from "@/src/components/ui/KarapatanLogo";
import { SituationTiles } from "@/src/components/home/SituationTiles";
import { ModuleCards, type ModuleCardItem } from "@/src/components/ui/ModuleCards";
import { HomeHero } from "@/src/components/home/HomeHero";
import { HomeStats } from "@/src/components/home/HomeStats";
import { MODULE_META } from "@/src/lib/module-meta";
import { MODULE_THEME } from "@/src/lib/module-colors";
import type { Module } from "@/content/schema/card.schema";

interface Props {
  params: Promise<{ locale: string }>;
}

const MODULES: Module[] = ["police", "lto", "labor", "barangay", "consumer"];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const lang = locale as "fil" | "en";

  const moduleCardItems: ModuleCardItem[] = MODULES.map((mod) => {
    const theme = MODULE_THEME[mod];
    const meta = MODULE_META[mod];
    return {
      href: `/${locale}/module/${mod}`,
      icon: meta.icon,
      title: meta.title[lang],
      description: meta.description[lang],
      color: theme.color,
      lightColor: theme.light,
      borderColor: theme.border,
      darkColor: theme.dark,
    };
  });

  const browseLabel = lang === "fil" ? "Mag-browse ayon sa paksa" : "Browse by topic";
  const heroEyebrow = lang === "fil" ? "Libre. Mabilis. Tama." : "Free. Fast. Accurate.";
  const heroTitle = lang === "fil" ? "Alamin ang iyong " : "Know your ";
  const heroTitleAccent = lang === "fil" ? "karapatan" : "rights";
  const heroTitleSuffix = lang === "fil" ? "." : ".";
  const heroSub =
    lang === "fil"
      ? "Plain Filipino. No legal jargon. Para sa mga ordinaryong Pilipino."
      : "Plain language. No legal jargon. Built for every Filipino.";
  const searchCta = lang === "fil" ? "Hanapin ang iyong sitwasyon..." : "Search your situation...";
  const emergencyCta = lang === "fil" ? "Emergency Help" : "Emergency Help";

  return (
    <div className="relative">
      {/* ══════════════════════════════════════════════════ HERO */}
      <HomeHero
        locale={locale}
        eyebrow={heroEyebrow}
        title={heroTitle}
        titleAccent={heroTitleAccent}
        titleSuffix={heroTitleSuffix}
        subtitle={heroSub}
        searchCta={searchCta}
        emergencyCta={emergencyCta}
        logo={<KarapatanLogo size="xl" />}
      />

      {/* ══════════════════════════════════════════════════ STATS */}
      <HomeStats lang={lang} />

      {/* ══════════════════════════════════════════════════ CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Situations */}
          <section className="lg:col-span-7" aria-labelledby="situations-heading">
            <SectionHeader
              kicker={lang === "fil" ? "Karaniwang sitwasyon" : "Common situations"}
              title={t("commonSituations")}
              subtitle={
                lang === "fil"
                  ? "Tap ang sitwasyon na pinakamalapit sa iyo."
                  : "Tap the situation closest to yours."
              }
            />
            <SituationTiles locale={locale} lang={lang} />
          </section>

          {/* Modules */}
          <section className="lg:col-span-5" aria-labelledby="modules-heading">
            <SectionHeader
              kicker={lang === "fil" ? "Mga paksa" : "Topics"}
              title={browseLabel}
              subtitle={lang === "fil" ? "I-browse ang lahat ng moduyo." : "Browse every module."}
            />
            <nav aria-label="Rights modules">
              <ModuleCards items={moduleCardItems} />
            </nav>
          </section>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6">
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
          {kicker}
        </span>
      </div>
      <h2 className="text-xl md:text-2xl font-extrabold leading-tight" style={{ color: "#0E1F4A" }}>
        {title}
      </h2>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
