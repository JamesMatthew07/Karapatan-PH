import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/src/lib/i18n/config";
import "@/src/styles/globals.css";
import { DisclaimerBar } from "@/src/components/layout/DisclaimerBar";
import { BottomNav } from "@/src/components/layout/BottomNav";
import { TopHeader } from "@/src/components/layout/TopHeader";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "app" });

  return {
    title: {
      default: t("name"),
      template: `%s — ${t("name")}`,
    },
    description: t("description"),
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://karapatanph.vercel.app"),
    openGraph: {
      siteName: t("name"),
      locale: locale === "fil" ? "tl_PH" : "en_US",
      type: "website",
    },
    alternates: {
      languages: {
        tl: "/fil",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div
        lang={locale === "fil" ? "tl" : "en"}
        className="relative min-h-screen flex flex-col overflow-x-hidden"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 0%, rgba(245,164,30,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(204,30,30,0.06) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 50% 30%, rgba(27,50,114,0.05) 0%, transparent 70%), #FBFCFF",
        }}
      >
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-[-10%] left-[-8%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] opacity-[0.07] animate-blob"
          style={{ background: "radial-gradient(circle, #F5A41E 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-[-10%] right-[-8%] w-[42vw] h-[42vw] max-w-[700px] max-h-[700px] opacity-[0.06] animate-blob"
          style={{
            background: "radial-gradient(circle, #CC1E1E 0%, transparent 70%)",
            animationDelay: "-7s",
          }}
        />

        <TopHeader locale={locale} />
        <main className="relative flex-1 pt-20 pb-28 md:pb-12">{children}</main>
        <DisclaimerBar />
        <BottomNav locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
