import { Users, Baby, Tent, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Define the shape of data we expect (subset of your Supabase type)
interface StatsProps {
  families: any[]; // We pass the raw data here
}

export function StatsSection({ families }: StatsProps) {
  
  // 1. DATA PROCESSING (The Data Science Part)
  // Calculate total members by summing up the 'members' array in each family
  const totalMembers = families.reduce((acc, family) => acc + family.members.length, 0);
  const totalFamilies = families.length;
  
  // Calculate specific roles (Example logic)
  // Flatten all members into one big array
  const allMembers = families.flatMap(f => f.members);
  
  // Count genders (Assuming 'gender' field exists)
  const maleCount = allMembers.filter(m => m.gender === 'Laki-laki').length;
  const femaleCount = allMembers.filter(m => m.gender === 'Perempuan').length;

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900">Demografi Krama</h2>
          <p className="text-slate-500 mt-2">
            Data statistik pertumbuhan warga Banjar Giri Manik di Sorowako.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* STAT 1: Total KK */}
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                <Tent size={28} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total KK</p>
                <h3 className="text-3xl font-bold text-slate-900">{totalFamilies}</h3>
              </div>
            </CardContent>
          </Card>

          {/* STAT 2: Total Warga */}
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Users size={28} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Warga</p>
                <h3 className="text-3xl font-bold text-slate-900">{totalMembers}</h3>
              </div>
            </CardContent>
          </Card>

          {/* STAT 3: Gender Balance (Visual Bar) */}
          <Card className="border-none shadow-sm bg-white md:col-span-2">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-slate-500">Rasio Gender</p>
                <span className="text-xs font-bold text-slate-400">
                   {maleCount} Laki-laki / {femaleCount} Perempuan
                </span>
              </div>
              
              {/* Custom Progress Bar */}
              <div className="h-4 w-full bg-pink-100 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${(maleCount / totalMembers) * 100}%` }} 
                />
                {/* The rest is pink automatically */}
              </div>
              
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>{Math.round((maleCount / totalMembers) * 100)}% L</span>
                <span>{Math.round((femaleCount / totalMembers) * 100)}% P</span>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </section>
  );
}