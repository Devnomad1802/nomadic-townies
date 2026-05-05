import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Trips', href: '#trips' },
  { label: 'About', href: '#about' },
  { label: 'How it works', href: '#how' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  const scrollTo = (href) => {
    setOpen(false);
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 bg-paper/85 backdrop-blur-md border-b-2 border-ink/10 z-40">
      <nav className="max-w-[1280px] mx-auto px-5 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('#top')} className="flex items-baseline gap-0.5" aria-label="Scroll to top">
          <span className="font-hand text-2xl text-brick">nomadic</span>
          <span className="font-hand text-2xl text-ink">townies</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="font-narrow font-semibold uppercase tracking-wide text-[14px] text-ink/70 hover:text-brick transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo('#trips')}
          className="hidden md:inline-flex font-narrow font-bold uppercase text-[14px] tracking-wide bg-brick text-cream px-5 py-2.5 rounded-full hover:bg-brick-deep transition-colors"
        >
          Book a trip →
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className={`block w-6 h-0.5 bg-ink transition-transform duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-transform duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t-2 border-ink/10 bg-paper px-5 pb-5 animate-fade-in">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="block w-full text-left py-3 font-narrow font-semibold uppercase tracking-wide text-[15px] text-ink/70 hover:text-brick border-b border-ink/5"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#trips')}
            className="mt-4 w-full font-narrow font-bold uppercase text-[14px] tracking-wide bg-brick text-cream px-5 py-3 rounded-full"
          >
            Book a trip →
          </button>
        </div>
      )}
    </header>
  );
}
