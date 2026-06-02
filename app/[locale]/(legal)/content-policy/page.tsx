import type { Metadata } from "next";
import { Link } from "@/src/components/ui/Link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Content Policy" };
}

export default async function ContentPolicyPage({ params }: Props) {
  const { locale } = await params;
  const lang = locale as "fil" | "en";

  return (
    <div className="max-w-lg mx-auto px-4 py-6 prose prose-sm">
      <Link href={`/${locale}`} className="text-blue-600 text-sm mb-4 block">
        ← {lang === "fil" ? "Bumalik" : "Back"}
      </Link>
      <h1>{lang === "fil" ? "Patakaran sa Nilalaman" : "Content Policy"}</h1>

      {lang === "fil" ? (
        <>
          <h2>Pamantayan ng pinagkukunan</h2>
          <p>
            Bawat rights card ay kinakailangang may direktang citation sa isang tiyak na batas ng
            Pilipinas (Republic Act, Presidential Decree, Rules of Court, o Constitutional
            provision) at isang URL sa opisyal na pahina ng pamahalaan o SC E-Library.
          </p>
          <h2>Proseso ng pagsusuri</h2>
          <ol>
            <li>
              <strong>Layer 1 — Source Tracing:</strong> Natagpuan ang eksaktong probisyon.
            </li>
            <li>
              <strong>Layer 2 — Pagsusuri ng Plain Language:</strong> Ang simpleng bersyon ay sinuri
              para sa tumpak na kahulugan.
            </li>
            <li>
              <strong>Layer 3 — Legal Review:</strong> Sinuri ng isang lisensyadong abogado o
              supervised na law clinic.
            </li>
          </ol>
          <p>
            Ang mga card na hindi pa dumadaan sa Layer 3 ay malinaw na minarkahan bilang{" "}
            <strong>DRAFT</strong> at hindi available sa produksyon.
          </p>
          <h2>Pag-update at pag-flag</h2>
          <p>
            Ang bawat card ay may visible na &ldquo;Last verified&rdquo; na petsa. Ang mga gumagamit
            ay maaaring i-flag ang mga maling nilalaman (available sa v2). Ang mga batas na na-amend
            ay agad na ini-update o minarkahan bilang deprecated.
          </p>
          <h2>Ano ang hindi gagawin ng app</h2>
          <ul>
            <li>Mag-present ng opinyon bilang batas</li>
            <li>Magbigay ng specific na legal na payo</li>
            <li>Mag-claim na kapalit ng isang tunay na abogado</li>
          </ul>
        </>
      ) : (
        <>
          <h2>Sourcing standards</h2>
          <p>
            Every rights card must have a direct citation to a specific Philippine law (Republic
            Act, Presidential Decree, Rules of Court, or Constitutional provision) and a URL to an
            official government page or SC E-Library.
          </p>
          <h2>Review process</h2>
          <ol>
            <li>
              <strong>Layer 1 — Source Tracing:</strong> Exact provision located.
            </li>
            <li>
              <strong>Layer 2 — Plain Language Review:</strong> Simplified version checked for
              accuracy.
            </li>
            <li>
              <strong>Layer 3 — Legal Review:</strong> Reviewed by a licensed lawyer or supervised
              law clinic.
            </li>
          </ol>
          <p>
            Cards that have not yet passed Layer 3 are clearly marked <strong>DRAFT</strong> and are
            not available in production.
          </p>
          <h2>Updates and flagging</h2>
          <p>
            Each card shows a visible &ldquo;Last verified&rdquo; date. Users can flag incorrect
            content (available in v2). Laws that are amended are promptly updated or marked
            deprecated.
          </p>
          <h2>What the app will never do</h2>
          <ul>
            <li>Present opinion as law</li>
            <li>Give specific legal advice</li>
            <li>Claim to replace a real lawyer</li>
          </ul>
        </>
      )}
    </div>
  );
}
