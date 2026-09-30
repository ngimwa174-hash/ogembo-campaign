
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLogo from './AppLogo';

export default function Footer() {
  const [year, setYear] = useState('2026');

  useEffect(() => {
    setYear(new Date()?.getFullYear()?.toString());
  }, []);

  return (
    <footer className="bg-primary border-t border-primary-foreground/10 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Logo + tagline */}
          <div className="flex items-center gap-3">
            <AppLogo size={36} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary-foreground text-sm">OgemboForCongress</span>
              </div>
              <p className="text-accent text-xs font-medium mt-0.5 italic">
                Justice for All, Excellence for Every Student
              </p>
            </div>
          </div>

          {/* Center: Nav Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-medium transition-colors">About</Link>
            <Link to="/agenda" className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-medium transition-colors">Agenda</Link>
          </nav>

          {/* Right: Campaign info */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
            <span className="text-primary-foreground/50 text-xs uppercase tracking-widest">KSUSA Elections 2026</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-primary-foreground/40 text-sm">
            © {year} OgemboForCongress. Kisii University School of Law.
          </p>
          <p className="text-primary-foreground/30 text-xs">
            Student Campaign · KSUSA Elections
          </p>
        </div>
      </div>
    </footer>
  );
}