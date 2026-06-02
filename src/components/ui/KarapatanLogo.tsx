/**
 * KarapatanPH Logo — SVG recreation of the official logo
 * Book (navy left / red right) + Philippine sun (gold) + 3 stars
 */

interface BookSunProps {
  width?: number;
  height?: number;
  className?: string;
}

export function KarapatanBookSun({ width = 180, height = 150, className }: BookSunProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="6 6 168 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block" }}
      aria-hidden="true"
    >
      {/* ── Stars ──────────────────────────────── */}
      {/* Top star */}
      <polygon
        points="90,9.5 91.65,13.73 96.18,13.99 92.66,16.87 93.82,21.26 90,18.8 86.18,21.26 87.34,16.87 83.82,13.99 88.35,13.73"
        fill="#F5A41E"
      />
      {/* Left star */}
      <polygon
        points="44,22.5 45.41,26.06 49.23,26.30 46.28,28.74 47.23,32.45 44,30.4 40.77,32.45 41.72,28.74 38.77,26.30 42.59,26.06"
        fill="#F5A41E"
      />
      {/* Right star */}
      <polygon
        points="136,22.5 134.59,26.06 130.77,26.30 133.72,28.74 132.77,32.45 136,30.4 139.23,32.45 138.28,28.74 141.23,26.30 137.41,26.06"
        fill="#F5A41E"
      />

      {/* ── Left book page (navy) ───────────────── */}
      <path
        d="M90,152 C86,132 62,110 26,90 L12,66 C14,56 30,50 54,56 C68,60 80,72 85,108 C87,126 89,140 90,152 Z"
        fill="#1B3272"
      />
      {/* Left page inner sheen */}
      <path
        d="M90,152 C88,134 82,108 74,88 C68,72 60,62 54,56 C68,60 80,72 85,108 C87,126 89,140 90,152 Z"
        fill="rgba(255,255,255,0.12)"
      />
      {/* Left page outer edge highlight lines */}
      <path
        d="M12,66 C10,88 10,112 24,132"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M14,68 C12,90 13,113 26,134"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.25"
      />
      {/* Left page bottom paper-stack lines */}
      <path
        d="M26,134 C46,147 68,152 88,152"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M28,138 C48,151 70,155 88,155"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />

      {/* ── Right book page (red) ───────────────── */}
      <path
        d="M90,152 C94,132 118,110 154,90 L168,66 C166,56 150,50 126,56 C112,60 100,72 95,108 C93,126 91,140 90,152 Z"
        fill="#CC1E1E"
      />
      {/* Right page inner sheen */}
      <path
        d="M90,152 C92,134 98,108 106,88 C112,72 120,62 126,56 C112,60 100,72 95,108 C93,126 91,140 90,152 Z"
        fill="rgba(255,255,255,0.12)"
      />
      {/* Right page outer edge highlight lines */}
      <path
        d="M168,66 C170,88 170,112 156,132"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M166,68 C168,90 167,113 154,134"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.25"
      />
      {/* Right page bottom paper-stack lines */}
      <path
        d="M154,134 C134,147 112,152 92,152"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M152,138 C132,151 110,155 92,155"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />

      {/* ── Philippine Sun rays ─────────────────── */}
      {/* Sun center: (90, 74) */}
      {/* Secondary rays (thinner, between primaries) */}
      <line
        x1="95.7"
        y1="60.1"
        x2="100.3"
        y2="49.1"
        stroke="#F5A41E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="103.9"
        y1="68.3"
        x2="114.9"
        y2="63.7"
        stroke="#F5A41E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="103.9"
        y1="79.7"
        x2="114.9"
        y2="84.3"
        stroke="#F5A41E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="95.7"
        y1="87.9"
        x2="100.3"
        y2="98.9"
        stroke="#F5A41E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="84.3"
        y1="87.9"
        x2="79.7"
        y2="98.9"
        stroke="#F5A41E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="76.1"
        y1="79.7"
        x2="65.1"
        y2="84.3"
        stroke="#F5A41E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="76.1"
        y1="68.3"
        x2="65.1"
        y2="63.7"
        stroke="#F5A41E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="84.3"
        y1="60.1"
        x2="79.7"
        y2="49.1"
        stroke="#F5A41E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Primary rays (thicker, 8 main directions) */}
      <line
        x1="90"
        y1="59"
        x2="90"
        y2="38"
        stroke="#F5A41E"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <line
        x1="101.2"
        y1="63.8"
        x2="115.5"
        y2="48.5"
        stroke="#F5A41E"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <line
        x1="105"
        y1="74"
        x2="126"
        y2="74"
        stroke="#F5A41E"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <line
        x1="101.2"
        y1="84.2"
        x2="115.5"
        y2="99.5"
        stroke="#F5A41E"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <line
        x1="90"
        y1="89"
        x2="90"
        y2="110"
        stroke="#F5A41E"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <line
        x1="78.8"
        y1="84.2"
        x2="64.5"
        y2="99.5"
        stroke="#F5A41E"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <line
        x1="75"
        y1="74"
        x2="54"
        y2="74"
        stroke="#F5A41E"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <line
        x1="78.8"
        y1="63.8"
        x2="64.5"
        y2="48.5"
        stroke="#F5A41E"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Sun circle (on top of rays) */}
      <circle cx="90" cy="74" r="14" fill="#F5A41E" />
      <circle cx="90" cy="74" r="10" fill="#F9BC2A" />
    </svg>
  );
}

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  className?: string;
  dark?: boolean; // white text variant for dark backgrounds
}

const SIZES = {
  xs: { icon: 36, text: "text-base" },
  sm: { icon: 48, text: "text-lg" },
  md: { icon: 72, text: "text-2xl" },
  lg: { icon: 100, text: "text-3xl" },
  xl: { icon: 136, text: "text-4xl" },
};

export function KarapatanLogo({
  size = "md",
  showTagline = false,
  className = "",
  dark = false,
}: LogoProps) {
  const s = SIZES[size];
  const iconH = Math.round(s.icon * 0.9);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <KarapatanBookSun width={s.icon} height={iconH} />

      <div className={`${s.text} font-extrabold tracking-tight leading-none mt-2`}>
        <span style={{ color: dark ? "#fff" : "#1B3272" }}>Karapatan</span>
        <span style={{ color: dark ? "#F5A41E" : "#CC1E1E" }}>PH</span>
      </div>

      {showTagline && (
        <p className="text-xs mt-1.5 font-medium text-center">
          <span style={{ color: "#1B3272" }}>— </span>
          <span style={{ color: dark ? "rgba(255,255,255,0.7)" : "#6B7280" }}>
            Alamin ang iyong{" "}
          </span>
          <span style={{ color: "#CC1E1E" }}>karapatan</span>
          <span style={{ color: dark ? "rgba(255,255,255,0.7)" : "#6B7280" }}>.</span>
          <span style={{ color: "#CC1E1E" }}> —</span>
        </p>
      )}
    </div>
  );
}

/** Compact horizontal variant for top header — icon only */
export function KarapatanLogoHeader({ dark: _dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center justify-center align-middle leading-none">
      <KarapatanBookSun width={36} height={32} />
    </span>
  );
}
