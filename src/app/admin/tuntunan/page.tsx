// src/app/admin/tuntunan/page.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0; // Always fetch fresh data for admin

export default async function AdminTuntunanPage() {
  // Fetch summary data
  const { data: ceremonies, error } = await supabase
    .from("ceremonies")
    .select("id, title, slug, is_published, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Error loading data: {error.message}</div>;
  }

  return (
    <div className="pt-24 p-8 max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tuntunan & Mantram</h1>
          <p className="text-slate-500">Kelola data upacara dan tata cara persembahyangan.</p>
        </div>
        <Link href="/admin/tuntunan/create">
          <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
            <Plus size={18} />
            Buat Baru
          </Button>
        </Link>
      </div>

      {/* Data Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[400px]">Judul Upacara</TableHead>
              <TableHead>Slug (URL)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ceremonies?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                  Belum ada data. Silakan buat baru.
                </TableCell>
              </TableRow>
            ) : (
              ceremonies?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-slate-900">
                    {item.title}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-500">
                    /{item.slug}
                  </TableCell>
                  <TableCell>
                    {item.is_published ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Published</Badge>
                    ) : (
                      <Badge variant="outline" className="text-slate-500">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/tuntunan/${item.slug}`} target="_blank">
                        <Button variant="ghost" size="icon" title="Lihat Preview">
                          <Eye size={16} className="text-slate-400" />
                        </Button>
                      </Link>
                      <Link href={`/admin/tuntunan/${item.id}`}>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Pencil size={14} /> Edit
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}