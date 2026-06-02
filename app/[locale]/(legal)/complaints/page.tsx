import type { Metadata } from "next";
import { Link } from "@/src/components/ui/Link";
import { ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Complaint Channels" };
}

const AGENCIES = [
  {
    nameEn: "Commission on Human Rights (CHR)",
    nameFil: "Komisyon ng Karapatang Pantao (CHR)",
    forEn: "Rights violations by state agents",
    forFil: "Paglabag ng karapatan ng mga ahente ng estado",
    url: "https://chr.gov.ph",
    hotline: "09178-66-2487",
  },
  {
    nameEn: "DOLE",
    nameFil: "DOLE",
    forEn: "Labor violations",
    forFil: "Paglabag sa karapatan ng manggagawa",
    url: "https://dole.gov.ph",
    hotline: "1349",
  },
  {
    nameEn: "NLRC",
    nameFil: "NLRC",
    forEn: "Illegal dismissal",
    forFil: "Ilegal na pagpapaalis sa trabaho",
    url: "https://nlrc.dole.gov.ph",
    hotline: null,
  },
  {
    nameEn: "LTO",
    nameFil: "LTO",
    forEn: "LTO enforcer misconduct",
    forFil: "Maling gawi ng LTO enforcer",
    url: "https://lto.gov.ph",
    hotline: null,
  },
  {
    nameEn: "PNP Internal Affairs Service",
    nameFil: "PNP Internal Affairs",
    forEn: "Police misconduct",
    forFil: "Maling gawi ng pulis",
    url: "https://pnp.gov.ph",
    hotline: null,
  },
  {
    nameEn: "Office of the Ombudsman",
    nameFil: "Tanggapan ng Ombudsman",
    forEn: "Government corruption",
    forFil: "Katiwalian ng gobyerno",
    url: "https://ombudsman.gov.ph",
    hotline: null,
  },
  {
    nameEn: "DTI",
    nameFil: "DTI",
    forEn: "Consumer complaints",
    forFil: "Reklamo ng konsyumer",
    url: "https://dti.gov.ph",
    hotline: "1-384 (1-DTI)",
  },
  {
    nameEn: "National Privacy Commission (NPC)",
    nameFil: "National Privacy Commission (NPC)",
    forEn: "Data privacy violations",
    forFil: "Paglabag sa privacy ng data",
    url: "https://privacy.gov.ph",
    hotline: null,
  },
  {
    nameEn: "IBP Legal Aid",
    nameFil: "IBP Legal Aid",
    forEn: "Free legal consultation",
    forFil: "Libreng konsultasyon sa abogado",
    url: "https://ibp.ph",
    hotline: null,
  },
] as const;

export default async function ComplaintsPage({ params }: Props) {
  const { locale } = await params;
  const lang = locale as "fil" | "en";

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <Link href={`/${locale}`} className="text-blue-600 text-sm mb-4 block">
        ← {lang === "fil" ? "Bumalik" : "Back"}
      </Link>
      <h1 className="text-xl font-bold text-gray-900 mb-2">
        {lang === "fil" ? "Mga Ahensiya ng Reklamo" : "Complaint Channels"}
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        {lang === "fil"
          ? "Dito maaari kang magreklamo para sa iba't ibang uri ng paglabag."
          : "Where to file complaints for different types of violations."}
      </p>

      <ul className="space-y-3">
        {AGENCIES.map((agency) => (
          <li key={agency.nameEn} className="bg-white border border-gray-200 rounded-xl px-4 py-3">
            <a
              href={agency.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 text-sm flex items-center gap-1 hover:underline"
            >
              {lang === "fil" ? agency.nameFil : agency.nameEn}
              <ExternalLink size={12} aria-hidden="true" />
            </a>
            <p className="text-xs text-gray-600 mt-0.5">
              {lang === "fil" ? agency.forFil : agency.forEn}
            </p>
            {agency.hotline && (
              <p className="text-xs text-gray-400 mt-1">
                {lang === "fil" ? "Hotline" : "Hotline"}: {agency.hotline}
              </p>
            )}
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-400 mt-6">
        {lang === "fil"
          ? "Ang mga link ay para sa kaginhawaan lamang. Hindi kami kaanib ng mga ahensyang ito."
          : "Links are for convenience only. We are not affiliated with these agencies."}
      </p>
    </div>
  );
}
