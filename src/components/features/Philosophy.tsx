import { Flower2, Users, Leaf } from "lucide-react";

export function Philosophy() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-600 font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-orange-600"></span>
            Filosofi Kami
            <span className="w-8 h-[2px] bg-orange-600"></span>
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-4">
            Tri Hita Karana
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed">
            Di tengah dinamika kehidupan tambang Sorowako, kami tetap berpegang teguh pada 
            keseimbangan hubungan yang harmonis.
          </p>
        </div>

        {/* The 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Parhyangan */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all text-center group">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Flower2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Parhyangan</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Hubungan dengan Tuhan</p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Menjaga kesucian Pura Giri Kusuma sebagai pusat spiritual. Melaksanakan Piodalan, 
              Purnama, dan Tilem secara rutin dengan khidmat.
            </p>
          </div>

          {/* Pillar 2: Pawongan */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all text-center group">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Pawongan</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Hubungan dengan Sesama</p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Menerapkan konsep <em>Menyama Braya</em> di tanah rantau. Saling asah, asih, asuh dalam kegiatan 
              suka-duka, arisan, dan pesantian.
            </p>
          </div>

          {/* Pillar 3: Palemahan */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all text-center group">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Leaf size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Palemahan</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Hubungan dengan Alam</p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Merawat lingkungan Bukit Salonsa. Gotong royong kebersihan area Pura dan 
              menjaga keasrian alam sekitar agar tetap harmonis.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}