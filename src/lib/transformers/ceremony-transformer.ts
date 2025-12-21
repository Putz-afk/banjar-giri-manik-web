// src/lib/transformers/ceremony-transformer.ts
import { CeremonyDraft } from "@/lib/schemas/ceremony-schema";

export function draftToApi(data: CeremonyDraft): CeremonyDraft {
    return {
        title: data.title,
        slug: data.slug,
        schedule: data.schedule ?? null,
        banten: data.banten ?? null,
        is_published: data.is_published,

        sections: data.sections.map((section, sectionIndex) => ({
            title: section.title ?? null,
            instruction: section.instruction,
            position: sectionIndex,

            items: section.items.map((item, itemIndex) => ({
                instruction: item.instruction,
                mantra: item.mantra ?? null,
                position: itemIndex,

                sub_items: item.subItems.map((sub, subIndex) => ({
                    instruction: sub.instruction,
                    mantra: sub.mantra ?? null,
                    position: subIndex,
                })),
            })),
        })),
    };
}
