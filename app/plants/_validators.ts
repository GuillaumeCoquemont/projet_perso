import { z } from "zod";

export const plantInputSchema = z.object({
  name: z.string().trim().min(1, "Nom requis"),
  species: z.string().trim().optional().nullable(),

  // Luminosité
  light: z
    .enum(["DIRECT", "INDIRECT", "LOW", "SHADE", "MIXED", "OTHER"])
    .optional()
    .nullable()
    .or(z.literal("").transform(() => null)),
  lightOther: z.string().trim().optional().nullable(),

  // Arrosage
  watering: z
    .enum([
      "DAILY",
      "EVERY_2_3_DAYS",
      "WEEKLY",
      "BIWEEKLY",
      "MONTHLY",
      "SPARSE",
      "WHEN_DRY",
      "OTHER",
    ])
    .optional()
    .nullable()
    .or(z.literal("").transform(() => null)),
  wateringOther: z.string().trim().optional().nullable(),

  // Température & humidité
  tempMinC: z.coerce.number().int().optional().nullable(),
  tempMaxC: z.coerce.number().int().optional().nullable(),
  humidityMin: z.coerce.number().int().optional().nullable(),
  humidityMax: z.coerce.number().int().optional().nullable(),
  climateNotes: z.string().trim().optional().nullable(),

  // Rempotage
  repotMinYears: z.coerce.number().int().optional().nullable(),
  repotMaxYears: z.coerce.number().int().optional().nullable(),
  repotOther: z.string().trim().optional().nullable(),

  // Animaux
  petSafe: z.boolean().optional().nullable(),
  petNotes: z.string().trim().optional().nullable(),

  // Image & notes
  imageUrl: z
    .string()
    .url()
    .optional()
    .nullable()
    .or(z.literal("").transform(() => null)),
  notes: z.string().trim().optional().nullable(),
});

export type PlantInput = z.infer<typeof plantInputSchema>;

// Optionnel : centraliser les options pour les <select>
export const LIGHT_OPTIONS = [
  "DIRECT",
  "INDIRECT",
  "LOW",
  "SHADE",
  "MIXED",
  "OTHER",
] as const;

export const WATERING_OPTIONS = [
  "DAILY",
  "EVERY_2_3_DAYS",
  "WEEKLY",
  "BIWEEKLY",
  "MONTHLY",
  "SPARSE",
  "WHEN_DRY",
  "OTHER",
] as const;
