"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteCeremonyButtonProps {
  ceremonyId: string;
  ceremonyTitle: string;
}

export function DeleteCeremonyButton({
  ceremonyId,
  ceremonyTitle,
}: DeleteCeremonyButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("ceremonies")
        .delete()
        .eq("id", ceremonyId);

      if (error) throw error;

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting ceremony:", error);
      alert("Gagal menghapus data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-400 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Tuntunan</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus upacara{" "}
            <strong>&quot;{ceremonyTitle}&quot;</strong>? Tindakan ini tidak dapat
            dibatalkan dan akan menghapus semua data terkait (sections, items, dan
            sub-items).
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="gap-2"
          >
            <Trash2 size={16} />
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
