"use client";

import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  currentLocale: string;
}

export function LocaleSwitcher({ currentLocale }: Props) {
  const pathname = usePathname() ?? `/${currentLocale}`;

  return (
    <div
      className="relative flex items-center gap-0.5 rounded-full p-0.5"
      style={{
        background: "rgba(244,247,255,0.7)",
        border: "1px solid rgba(232,237,247,0.7)",
      }}
    >
      {(["fil", "en"] as const).map((loc) => {
        const isActive = loc === currentLocale;
        const href =
          loc === currentLocale ? pathname : pathname.replace(`/${currentLocale}`, `/${loc}`);
        return (
          <NextLink
            key={loc}
            href={href}
            className="relative inline-flex items-center justify-center text-[11px] font-extrabold px-3 h-7 rounded-full transition-colors min-h-0 min-w-0 leading-none"
            style={{ color: isActive ? "#fff" : "#6B7280" }}
            aria-current={isActive ? "page" : undefined}
          >
            <AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId="locale-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #1B3272 0%, #2543A8 100%)",
                    boxShadow: "0 4px 10px rgba(27,50,114,0.35)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{loc === "fil" ? "FIL" : "EN"}</span>
          </NextLink>
        );
      })}
    </div>
  );
}
