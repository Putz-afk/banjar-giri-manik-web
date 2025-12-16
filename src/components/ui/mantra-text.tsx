import { cn } from "@/lib/utils"

interface MantraTextProps {
    children: string;
    className?: string;
}

export function MantraText({ children, className }: MantraTextProps) {
    return (
        <div className={cn("bg-slate-50 border-l-2 border-slate-200 px-4 py-3 rounded-r-md", className)}>
            <p className="font-serif text-slate-600 whitespace-pre-line leading-relaxed">
                {children}
            </p>
        </div>
    );
}