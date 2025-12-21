"use client";

import { useForm, useFieldArray, Control, useFormContext, FormProvider, useWatch } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ceremonySchema, CeremonyDraft } from "@/lib/schemas/ceremony-schema";
import { saveCeremonyAction } from "@/lib/actions";
import { cn } from "@/lib/utils"; // Make sure you have this utils helper
import { draftToApi } from "@/lib/transformers/ceremony-transformer";

// UI Components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Icons
import { Trash2, ArrowUp, ArrowDown, Plus, Save, Smartphone, Eye, Monitor, ArrowLeft } from "lucide-react";

const STORAGE_KEY = "ceremony_draft_v1";

async function saveCeremony(data: CeremonyDraft) {
  const payload = draftToApi(data);

  const res = await fetch("/api/admin/ceremonies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to save ceremony");
  }

  return res.json();
}

const onError = (errors: any) => {
  console.log("VALIDATION ERRORS:", errors);
  alert("Gagal menyimpan. Cek console untuk melihat field yang error.");
};


export function CeremonyEditor({ defaultValues }: { defaultValues: CeremonyDraft }) {
  const [isPending, startTransition] = useTransition();
  const [initialData, setInitialData] = useState<CeremonyDraft>(defaultValues);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit"); // State for mobile toggle

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.title) setInitialData(parsed);
      } catch (e) { console.error(e); }
    }
  }, []);

  const form = useForm<CeremonyDraft>({
    resolver: zodResolver(ceremonySchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = form;

  // Auto-save
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: CeremonyDraft) => {
    const res = await fetch("/api/admin/ceremonies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to save ceremony");
    }

    alert("Saved");
  };

  // // Debugging
  // const onSubmit = (data: CeremonyDraft) => {
  //   alert("SUBMIT FIRED");
  //   console.log(data);
  // };



  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col min-h-screen">

        {/* --- 1. STICKY HEADER TOOLBAR --- */}
        <div className="flex items-center justify-between py-3 px-4 bg-white border-b sticky top-0 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              <Monitor size={14} /> Mode Split Screen
            </div>
            {/* Mobile View Toggle */}
            <div className="lg:hidden flex bg-slate-100 rounded-lg p-1">
              <button type="button" onClick={() => setMobileView("edit")} className={cn("text-xs px-3 py-1 rounded-md transition-all", mobileView === "edit" ? "bg-white shadow text-slate-900" : "text-slate-500")}>Edit</button>
              <button type="button" onClick={() => setMobileView("preview")} className={cn("text-xs px-3 py-1 rounded-md transition-all", mobileView === "preview" ? "bg-white shadow text-slate-900" : "text-slate-500")}>Preview</button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" type="button" size="sm" className="text-slate-500" onClick={() => {
              if (confirm("Reset form?")) { localStorage.removeItem(STORAGE_KEY); window.location.reload(); }
            }}>
              Reset
            </Button>
            <Button type="submit" size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800" disabled={isPending}>
              {isPending ? "Saving..." : <><Save size={16} /> Simpan</>}
            </Button>
          </div>
        </div>

        {/* --- 2. MAIN CONTENT GRID --- */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

            {/* LEFT: EDITOR */}
            <div className={cn("h-full overflow-y-auto bg-slate-50/50 p-4 lg:p-8 border-r", mobileView === "preview" ? "hidden lg:block" : "block")}>
              <div className="max-w-2xl mx-auto space-y-8 pb-20">
                {/* Info Card */}
                <Card className="border-slate-200 shadow-sm">
                  <CardContent className="pt-6 grid gap-6">
                    <div className="grid gap-2">
                      <Label>Judul Upacara</Label>
                      <Input {...register("title")} placeholder="Judul..." className="text-lg font-semibold" />
                      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Jadwal</Label>
                        <Input type="datetime-local" {...register("schedule")} />
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-3 bg-white">
                        <div className="space-y-0.5">
                          <Label>Publikasi</Label>
                          <p className="text-[10px] text-muted-foreground">Tampilkan ke warga?</p>
                        </div>
                        <Switch checked={watch("is_published")} onCheckedChange={(c) => setValue("is_published", c)} />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Banten / Sarana</Label>
                      <Textarea {...register("banten")} placeholder="Daftar banten..." rows={3} />
                    </div>
                  </CardContent>
                </Card>

                <SectionsEditor control={control} />
              </div>
            </div>

            {/* RIGHT: PREVIEW */}
            <div className={cn("h-full overflow-hidden bg-slate-100", mobileView === "edit" ? "hidden lg:block" : "block")}>
              <div className="h-full flex flex-col">
                <div className="bg-white border-b px-6 py-3 flex justify-between items-center shadow-sm z-10">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <Smartphone size={14} /> Live Preview
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Sync Active
                  </span>
                </div>
                <ScrollArea className="flex-1 p-4 lg:p-10">
                  <LivePreview />
                  <div className="h-20" /> {/* Spacer */}
                </ScrollArea>
              </div>
            </div>

          </div>
        </div>
      </form>
    </FormProvider>
  );
}

// --- PREVIEW COMPONENT ---
function LivePreview() {
  const data = useWatch();
  if (!data.title) return <div className="flex items-center justify-center h-64 text-slate-400 text-sm italic">Mulai ketik judul di kiri untuk melihat hasil...</div>;

  return (
    <div className="max-w-md mx-auto bg-white min-h-[600px] shadow-sm border border-slate-200 rounded-xl overflow-hidden">
      {/* Mock Phone Header */}
      <div className="bg-slate-900 h-1.5 w-full" />

      <div className="p-6 md:p-8 space-y-8">
        <div className="text-center border-b border-slate-100 pb-6">
          <Badge variant={data.is_published ? "default" : "outline"} className="mb-3">
            {data.is_published ? "Published" : "Draft"}
          </Badge>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">{data.title}</h1>
          {data.schedule && (
            <p className="text-sm text-slate-500 mt-2 font-medium">
              {new Date(data.schedule).toLocaleDateString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}
            </p>
          )}
        </div>

        {data.banten && (
          <div className="bg-orange-50/50 p-4 rounded-xl text-sm text-slate-700 border border-orange-100">
            <p className="font-bold text-orange-800 mb-2 text-xs uppercase tracking-wide">Sarana / Banten</p>
            <p className="whitespace-pre-wrap leading-relaxed">{data.banten}</p>
          </div>
        )}

        <div className="space-y-8">
          {data.sections?.map((section: any, idx: number) => (
            <div key={idx} className="relative pl-4 border-l-2 border-slate-200 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 leading-none">
                {section.title || <span className="opacity-30">Tanpa Judul</span>}
              </h3>
              {section.instruction && (
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{section.instruction}</p>
              )}

              <div className="space-y-3 pt-2">
                {section.items?.map((item: any, iIdx: number) => (
                  <div key={iIdx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                    <p className="font-medium text-slate-800 leading-relaxed">{item.instruction}</p>
                    {item.mantra && (
                      <p className="whitespace-pre-line font-serif italic text-slate-600 mt-2 pl-3 border-l-2 border-slate-300 text-xs">
                        {item.mantra}
                      </p>
                    )}
                    {item.subItems?.length > 0 && (
                      <ul className="mt-3 space-y-2 pl-1">
                        {item.subItems.map((sub: any, sIdx: number) => (
                          <li key={sIdx} className="flex gap-2 text-slate-600 text-xs">
                            <span className="text-slate-300 select-none">•</span>
                            <span>
                              {sub.instruction}
                              {sub.mantra && <span className="whitespace-pre-line block font-serif italic text-slate-500 mt-0.5">{sub.mantra}</span>}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- EDITOR SUB-COMPONENTS ---
function SectionsEditor({ control }: { control: Control<CeremonyDraft> }) {
  const { register } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({ control, name: "sections" });

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <Card key={field.id} className="border-l-4 border-l-blue-600 shadow-sm overflow-hidden group">
          <CardContent className="pt-0 px-0 pb-0">
            {/* Section Header */}
            <div className="bg-slate-50 border-b p-4 flex justify-between items-start">
              <div className="space-y-1 flex-1 mr-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-600 hover:bg-blue-700">Tahapan {index + 1}</Badge>
                </div>
                <Input
                  placeholder="Judul Tahapan (Misal: Persiapan)"
                  className="font-semibold border-transparent bg-transparent hover:bg-white focus:bg-white text-base h-auto py-1 shadow-none focus-visible:ring-0 placeholder:text-slate-400"
                  {...register(`sections.${index}.title`)}
                />
              </div>
              <div className="flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity bg-white shadow-sm border rounded-md p-1">
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6" disabled={index === 0} onClick={() => move(index, index - 1)}><ArrowUp size={14} /></Button>
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6" disabled={index === fields.length - 1} onClick={() => move(index, index + 1)}><ArrowDown size={14} /></Button>
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:bg-red-50" onClick={() => remove(index)}><Trash2 size={14} /></Button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <Textarea
                placeholder="Instruksi umum untuk tahapan ini..."
                className="resize-none min-h-20 bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
                {...register(`sections.${index}.instruction`)}
              />
              <Separator />
              <ItemsEditor control={control} sectionIndex={index} />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" className="w-full h-12 border-dashed border-2 hover:border-blue-500 hover:text-blue-600" onClick={() => append({ title: "", instruction: "", items: [] })}>
        <Plus size={16} className="mr-2" /> Tambah Tahapan Baru
      </Button>
    </div>
  );
}

function ItemsEditor({ control, sectionIndex }: { control: Control<CeremonyDraft>; sectionIndex: number }) {
  const { register } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({ control, name: `sections.${sectionIndex}.items` });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detail Kegiatan</Label>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="relative pl-3 border-l-2 border-slate-200 hover:border-blue-400 transition-colors group/item">
          {/* Hover Controls */}
          <div className="absolute right-0 top-0 flex gap-1 opacity-100 lg:opacity-0 lg:group-hover/item:opacity-100 transition-opacity bg-white shadow-sm border rounded-bl-md p-1 z-10">
            <Button type="button" variant="ghost" size="icon" className="h-5 w-5" disabled={index === 0} onClick={() => move(index, index - 1)}><ArrowUp size={12} /></Button>
            <Button type="button" variant="ghost" size="icon" className="h-5 w-5" onClick={() => move(index, index + 1)}><ArrowDown size={12} /></Button>
            <Button type="button" variant="ghost" size="icon" className="h-5 w-5 text-red-500" onClick={() => remove(index)}><Trash2 size={12} /></Button>
          </div>

          <div className="grid gap-2 mb-2 pr-6">
            <Textarea
              className="min-h-[50px] resize-y text-sm"
              placeholder="Apa kegiatannya?"
              {...register(`sections.${sectionIndex}.items.${index}.instruction`)}
            />
            <Textarea
              className="w-full resize-y text-sm font-serif italic text-slate-600 bg-slate-50"
              placeholder="Mantra (Opsional)..."
              {...register(`sections.${sectionIndex}.items.${index}.mantra`)}
            />
          </div>

          <SubItemsEditor control={control} sectionIndex={sectionIndex} itemIndex={index} />
        </div>
      ))}

      <Button type="button" variant="ghost" size="sm" className="w-full justify-start text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 pl-2" onClick={() => append({ instruction: "", mantra: null, subItems: [] })}>
        <Plus size={14} className="mr-1" /> Tambah Kegiatan
      </Button>
    </div>
  );
}

function SubItemsEditor({ control, sectionIndex, itemIndex }: { control: Control<CeremonyDraft>; sectionIndex: number; itemIndex: number }) {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: `sections.${sectionIndex}.items.${itemIndex}.subItems` });

  return (
    <div className="pl-2 space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-start group/sub">
          <div className="grid gap-1 flex-1">
            <Input
              className="h-7 text-xs bg-transparent border-0 border-b border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-blue-500 px-0"
              placeholder="Langkah kecil..."
              {...register(`sections.${sectionIndex}.items.${itemIndex}.subItems.${index}.instruction`)} />
            <Textarea
              className="w-full resize-y text-sm font-serif italic text-slate-600 bg-slate-50"
              placeholder="Mantra (opsional)..."
              {...register(`sections.${sectionIndex}.items.${itemIndex}.subItems.${index}.mantra`)}
            />
          </div>
          <Button type="button" variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover/sub:opacity-100 transition-opacity text-slate-400 hover:text-red-500" onClick={() => remove(index)}><Trash2 size={12} /></Button>
        </div>
      ))}
      <button type="button" className="text-[10px] text-slate-400 font-medium hover:text-blue-600 flex items-center gap-1 mt-1" onClick={() => append({ instruction: "", mantra: null })}>
        <Plus size={10} /> Detail Kecil
      </button>
    </div>
  );
}