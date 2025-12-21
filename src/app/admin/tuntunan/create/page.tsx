import { CeremonyEditor } from "@/components/admin/CeremonyForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CreateCeremonyPage() {
  // Empty default values for a new entry
  const initialData = {
    title: "",
    slug: "",
    is_published: false,
    sections: [
      {
        title: "Pendahuluan",
        instruction: "",
        items: []
      }
    ]
  };

  return (
    <div className="pt-24 px-12 w-full bg-white">
      {/* Header with Back Button */}
      <div className="mb-8">
        <Link href="/admin/tuntunan">
          <Button variant="ghost" className="pl-0 gap-2 text-slate-500 hover:text-slate-900">
            <ArrowLeft size={18} />
            Kembali ke Daftar
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">Buat Tuntunan Baru</h1>
      </div>

      {/* RENDER THE FORM COMPONENT HERE */}
      <CeremonyEditor defaultValues={initialData} />
    </div>
  );
}