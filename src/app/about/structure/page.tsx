import { PageHeader } from "@/components/layout/PageHeader";
import { PrajuruList } from "@/components/features/PrajuruList";
import { LegalDocuments } from "@/components/features/LegalDocuments"; // New import

export default function StructurePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PageHeader 
        title="Struktur Organisasi" 
        description="Mengenal sosok-sosok yang mengabdi untuk melayani umat, berlandaskan Anggaran Dasar & Rumah Tangga." 
      />
      
      {/* 1. The People */}
      <PrajuruList />

      {/* 2. The Documents (Tabs) */}
      <LegalDocuments />
      
    </main>
  );
}