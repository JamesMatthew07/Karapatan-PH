"use client";

import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Home, Search, AlertTriangle } from "lucide-react";

type IconName = "home" | "search" | "emergency";

interface NavLink {
  href: string;
  label: string;
  icon: IconName;
}

interface Props {
  links: NavLink[];
  locale: string;
}

const ICONS: Record<IconName, React.ComponentType<{ size: number; "aria-hidden": "true" }>> = {
  home: Home,
  search: Search,
  emergency: AlertTriangle,
};

export function BottomNavClient({ links }: Props) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="fixed bottom-3 left-3 right-3 z-30 md:hidden">
      <motion.ul
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="flex items-center justify-around rounded-full px-2 py-1.5 mx-auto max-w-sm"
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(18px) saturate(180%)",
          WebkitBackdropFilter: "blur(18px) saturate(180%)",
          border: "1px solid rgba(27,50,114,0.10)",
          boxShadow: "0 10px 40px rgba(27,50,114,0.18), 0 2px 6px rgba(27,50,114,0.06)",
        }}
      >
        {links.map(({ href, label, icon }) => {
          const Icon = ICONS[icon];
          const isActive =
            pathname === href ||
            (href.split("/").length > 2 && (pathname?.startsWith(href) ?? false));

          return (
            <li key={href} className="flex-1 relative">
              <NextLink
                href={href}
                className="relative flex items-center justify-center w-full h-12 text-[10px] font-extrabold uppercase tracking-wide transition-colors min-h-0 min-w-0"
                style={{ color: isActive ? "#fff" : "#6B7280" }}
                aria-current={isActive ? "page" : undefined}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="mobile-nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #1B3272 0%, #2543A8 100%)",
                        boxShadow: "0 6px 18px rgba(27,50,114,0.35)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10 flex flex-col items-center gap-0.5 leading-none">
                  <Icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                </span>
              </NextLink>
            </li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
