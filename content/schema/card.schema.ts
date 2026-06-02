import { z } from "zod";

export const Bilingual = z.object({
  fil: z.string().min(1, "Filipino text required"),
  en: z.string().min(1, "English text required"),
});

export const Citation = z.object({
  label: Bilingual,
  lawId: z.string().min(1),
  section: z.string().optional(),
  sourceUrl: z.string().url("Citation must have a valid source URL"),
  sourceName: z.enum([
    "official_gazette",
    "sc_elibrary",
    "chan_robles",
    "dole",
    "lto",
    "pnp",
    "chr",
    "dti",
    "philhealth",
    "ched",
    "other",
  ]),
  quotedText: z.string().optional(),
});

export const VerificationState = z.enum([
  "draft",
  "plain_review",
  "legal_review",
  "verified",
  "flagged",
  "deprecated",
]);

export const Module = z.enum(["police", "lto", "labor", "barangay", "consumer"]);

export const RightsCard = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/, "Card ID must be kebab-case"),
    module: Module,

    situationTags: z.array(Bilingual).min(1, "At least one situation tag required"),
    keywords: z.array(z.string()).default([]),

    right: Bilingual,
    whatThisMeans: Bilingual,
    theyCannot: z.array(Bilingual).default([]),
    youCan: z.array(Bilingual).default([]),
    eli5: Bilingual.optional(),

    citations: z.array(Citation).min(1, "At least one citation required"),

    scopeNotes: Bilingual.optional(),
    relatedCardIds: z.array(z.string()).default([]),

    verification: VerificationState,
    lastVerified: z.string().date("Must be a valid ISO date (YYYY-MM-DD)"),
    sourcedBy: z.string().min(1),
    reviewedBy: z.string().optional(),
    reviewerCredential: z.string().optional(),
    version: z.number().int().positive(),
    changelog: z
      .array(
        z.object({
          date: z.string().date(),
          note: z.string().min(1),
        }),
      )
      .default([]),
  })
  .superRefine((card, ctx) => {
    if (card.verification === "verified" && !card.reviewedBy) {
      ctx.addIssue({
        code: "custom",
        message: "A verified card requires reviewedBy to be set",
        path: ["reviewedBy"],
      });
    }
  });

export const ModuleMeta = z.object({
  id: Module,
  title: Bilingual,
  description: Bilingual,
  icon: z.string(),
  situations: z.array(Bilingual),
});

export type Bilingual = z.infer<typeof Bilingual>;
export type Citation = z.infer<typeof Citation>;
export type VerificationState = z.infer<typeof VerificationState>;
export type Module = z.infer<typeof Module>;
export type RightsCard = z.infer<typeof RightsCard>;
export type ModuleMeta = z.infer<typeof ModuleMeta>;
