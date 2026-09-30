import React from 'react';
import Icon from './AppIcon';

const achievements = [
  {
    icon: 'TrophyIcon' as const,
    year: '2024',
    title: 'Moot Court Participant',
    desc: 'Participated in the inter-university moot court competition, representing Kisii University School of Law .',
    badge: 'Competition',
  },
  {
    icon: 'StarIcon' as const,
    year: '2022–2025',
    title: "Dean's List",
    desc: 'Consistently maintained a GPA placing him in the top 10% of his class across all two years of study.',
    badge: 'Academic',
  },
  {
    icon: 'HeartIcon' as const,
    year: '2023–Present',
    title: 'Legal Aid Volunteer',
    desc: 'Active volunteer at the Kisii Community Legal Aid Centre, assisting over 40 community members with legal guidance.',
    badge: 'Community',
  },
 

];

export default function AboutAchievementsSection() {
  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      <div className="absolute -top-10 right-10 w-64 h-64 blob-bg-navy opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="reveal-on-scroll mb-3">
              <span className="section-label">Track Record</span>
            </div>
            <h2 className="reveal-on-scroll text-section-heading text-foreground">
              Achievements that <span className="text-primary">speak for themselves</span>
            </h2>
          </div>
          <p className="reveal-on-scroll text-muted-foreground max-w-sm text-sm leading-relaxed">
            Innocent doesn&apos;t just talk about excellence — he demonstrates it every semester.
          </p>
        </div>

        <div className="space-y-5">
          {achievements.map((a, i) => (
            <div
              key={a.title}
              className="reveal-on-scroll bg-card border border-border rounded-3xl p-6 md:p-8 card-hover flex flex-col md:flex-row md:items-center gap-5"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Year */}
              <div className="md:w-28 flex-shrink-0">
                <span className="text-xs font-700 text-muted-foreground uppercase tracking-widest">{a.year}</span>
              </div>
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                <Icon name={a.icon} size={22} className="text-accent" />
              </div>
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-lg font-700 text-foreground">{a.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-700">{a.badge}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}