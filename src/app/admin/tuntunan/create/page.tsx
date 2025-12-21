import { CeremonyForm } from "@/components/features/CeremonyForm";

export const metadata = {
  title: "Buat Tuntunan Baru - Admin",
  description: "Form untuk membuat data upacara baru",
};

export default function CreateCeremonyPage() {
  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Buat Tuntunan Baru</h1>
        <p className="text-slate-500 mt-2">
          Isi form di bawah untuk menambahkan data upacara baru ke dalam sistem.
        </p>
      </div>

      <CeremonyForm mode="create" />
    </div>
  );
}
