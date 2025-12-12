import { Target, Heart, Users, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function VisiMisi() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: VISI (The Dream) */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-orange-600 font-bold tracking-widest uppercase text-xs">
              <Target size={16} /> Visi Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Mewujudkan Krama Hindu yang <br/>
              <span className="text-orange-600">Guyub, Rukun, dan Harmonis.</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Sebagai minoritas di tanah rantau, tujuan utama kami bukan hanya sekadar berkumpul, 
              tetapi menciptakan "rumah kedua" di mana setiap warga merasa memiliki saudara, 
              saling asah, asih, dan asuh di tengah dinamika Sorowako.
            </p>
          </div>

          {/* Right: MISI (The Action) */}
          <div className="grid gap-4">
             {/* Misi 1 */}
             <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
               <CardContent className="p-5 flex gap-4 items-start">
                 <div className="bg-orange-100 p-2.5 rounded-lg h-fit text-orange-600 mt-1">
                   <Users size={20} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 text-lg">Wadah Komunikasi</h4>
                   <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                     Menjadi jembatan informasi dan silaturahmi yang erat antar warga Hindu di Sorowako, Wasuponda, dan Wawondula.
                   </p>
                 </div>
               </CardContent>
             </Card>

             {/* Misi 2 */}
             <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
               <CardContent className="p-5 flex gap-4 items-start">
                 <div className="bg-blue-100 p-2.5 rounded-lg h-fit text-blue-600 mt-1">
                   <Heart size={20} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 text-lg">Suka Duka</h4>
                   <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                     Menjalankan fungsi sosial yang nyata: hadir membantu saat warga tertimpa musibah (duka) dan berbagi kebahagiaan saat upacara (suka).
                   </p>
                 </div>
               </CardContent>
             </Card>

             {/* Misi 3 */}
             <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
               <CardContent className="p-5 flex gap-4 items-start">
                 <div className="bg-green-100 p-2.5 rounded-lg h-fit text-green-600 mt-1">
                   <ShieldCheck size={20} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 text-lg">Pelestarian Adat</h4>
                   <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                     Melestarikan adat, budaya, dan tradisi Bali agar tetap hidup dan diwariskan kepada generasi muda di perantauan.
                   </p>
                 </div>
               </CardContent>
             </Card>
          </div>

        </div>
      </div>
    </section>
  );
}