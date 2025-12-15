import { PageHeader } from "@/components/layout/PageHeader";
import { CeremonyViewer } from "@/components/features/CeremonyViewer";
import { DEMO_CEREMONIES } from "@/data/ceremony-demo"; 

export const metadata = {
  title: "Tuntunan & Mantram - Banjar Giri Manik",
  description: "Panduan tata cara pelaksanaan upacara dan kumpulan mantram suci.",
};

export default function TuntunanPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PageHeader 
        title="Tuntunan & Mantram" 
        description="Panduan praktis pelaksanaan yadnya, tata cara persembahyangan, dan doa sehari-hari." 
      />

      <section className="py-12 md:py-20">
        <div className="w-full max-w-4xl mx-auto px-4 md:px-8 space-y-12">
          {DEMO_CEREMONIES.map((ceremony) => (
            <CeremonyViewer key={ceremony.id} data={ceremony} />
          ))}

          <div className="text-center text-slate-500 text-sm italic mt-12">
            <p>Sumber: Arsip Blog Giri Kusuma.</p>
            <p>Kurang lebihnya mohon dimaafkan (Ampuraayang).</p>
          </div>
        </div>
      </section>
    </main>
  );
}