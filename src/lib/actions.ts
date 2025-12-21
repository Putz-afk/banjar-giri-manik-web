"use server";

import { createClient } from "@/lib/supabase/server"; // Ensure you have a server client helper
import { CeremonyDraft } from "@/lib/schemas/ceremony-schema";
import { redirect } from "next/navigation";

// Helper to clean strings for URL slugs
function generateSlug(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export async function saveCeremonyAction(data: CeremonyDraft) {
  const supabase = await createClient();

  // 1. Generate Slug
  const slug = generateSlug(data.title);

  // 2. Insert the Parent (Ceremony)
  const { data: ceremony, error: ceremonyError } = await supabase
    .from("ceremonies")
    .insert({
      title: data.title,
      slug: slug,
      schedule: data.schedule || null,
      banten: data.banten || null,
      is_published: data.is_published,
    })
    .select()
    .single();

  if (ceremonyError) {
    console.error("Error creating ceremony:", ceremonyError);
    return { error: ceremonyError.message };
  }

  const ceremonyId = ceremony.id;

  // 3. Loop through Sections
  // Note: We use for...of loops to ensure we await each insert sequentially
  for (const section of data.sections) {
    const { data: newSection, error: sectionError } = await supabase
      .from("ceremony_sections")
      .insert({
        ceremony_id: ceremonyId,
        title: section.title,
        instruction: section.instruction,
      })
      .select()
      .single();

    if (sectionError) {
      console.error("Error saving section:", sectionError);
      // In a real app, you might want to rollback here, but for now we throw
      throw new Error("Failed to save section");
    }

    // 4. Loop through Items
    for (const item of section.items) {
      const { data: newItem, error: itemError } = await supabase
        .from("ceremony_items")
        .insert({
          section_id: newSection.id,
          instruction: item.instruction,
          mantra: item.mantra || null,
        })
        .select()
        .single();

      if (itemError) throw new Error("Failed to save item");

      // 5. Loop through Sub-Items
      if (item.subItems && item.subItems.length > 0) {
        const subItemsPayload = item.subItems.map((sub) => ({
          item_id: newItem.id,
          instruction: sub.instruction,
          mantra: sub.mantra || null,
        }));

        const { error: subError } = await supabase
          .from("ceremony_sub_items")
          .insert(subItemsPayload);

        if (subError) throw new Error("Failed to save sub-items");
      }
    }
  }

  // 6. Success! Redirect to the list
  redirect("/admin/tuntunan");
}