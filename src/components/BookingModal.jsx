import { useState, useEffect } from 'react';
import { X, Check, Lock, Loader2, ArrowRight } from 'lucide-react';
import { openRazorpayCheckout } from '../lib/razorpay';
import { notifyBooking } from '../lib/notify';

export default function BookingModal({ trip, onClose }) {
  // steps: 'details' -> 'book' -> 'success'
  const [step, setStep] = useState('details');
  const [paymentType, setPaymentType] = useState('full');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });

  // Trap body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handlePay = () => {
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill in Name, Email, and Phone.');
      return;
    }
    
    setIsPaying(true);
    
    openRazorpayCheckout({
      trip,
      customer: form,
      paymentType,
      onSuccess: (response) => {
        setIsPaying(false);
        setPaymentId(response.razorpay_payment_id);
        setStep('success');
        
        notifyBooking({
          payment_id: response.razorpay_payment_id,
          trip_slug: trip.slug,
          trip_name: trip.name,
          amount_paid: paymentType === 'full' ? trip.price : trip.advance,
          payment_type: paymentType,
          customer: form,
          timestamp: new Date().toISOString(),
        });
      },
      onDismiss: () => {
        setIsPaying(false);
      },
      onError: (err) => {
        setIsPaying(false);
        alert(err.message || 'Payment failed. Please try again.');
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[85vh] bg-paper sm:rounded-2xl rounded-t-2xl sm:doodle-border flex flex-col overflow-hidden animate-slide-up shadow-hard-sm">
        {/* Header Hero */}
        <div className="relative h-48 sm:h-56 shrink-0 border-b-2 border-ink bg-ink">
          <img src={trip.heroImg} alt={trip.name} className="w-full h-full object-cover opacity-80" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream text-ink flex items-center justify-center hover:bg-brick hover:text-cream transition-colors border-2 border-ink z-10"
          >
            <X size={18} strokeWidth={3} />
          </button>
          <div className="absolute bottom-4 left-5 right-5 text-cream drop-shadow-md">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-narrow font-bold uppercase tracking-widest bg-brick text-cream border border-ink/20 mb-2">
              {trip.tag}
            </span>
            <h2 className="font-hand text-3xl sm:text-4xl leading-none">{trip.name}</h2>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 sm:p-8">
          {step === 'details' && (
            <div className="animate-fade-in pb-4">
              {/* 4-stat grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-cream/50 p-3 rounded-xl border border-ink/10">
                  <p className="text-[10px] font-narrow font-bold uppercase text-ink/50 tracking-wider mb-1">Duration</p>
                  <p className="font-semibold text-sm">{trip.duration}</p>
                </div>
                <div className="bg-cream/50 p-3 rounded-xl border border-ink/10">
                  <p className="text-[10px] font-narrow font-bold uppercase text-ink/50 tracking-wider mb-1">Departs</p>
                  <p className="font-semibold text-sm">{trip.departureDate}</p>
                </div>
                <div className="bg-cream/50 p-3 rounded-xl border border-ink/10">
                  <p className="text-[10px] font-narrow font-bold uppercase text-ink/50 tracking-wider mb-1">Pickup</p>
                  <p className="font-semibold text-sm">{trip.pickup}</p>
                </div>
                <div className="bg-ink text-cream p-3 rounded-xl border border-ink">
                  <p className="text-[10px] font-narrow font-bold uppercase tracking-wider mb-1 opacity-70">Seats Left</p>
                  <p className="font-semibold text-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sun animate-pulse-dot" />
                    {trip.seatsLeft} of {trip.totalSeats}
                  </p>
                </div>
              </div>

              <p className="font-marker italic text-lg text-brick mb-6">{trip.route}</p>
              
              <p className="text-ink/80 leading-relaxed mb-8">{trip.overview}</p>

              {/* Highlights */}
              <h3 className="font-hand text-xl mb-4 flex items-center gap-2">
                <span className="text-sun">★</span> Trip Highlights
              </h3>
              <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6 mb-8 text-sm">
                {trip.highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brick mt-0.5">★</span>
                    <span className="text-ink/80">{hl}</span>
                  </li>
                ))}
              </ul>

              {/* Itinerary */}
              <h3 className="font-hand text-xl mb-4 mt-8">Day by Day</h3>
              <div className="space-y-3 mb-10">
                {trip.itinerary.map((day, i) => (
                  <details key={i} className="group bg-cream border border-ink/15 rounded-xl overflow-hidden" open={i === 0}>
                    <summary className="flex items-center gap-4 p-4 hover:bg-cream/80 select-none">
                      <div className="w-9 h-9 shrink-0 rounded-full bg-ink text-cream flex items-center justify-center font-narrow font-bold text-[11px]">
                        D{day.day}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[15px]">{day.title}</h4>
                        {day.dist && <p className="text-[12px] text-ink/50 font-narrow uppercase tracking-wide mt-0.5">{day.dist}</p>}
                      </div>
                      <div className="w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center text-ink/50 day-toggle">
                        +
                      </div>
                    </summary>
                    <div className="p-4 pt-0 pl-16 border-t border-dashed border-ink/10">
                      <ul className="space-y-2 mt-3 text-sm text-ink/70">
                        {day.desc.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-ink/30 mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>

              {/* Inclusions / Exclusions */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="border border-leaf/30 bg-leaf/5 rounded-xl p-5">
                  <h4 className="font-bold text-leaf mb-3 flex items-center gap-2">
                    <Check size={16} /> What's Included
                  </h4>
                  <ul className="space-y-2 text-sm text-ink/70">
                    {trip.inclusions.map((inc, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-leaf/60">+</span> {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-brick/30 bg-brick/5 rounded-xl p-5">
                  <h4 className="font-bold text-brick mb-3 flex items-center gap-2">
                    <X size={16} /> What's Not Included
                  </h4>
                  <ul className="space-y-2 text-sm text-ink/70">
                    {trip.exclusions.map((exc, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-brick/60">-</span> {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {step === 'book' && (
            <div className="animate-fade-in max-w-md mx-auto py-4 pb-8">
              <button 
                onClick={() => setStep('details')}
                className="text-sm font-narrow font-bold uppercase tracking-wide text-ink/50 hover:text-ink mb-6 flex items-center gap-1"
              >
                ← Back to details
              </button>
              
              <h3 className="font-hand text-2xl mb-6">Complete your booking</h3>
              
              {/* Payment Type Toggle */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setPaymentType('full')}
                  className={`p-4 rounded-xl text-left border-2 transition-all ${
                    paymentType === 'full' 
                      ? 'border-brick bg-brick/5 shadow-sm' 
                      : 'border-ink/10 bg-cream hover:border-ink/30'
                  }`}
                >
                  <p className="font-bold mb-1 flex items-center justify-between">
                    Pay Full
                    {paymentType === 'full' && <Check size={16} className="text-brick" />}
                  </p>
                  <p className="text-xs text-ink/60">₹{trip.price.toLocaleString('en-IN')}</p>
                </button>
                <button
                  onClick={() => setPaymentType('advance')}
                  className={`p-4 rounded-xl text-left border-2 transition-all ${
                    paymentType === 'advance' 
                      ? 'border-brick bg-brick/5 shadow-sm' 
                      : 'border-ink/10 bg-cream hover:border-ink/30'
                  }`}
                >
                  <p className="font-bold mb-1 flex items-center justify-between">
                    Pay Advance
                    {paymentType === 'advance' && <Check size={16} className="text-brick" />}
                  </p>
                  <p className="text-xs text-ink/60">₹{trip.advance.toLocaleString('en-IN')} now</p>
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-xs font-narrow font-bold uppercase tracking-wide text-ink/60 mb-1.5 ml-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-cream border border-ink/20 rounded-xl px-4 py-3 outline-none focus:border-brick transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-narrow font-bold uppercase tracking-wide text-ink/60 mb-1.5 ml-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-cream border border-ink/20 rounded-xl px-4 py-3 outline-none focus:border-brick transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-narrow font-bold uppercase tracking-wide text-ink/60 mb-1.5 ml-1">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full bg-cream border border-ink/20 rounded-xl px-4 py-3 outline-none focus:border-brick transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-narrow font-bold uppercase tracking-wide text-ink/60 mb-1.5 ml-1">Any notes? (Dietary, questions)</label>
                  <textarea
                    value={form.notes}
                    onChange={e => setForm({...form, notes: e.target.value})}
                    className="w-full bg-cream border border-ink/20 rounded-xl px-4 py-3 outline-none focus:border-brick transition-colors resize-none h-24"
                    placeholder="Optional..."
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-ink text-cream rounded-2xl p-5 mb-6 shadow-hard-sm">
                <p className="text-sm text-cream/70 mb-1">You pay now:</p>
                <p className="font-hand text-3xl text-sun mb-2">
                  ₹{(paymentType === 'full' ? trip.price : trip.advance).toLocaleString('en-IN')}
                </p>
                {paymentType === 'advance' && (
                  <p className="text-xs text-cream/50 pt-3 border-t border-cream/10">
                    Balance ₹{(trip.price - trip.advance).toLocaleString('en-IN')} due 30 days before departure
                  </p>
                )}
              </div>

              <button
                onClick={handlePay}
                disabled={isPaying}
                className="w-full bg-brick text-cream font-narrow font-bold text-[16px] uppercase tracking-wide py-4 rounded-xl hover:bg-brick-deep transition-colors flex items-center justify-center gap-2 shadow-hard-brick disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPaying ? <Loader2 size={20} className="animate-spin" /> : <Lock size={16} />}
                {isPaying ? 'Processing...' : `Pay ₹${(paymentType === 'full' ? trip.price : trip.advance).toLocaleString('en-IN')} via Razorpay`}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-ink/40 font-narrow uppercase tracking-wider">
                <Lock size={10} />
                <span>Secure payment via Razorpay · UPI, Cards, Netbanking, Wallets</span>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="animate-rise-in flex flex-col items-center justify-center text-center py-10 pb-16">
              <div className="w-20 h-20 bg-leaf/10 text-leaf rounded-full flex items-center justify-center mb-6">
                <Check size={40} strokeWidth={3} />
              </div>
              <h3 className="font-hand text-3xl mb-3">welcome aboard, townie!</h3>
              <p className="text-ink/70 max-w-sm mx-auto mb-8">
                Your seat for <strong>{trip.name}</strong> is confirmed. We've sent the details to <strong>{form.email}</strong>.
              </p>
              
              <div className="bg-cream doodle-border border-dashed p-4 mb-8 inline-block">
                <p className="text-[10px] font-narrow font-bold uppercase tracking-wider text-ink/50 mb-1">Payment ID</p>
                <p className="font-mono text-sm">{paymentId}</p>
              </div>

              <a
                href="https://wa.me/918623949801"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-narrow font-bold uppercase tracking-wide px-6 py-3 rounded-full hover:brightness-95 transition-all shadow-md"
              >
                Say hi on WhatsApp <ArrowRight size={16} />
              </a>
            </div>
          )}
        </div>

        {/* Footer CTA Bar (only in 'details' step) */}
        {step === 'details' && (
          <div className="shrink-0 bg-paper border-t-2 border-ink/10 p-4 sm:px-8 sm:py-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-narrow font-bold uppercase tracking-wider text-ink/50 mb-0.5">Starting at</p>
              <div className="flex items-baseline gap-2">
                <span className="font-hand text-2xl sm:text-3xl text-brick leading-none">₹{trip.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button 
              onClick={() => setStep('book')}
              className="bg-brick text-cream font-narrow font-bold text-[14px] uppercase tracking-wide px-8 py-3.5 rounded-full hover:bg-brick-deep transition-colors shadow-hard-brick"
            >
              Book seat →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
