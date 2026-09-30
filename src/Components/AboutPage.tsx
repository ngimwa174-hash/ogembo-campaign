import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AboutHeroSection from './AboutHeroSection';
import AboutBioSection from './AboutBioSection';
import AboutAchievementsSection from './AboutAchievementsSection';
import AboutWhyRunningSection from './AboutWhyRunningSection';
import ScrollRevealInit from './ScrollRevealInit';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutHeroSection />
      <AboutBioSection />
      <AboutAchievementsSection />
      <AboutWhyRunningSection />
      <Footer />
      <ScrollRevealInit />
    </main>
  );
}