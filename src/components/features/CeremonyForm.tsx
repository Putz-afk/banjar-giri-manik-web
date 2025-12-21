"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, GripVertical, Save, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Ceremony } from "@/types/cms";

interface CeremonyFormProps {
  initialData?: Ceremony;
  mode: "create" | "edit";
}

interface FormSection {
  tempId: string;
  id?: string;
  title: string;
  position: number;
  items: FormItem[];
}

interface FormItem {
  tempId: string;
  id?: string;
  instruction: string;
  mantra: string;
  position: number;
  subItems: FormSubItem[];
}

interface FormSubItem {
  tempId: string;
  id?: string;
  instruction: string;
  mantra: string;
  position: number;
}

export function CeremonyForm({ initialData, mode }: CeremonyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [schedule, setSchedule] = useState(initialData?.schedule || "");
  const [banten, setBanten] = useState(initialData?.banten || "");
  const [isPublished, setIsPublished] = useState(initialData?.is_published || false);
  const [sections, setSections] = useState<FormSection[]>(() => {
    if (initialData?.ceremony_sections) {
      return initialData.ceremony_sections.map((section) => ({
        tempId: crypto.randomUUID(),
        id: section.id,
        title: section.title || "",
        position: section.position,
        items: section.ceremony_items.map((item) => ({
          tempId: crypto.randomUUID(),
          id: item.id,
          instruction: item.instruction,
          mantra: item.mantra || "",
          position: item.position,
          subItems: item.ceremony_sub_items.map((subItem) => ({
            tempId: crypto.randomUUID(),
            id: subItem.id,
            instruction: subItem.instruction,
            mantra: subItem.mantra || "",
            position: subItem.position,
          })),
        })),
      }));
    }
    return [];
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (mode === "create" && !slug) {
      setSlug(generateSlug(value));
    }
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        tempId: crypto.randomUUID(),
        title: "",
        position: sections.length,
        items: [],
      },
    ]);
  };

  const removeSection = (tempId: string) => {
    setSections(sections.filter((s) => s.tempId !== tempId));
  };

  const updateSection = (tempId: string, field: string, value: string) => {
    setSections(
      sections.map((s) => (s.tempId === tempId ? { ...s, [field]: value } : s))
    );
  };

  const addItem = (sectionTempId: string) => {
    setSections(
      sections.map((section) => {
        if (section.tempId === sectionTempId) {
          return {
            ...section,
            items: [
              ...section.items,
              {
                tempId: crypto.randomUUID(),
                instruction: "",
                mantra: "",
                position: section.items.length,
                subItems: [],
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const removeItem = (sectionTempId: string, itemTempId: string) => {
    setSections(
      sections.map((section) => {
        if (section.tempId === sectionTempId) {
          return {
            ...section,
            items: section.items.filter((i) => i.tempId !== itemTempId),
          };
        }
        return section;
      })
    );
  };

  const updateItem = (
    sectionTempId: string,
    itemTempId: string,
    field: string,
    value: string
  ) => {
    setSections(
      sections.map((section) => {
        if (section.tempId === sectionTempId) {
          return {
            ...section,
            items: section.items.map((item) =>
              item.tempId === itemTempId ? { ...item, [field]: value } : item
            ),
          };
        }
        return section;
      })
    );
  };

  const addSubItem = (sectionTempId: string, itemTempId: string) => {
    setSections(
      sections.map((section) => {
        if (section.tempId === sectionTempId) {
          return {
            ...section,
            items: section.items.map((item) => {
              if (item.tempId === itemTempId) {
                return {
                  ...item,
                  subItems: [
                    ...item.subItems,
                    {
                      tempId: crypto.randomUUID(),
                      instruction: "",
                      mantra: "",
                      position: item.subItems.length,
                    },
                  ],
                };
              }
              return item;
            }),
          };
        }
        return section;
      })
    );
  };

  const removeSubItem = (
    sectionTempId: string,
    itemTempId: string,
    subItemTempId: string
  ) => {
    setSections(
      sections.map((section) => {
        if (section.tempId === sectionTempId) {
          return {
            ...section,
            items: section.items.map((item) => {
              if (item.tempId === itemTempId) {
                return {
                  ...item,
                  subItems: item.subItems.filter((si) => si.tempId !== subItemTempId),
                };
              }
              return item;
            }),
          };
        }
        return section;
      })
    );
  };

  const updateSubItem = (
    sectionTempId: string,
    itemTempId: string,
    subItemTempId: string,
    field: string,
    value: string
  ) => {
    setSections(
      sections.map((section) => {
        if (section.tempId === sectionTempId) {
          return {
            ...section,
            items: section.items.map((item) => {
              if (item.tempId === itemTempId) {
                return {
                  ...item,
                  subItems: item.subItems.map((subItem) =>
                    subItem.tempId === subItemTempId
                      ? { ...subItem, [field]: value }
                      : subItem
                  ),
                };
              }
              return item;
            }),
          };
        }
        return section;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        const { data: ceremony, error: ceremonyError } = await supabase
          .from("ceremonies")
          .insert({
            title,
            slug,
            schedule: schedule || null,
            banten: banten || null,
            is_published: isPublished,
          })
          .select()
          .single();

        if (ceremonyError) throw ceremonyError;

        for (const section of sections) {
          const { data: sectionData, error: sectionError } = await supabase
            .from("ceremony_sections")
            .insert({
              ceremony_id: ceremony.id,
              title: section.title || null,
              position: section.position,
            })
            .select()
            .single();

          if (sectionError) throw sectionError;

          for (const item of section.items) {
            const { data: itemData, error: itemError } = await supabase
              .from("ceremony_items")
              .insert({
                section_id: sectionData.id,
                instruction: item.instruction,
                mantra: item.mantra || null,
                position: item.position,
              })
              .select()
              .single();

            if (itemError) throw itemError;

            if (item.subItems.length > 0) {
              const subItemsToInsert = item.subItems.map((subItem) => ({
                item_id: itemData.id,
                instruction: subItem.instruction,
                mantra: subItem.mantra || null,
                position: subItem.position,
              }));

              const { error: subItemError } = await supabase
                .from("ceremony_sub_items")
                .insert(subItemsToInsert);

              if (subItemError) throw subItemError;
            }
          }
        }

        router.push("/admin/tuntunan");
      } else {
        const { error: ceremonyError } = await supabase
          .from("ceremonies")
          .update({
            title,
            slug,
            schedule: schedule || null,
            banten: banten || null,
            is_published: isPublished,
          })
          .eq("id", initialData!.id);

        if (ceremonyError) throw ceremonyError;

        await supabase
          .from("ceremony_sections")
          .delete()
          .eq("ceremony_id", initialData!.id);

        for (const section of sections) {
          const { data: sectionData, error: sectionError } = await supabase
            .from("ceremony_sections")
            .insert({
              ceremony_id: initialData!.id,
              title: section.title || null,
              position: section.position,
            })
            .select()
            .single();

          if (sectionError) throw sectionError;

          for (const item of section.items) {
            const { data: itemData, error: itemError } = await supabase
              .from("ceremony_items")
              .insert({
                section_id: sectionData.id,
                instruction: item.instruction,
                mantra: item.mantra || null,
                position: item.position,
              })
              .select()
              .single();

            if (itemError) throw itemError;

            if (item.subItems.length > 0) {
              const subItemsToInsert = item.subItems.map((subItem) => ({
                item_id: itemData.id,
                instruction: subItem.instruction,
                mantra: subItem.mantra || null,
                position: subItem.position,
              }));

              const { error: subItemError } = await supabase
                .from("ceremony_sub_items")
                .insert(subItemsToInsert);

              if (subItemError) throw subItemError;
            }
          }
        }

        router.push("/admin/tuntunan");
      }
    } catch (error) {
      console.error("Error saving ceremony:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft size={16} /> Kembali
        </Button>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <Switch
              checked={isPublished}
              onCheckedChange={setIsPublished}
              id="publish"
            />
            <Label htmlFor="publish" className="cursor-pointer">
              {isPublished ? "Published" : "Draft"}
            </Label>
          </div>
          <Button type="submit" disabled={loading} className="gap-2">
            <Save size={16} />
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Dasar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Judul Upacara</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="contoh: Purnama Kadasa"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="purnama-kadasa"
              required
            />
          </div>

          <div>
            <Label htmlFor="schedule">Jadwal/Waktu</Label>
            <Input
              id="schedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="contoh: Setiap Purnama, 18:00 WITA"
            />
          </div>

          <div>
            <Label htmlFor="banten">Sarana Banten</Label>
            <Textarea
              id="banten"
              value={banten}
              onChange={(e) => setBanten(e.target.value)}
              placeholder="Daftar sarana banten yang diperlukan..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-900">Tata Cara (Sections)</h3>
        <Button type="button" onClick={addSection} variant="outline" className="gap-2">
          <Plus size={16} /> Tambah Section
        </Button>
      </div>

      {sections.map((section, sectionIdx) => (
        <Card key={section.tempId} className="border-l-4 border-l-orange-500">
          <CardHeader className="bg-slate-50">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <GripVertical size={16} className="text-slate-400" />
                  <Badge variant="outline">Section {sectionIdx + 1}</Badge>
                </div>
                <Input
                  value={section.title}
                  onChange={(e) =>
                    updateSection(section.tempId, "title", e.target.value)
                  }
                  placeholder="Judul Section (opsional, contoh: Pembukaan)"
                  className="font-bold"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSection(section.tempId)}
                className="text-red-500"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {section.items.map((item, itemIdx) => (
              <div
                key={item.tempId}
                className="border border-slate-200 rounded-lg p-4 space-y-4 bg-white"
              >
                <div className="flex justify-between items-start">
                  <Badge variant="secondary">Langkah {itemIdx + 1}</Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(section.tempId, item.tempId)}
                    className="text-red-500"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>

                <div>
                  <Label>Instruksi</Label>
                  <Input
                    value={item.instruction}
                    onChange={(e) =>
                      updateItem(
                        section.tempId,
                        item.tempId,
                        "instruction",
                        e.target.value
                      )
                    }
                    placeholder="contoh: Ngaturang canang sari ring sanggah"
                    required
                  />
                </div>

                <div>
                  <Label>Mantram</Label>
                  <Textarea
                    value={item.mantra}
                    onChange={(e) =>
                      updateItem(section.tempId, item.tempId, "mantra", e.target.value)
                    }
                    placeholder="Om Swastyastu..."
                    rows={3}
                  />
                </div>

                {item.subItems.length > 0 && (
                  <div className="ml-6 space-y-3 border-l-2 border-slate-200 pl-4">
                    {item.subItems.map((subItem, subIdx) => (
                      <div
                        key={subItem.tempId}
                        className="bg-slate-50 rounded-lg p-3 space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="text-xs">
                            Sub-langkah {String.fromCharCode(97 + subIdx)}
                          </Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeSubItem(
                                section.tempId,
                                item.tempId,
                                subItem.tempId
                              )
                            }
                            className="text-red-500 h-6 w-6"
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>

                        <div>
                          <Label className="text-xs">Instruksi</Label>
                          <Input
                            value={subItem.instruction}
                            onChange={(e) =>
                              updateSubItem(
                                section.tempId,
                                item.tempId,
                                subItem.tempId,
                                "instruction",
                                e.target.value
                              )
                            }
                            placeholder="Detail instruksi..."
                            required
                            className="text-sm"
                          />
                        </div>

                        <div>
                          <Label className="text-xs">Mantram</Label>
                          <Textarea
                            value={subItem.mantra}
                            onChange={(e) =>
                              updateSubItem(
                                section.tempId,
                                item.tempId,
                                subItem.tempId,
                                "mantra",
                                e.target.value
                              )
                            }
                            placeholder="Mantram..."
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSubItem(section.tempId, item.tempId)}
                  className="gap-2 text-xs"
                >
                  <Plus size={14} /> Tambah Sub-langkah
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addItem(section.tempId)}
              className="w-full gap-2"
            >
              <Plus size={16} /> Tambah Langkah
            </Button>
          </CardContent>
        </Card>
      ))}

      {sections.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center text-slate-500">
            <p>Belum ada section. Klik tombol di atas untuk menambahkan.</p>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
