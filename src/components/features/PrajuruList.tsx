import { User } from "lucide-react";

// UPDATED DATA: Matching the "Anggaran Dasar" Structure
const PRAJURU = [
  // Inti
  { role: "Penasehat", name: "I Wayan Sesepuh", initial: "WS" },
  { role: "Ketua", name: "I Made Ketua", initial: "MK" },
  { role: "Sekretaris", name: "Putu Penulis", initial: "PP" },
  { role: "Bendahara", name: "Nyoman Keuangan", initial: "NK" },
  
  // Seksi-Seksi (Based on the Document)
  { role: "Sie. Pendidikan & Pembinaan", name: "Ketut Guru", initial: "KG" },
  { role: "Sie. Sosial", name: "Gede Sosial", initial: "GS" },
  { role: "Sie. Kewanitaan", name: "Ibu Dayu", initial: "ID" },
  
  // You can add "Lain-lain" if you have modern roles added later (e.g., IT/Humas)
  { role: "Humas & Dokumentasi", name: "Komang Foto", initial: "KF" },
];

export function PrajuruList() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Struktur Organisasi</h2>
          <p className="text-slate-500 mt-2">
            Prajuru Banjar Giri Manik (Periode Berjalan)
          </p>
        </div>

        {/* The Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {PRAJURU.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center group w-48 text-center">
              
              {/* Avatar Circle */}
              <div className="w-28 h-28 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center shadow-sm mb-4 group-hover:border-orange-400 group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <span className="text-3xl font-bold text-slate-300 group-hover:text-orange-500 transition-colors relative z-10">
                  {item.initial}
                </span>
              </div>
              
              {/* Name & Role */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-lg group-hover:text-orange-700 transition-colors">
                  {item.name}
                </h4>
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors border border-slate-200">
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}