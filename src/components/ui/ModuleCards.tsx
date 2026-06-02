"use client";

import { motion } from "motion/react";
import NextLink from "next/link";
import { cn } from "@/src/lib/utils";
import { GlowingEffect } from "@/src/components/ui/GlowingEffect";

export interface ModuleCardItem {
  href: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  lightColor: string;
  borderColor: string;
  darkColor: string;
}

interface Props {
  items: ModuleCardItem[];
  className?: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function ModuleCards({ items, className }: Props) {
  return (
    <motion.ul
      className={cn("space-y-3 list-none p-0 m-0", className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {items.map((item) => (
        <motion.li key={item.href} variants={cardAnim}>
          <div className="relative rounded-2xl group">
            <GlowingEffect
              spread={36}
              proximity={80}
              inactiveZone={0.08}
              borderWidth={2}
              movementDuration={1.2}
            />

            <NextLink
              href={item.href}
              className="relative z-10 flex items-center gap-4 rounded-2xl px-4 py-4 md:px-5 md:py-5 bg-white transition-all hover:bg-ph-navy-faint active:scale-[0.99]"
              style={{
                border: "1px solid rgba(232,237,247,0.9)",
                boxShadow: "0 4px 14px rgba(27,50,114,0.06)",
              }}
            >
              {/* Icon */}
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-2xl shrink-0 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${item.lightColor} 0%, white 100%)`,
                  border: `1.5px solid ${item.color}30`,
                  boxShadow: `0 4px 12px ${item.color}25`,
                }}
                whileHover={{ scale: 1.08, rotate: -4 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                <span className="relative z-10">{item.icon}</span>
                {/* shine */}
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
                  }}
                />
              </motion.div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className="font-extrabold text-sm md:text-base leading-tight transition-colors"
                  style={{ color: item.color }}
                >
                  {item.title}
                </p>
                <p className="text-xs md:text-sm mt-1 leading-snug text-gray-500 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Chevron */}
              <motion.span
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: item.lightColor, color: item.color }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.18 }}
                aria-hidden="true"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </motion.span>
            </NextLink>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
