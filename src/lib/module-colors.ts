import type { Module } from "@/content/schema/card.schema";

export interface ModuleTheme {
  color: string;
  light: string;
  dark: string;
  border: string;
}

export const MODULE_THEME: Record<Module, ModuleTheme> = {
  police: {
    color: "#1B3268",
    light: "#EEF1F8",
    dark: "#0D1F40",
    border: "#2D4A8A",
  },
  lto: {
    color: "#C01919",
    light: "#FEF2F2",
    dark: "#7F1010",
    border: "#DC2626",
  },
  labor: {
    color: "#B45309",
    light: "#FFFBEB",
    dark: "#78350F",
    border: "#D97706",
  },
  barangay: {
    color: "#065F46",
    light: "#ECFDF5",
    dark: "#022C22",
    border: "#059669",
  },
  consumer: {
    color: "#5B21B6",
    light: "#F5F3FF",
    dark: "#3B0764",
    border: "#7C3AED",
  },
};

export const MODULE_ICON: Record<Module, string> = {
  police: "🚔",
  lto: "🚗",
  labor: "👷",
  barangay: "🏘️",
  consumer: "🧾",
};
