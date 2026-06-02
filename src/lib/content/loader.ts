import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { RightsCard, ModuleMeta, Module } from "@/content/schema/card.schema";
export { MODULE_META } from "@/src/lib/module-meta";

const IS_PREVIEW =
  process.env.KARAPATAN_PREVIEW === "true" || process.env.NODE_ENV === "development";
const CONTENT_ROOT = join(process.cwd(), "content/modules");

function collectJsonFiles(dir: string): string[] {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        results.push(...collectJsonFiles(full));
      } else if (entry.endsWith(".json") && !entry.startsWith("_")) {
        results.push(full);
      }
    }
  } catch {
    // directory doesn't exist yet during build with no content
  }
  return results;
}

function loadAllCards(): RightsCard[] {
  const files = collectJsonFiles(CONTENT_ROOT);
  const cards: RightsCard[] = [];

  for (const filePath of files) {
    try {
      const raw = JSON.parse(readFileSync(filePath, "utf8")) as unknown;
      const result = RightsCard.safeParse(raw);
      if (!result.success) continue;

      const card = result.data;

      // Production: only verified cards. Preview: all except deprecated.
      if (!IS_PREVIEW && card.verification !== "verified") continue;
      if (card.verification === "deprecated") continue;

      cards.push(card);
    } catch {
      // skip malformed files at runtime
    }
  }

  return cards;
}

// Singleton cache — computed once per build
let _cards: RightsCard[] | null = null;

function getCards(): RightsCard[] {
  if (_cards === null) {
    _cards = loadAllCards();
  }
  return _cards;
}

export function getAllCards(): RightsCard[] {
  return getCards();
}

export function getCardById(id: string): RightsCard | undefined {
  return getCards().find((c) => c.id === id);
}

export function getCardsByModule(module: Module): RightsCard[] {
  return getCards().filter((c) => c.module === module);
}

export function getAllCardIds(): string[] {
  return getCards().map((c) => c.id);
}

export function getModules(): Module[] {
  const seen = new Set<Module>();
  for (const card of getCards()) seen.add(card.module);
  return Array.from(seen);
}

export function searchableCards() {
  return getCards().map((card) => ({
    id: card.id,
    module: card.module,
    verification: card.verification,
    situationTagsFil: card.situationTags.map((t) => t.fil).join(" "),
    situationTagsEn: card.situationTags.map((t) => t.en).join(" "),
    keywords: card.keywords.join(" "),
    rightFil: card.right.fil,
    rightEn: card.right.en,
    whatThisMeansFil: card.whatThisMeans.fil,
    whatThisMeansEn: card.whatThisMeans.en,
  }));
}
