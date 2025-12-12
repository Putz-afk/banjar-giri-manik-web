"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const TIMELINE_DATA = [
  {
    id: "1981",
    year: "1981",
    badge: "Cikal Bakal",
    description: 'Belum ada Pura, namun semangat menyama braya sudah menyala. Umat berkumpul di rumah Bapak Made Toestha. Nama "Giri Manik" lahir dari Bapak Dr. Made Suardha.',
    image: "/images/timeline/Peraman kilat-Feb 97_98.jpg"
  },
  {
    id: "1984",
    year: "1984",
    badge: "Ngeruak",
    description: 'Proses pembukaan lahan di Bukit Salonsa dimulai. Warga bekerja gotong royong menggunakan peralatan sederhana seperti parang dan cangkul sepulang kerja.',
    image: "/images/timeline/Masa pembabatan 85.jpg"
  },
  {
    id: "1985",
    year: "1985-87",
    badge: "Perjuangan Dana",
    description: 'Era penggalangan dana yang penuh semangat. Warga menggelar "Bali Nite", Bazar Makanan, hingga Motor Rally demi mengumpulkan biaya pembangunan.',
    image: "/images/timeline/Rally april 89.jpg"
  },
  {
    id: "1989",
    year: "1989",
    badge: "Peresmian",
    description: 'Tepat pada Purnamaning Kapat, Pura Giri Kusuma dipelaspas. Bukti nyata bahwa keterbatasan dana bukanlah penghalang bagi kekuatan kebersamaan.',
    image: "/images/timeline/Pemelaspas Okt 89.jpg"
  },
];

export function AboutSection() {
  const [activeItem, setActiveItem] = useState(TIMELINE_DATA[0]);

  // Helper to manually cycle images
  const cycleImage = (direction: 'next' | 'prev') => {
    const currentIndex = TIMELINE_DATA.findIndex(item => item.id === activeItem.id);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % TIMELINE_DATA.length;
    } else {
      newIndex = (currentIndex - 1 + TIMELINE_DATA.length) % TIMELINE_DATA.length;
    }
    setActiveItem(TIMELINE_DATA[newIndex]);
  };

  return (
    // FIX 1: Reduced vertical padding (py-12 instead of py-32) so it fits on laptop screens
    <section className="py-12 md:py-16 bg-white text-slate-900 overflow-hidden">

      {/* FIX 2: Custom width (max-w-7xl) instead of 'container' to use more screen space */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Headline Section */}
        <div className="max-w-3xl mb-10 space-y-3">
          <span className="text-orange-600 font-bold tracking-widest uppercase text-xs flex items-center gap-2">
            <span className="w-8 h-[2px] bg-orange-600"></span>
            Sejarah Kami
          </span>
          {/* Reduced headline size slightly for laptops */}
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-slate-900">
            Dari Parang & Cangkul, <br />
            Menjadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Giri Kusuma.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* LEFT SIDE: Text (8 Cols) */}
          <div className="lg:col-span-8 space-y-4 relative mt-2 order-2 lg:order-1">
            <div className="absolute left-[11px] top-2 bottom-10 w-[2px] bg-slate-100 hidden md:block" />

            {TIMELINE_DATA.map((item) => {
              const isActive = activeItem.id === item.id;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveItem(item)}
                  onClick={() => setActiveItem(item)} // FIX: Tap to select on mobile
                  className={`relative md:pl-10 group cursor-pointer transition-all duration-300 py-3 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                >
                  {/* Dot */}
                  <div className={`hidden md:block absolute left-0 top-5 w-6 h-6 rounded-full border-4 border-white transition-all duration-300 z-10 ${isActive ? 'bg-orange-600 scale-110 shadow-md' : 'bg-slate-300 group-hover:bg-orange-400'}`} />

                  {/* Header */}
                  <h3 className={`text-xl md:text-2xl font-bold flex items-center gap-3 transition-colors ${isActive ? 'text-orange-700' : 'text-slate-900'}`}>
                    {item.year}
                    <span className={`text-xs md:text-sm font-normal px-2 py-0.5 rounded transition-colors ${isActive ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}>
                      {item.badge}
                    </span>
                  </h3>

                  {/* FIX 4: Smaller text size (text-base) so description doesn't take too much vertical space */}
                  <p className="mt-2 text-base text-slate-600 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              )
            })}

            <div className="pt-4 md:pl-10">
              <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50 text-slate-900 text-sm">
                Baca Sejarah Lengkap <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE: Image (4 Cols) */}
          {/* FIX 5: Reduced height to h-[500px] to fit laptop screen */}
          <div className="lg:col-span-4 relative aspect-[850/1400] max-w-[280px] lg:max-w-[320px] mx-auto w-full rounded-xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 sticky top-24 order-1 lg:order-2">

            {TIMELINE_DATA.map((item) => (
              <div
                key={item.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${activeItem.id === item.id ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <Image
                  src={item.image}
                  alt={item.badge}
                  fill
                  className="object-cover"
                  priority={item.id === "1981"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:bg-none" />

                {/* FIX: Mobile Caption (Hidden on Desktop 'md:hidden') */}
                <div className="absolute bottom-6 left-6 right-6 md:hidden">
                  <div className="bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-sm">
                    <div className="text-orange-600 font-bold text-xs">{item.year}</div>
                    <div className="text-slate-900 font-bold text-sm line-clamp-1">{item.badge}</div>
                  </div>
                </div>

                {/* FIX 6: Removed the text caption box entirely. Just a subtle gradient at bottom for polish. */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
              </div>
            ))}
            {/* FIX: Manual Controls (Arrows) - Visible mainly on mobile/tablet interactions */}
            <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none z-20">
              <Button
                variant="secondary" size="icon"
                className="pointer-events-auto h-8 w-8 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white"
                onClick={() => cycleImage('prev')}
              >
                <ChevronLeft size={16} className="text-slate-900" />
              </Button>

              <Button
                variant="secondary" size="icon"
                className="pointer-events-auto h-8 w-8 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white"
                onClick={() => cycleImage('next')}
              >
                <ChevronRight size={16} className="text-slate-900" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}