// src\lib\schemas\ceremony-schema.ts
import { z } from "zod";

// 1. Sub-Item Schema (Level 3)
const subItemSchema = z.object({
  instruction: z.string().min(1, "Instruksi wajib diisi"),
  mantra: z.string().nullable().optional(),
});

// 2. Item Schema (Level 2)
const itemSchema = z.object({
  instruction: z.string().min(1, "Instruksi wajib diisi"),
  mantra: z.string().nullable().optional(),
  subItems: z.array(subItemSchema),
});

// 3. Section Schema (Level 1)
const sectionSchema = z.object({
  title: z.string().nullable().optional(), // Section title can be empty
  instruction: z.string().min(1, "Instruksi wajib diisi"),
  items: z.array(itemSchema),
});

// 4. Main Ceremony Schema (Root)
export const ceremonySchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  slug: z.string().optional(),
  schedule: z.string().nullable().optional(),
  banten: z.string().nullable().optional(),
  is_published: z.boolean(),
  sections: z.array(sectionSchema).min(1, "Setidaknya harus ada satu bagian"),
});

// Export the type for use in the Editor Component
export type CeremonyDraft = z.infer<typeof ceremonySchema>;