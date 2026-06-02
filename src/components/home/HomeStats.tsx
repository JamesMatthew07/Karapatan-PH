"use client";

import { motion } from "motion/react";

interface Props {
  lang: "fil" | "en";
}

export function HomeStats({ lang }: Props) {
  const items = [
    {
      value: "5",
      label: lang === "fil" ? "Mga moduyo" : "Modules",
      icon: "📚",
      tone: "#1B3272",
    },
    {
      value: "100+",
      label: lang === "fil" ? "Mga karapatan" : "Rights covered",
      icon: "⚖️",
      tone: "#F5A41E",
    },
    {
      value: "2",
      label: lang === "fil" ? "Wika" : "Languages",
      icon: "🌏",
      tone: "#CC1E1E",
    },
    {
      value: "₱0",
      label: lang === "fil" ? "Para sa lahat" : "For everyone",
      icon: "🤝",
      tone: "#065F46",
    },
  ];

  return (
    <section
      aria-label={lang === "fil" ? "Mga numero" : "By the numbers"}
      className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-2"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              delay: 0.05 + i * 0.08,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4 }}
            className="relative rounded-2xl px-4 py-5 md:px-5 md:py-6 overflow-hidden group"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(232,237,247,0.8)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 18px rgba(27,50,114,0.06)",
            }}
          >
            {/* Accent strip */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:h-1.5 transition-all"
              style={{ background: item.tone }}
            />
            <div className="flex items-start justify-between gap-2">
              <div>
                <p
                  className="text-3xl md:text-4xl font-extrabold leading-none tabular-nums"
                  style={{ color: item.tone }}
                >
                  {item.value}
                </p>
                <p className="mt-1.5 text-xs md:text-sm font-semibold text-gray-500">
                  {item.label}
                </p>
              </div>
              <span
                className="text-2xl md:text-3xl opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-transform"
                aria-hidden="true"
              >
                {item.icon}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
