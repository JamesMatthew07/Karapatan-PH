import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/src/components/ui/Link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("about") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const lang = locale as "fil" | "en";

  return (
    <div className="max-w-lg mx-auto px-4 py-6 prose prose-sm">
      <Link href={`/${locale}`} className="text-blue-600 text-sm mb-4 block">
        ← {lang === "fil" ? "Bumalik" : "Back"}
      </Link>

      <h1>{lang === "fil" ? "Tungkol sa KarapatanPH" : "About KarapatanPH"}</h1>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
        <p className="text-amber-800 text-sm font-semibold">
          ⚠️{" "}
          {lang === "fil"
            ? "Hindi kami kaanib ng anumang ahensiya ng pamahalaan, IBP, o anumang korte."
            : "We are not affiliated with any government agency, the IBP, or any court."}
        </p>
      </div>

      {lang === "fil" ? (
        <>
          <p>
            Ang <strong>KarapatanPH</strong> ay isang libreng proyekto na nagbibigay ng madaling
            maintindihang impormasyon tungkol sa mga karapatang Pilipino.
          </p>
          <p>
            Ginawa ito para sa ordinaryong Pilipino — mga driver, manggagawa, estudyante, at
            magulang — na nangangailangan ng mabilis na sagot tungkol sa kanilang mga karapatan nang
            walang kailangan ng abogado.
          </p>
          <h2>Misyon</h2>
          <p>
            Gawing accessible, maintindihan, at mapagsilbihan ang batas ng Pilipinas para sa bawat
            Pilipino — anuman ang edukasyon, kita, o lokasyon.
          </p>
          <h2>Paano na-verify ang nilalaman</h2>
          <p>
            Bawat karapatang card ay dumadaan sa tatlong layer ng pagsusuri: (1) source tracing mula
            sa opisyal na dokumento ng pamahalaan, (2) pagsusuri ng plain-language rewrite, at (3)
            legal review ng isang lisensyadong abogado. Ang mga card na hindi pa dumadaan sa legal
            review ay malinaw na minarkahan bilang DRAFT at hindi available sa pampublikong release.
          </p>
          <h2>Disclaimer</h2>
          <p>
            Ang KarapatanPH ay para sa impormasyon lamang at hindi legal na payo. Para sa iyong
            specific na sitwasyon, kumonsulta sa isang lisensyadong abogado.
          </p>
        </>
      ) : (
        <>
          <p>
            <strong>KarapatanPH</strong> is a free project providing plain-language information
            about Filipino legal rights.
          </p>
          <p>
            Built for ordinary Filipinos — drivers, workers, students, and parents — who need quick
            answers about their rights without requiring a lawyer.
          </p>
          <h2>Mission</h2>
          <p>
            To make Philippine law accessible, understandable, and actionable for every Filipino —
            regardless of education level, income, or location.
          </p>
          <h2>How content is verified</h2>
          <p>
            Every rights card goes through a 3-layer review: (1) source tracing from official
            government documents, (2) plain-language rewrite review, and (3) legal review by a
            licensed lawyer. Cards that have not yet passed legal review are clearly marked DRAFT
            and are not available in the public release.
          </p>
          <h2>Disclaimer</h2>
          <p>
            KarapatanPH is for informational purposes only and does not constitute legal advice. For
            your specific situation, consult a licensed lawyer.
          </p>
        </>
      )}

      <div className="flex gap-4 mt-6 flex-wrap">
        <Link href={`/${locale}/privacy`} className="text-blue-600 text-sm">
          {lang === "fil" ? "Patakaran sa Privacy" : "Privacy Policy"}
        </Link>
        <Link href={`/${locale}/terms`} className="text-blue-600 text-sm">
          {lang === "fil" ? "Mga Tuntunin" : "Terms of Use"}
        </Link>
        <Link href={`/${locale}/complaints`} className="text-blue-600 text-sm">
          {lang === "fil" ? "Mga Ahensiya" : "Complaint Channels"}
        </Link>
      </div>
    </div>
  );
}
