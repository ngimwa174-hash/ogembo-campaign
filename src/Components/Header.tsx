
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppLogo from './AppLogo';
import Icon from './AppIcon';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Agenda', href: '/agenda' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-primary/95 backdrop-blur-md shadow-navy-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <AppLogo size={36} />
            <div className="flex flex-col">
              <span className="font-bold text-primary-foreground text-sm leading-tight tracking-tight">
                Ogembo
              </span>
              <span className="text-accent text-xs font-semibold tracking-widest uppercase leading-tight">
                For Congress
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link-underline text-sm font-600 transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-accent active' : 'text-primary-foreground/80 hover:text-primary-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/agenda"
              className="px-5 py-2 text-xs font-700 tracking-wide text-primary-foreground/80 hover:text-accent transition-colors duration-200 uppercase"
            >
              View Agenda
            </Link>
            <Link
              to="/about"
              className="px-5 py-2.5 text-xs font-700 tracking-wide text-accent-foreground bg-accent rounded-full hover:bg-accent/90 transition-all duration-200 uppercase shadow-gold-glow"
            >
              About Innocent
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-primary-foreground"
            aria-label="Open menu"
          >
            <Icon name="Bars3Icon" size={24} className="text-primary-foreground" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-400 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-primary/95 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`relative z-10 flex flex-col h-full px-6 py-8 transition-transform duration-400 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2.5">
              <AppLogo size={36} />
              <span className="font-bold text-primary-foreground text-sm">OgemboForCongress</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-primary-foreground"
              aria-label="Close menu"
            >
              <Icon name="XMarkIcon" size={24} className="text-primary-foreground" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-6 flex-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-3xl font-800 tracking-tight transition-colors duration-200 ${
                  isActive(link.href) ? 'text-accent' : 'text-primary-foreground hover:text-accent'
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div className="mt-auto pt-8 border-t border-primary-foreground/10">
            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center px-6 py-4 text-sm font-700 tracking-wide text-accent-foreground bg-accent rounded-full uppercase shadow-gold-glow"
            >
              About Innocent Ogembo
            </Link>
            <p className="text-center text-primary-foreground/50 text-xs mt-4">
              Justice for All, Excellence for Every Student
            </p>
          </div>
        </div>
      </div>
    </>
  );
}