import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CeremonyForm } from "@/components/features/CeremonyForm";
import { Ceremony } from "@/types/cms";

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCeremonyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const { data, error } = await supabase
    .from("ceremonies")
    .select(`
      *,
      ceremony_sections (
        *,
        ceremony_items (
          *,
          ceremony_sub_items (*)
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const ceremony = data as unknown as Ceremony;

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Edit Tuntunan</h1>
        <p className="text-slate-500 mt-2">
          Perbarui data upacara: <strong>{ceremony.title}</strong>
        </p>
      </div>

      <CeremonyForm mode="edit" initialData={ceremony} />
    </div>
  );
}
