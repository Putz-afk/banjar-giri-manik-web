import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CeremonyViewer } from "@/components/features/CeremonyViewer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Ceremony } from "@/types/cms";

// Static Params for fast loading
export async function generateStaticParams() {
    const { data } = await supabase.from("ceremonies").select("slug");
    return data?.map((ceremony) => ({ slug: ceremony.slug })) || [];
}

interface PageProps {
    params: Promise <{
        slug: string;
    }>;
}

export default async function CeremonyDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const { data, error } = await supabase
        .from("ceremonies")
        .select(`
            *, 
            ceremony_sections (
                *,
                ceremony_items (
                    *,
                    ceremony_sub_items (*)
                )
            )`)
        .eq("slug", slug)
        .single();

    if (error || !data) {
        console.error("Error fetching ceremony:", error);
        notFound();
    }

    const ceremony = data as unknown as Ceremony;

    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
                {/* Back Button */}
                <div className="mb-8">
                    <Link href="/tuntunan">
                        <Button variant="ghost" className="text-slate-500 hover:text-slate-900 hover:bg-slate-200 pl-0 gap-2">
                            <ArrowLeft size={18} />
                            Kembali ke Daftar Tuntunan
                        </Button>
                    </Link>
                </div>

                {/* Viewer */}
                <CeremonyViewer data={ceremony} />
                <div className="text-center text-slate-400 text-sm mt-12 border-t border-slate-200 pt-8">
                    <p>Banjar Giri Manik • Arsip Digital</p>
                </div>
            </div>
        </main>
    )
}