import { supabase } from "@/lib/supabase";
import { HeroCinematic } from "@/components/layout/HeroCinematic";
import { AboutSection } from "@/components/features/AboutSection";
import { StatsSection } from "@/components/features/StatsSection"; // Import new component

export const experimental_ppr = true;

export default async function Home() {
  // Fetch Data Server-Side
  const { data: families } = await supabase
    .from('families')
    .select('*, members(*)') // We still fetch the data...
    .order('created_at');

  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* 1. Hero */}
      <HeroCinematic />

      {/* 2. History */}
      <AboutSection />

      {/* 3. Stats (Safe & Professional) */}
      {/* We pass the data to the component, it calculates the numbers */}
      {families && <StatsSection families={families} />}

    </main>
  );
}