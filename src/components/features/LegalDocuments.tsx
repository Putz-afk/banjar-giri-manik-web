import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Users, ArrowRight } from "lucide-react";

export function LegalDocuments() {
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Landasan Hukum</h2>
            <p className="text-sm text-slate-500">Dokumen resmi yang menjadi pedoman Banjar.</p>
          </div>
        </div>

        {/* The Grid of Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* DOCUMENT 1: Anggaran Dasar */}
          <DocumentCard 
            title="Anggaran Dasar (AD)"
            year="1982"
            description="Konstitusi dasar pembentukan wadah Banjar Giri Manik."
            signatories="Dr. Made Suardha, I Nyoman Gelgel, dkk."
            fileUrl="/documents/ad-1982.pdf"
            color="orange"
          />

          {/* DOCUMENT 2: Anggaran Rumah Tangga */}
          <DocumentCard 
            title="Anggaran Rumah Tangga (ART)"
            year="1989"
            description="Aturan detail mengenai tata tertib, sanksi, dan kepengurusan."
            signatories="I Gusti Putu Oka, I Wayan Prenata, dkk."
            fileUrl="/documents/art-1989.pdf"
            color="blue"
          />

        </div>
      </div>
    </section>
  );
}

// === THE LIGHTWEIGHT CARD COMPONENT ===
interface DocumentCardProps {
  title: string;
  year: string;
  description: string;
  signatories: string;
  fileUrl: string;
  color: "orange" | "blue";
}

function DocumentCard({ title, year, description, signatories, fileUrl, color }: DocumentCardProps) {
  // Dynamic styling based on color prop
  const iconColor = color === "orange" ? "text-orange-600 bg-orange-100" : "text-blue-600 bg-blue-100";
  const buttonColor = color === "orange" ? "hover:bg-orange-50 hover:text-orange-700 border-orange-200" : "hover:bg-blue-50 hover:text-blue-700 border-blue-200";

  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          {/* Icon Box */}
          <div className={`p-3 rounded-xl ${iconColor} transition-transform group-hover:scale-105`}>
            <FileText size={28} />
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {year}
          </Badge>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          {description}
        </p>

        {/* Metadata Section */}
        <div className="bg-slate-50 rounded-lg p-3 mb-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar size={14} />
            <span>Disahkan: {year}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Users size={14} />
            <span className="truncate">Oleh: {signatories}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
            {/* Primary Action: Open in New Tab (Let Browser Handle It) */}
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full gap-2" variant="outline">
                Baca Dokumen <ArrowRight size={16} />
              </Button>
            </a>

            {/* Secondary Action: Force Download */}
            <a href={fileUrl} download>
               <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                 <Download size={18} />
               </Button>
            </a>
        </div>
      </CardContent>
    </Card>
  );
}