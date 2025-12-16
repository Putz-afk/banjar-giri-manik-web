"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Database, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="w-full max-w-[1400px] mx-auto flex h-16 items-center justify-between px-6 md:px-12">

        {/* Logo & Desktop Menu */}
        <div className="flex gap-2 items-center text-white">
          <div className="bg-white/10 p-1.5 rounded-lg backdrop-blur-sm">
            <Database size={20} className="text-orange-400" />
          </div>
          <Link href="/" className="font-bold text-lg tracking-tight">
            Giri Manik<span className="font-normal opacity-70">.App</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/80">
          <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
          <Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link>
          <Link href="/tuntunan" className="hover:text-white transition-colors">Tuntunan</Link>
          <Link href="/kegiatan" className="hover:text-white transition-colors">Galeri</Link>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Button variant="outline" size="sm" className="border-white/20 bg-white/5 text-white hover:bg-white/20">Login Prajuru</Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden text-white">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu size={24} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 text-white z-[100] p-6">
              <SheetHeader className="text-left mb-8">
                <SheetTitle className="text-white flex items-center gap-2 text-xl">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <Database size={18} className="text-orange-400" />
                  </div>
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {/* Mobile Links with specific styling */}
                <Link href="/" className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-all text-sm font-medium text-slate-200 hover:text-white">
                  Beranda
                </Link>
                <Link href="/about" className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-all text-sm font-medium text-slate-200 hover:text-white">
                  Tentang Kami
                </Link>
                <Link href="/tuntunan" className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-all text-sm font-medium text-slate-200 hover:text-white">
                  Tuntunan
                </Link>
                <Link href="/kegiatan" className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-all text-sm font-medium text-slate-200 hover:text-white">
                  Galeri
                </Link>

                <div className="h-px bg-slate-800 my-4" /> {/* Separator */}

                <Link href="/login" className="flex items-center justify-center p-3 rounded-lg bg-orange-600 hover:bg-orange-700 transition-all text-sm font-bold text-white">
                  Login Prajuru
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}