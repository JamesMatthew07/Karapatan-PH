import type { Module, ModuleMeta } from "@/content/schema/card.schema";

export const MODULE_META: Record<Module, Omit<ModuleMeta, "id">> = {
  police: {
    title: { fil: "Pakikitungo sa Pulis", en: "Police Encounters" },
    description: {
      fil: "Alamin ang iyong karapatan kapag hinarang o inaaresto ka ng pulis.",
      en: "Know your rights when stopped or arrested by police.",
    },
    icon: "🚔",
    situations: [
      { fil: "Hinarang ako ng pulis", en: "I was stopped by police" },
      { fil: "Gustong aresto-hin ako", en: "Police wants to arrest me" },
      { fil: "Kinukuha ang cellphone ko", en: "Police wants my phone" },
      { fil: "Tinatanong sa presinto", en: "Being questioned at the station" },
    ],
  },
  lto: {
    title: { fil: "LTO / MMDA / Trapiko", en: "LTO / MMDA / Traffic" },
    description: {
      fil: "Alamin ang iyong karapatan sa mga apprehension at traffic stop.",
      en: "Know your rights during traffic stops and apprehensions.",
    },
    icon: "🚗",
    situations: [
      { fil: "Kinuha ng LTO ang lisensya ko", en: "LTO took my license" },
      { fil: "Nabigyan ng ticket", en: "I received a traffic ticket" },
      { fil: "Hinawakan ang OR/CR ko", en: "They held my OR/CR" },
      { fil: "Inaakusahan ng kotong", en: "I think they want a bribe" },
    ],
  },
  labor: {
    title: { fil: "Trabaho at Empleyo", en: "Labor & Employment" },
    description: {
      fil: "Alamin ang iyong karapatan bilang manggagawa.",
      en: "Know your rights as an employee.",
    },
    icon: "👷",
    situations: [
      { fil: "Tinanggal sa trabaho", en: "I was fired" },
      { fil: "Hindi binabayaran ng tama", en: "I'm not paid correctly" },
      { fil: "Hindi nabibigay ang 13th month", en: "Not receiving 13th month pay" },
      { fil: "Harassment sa trabaho", en: "Harassment at work" },
    ],
  },
  barangay: {
    title: { fil: "Barangay at LGU", en: "Barangay & Local Gov't" },
    description: {
      fil: "Alamin ang aktwal na kapangyarihan ng mga opisyal ng barangay.",
      en: "Understand the actual powers of barangay officials.",
    },
    icon: "🏘️",
    situations: [
      { fil: "Nag-order ang barangay", en: "Barangay issued an order" },
      { fil: "Hinaharang ang negosyo ko", en: "My business is being blocked" },
      { fil: "May reklamo sa barangay", en: "I have a barangay complaint" },
      { fil: "Gusto magreklamo sa Lupon", en: "I want to file with the Lupon" },
    ],
  },
  consumer: {
    title: { fil: "Karapatan ng Konsyumer", en: "Consumer Rights" },
    description: {
      fil: "Alamin ang iyong karapatan bilang mamimili.",
      en: "Know your rights as a consumer.",
    },
    icon: "🧾",
    situations: [
      { fil: "Depektibo ang binili ko", en: "I bought a defective product" },
      { fil: "Hindi tinatanggap ang refund", en: "Refusing my refund" },
      { fil: "Walang price tag", en: "No price tags on items" },
      { fil: "Na-scam sa online seller", en: "Scammed by online seller" },
    ],
  },
};
