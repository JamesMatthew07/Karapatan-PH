#!/usr/bin/env tsx
/**
 * Source fetcher — fetches verbatim text from public-domain Philippine government sources.
 *
 * All target sources are public domain under Philippine IP Code §176
 * (government works not subject to copyright).
 *
 * Usage:
 *   pnpm fetch-sources              — fetch all laws in manifest
 *   pnpm fetch-sources ra-7438      — fetch a specific lawId
 *   pnpm fetch-sources --diff       — re-fetch and show diff (law-change tracking)
 *
 * Output: content/sources/<lawId>.json
 * Rate-limited to 1 request/sec; cached locally; robots.txt respected.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const MANIFEST_PATH = join(process.cwd(), "content/sources/law-manifest.json");
const SOURCES_DIR = join(process.cwd(), "content/sources");
const RATE_LIMIT_MS = 1200;

interface ManifestEntry {
  lawId: string;
  title: string;
  section: string;
  sourceUrl: string;
  sourceName: string;
  modules: string[];
  notes: string;
}

interface FetchedSource {
  lawId: string;
  title: string;
  section: string;
  sourceUrl: string;
  sourceName: string;
  modules: string[];
  notes: string;
  fetchedAt: string;
  fetchStatus: "ok" | "error" | "skipped";
  httpStatus?: number;
  errorMessage?: string;
  contentLength?: number;
  /** Snippet of fetched text — for diff tracking and as fallback quotedText in cards */
  textSample?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkRobots(url: string): Promise<boolean> {
  try {
    const { origin } = new URL(url);
    const robotsUrl = `${origin}/robots.txt`;
    const res = await fetch(robotsUrl, {
      headers: { "User-Agent": "KarapatanPH-SourceFetcher/1.0 (+https://github.com/karapatanph)" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return true; // no robots.txt = allowed
    const text = await res.text();
    // Very basic check: if our path is Disallowed for all agents, skip.
    const path = new URL(url).pathname;
    const lines = text.split("\n");
    let inOurSection = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().startsWith("user-agent:")) {
        inOurSection =
          trimmed.toLowerCase().includes("*") || trimmed.toLowerCase().includes("karapatanph");
      }
      if (inOurSection && trimmed.toLowerCase().startsWith("disallow:")) {
        const disallowed = trimmed.slice("disallow:".length).trim();
        if (disallowed && path.startsWith(disallowed)) {
          console.warn(`  ⚠️  robots.txt disallows ${url} — skipping`);
          return false;
        }
      }
    }
    return true;
  } catch {
    return true; // if robots check fails, proceed cautiously
  }
}

async function fetchSource(entry: ManifestEntry): Promise<FetchedSource> {
  const outPath = join(SOURCES_DIR, `${entry.lawId}.json`);
  const existing: FetchedSource | null = existsSync(outPath)
    ? (JSON.parse(readFileSync(outPath, "utf8")) as FetchedSource)
    : null;

  const isDiff = process.argv.includes("--diff");

  if (existing && existing.fetchStatus === "ok" && !isDiff) {
    console.log(`  ⏭️  Cached: ${entry.lawId}`);
    return existing;
  }

  console.log(`  🌐 Fetching: ${entry.lawId} — ${entry.sourceUrl}`);

  const allowed = await checkRobots(entry.sourceUrl);
  if (!allowed) {
    return {
      ...entry,
      fetchedAt: new Date().toISOString(),
      fetchStatus: "skipped",
      errorMessage: "Blocked by robots.txt",
    };
  }

  try {
    const res = await fetch(entry.sourceUrl, {
      headers: {
        "User-Agent": "KarapatanPH-SourceFetcher/1.0 (+https://github.com/karapatanph)",
        Accept: "text/html,application/xhtml+xml,text/plain",
      },
      signal: AbortSignal.timeout(15000),
    });

    const text = await res.text();
    // Extract a clean text sample (strip HTML tags for readability)
    const stripped = text
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim()
      .slice(0, 3000);

    const result: FetchedSource = {
      ...entry,
      fetchedAt: new Date().toISOString(),
      fetchStatus: res.ok ? "ok" : "error",
      httpStatus: res.status,
      contentLength: text.length,
      textSample: res.ok ? stripped : undefined,
      errorMessage: res.ok ? undefined : `HTTP ${res.status} ${res.statusText}`,
    };

    if (isDiff && existing?.textSample && result.textSample) {
      const changed = existing.textSample !== result.textSample;
      if (changed) {
        console.warn(`  ⚠️  CONTENT CHANGED: ${entry.lawId} — review for law amendments!`);
        result.errorMessage = "Content changed since last fetch — review for amendments";
      } else {
        console.log(`  ✅ No change: ${entry.lawId}`);
      }
    }

    writeFileSync(outPath, JSON.stringify(result, null, 2));
    return result;
  } catch (err) {
    const result: FetchedSource = {
      ...entry,
      fetchedAt: new Date().toISOString(),
      fetchStatus: "error",
      errorMessage: err instanceof Error ? err.message : String(err),
    };
    writeFileSync(outPath, JSON.stringify(result, null, 2));
    return result;
  }
}

async function main() {
  mkdirSync(SOURCES_DIR, { recursive: true });

  const manifest: ManifestEntry[] = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  // argv[0] = node, argv[1] = script path — user args start at [2]
  const targetId = process.argv.slice(2).find((a) => !a.startsWith("-"));

  const targets = targetId ? manifest.filter((e) => e.lawId === targetId) : manifest;

  if (targets.length === 0) {
    console.error(`No manifest entry found for: ${targetId}`);
    process.exit(1);
  }

  console.log(`\n📥 KarapatanPH source fetcher`);
  console.log(`   Targets: ${targets.length} law(s)\n`);

  let ok = 0;
  let failed = 0;
  let skipped = 0;

  for (const entry of targets) {
    const result = await fetchSource(entry);
    if (result.fetchStatus === "ok") ok++;
    else if (result.fetchStatus === "skipped") skipped++;
    else failed++;

    await sleep(RATE_LIMIT_MS);
  }

  console.log(`\n   Done — OK: ${ok} | Skipped: ${skipped} | Failed: ${failed}\n`);

  if (failed > 0) {
    console.warn(`⚠️  Some fetches failed. Check content/sources/<lawId>.json for details.\n`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
