import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ceremonySchema } from "@/lib/schemas/ceremony-schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Optional but recommended: validate again on server
    const data = ceremonySchema.parse(body);

    const supabase = await createClient();

    // 1. Insert ceremony
    const { data: ceremony, error: ceremonyError } = await supabase
      .from("ceremonies")
      .insert({
        title: data.title,
        slug: data.slug,
        schedule: data.schedule,
        banten: data.banten,
        is_published: data.is_published,
      })
      .select()
      .single();

    if (ceremonyError) {
      throw ceremonyError;
    }

    // 2. Insert sections
    for (let sectionIndex = 0; sectionIndex < data.sections.length; sectionIndex++) {
      const section = data.sections[sectionIndex];

      const { data: sectionRow, error: sectionError } = await supabase
        .from("ceremony_sections")
        .insert({
          ceremony_id: ceremony.id,
          title: section.title,
          instruction: section.instruction,
          position: sectionIndex,
        })
        .select()
        .single();

      if (sectionError) {
        throw sectionError;
      }

      // 3. Insert items
      for (let itemIndex = 0; itemIndex < section.items.length; itemIndex++) {
        const item = section.items[itemIndex];

        const { data: itemRow, error: itemError } = await supabase
          .from("ceremony_items")
          .insert({
            section_id: sectionRow.id,
            instruction: item.instruction,
            mantra: item.mantra,
            position: itemIndex,
          })
          .select()
          .single();

        if (itemError) {
          throw itemError;
        }

        // 4. Insert sub-items
        for (let subIndex = 0; subIndex < item.subItems.length; subIndex++) {
          const sub = item.subItems[subIndex];

          const { error: subError } = await supabase
            .from("ceremony_sub_items")
            .insert({
              item_id: itemRow.id,
              instruction: sub.instruction,
              mantra: sub.mantra,
              position: subIndex,
            });

          if (subError) {
            throw subError;
          }
        }
      }
    }

    return NextResponse.json({ success: true, id: ceremony.id });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message ?? "Failed to save ceremony" },
      { status: 400 }
    );
  }
}
