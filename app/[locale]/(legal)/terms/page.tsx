import type { Metadata } from "next";
import { Link } from "@/src/components/ui/Link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Terms of Use" };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const lang = locale as "fil" | "en";

  return (
    <div className="max-w-lg mx-auto px-4 py-6 prose prose-sm">
      <Link href={`/${locale}`} className="text-blue-600 text-sm mb-4 block">
        ← {lang === "fil" ? "Bumalik" : "Back"}
      </Link>
      <h1>{lang === "fil" ? "Mga Tuntunin ng Paggamit" : "Terms of Use"}</h1>

      {lang === "fil" ? (
        <>
          <p>Sa paggamit ng KarapatanPH, sumasang-ayon ka sa mga sumusunod:</p>
          <ul>
            <li>Ang nilalaman ay para sa impormasyon lamang at hindi bumubuo ng legal na payo.</li>
            <li>
              Walang attorney-client relationship ang nabubuo sa pamamagitan ng paggamit ng app na
              ito.
            </li>
            <li>
              Hindi ginagarantiyahan ng KarapatanPH ang pagkakumpleto, katumpakan, o kasalukuyang
              katayuan ng lahat ng nilalaman.
            </li>
            <li>
              Ang mga batas ay maaaring magbago. Palaging i-verify ang kasalukuyang batas mula sa
              opisyal na mapagkukunan.
            </li>
            <li>Ang KarapatanPH ay hindi kaanib ng anumang ahensiya ng pamahalaan.</li>
          </ul>
          <p>Para sa iyong specific na sitwasyon, kumonsulta sa isang lisensyadong abogado.</p>
        </>
      ) : (
        <>
          <p>By using KarapatanPH, you agree to the following:</p>
          <ul>
            <li>
              Content is for informational purposes only and does not constitute legal advice.
            </li>
            <li>No attorney-client relationship is formed by using this app.</li>
            <li>
              KarapatanPH does not guarantee the completeness, accuracy, or currency of all content.
            </li>
            <li>Laws may change. Always verify current law from official sources.</li>
            <li>KarapatanPH is not affiliated with any government agency.</li>
          </ul>
          <p>For your specific situation, consult a licensed lawyer.</p>
        </>
      )}
    </div>
  );
}
