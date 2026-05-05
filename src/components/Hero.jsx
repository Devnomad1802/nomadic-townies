export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="max-w-[1280px] mx-auto px-5 lg:px-8 pt-10 lg:pt-16 pb-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left — copy */}
        <div>
          {/* Status pill */}
          <div className="inline-flex items-center gap-2.5 bg-ink text-cream px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-brick animate-pulse-dot" />
            <span className="font-narrow font-bold text-[11px] uppercase tracking-[0.18em]">
              Now booking · 5 cohorts open for summer '26
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-hand leading-[0.95] tracking-tight text-[48px] sm:text-[64px] lg:text-[88px] mb-6">
            one hub.<br />
            <span className="text-brick">
              every trip <span className="font-script italic">worth</span> taking.
            </span>
          </h1>

          {/* Lead */}
          <p className="text-lg lg:text-xl text-ink/70 max-w-lg mb-8 leading-relaxed">
            Nomadic Townies is a curated hub for{' '}
            <strong className="font-marker text-2xl text-brick">handpicked travel experiences</strong>{' '}
            — coworking retreats, skill-share workshops, vanlife roadtrips, and founder residencies
            across India and Asia.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => scrollTo('#trips')}
              className="font-narrow font-bold uppercase text-[14px] tracking-wide bg-brick text-cream px-6 py-3 rounded-full hover:bg-brick-deep transition-colors shadow-hard-sm hover:shadow-hard"
            >
              See all 5 cohorts →
            </button>
            <button
              onClick={() => scrollTo('#how')}
              className="font-narrow font-bold uppercase text-[14px] tracking-wide border-2 border-ink text-ink px-6 py-3 rounded-full hover:bg-ink hover:text-cream transition-colors"
            >
              How it works
            </button>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-narrow font-semibold text-ink/50 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brick" />
              100% in-house
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brick" />
              Razorpay secure payments
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brick" />
              Partial booking from ₹5,000
            </span>
          </div>
        </div>

        {/* Right — photo collage */}
        <div className="hidden lg:block relative">
          <div className="relative">
            {/* Image 1 */}
            <div className="relative rotate-2 doodle-border overflow-hidden shadow-hard w-[75%]">
              <div className="tape -top-2 left-8 rotate-[-8deg]" />
              <div className="tape -top-2 right-6 rotate-[5deg]" />
              <img
                src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80"
                alt="Bhutan monastery with prayer flags"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            {/* Image 2 */}
            <div className="absolute -bottom-12 -right-4 w-[55%] -rotate-3 doodle-border overflow-hidden shadow-hard bg-cream">
              <div className="tape -top-2 left-6 rotate-[-5deg]" />
              <img
                src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80"
                alt="Bali rice terraces at sunrise"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            {/* Floating rating badge */}
            <div className="absolute -bottom-6 left-4 bg-cream doodle-border px-4 py-3 -rotate-3 shadow-hard-sm z-10">
              <div className="flex items-center gap-2">
                <span className="font-hand text-2xl text-brick">4.9</span>
                <div className="flex text-sun text-sm">★★★★★</div>
              </div>
              <p className="font-narrow text-[11px] text-ink/60 uppercase tracking-wider mt-0.5">
                from 2,400+ townies
              </p>
            </div>
          </div>

          {/* Hand-drawn arrow */}
          <div className="absolute -bottom-20 right-20">
            <svg width="60" height="50" viewBox="0 0 60 50" fill="none" className="text-brick">
              <path d="M5 40 Q20 5 55 15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="4 4" />
              <path d="M48 8 L56 15 L46 18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-marker text-brick text-lg absolute -bottom-6 right-0 whitespace-nowrap">
              that's us!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
