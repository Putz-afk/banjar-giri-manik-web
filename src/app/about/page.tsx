import { PageHeader } from "@/components/layout/PageHeader";
import { VisiMisi } from "@/components/features/VisiMisi";
import { Philosophy } from "@/components/features/Philosophy"; 
import Link from "next/link";
import { ArrowRight, History, Users } from "lucide-react";

export const metadata = {
  title: "Tentang Kami - Banjar Giri Manik",
  description: "Profil, Visi Misi, dan Filosofi Banjar Giri Manik Sorowako.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. Header: Short & Sweet */}
      <PageHeader 
        title="Tentang Kami" 
        description="Lebih dari sekadar tempat ibadah, ini adalah kisah tentang rumah, perjuangan, dan keluarga di tanah rantau." 
      />

      {/* 2. Philosophy Section (Tri Hita Karana) */}
      {/* We put this FIRST because it sets the cultural tone */}
      <Philosophy />

      {/* 3. Visi Misi (The Goals) */}
      <VisiMisi />

      {/* 4. Navigation Hub (The "Portal" to sub-pages) */}
      <section className="py-20 border-t border-slate-100 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900">Kenali Kami Lebih Dalam</h2>
            <p className="text-slate-500 mt-2">Telusuri sejarah atau lihat pengurus kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Link to History */}
            <Link href="/about/history" className="group block h-full">
              <div className="bg-slate-50 hover:bg-orange-50 p-8 rounded-2xl border border-slate-200 hover:border-orange-200 transition-all cursor-pointer h-full flex flex-col items-start relative overflow-hidden">
                <div className="bg-white p-3 rounded-xl shadow-sm mb-4 text-slate-700 group-hover:text-orange-600 transition-colors">
                  <History size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Sejarah Berdiri</h3>
                <p className="text-slate-600 mb-6 flex-1 text-sm leading-relaxed">
                  Kisah lengkap perjuangan 17 KK pertama membuka hutan Bukit Salonsa hingga berdirinya Pura pada tahun 1989.
                </p>
                <div className="flex items-center text-orange-600 font-bold text-sm mt-auto">
                  Baca Sejarah <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Link to Structure */}
            <Link href="/about/structure" className="group block h-full">
              <div className="bg-slate-50 hover:bg-blue-50 p-8 rounded-2xl border border-slate-200 hover:border-blue-200 transition-all cursor-pointer h-full flex flex-col items-start relative overflow-hidden">
                <div className="bg-white p-3 rounded-xl shadow-sm mb-4 text-slate-700 group-hover:text-blue-600 transition-colors">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Struktur Organisasi</h3>
                <p className="text-slate-600 mb-6 flex-1 text-sm leading-relaxed">
                  Daftar lengkap Prajuru Banjar dan pengurus yang mengabdi untuk periode kepengurusan saat ini.
                </p>
                <div className="flex items-center text-blue-600 font-bold text-sm mt-auto">
                  Lihat Pengurus <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}