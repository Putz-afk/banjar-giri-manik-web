import { Ceremony, CeremonyItem, CeremonySection } from "@/types/cms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scroll, Clock, Box } from "lucide-react";
import { MantraText } from "../ui/mantra-text";
import { getSequenceLetter } from "@/lib/utils";

export function CeremonyViewer({ data }: { data: Ceremony }) {
  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden bg-white mb-8">

      {/* HEADER */}
      <CardHeader className="bg-orange-50/50 border-b border-orange-100 pb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-orange-600 mb-2">
              <Scroll size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Tuntunan Upacara</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 font-serif leading-tight">
              {data.title}
            </CardTitle>
          </div>

          {data.schedule && (
            <Badge variant="outline" className="w-fit gap-1.5 py-1.5 px-3 bg-white border-orange-200 text-orange-800 shadow-sm">
              <Clock size={14} /> {data.schedule}
            </Badge>
          )}
        </div>

        {data.banten && (
          <div className="mt-6 flex gap-3 items-start text-sm text-slate-700 bg-white/80 p-4 rounded-xl border border-orange-100 shadow-sm">
            <Box size={18} className="mt-0.5 text-orange-500 shrink-0" />
            <div>
              <span className="font-bold block mb-1 text-slate-900">Sarana Banten:</span>
              <span className="leading-relaxed">{data.banten}</span>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        {[...data.ceremony_sections]
          .sort((a, b) => a.position - b.position)
          .map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
      </CardContent>
    </Card>
  );
}

function SectionRenderer({ section }: { section: CeremonySection }) {
  return (
    <div className="border-b border-slate-100 last:border-0">
      {section.title && (
        <div className="bg-slate-50 px-6 py-3 border-y border-slate-100">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{section.title}</h3>
        </div>
      )}
      <ol className="divide-y divide-slate-50 list-none m-0 p-0">
        {[...section.ceremony_items]
          .sort((a, b) => a.position - b.position)
          .map((item, idx) => (
            <StepRenderer key={item.id} item={item} stepNumber={idx + 1} />
          ))}
      </ol>
    </div>
  );
}

function StepRenderer({ item, stepNumber }: { item: CeremonyItem; stepNumber: number }) {
  return (
    <li className="p-5 md:p-6 hover:bg-slate-50/50 transition-colors">
      <div className="flex gap-4">
        <div className="shrink-0 pt-0.5" aria-hidden="true">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm border border-slate-200">
            {stepNumber}
          </div>
        </div>
        <div className="w-full space-y-3">
          <h4 className="font-bold text-slate-900 text-lg leading-snug">{item.instruction}</h4>
          {item.mantra && (
            <MantraText>{item.mantra}</MantraText>
          )}
          {item.ceremony_sub_items && item.ceremony_sub_items.length > 0 && (
            <ol className="mt-4 pl-0 md:pl-4 space-y-3 border-l-2 border-slate-200 ml-1 list-none">
              {[...item.ceremony_sub_items]
                .sort((a, b) => a.position - b.position)
                .map((child, childIdx) => (
                  <li key={child.id} className="flex gap-3 pl-4 relative">
                    <div className="absolute left-0 top-3 w-3 h-px bg-slate-200" aria-hidden="true" />
                    <span className="font-medium text-slate-400 min-w-[20px] pt-1 text-sm">{getSequenceLetter(childIdx)}.</span>
                    <div className="w-full">
                      <p className="font-semibold text-slate-800 text-base">{child.instruction}</p>
                      {child.mantra && (
                        <MantraText>{child.mantra}</MantraText>
                      )}
                    </div>
                  </li>
                ))}
            </ol>
          )}
        </div>
      </div>
    </li>
  );
}