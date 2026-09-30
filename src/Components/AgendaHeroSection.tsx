import React from 'react';
import AppImage from './AppImage';

export default function AgendaHeroSection() {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden bg-primary">
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1619771699034-fec6b1aabde3"
          alt="Rows of legal books on dark wood shelves in a law library, deep shadows, serious academic atmosphere"
          fill
          priority
          className="object-cover opacity-10"
          sizes="100vw" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-primary/98 to-secondary/90" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="reveal-on-scroll inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-accent/30 bg-accent/10">
            <span className="text-xs font-700 tracking-widest text-accent uppercase">8 Commitments · KSUSA 2026</span>
          </div>
          <h1 className="reveal-on-scroll text-section-heading text-primary-foreground mb-5">
            Innocent&apos;s Agenda for
            <br />
            <span className="text-accent">Kisii Law Students</span>
          </h1>
          <p className="reveal-on-scroll text-primary-foreground/70 text-lg leading-relaxed max-w-2xl">
            Eight concrete, actionable commitments — each rooted in the real challenges Kisii University 
            School of Law students face every day. Not promises, but a plan.
          </p>
        </div>
      </div>
    </section>);

}