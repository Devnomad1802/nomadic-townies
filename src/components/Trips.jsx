import { useState } from 'react';
import { useTrips, urlFor } from '../data/trips';
import { MapPin, Clock, CalendarDays, Loader2 } from 'lucide-react';

const FILTERS = ['All', 'India', 'International'];

export default function Trips({ onBook }) {
  const [filter, setFilter] = useState('All');
  const { trips, loading, error } = useTrips();

  const filtered = filter === 'All' ? trips : trips.filter((t) => t.region === filter);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[400px] text-ink/40">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p className="font-narrow font-bold uppercase tracking-widest text-[11px]">Syncing with basecamp...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 px-8">
        <h3 className="font-hand text-3xl text-brick mb-4">something went wrong.</h3>
        <p className="text-ink/60">We couldn't load the cohorts. Please try refreshing.</p>
      </div>
    );
  }

  return (
    <section id="trips" className="max-w-[1280px] mx-auto px-5 lg:px-8 py-20 lg:py-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
        <div>
          <p className="font-narrow font-bold text-[12px] uppercase tracking-[0.2em] text-brick mb-3">
            Upcoming Cohorts
          </p>
          <h2 className="font-hand text-4xl lg:text-6xl leading-[0.95]">
            pick your next<br />
            <span className="font-script italic text-brick">adventure.</span>
          </h2>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 doodle-border bg-cream p-1.5 self-start sm:self-auto">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-narrow font-bold text-[13px] uppercase tracking-wide px-4 py-2 rounded-xl transition-colors ${
                filter === f
                  ? 'bg-ink text-cream'
                  : 'text-ink/60 hover:text-ink'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Trip grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((trip) => (
          <article
            key={trip.slug.current}
            className="group doodle-border bg-cream overflow-hidden hover:shadow-hard hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            onClick={() => onBook(trip)}
          >
            {/* Image */}
            <div className="relative overflow-hidden border-b-2 border-ink">
              {trip.img && (
                <img
                  src={urlFor(trip.img).width(900).url()}
                  alt={trip.name}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
              {/* Tag */}
              <span
                className="absolute top-3 left-3 bg-cream border-2 border-ink rounded-full px-3 py-1 font-narrow font-bold text-[11px] uppercase tracking-wider"
                style={{ color: trip.tagColor || '#D44424' }}
              >
                {trip.tag}
              </span>
              {/* Seats pill */}
              <span className="absolute top-3 right-3 bg-ink text-cream rounded-full px-3 py-1 font-narrow font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sun animate-pulse-dot" />
                {trip.seatsLeft} seats left
              </span>
            </div>

            {/* Body */}
            <div className="p-5">
              {/* Meta */}
              <div className="flex items-center gap-3 text-[12px] font-narrow font-semibold text-ink/50 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {trip.loc}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {trip.duration}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-hand text-2xl leading-tight mb-2">{trip.name}</h3>

              {/* Pitch */}
              <p className="text-ink/60 text-sm leading-relaxed mb-3 line-clamp-2">{trip.pitch}</p>

              {/* Departure */}
              <p className="font-marker text-ink/50 text-sm mb-4 flex items-center gap-1.5">
                <CalendarDays size={13} />
                Departs {trip.departureDate}
              </p>

              {/* Footer */}
              <div className="border-t-2 border-dashed border-ink/15 pt-4 flex items-center justify-between">
                <div>
                  <span className="font-hand text-2xl text-brick">₹{trip.price?.toLocaleString('en-IN')}</span>
                  {trip.originalPrice && (
                    <span className="text-ink/40 text-sm line-through ml-2">
                      ₹{trip.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBook(trip);
                  }}
                  className="font-narrow font-bold text-[12px] uppercase tracking-wide text-brick hover:text-brick-deep transition-colors"
                >
                  Details + Book →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

