#!/usr/bin/env tsx
/**
 * Content validation gate — run in CI and at build time.
 * Rules:
 *   - Every card must parse against the RightsCard Zod schema.
 *   - Every card set for PRODUCTION (non-preview) must be "verified".
 *   - Every "verified" card must have reviewedBy set.
 *   - Every card must have ≥1 citation with a sourceUrl.
 *   - Both fil + en must be present in every bilingual field.
 *   - Warns if lastVerified is older than 365 days.
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { RightsCard } from "../content/schema/card.schema";

const ROOT = join(process.cwd(), "content/modules");
const PREVIEW = process.env.KARAPATAN_PREVIEW === "true";
const MAX_AGE_DAYS = 365;
const MS_PER_DAY = 86_400_000;

let errors = 0;
let warnings = 0;
let total = 0;
let verified = 0;

function collectJsonFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...collectJsonFiles(full));
    } else if (entry.endsWith(".json") && !entry.startsWith("_")) {
      results.push(full);
    }
  }
  return results;
}

function validateCard(filePath: string): void {
  const rel = relative(process.cwd(), filePath);
  let raw: unknown;

  try {
    raw = JSON.parse(readFileSync(filePath, "utf8"));
  } catch {
    console.error(`  ❌ [PARSE ERROR] ${rel}`);
    errors++;
    return;
  }

  const result = RightsCard.safeParse(raw);
  if (!result.success) {
    console.error(`  ❌ [SCHEMA] ${rel}`);
    for (const issue of result.error.issues) {
      console.error(`     • ${issue.path.join(".")} — ${issue.message}`);
    }
    errors++;
    return;
  }

  const card = result.data;
  total++;

  if (!PREVIEW && card.verification !== "verified") {
    console.error(
      `  ❌ [NOT VERIFIED] ${rel} — verification="${card.verification}". ` +
        `Only "verified" cards ship to production. Set KARAPATAN_PREVIEW=true for preview builds.`,
    );
    errors++;
    return;
  }

  if (card.verification === "verified") {
    if (!card.reviewedBy) {
      console.error(`  ❌ [NO REVIEWER] ${rel} — verified card is missing reviewedBy`);
      errors++;
      return;
    }
    verified++;
  }

  const ageMs = Date.now() - new Date(card.lastVerified).getTime();
  const ageDays = Math.floor(ageMs / MS_PER_DAY);
  if (ageDays > MAX_AGE_DAYS) {
    console.warn(
      `  ⚠️  [STALE] ${rel} — last verified ${ageDays} days ago (>${MAX_AGE_DAYS}d). Needs re-verification.`,
    );
    warnings++;
  }

  console.log(`  ✅ ${rel} [${card.verification}] v${card.version}`);
}

console.log("\n📋 KarapatanPH content validation\n");
console.log(`   Mode: ${PREVIEW ? "PREVIEW (drafts allowed)" : "PRODUCTION (verified only)"}\n`);

const files = collectJsonFiles(ROOT);
if (files.length === 0) {
  console.log("   No content cards found yet.\n");
  process.exit(0);
}

for (const f of files) {
  validateCard(f);
}

console.log(
  `\n   Total: ${total} | Verified: ${verified} | Warnings: ${warnings} | Errors: ${errors}\n`,
);

if (errors > 0) {
  console.error(`❌ Validation FAILED — ${errors} error(s). Fix before merging to main.\n`);
  process.exit(1);
}

if (warnings > 0) {
  console.warn(`⚠️  Validation passed with ${warnings} warning(s). Review stale cards.\n`);
}

console.log("✅ All content valid.\n");
