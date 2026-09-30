import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AgendaHeroSection from './AgendaHeroSection';
import AgendaGridSection from './AgendaGridSection';
import AgendaCTASection from './AgendaCTASection';
import ScrollRevealInit from './ScrollRevealInit';

export default function AgendaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AgendaHeroSection />
      <AgendaGridSection />
      <AgendaCTASection />
      <Footer />
      <ScrollRevealInit />
    </main>
  );
}