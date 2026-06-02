"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Home, Search, AlertTriangle } from "lucide-react";
import { KarapatanLogoHeader } from "@/src/components/ui/KarapatanLogo";
import { LocaleSwitcher } from "./LocaleSwitcher";

type IconName = "home" | "search" | "emergency";

interface NavLink {
  href: string;
  label: string;
  icon: IconName;
}

interface Props {
  locale: string;
  links: NavLink[];
}

const ICONS: Record<IconName, React.ComponentType<{ size: number; "aria-hidden": "true" }>> = {
  home: Home,
  search: Search,
  emergency: AlertTriangle,
};

export function TopHeaderClient({ locale, links }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40 h-20 transition-all"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        borderBottom: "1px solid rgba(27,50,114,0.12)",
        boxShadow: scrolled ? "0 4px 24px rgba(27,50,114,0.10)" : "0 1px 0 rgba(27,50,114,0.04)",
      }}
    >
      {/* Animated gradient accent on bottom edge */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 -bottom-px h-[2px] animate-gradient-x"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #1B3272 30%, #F5A41E 50%, #CC1E1E 70%, transparent 100%)",
          opacity: 0.9,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-full py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <NextLink
          href={`/${locale}`}
          className="min-h-0 min-w-0 group relative"
          aria-label="KarapatanPH — Home"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <KarapatanLogoHeader />
          </motion.div>
        </NextLink>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1 rounded-full p-0.5 relative"
          style={{
            background: "rgba(244,247,255,0.6)",
            border: "1px solid rgba(232,237,247,0.7)",
          }}
        >
          {links.map(({ href, label, icon }) => {
            const Icon = ICONS[icon];
            const isActive =
              pathname === href ||
              (href.split("/").length > 2 && (pathname?.startsWith(href) ?? false));
            return (
              <NextLink
                key={href}
                href={href}
                className="relative inline-flex items-center gap-1.5 px-3.5 h-8 rounded-full text-xs font-bold transition-colors min-h-0 min-w-0 leading-none"
                style={{ color: isActive ? "#fff" : "#1B3272" }}
                aria-current={isActive ? "page" : undefined}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="desktop-nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #1B3272 0%, #2543A8 100%)",
                        boxShadow: "0 6px 20px rgba(27,50,114,0.35)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <Icon size={14} aria-hidden="true" />
                  <span>{label}</span>
                </span>
              </NextLink>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher currentLocale={locale} />
        </div>
      </div>
    </motion.header>
  );
}
