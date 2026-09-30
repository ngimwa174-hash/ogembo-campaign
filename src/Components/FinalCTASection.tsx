import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from './AppImage';

export default function FinalCTASection() {
  return (
    <section className="relative py-24 overflow-hidden bg-primary">
      {/* Background image with scrim */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1aa383e41-1775825445533.png"
          alt="University campus at dusk, warm amber light on stone buildings, majestic academic atmosphere"
          fill
          className="object-cover object-center opacity-20"
          sizes="100vw" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary/90" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="reveal-on-scroll inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-accent/30 bg-accent/10">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
          <span className="text-xs font-700 tracking-widest text-accent uppercase">KSUSA Elections 2026</span>
        </div>

        <h2 className="reveal-on-scroll text-section-heading text-primary-foreground mb-4">
          The first step to a better
          <br />
          <span className="text-accent">Kisii Law School</span> starts here.
        </h2>

        <p className="reveal-on-scroll text-primary-foreground/70 text-xl mb-10 max-w-2xl mx-auto">
          Send your floor plan, join the movement, and help Innocent Ogembo bring real change to Kisii University School of Law.
        </p>

        <div className="reveal-on-scroll flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/agenda"
            className="inline-flex items-center justify-center px-10 py-5 text-base font-700 text-accent-foreground bg-accent rounded-full hover:bg-accent/90 transition-all shadow-gold-glow uppercase tracking-wide">
            
            Read His Full Agenda
          </Link>
        </div>

        <p className="reveal-on-scroll text-primary-foreground/40 text-sm mt-8 italic">
          "Justice for All, Excellence for Every Student"
        </p>
      </div>
    </section>);

}