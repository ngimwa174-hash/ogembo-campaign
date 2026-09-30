import React from 'react';
import AppImage from './AppImage';

export default function AboutHeroSection() {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden bg-primary">
      {/* Background texture */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1e7f3d2ed-1774276080657.png"
          alt="Dark law office desk with legal books and papers, dim lighting, serious professional atmosphere"
          fill
          priority
          className="object-cover opacity-10"
          sizes="100vw" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary" />
      </div>

      {/* Decorative */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-accent/8 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-end gap-10">
          <div className="flex-1">
            <div className="reveal-on-scroll inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-accent/30 bg-accent/10">
              <span className="text-xs font-700 tracking-widest text-accent uppercase">About the Candidate</span>
            </div>
            <h1 className="reveal-on-scroll text-section-heading text-primary-foreground mb-4">
              Meet Innocent<br />
              <span className="text-accent">Ogembo</span>
            </h1>
            <p className="reveal-on-scroll text-primary-foreground/70 text-lg max-w-lg leading-relaxed">
              A 2nd-year LLB student, moot court champion, and dedicated advocate for Kisii University School of Law students.
            </p>
          </div>
          {/* Stats */}
          <div className="reveal-on-scroll flex flex-row md:flex-col gap-4 flex-shrink-0">
            {[
            { label: 'Year', value: '2nd LLB' },
            { label: 'GPA', value: "Dean's List" },
            { label: 'Origin', value: 'Kisii County' }]?.map((s) =>
            <div key={s?.label} className="text-center px-5 py-4 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10">
                <p className="text-accent font-800 text-lg">{s?.value}</p>
                <p className="text-primary-foreground/50 text-xs uppercase tracking-wide">{s?.label}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}