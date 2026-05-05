export default function HowItWorks() {
  const steps = [
    {
      emoji: '🗺️',
      num: '01',
      title: 'Pick a trip',
      desc: 'Browse our curated cohorts. Each trip is small (8–12 people), vetted, and run in-house. Find one that fits your vibe and dates.',
    },
    {
      emoji: '💳',
      num: '02',
      title: 'Book your seat',
      desc: 'Pay the full amount or just the advance to lock your spot. Secure checkout via Razorpay — UPI, cards, wallets, netbanking.',
    },
    {
      emoji: '✈️',
      num: '03',
      title: 'Show up',
      desc: "We handle stays, transport, hosts, itinerary — everything. You just land at the pickup point. That's literally it.",
    },
  ];

  return (
    <section id="how" className="bg-cream py-20 lg:py-24 border-y-2 border-ink/10">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-14">
          <p className="font-narrow font-bold text-[12px] uppercase tracking-[0.2em] text-brick mb-3">
            How it works
          </p>
          <h2 className="font-hand text-4xl lg:text-6xl leading-[0.95]">
            book in <span className="font-script italic text-brick">three steps.</span>
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="doodle-border bg-paper p-7 hover:shadow-hard-brick hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{s.emoji}</div>
              <p className="font-hand text-xl text-brick mb-1">{s.num}.</p>
              <h3 className="font-hand text-2xl mb-3">{s.title}</h3>
              <p className="text-ink/60 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
