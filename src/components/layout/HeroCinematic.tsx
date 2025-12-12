import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ChevronDown } from "lucide-react";

export function HeroCinematic() {
  return (
    // Changed h-screen to min-h-screen to allow scrolling on short mobile phones
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 pb-10 md:py-0">
      
      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/60 z-10" />
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070')] bg-cover bg-center" />
      </div>

      {/* 2. CENTER CONTENT */}
      <div className="relative z-20 text-center space-y-6 max-w-3xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
          Pura Giri Kusuma <br/>
          <span className="text-white/90 font-serif italic">Sorowako</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-200 font-light max-w-xl mx-auto leading-relaxed">
          Menjaga tradisi, merawat harmoni, dan mempererat persaudaraan di tanah rantau.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-4 w-full px-8 md:px-0">
          <Button className="bg-white text-slate-900 hover:bg-slate-200 rounded-full px-8 h-12 text-base w-full md:w-auto">
            Tentang Kami
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/50 hover:bg-white/20 rounded-full px-8 h-12 text-base w-full md:w-auto">
            Galeri Foto
          </Button>
        </div>
      </div>

      {/* 3. EVENT WIDGET (The Fix) */}
      {/* MOBILE: 'relative mt-12' -> Stacks below buttons, adds margin top.
         DESKTOP: 'md:absolute md:bottom-8 md:right-12 md:mt-0' -> Floats in corner.
      */}
      {/* <div className="relative mt-12 md:mt-0 md:absolute md:bottom-8 md:right-12 z-30 w-full max-w-xs px-4 md:px-0">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 p-5 rounded-2xl shadow-2xl hover:bg-white/20 transition-all cursor-pointer group">
          
          <div className="flex items-center justify-between mb-3">
             <span className="text-xs font-semibold text-orange-300 uppercase tracking-wider flex items-center gap-1">
               <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
               Agenda Terdekat
             </span>
             <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 text-[10px]">
               Wajib
             </Badge>
          </div>

          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-200 transition-colors">
            Purnama Kadasa
          </h3>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <Calendar className="h-3 w-3" /> 12 April 2025
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <Clock className="h-3 w-3" /> 18:00 WITA
            </div>
          </div>
        </div>
      </div> */}

      {/* 4. SCROLL INDICATOR (Hidden on short mobile screens to reduce clutter) */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
        <ChevronDown size={24} />
      </div>

    </div>
  );
}