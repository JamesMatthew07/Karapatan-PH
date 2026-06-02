import { getTranslations } from "next-intl/server";
import { TopHeaderClient } from "./TopHeaderClient";

interface Props {
  locale: string;
}

export async function TopHeader({ locale }: Props) {
  const t = await getTranslations("nav");

  const links = [
    { href: `/${locale}`, label: t("home"), icon: "home" as const },
    { href: `/${locale}/search`, label: t("search"), icon: "search" as const },
    { href: `/${locale}/emergency`, label: t("emergency"), icon: "emergency" as const },
  ];

  return <TopHeaderClient locale={locale} links={links} />;
}
