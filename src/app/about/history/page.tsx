import { PageHeader } from "@/components/layout/PageHeader";
import { FullHistory } from "@/components/features/FullHistory";

export const metadata = {
  title: "Sejarah Lengkap - Banjar Giri Manik",
  description: "Kisah perjuangan pendirian Pura Giri Kusuma dari tahun 1981 hingga 1989.",
};

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader 
        title="Sejarah Kami" 
        description="Perjalanan panjang dari rumah sederhana di F-189 hingga berdirinya tempat suci di Bukit Salonsa." 
      />
      <FullHistory />
    </main>
  );
}