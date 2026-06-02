import { getTranslations } from "next-intl/server";
import { BottomNavClient } from "./BottomNavClient";

interface Props {
  locale: string;
}

export async function BottomNav({ locale }: Props) {
  const t = await getTranslations("nav");

  const links = [
    { href: `/${locale}`, label: t("home"), icon: "home" as const },
    { href: `/${locale}/search`, label: t("search"), icon: "search" as const },
    { href: `/${locale}/emergency`, label: t("emergency"), icon: "emergency" as const },
  ];

  return <BottomNavClient links={links} locale={locale} />;
}
