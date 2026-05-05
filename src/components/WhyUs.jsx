const WHY_US = [
  { num: '01', icon: '🎯', title: 'curated cohorts, not crowds', desc: 'Multi-step screening means every trip lands with 8–14 like-minded people, not strangers from a booking funnel.' },
  { num: '02', icon: '🤝', title: '100% in-house operations', desc: "No middlemen, no surprise charges. Stays, transfers, hosts, hosts' grandmothers — all handled by us." },
  { num: '03', icon: '📡', title: "wifi we'd code on", desc: "Every stay is speed-tested before you book. We've shipped products from these places — so will you." },
  { num: '04', icon: '♾️', title: 'community that outlasts the trip', desc: "Lifetime access to townie meetups, mentor calls, and a Slack you'll actually open." },
];

export default function WhyUs() {
  return (
    <section className="max-w-[1280px] mx-auto px-5 lg:px-8 py-20 lg:py-24">
      {/* Headline */}
      <div className="text-center mb-14">
        <p className="font-narrow font-bold text-[12px] uppercase tracking-[0.2em] text-brick mb-3">
          Why Nomadic Townies
        </p>
        <h2 className="font-hand text-4xl lg:text-6xl leading-[0.95]">
          small group. <span className="font-script italic text-brick">big difference.</span>
        </h2>
      </div>

      {/* Brutalist grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t-2 border-l-2 border-ink">
        {WHY_US.map((item) => (
          <div
            key={item.num}
            className="group border-r-2 border-b-2 border-ink p-6 lg:p-7 hover:bg-brick transition-colors duration-300 cursor-default"
          >
            <div className="text-3xl mb-4 group-hover:grayscale group-hover:brightness-200 transition-all">
              {item.icon}
            </div>
            <p className="font-hand text-xl text-brick group-hover:text-sun transition-colors mb-1">
              {item.num}.
            </p>
            <h3 className="font-hand text-2xl mb-3 group-hover:text-cream transition-colors">
              {item.title}
            </h3>
            <p className="text-ink/60 text-sm leading-relaxed group-hover:text-cream/70 transition-colors">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
