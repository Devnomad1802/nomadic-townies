export default function About() {
  const stats = [
    { num: '5', label: 'live cohorts' },
    { num: '8–12', label: 'townies per trip' },
    { num: '100%', label: 'in-house ops' },
    { num: '24/7', label: 'on-trip support' },
  ];

  return (
    <section id="about" className="bg-ink text-cream py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — copy */}
        <div>
          <p className="font-narrow font-bold text-[12px] uppercase tracking-[0.2em] text-brick mb-4">
            About Nomadic Townies
          </p>
          <h2 className="font-hand text-4xl lg:text-6xl leading-[0.95] mb-6">
            we bring <span className="font-script italic text-sun">every</span> good trip
            <br />under one hood.
          </h2>
          <p className="text-cream/70 text-lg leading-relaxed mb-5">
            We're not a tour operator. We're a curated hub — every trip on this page is
            hand-picked, community-built, and run entirely in-house. No middlemen, no
            surprise charges, no strangers from a booking funnel.
          </p>
          <p className="text-cream/70 text-lg leading-relaxed">
            Every stay is speed-tested, every host is vetted, every cohort is screened.
            We've shipped products from these places — so will you. Show up, plug in,
            and let us handle the rest.
          </p>
        </div>

        {/* Right — stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-cream/5 border-2 border-cream/15 rounded-2xl p-6 hover:border-sun transition-colors"
            >
              <p className="font-hand text-4xl lg:text-5xl text-cream mb-2">{s.num}</p>
              <p className="font-narrow font-semibold text-[12px] uppercase tracking-[0.18em] text-cream/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
