import { PageHeader } from "@/components/layout/PageHeader";
import { CeremonyViewer } from "@/components/features/CeremonyViewer";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { Scroll, Clock, ArrowRight, Box } from "lucide-react";

export const metadata = {
  title: "Tuntunan & Mantram - Banjar Giri Manik",
  description: "Kumpulan panduan upacara dan mantram.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function TuntunanHubPage() {
  // fetch summary data
  const { data: ceremonies, error } = await supabase
    .from("ceremonies")
    .select("id, title, slug, schedule, banten")
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching ceremonies:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHeader
        title="Tuntunan & Mantram"
        description="Panduan praktis pelaksanaan yadnya, tata cara persembahyangan, dan doa sehari-hari."
      />

      <section className="py-12 md:py-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

          {/* Empty State */}
          {!ceremonies || ceremonies.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
              <Scroll className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">Belum Ada Tuntunan</h3>
              <p className="text-slate-500">Data upacara belum ditambahkan ke database.</p>
            </div>
          ) : (
            /* Grid Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ceremonies.map((ceremony) => (
                // LINK TO SLUG PAGE
                <Link key={ceremony.id} href={`/tuntunan/${ceremony.slug}`} className="group block h-full">
                  <Card className="h-full border-slate-200 hover:border-orange-300 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">

                    {/* Card Header */}
                    <CardHeader className="pb-4 bg-slate-50/50 border-b border-slate-100 group-hover:bg-orange-50/30 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="bg-orange-100 p-2.5 rounded-lg text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <Scroll size={20} />
                        </div>

                        {ceremony.schedule && (
                          <Badge variant="secondary" className="bg-white text-slate-500 border-slate-200">
                            <Clock size={12} className="mr-1" />
                            {/* Simple truncate for time if it's too long */}
                            <span className="truncate max-w-[120px]">
                              {ceremony.schedule.split(',')[0]}
                            </span>
                          </Badge>
                        )}
                      </div>

                      <CardTitle className="mt-4 text-xl font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-orange-700 transition-colors">
                        {ceremony.title}
                      </CardTitle>
                    </CardHeader>

                    {/* Card Content (Summary of Banten) */}
                    <CardContent className="pt-4 flex-grow">
                      <div className="flex gap-2 items-start text-sm text-slate-500">
                        {ceremony.banten ? (
                          <>
                            <Box size={16} className="mt-0.5 shrink-0 text-slate-400" />
                            <p className="line-clamp-3 leading-relaxed">
                              {ceremony.banten}
                            </p>
                          </>
                        ) : (
                          <p className="italic text-slate-400">
                            Klik untuk melihat detail tata cara dan mantram lengkap.
                          </p>
                        )}
                      </div>
                    </CardContent>

                    {/* Card Footer (Action) */}
                    <CardFooter className="pt-0 pb-6 text-orange-600 font-medium text-sm flex items-center gap-2">
                      Baca Selengkapnya
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}