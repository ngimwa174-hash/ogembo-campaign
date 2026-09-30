import React from 'react';
import { Link } from 'react-router-dom';

export default function AgendaCTASection() {
  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 blob-bg opacity-60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="reveal-on-scroll mb-3">
          <span className="section-label">Take Action</span>
        </div>
        <h2 className="reveal-on-scroll text-section-heading text-foreground mb-5">
          These 8 commitments need <span className="text-primary">your vote</span> to become reality.
        </h2>
        <p className="reveal-on-scroll text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
          Innocent Ogembo has the vision, the track record, and the determination. 
          Help him carry these commitments to the Kisii University Student Congress.
        </p>

        <div className="reveal-on-scroll flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-700 text-primary-foreground bg-primary rounded-full hover:bg-secondary transition-all duration-300 uppercase tracking-wide shadow-navy-md"
          >
            Learn About Innocent
          </Link>
        </div>

        {/* Quote */}
        <div className="reveal-on-scroll mt-12 max-w-2xl mx-auto border-l-4 border-accent pl-6 py-2 text-left bg-card rounded-r-2xl">
          <p className="text-foreground font-600 italic">
            "Every one of these eight points is something I have personally experienced as a challenge at this school. 
            I am running because I know exactly what needs to change — and I know how to make it happen."
          </p>
          <p className="text-muted-foreground text-sm mt-2 font-600">— Innocent Ogembo, Congress Person Candidate</p>
        </div>
      </div>
    </section>
  );
}