import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';

export function Navbar() {
  return (
    // CHANGE 1: 'fixed' instead of 'sticky', and 'bg-black/20' for glass effect over dark hero
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-black/20">
      <div className="w-full max-w-[1400px] mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* Logo - White text for dark background */}
        <div className="flex gap-2 items-center text-white">
          <div className="bg-white/10 p-1.5 rounded-lg backdrop-blur-sm">
            <Database size={20} className="text-orange-400" />
          </div>
          <Link href="/" className="font-bold text-lg tracking-tight">
            Giri Manik<span className="font-normal opacity-70">.App</span>
          </Link>
        </div>

        {/* Desktop Menu - White text */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/80">
          <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
          <Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link>
          <Link href="/kegiatan" className="hover:text-white transition-colors">Galeri</Link>
        </div>

        {/* Action Button */}
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-white/20 bg-white/5 text-white hover:bg-white/20 hover:text-white transition-all"
          >
            Login Prajuru
          </Button>
        </div>
      </div>
    </nav>
  );
}