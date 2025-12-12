export function Footer() {
  return (
    <footer className="bg-slate-50 border-t py-8 mt-12">
      <div className="container px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
        <p>© 2025 Banjar Giri Manik, Sorowako.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}