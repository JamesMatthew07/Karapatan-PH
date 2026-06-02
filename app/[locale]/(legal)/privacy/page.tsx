import type { Metadata } from "next";
import { Link } from "@/src/components/ui/Link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Privacy Policy" };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const lang = locale as "fil" | "en";

  return (
    <div className="max-w-lg mx-auto px-4 py-6 prose prose-sm">
      <Link href={`/${locale}`} className="text-blue-600 text-sm mb-4 block">
        ← {lang === "fil" ? "Bumalik" : "Back"}
      </Link>
      <h1>{lang === "fil" ? "Patakaran sa Privacy" : "Privacy Policy"}</h1>
      <p className="text-gray-500 text-xs">Epektibo: 2026-05-30</p>

      {lang === "fil" ? (
        <>
          <h2>Ano ang kinokolekta namin</h2>
          <p>
            <strong>Wala.</strong> Ang KarapatanPH ay walang account, walang login, at walang
            nakolektang personal na impormasyon. Ang app ay gumagana nang walang anumang server na
            kailangan ng iyong data.
          </p>
          <h2>Analytics</h2>
          <p>
            Gumagamit kami ng privacy-respecting analytics (Plausible o Umami) na walang cookies,
            walang cross-site tracking, at may anonymized na IP. Hindi namin ini-log ang mga
            indibidwal na search query.
          </p>
          <h2>Bakit mahalaga ito</h2>
          <p>
            Ang isang app na ginagamit ng mga taong nag-tatanong kung paano nila ipagtanggol ang
            kanilang sarili laban sa iligal na paghahalughog ay hindi dapat maging rekord ng kung
            sino ang nagtanong. Ang privacy ay parte ng aming disenyo, hindi isang dagdag na
            feature.
          </p>
          <h2>Mga external na link</h2>
          <p>
            Ang mga link sa opisyal na batas ay nagdadala sa&apos;yo sa mga site ng pamahalaan.
            Mayroon silang sariling privacy policies.
          </p>
        </>
      ) : (
        <>
          <h2>What we collect</h2>
          <p>
            <strong>Nothing.</strong> KarapatanPH has no accounts, no login, and collects no
            personal information. The app operates entirely without a server that requires your
            data.
          </p>
          <h2>Analytics</h2>
          <p>
            We use privacy-respecting analytics (Plausible or Umami) — cookieless, no cross-site
            tracking, anonymized IP. We do not log individual search queries.
          </p>
          <h2>Why this matters</h2>
          <p>
            An app used by people asking how to defend themselves against illegal searches should
            not become a record of who asked. Privacy is a design constraint, not a feature.
          </p>
          <h2>External links</h2>
          <p>
            Links to official laws take you to government sites. They have their own privacy
            policies.
          </p>
        </>
      )}
    </div>
  );
}
