export default function Footer() {
  return (
    <footer className="bg-ink text-cream py-12 px-5 lg:px-8 border-t-2 border-cream/10">
      <div className="max-w-[1280px] mx-auto text-center flex flex-col items-center">
        {/* Logo Recreated */}
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className="font-hand text-3xl text-brick">nomadic</span>
          <span className="font-hand text-3xl text-cream">townies</span>
        </div>
        
        {/* Tagline */}
        <p className="font-narrow font-bold text-[12px] uppercase tracking-[0.2em] text-sun mb-8">
          the way to experience the world
        </p>

        {/* Bottom Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-[12px] text-cream/50">
          <span>© {new Date().getFullYear()} Nomadic Townies</span>
          <span className="hidden sm:inline">·</span>
          <span>GST 27BNZPM9706J1Z0</span>
          <span className="hidden sm:inline">·</span>
          <span>B Wing 2903, Nanded City, Pune</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-[11px] text-cream/40 mt-4 underline decoration-cream/20 underline-offset-4">
          <a href="#" className="hover:text-cream transition-colors">Privacy</a>
          <a href="#" className="hover:text-cream transition-colors">Terms</a>
          <a href="#" className="hover:text-cream transition-colors">Cookies</a>
          <a href="#" className="hover:text-cream transition-colors">Legal</a>
        </div>
      </div>
    </footer>
  );
}
