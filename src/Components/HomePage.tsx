import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';
import AboutSnapshotSection from './AboutSnapshotSection';
import AgendaPreviewSection from './AgendaPreviewSection';
import DocketCountdown from './DocketCountdown';
import FinalCTASection from './FinalCTASection';
import CaseClosedFooter from './CaseClosedFooter';
import ScrollRevealInit from './ScrollRevealInit';
import SplashScreen from './SplashScreen';

const SESSION_KEY = 'court_entered';

export default function HomePage() {
  const [splashDone, setSplashDone] = useState(true); // default true to avoid flash

  useEffect(() => {
    // Only show splash once per session
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    if (!alreadySeen) {
      setSplashDone(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setSplashDone(true);
  };

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <main className={`min-h-screen bg-background transition-opacity duration-700 ${splashDone ? 'opacity-100' : 'opacity-0'}`}>
        <Header />
        <HeroSection />
        <AboutSnapshotSection />
        <AgendaPreviewSection />
        <DocketCountdown />
        <FinalCTASection />
        <CaseClosedFooter />
        <Footer />
        <ScrollRevealInit />
      </main>
    </>
  );
}
