import { CeremonyApiData } from "@/lib/schemas/ceremony-schema";
import { CeremonyFormValues, SectionFormValue, ItemFormValue, SubItemFormValue } from "@/types/tuntunan-editor";

// Helper to clean empty strings to null
const cleanStr = (str: string | undefined | null) => {
  if (!str || str.trim() === "") return null; 
  return str;
};

// 1. NORMALIZE: Data -> Form
// "Make it safe for React Hook Form"
export function normalizeCeremony(data?: CeremonyApiData | null): CeremonyFormValues {
  if (!data) {
    // Default Empty State
    return {
      title: "",
      slug: "",
      schedule: "",
      banten: "",
      is_published: true,
      sections: [],
    };
  }

  return {
    id: data.id,
    title: data.title ?? "",
    slug: data.slug ?? "",
    schedule: data.schedule ?? "",
    banten: data.banten ?? "",
    is_published: data.is_published ?? true,
    // Recursively fix arrays
    sections: (data.sections ?? []).map((s): SectionFormValue => ({
      id: s.id,
      title: s.title ?? "",
      items: (s.items ?? []).map((i): ItemFormValue => ({
        id: i.id,
        instruction: i.instruction ?? "",
        mantra: i.mantra ?? "",
        sub_items: (i.sub_items ?? []).map((sub): SubItemFormValue => ({
          id: sub.id,
          instruction: sub.instruction ?? "",
          mantra: sub.mantra ?? "",
        })),
      })),
    })),
  };
}

// 2. DENORMALIZE: Form -> Data
// "Clean it up for the Database/Zod"
export function denormalizeCeremony(values: CeremonyFormValues): CeremonyApiData {
  return {
    ...values,

    // Clean root fields
    schedule: cleanStr(values.schedule),
    banten: cleanStr(values.banten),
    
    // Convert "" back to undefined/null if your DB prefers that, 
    // or keep as string. Here we map the structure back for Zod validation.
    // Recursive cleaning
    sections: values.sections.map((s) => ({
      id: s.id,
      title: cleanStr(s.title),
      items: s.items.map((i) => ({
        id: i.id,
        instruction: i.instruction, // Required, so don't clean to null
        mantra: cleanStr(i.mantra),
        sub_items: i.sub_items.map((sub) => ({
           id: sub.id,
           instruction: sub.instruction,
           mantra: cleanStr(sub.mantra),
        })),
      })),
    })),
  };
}