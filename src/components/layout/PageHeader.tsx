interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* Background Pattern - You can replace with an image later */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl space-y-4 pt-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}