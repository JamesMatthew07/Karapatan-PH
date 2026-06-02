import { getTranslations } from "next-intl/server";

export async function DisclaimerBar() {
  const t = await getTranslations("disclaimer");

  return (
    <aside
      role="note"
      aria-label="Legal disclaimer"
      className="fixed left-0 right-0 z-20 px-4 py-1.5 text-center bottom-16 md:bottom-0"
      style={{
        background: "rgba(255,251,235,0.92)",
        borderTop: "1px solid rgba(253,230,138,0.6)",
        backdropFilter: "blur(10px) saturate(140%)",
        WebkitBackdropFilter: "blur(10px) saturate(140%)",
      }}
    >
      <p className="text-[11px] font-medium leading-tight" style={{ color: "#92400E" }}>
        <span aria-hidden="true">⚠️</span> {t("short")}
      </p>
    </aside>
  );
}
