"use client"; // Needs to be client-side for the Carousel interactivity

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export function HeroBento() {
  return (
    <section className="container px-4 py-8 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[450px]">
        
        {/* === LEFT SIDE: CAROUSEL HERO (Takes 3/4 width) === */}
        <div className="md:col-span-3 h-full relative group rounded-2xl overflow-hidden border shadow-sm">
          <Carousel className="w-full h-full">
            <CarouselContent className="h-[450px]">
              
              {/* SLIDE 1: Welcome Message */}
              <CarouselItem className="h-full">
                <div className="relative h-full w-full bg-slate-900 flex items-center">
                  {/* Background Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900/50" />
                  
                  <div className="relative z-10 p-8 md:p-12 space-y-6 max-w-2xl">
                    <Badge className="bg-orange-500 text-white hover:bg-orange-600 border-0 mb-2">
                      Selamat Datang
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                      Banjar Giri Manik <br/> Sorowako
                    </h1>
                    <p className="text-lg text-slate-300">
                      Wadah kebersamaan, guyub rukun, dan harmonis bagi umat Hindu di tanah rantau Luwu Timur.
                    </p>
                    <div className="flex gap-3 pt-2">
                      <Button className="bg-white text-slate-900 hover:bg-slate-200 font-semibold">
                        Lihat Profil
                      </Button>
                      <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                        Hubungi Kami
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* SLIDE 2: Another Photo/Topic (Example) */}
              <CarouselItem className="h-full">
                <div className="relative h-full w-full bg-slate-800 flex items-center justify-center">
                  <div className="absolute inset-0 bg-slate-800" /> {/* Placeholder for img */}
                  <div className="relative z-10 text-center p-12">
                     <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                       Kegiatan Sosial
                     </h2>
                     <p className="text-slate-300 max-w-lg mx-auto">
                       Gotong royong membersihkan area Pura setiap hari Minggu.
                     </p>
                  </div>
                </div>
              </CarouselItem>

            </CarouselContent>
            
            {/* Carousel Controls (Visible on hover) */}
            <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Carousel>
        </div>

        {/* === RIGHT SIDE: NEXT EVENT (Takes 1/4 width) === */}
        <div className="md:col-span-1 h-full">
          <Card className="h-full bg-slate-50 border-dashed border-2 flex flex-col justify-between overflow-hidden">
            
            {/* Top decorative part */}
            <div className="bg-orange-100 p-4 border-b border-orange-200">
               <div className="flex items-center gap-2 text-orange-700 font-semibold mb-1">
                 <Calendar className="h-4 w-4" />
                 <span>Agenda Terdekat</span>
               </div>
               <div className="text-xs text-orange-600">
                 Jangan lupa hadir tepat waktu
               </div>
            </div>

            {/* Event Details (Centered) */}
            <CardContent className="flex-1 flex flex-col justify-center p-6 space-y-4">
              <div className="text-center">
                <Badge variant="outline" className="mb-2 border-slate-300 text-slate-500">
                  Sabtu, 12 Apr
                </Badge>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  Purnama Kadasa
                </h3>
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>18:00 WITA</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                   <MapPin className="h-4 w-4 text-slate-400" />
                   <span>Utama Mandala</span>
                </div>
              </div>
            </CardContent>

            {/* Bottom Action */}
            <div className="p-4 border-t bg-white">
              <Button variant="ghost" className="w-full text-xs text-slate-500 hover:text-orange-600">
                Lihat Kalender Penuh <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
}