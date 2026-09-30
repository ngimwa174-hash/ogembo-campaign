import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from './AppImage';
import Icon from './AppIcon';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_12eb2b27e-1772084510897.png"
          alt="University law library with rows of legal books, warm lighting, dark wood shelves, serious academic atmosphere"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw" />
        
        {/* Scrim: dark navy from left, fades right */}
        <div className="absolute inset-0 hero-scrim" />
        {/* Extra bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Atmospheric blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 blob-bg opacity-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-28 pb-40 md:pb-48">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="reveal-on-scroll inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
            <span className="text-xs font-700 tracking-widest text-accent uppercase">
              KSUSA Elections 2026 · School of Law
            </span>
          </div>

          {/* Headline */}
          <h1 className="reveal-on-scroll reveal-delay-1 text-hero-display text-primary-foreground mb-2 leading-none">
            <span className="text-outline-navy" style={{ WebkitTextStroke: '2px rgba(245,158,11,0.7)', color: 'transparent' }}>
              Innocent
            </span>
          </h1>
          <h1 className="reveal-on-scroll reveal-delay-2 text-hero-display text-primary-foreground mb-6 leading-none">
            Ogembo
          </h1>

          {/* Position */}
          <p className="reveal-on-scroll reveal-delay-3 text-accent font-700 text-lg md:text-xl tracking-wide uppercase mb-4">
            Congress Person Candidate · Kisii University School of Law
          </p>

          {/* Slogan */}
          <p className="reveal-on-scroll reveal-delay-4 text-primary-foreground/80 text-xl md:text-2xl font-400 leading-relaxed mb-10 max-w-xl italic">
            "Justice for All, Excellence for Every Student"
          </p>

          {/* CTAs */}
          <div className="reveal-on-scroll flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              to="/agenda"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-700 tracking-wide text-primary-foreground bg-transparent border border-primary-foreground/40 rounded-full hover:bg-primary-foreground/10 transition-all duration-300 uppercase">
              <Icon name="DocumentTextIcon" size={18} className="text-primary-foreground" />
              Read His Agenda
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-700 tracking-wide text-accent border border-accent/40 rounded-full hover:bg-accent/10 transition-all duration-300 uppercase">
              <Icon name="UserIcon" size={18} className="text-accent" />
              About Innocent
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Stats Strip */}
      <div className="absolute bottom-8 left-4 right-4 sm:left-6 sm:right-6 md:left-12 md:right-auto md:w-auto z-20">
        <div className="glass-card rounded-2xl shadow-navy-lg px-6 py-5 flex flex-col sm:flex-row gap-5 sm:gap-8 items-start sm:items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Icon name="AcademicCapIcon" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-600">Year of Study</p>
              <p className="text-sm font-700 text-foreground">2nd Year · LLB</p>
            </div>
          </div>
          <div className="stat-divider hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Icon name="TrophyIcon" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-600">Achievement</p>
              <p className="text-sm font-700 text-foreground">Moot Court Champion 2024</p>
            </div>
          </div>
          <div className="stat-divider hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Icon name="MapPinIcon" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-600">From</p>
              <p className="text-sm font-700 text-foreground">Kisii County, Kenya</p>
            </div>
          </div>
          <div className="stat-divider hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Icon name="ScaleIcon" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-600">Focus</p>
              <p className="text-sm font-700 text-foreground">Constitutional Law</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}