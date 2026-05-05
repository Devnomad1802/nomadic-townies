export default function Contact() {
  return (
    <section id="contact" className="bg-brick text-cream py-20">
      <div className="max-w-[800px] mx-auto px-5 text-center">
        {/* Headline */}
        <h2 className="font-hand text-4xl lg:text-6xl leading-[0.95] mb-10">
          questions? <span className="font-script italic text-sun">just message.</span>
        </h2>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/918623949801"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto font-narrow font-bold text-[14px] uppercase tracking-wide bg-cream text-brick px-8 py-3.5 rounded-full hover:bg-paper transition-colors"
          >
            WhatsApp us
          </a>
          <a
            href="mailto:hello@nomadictownies.com"
            className="w-full sm:w-auto font-narrow font-bold text-[14px] uppercase tracking-wide border-2 border-cream text-cream px-8 py-3.5 rounded-full hover:bg-cream/10 transition-colors"
          >
            Email us
          </a>
          <a
            href="https://instagram.com/nomadictownies"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto font-narrow font-bold text-[14px] uppercase tracking-wide border-2 border-cream text-cream px-8 py-3.5 rounded-full hover:bg-cream/10 transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
