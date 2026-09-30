import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './AppIcon';

const previewPolicies = [
  {
    icon: 'BookOpenIcon' as const,
    title: 'Law Library Resources',
    desc: 'Access to LexisNexis, Westlaw, and updated legal textbooks. Extended library hours during exam periods.',
    tag: 'Academic',
    accent: true,
  },
  {
    icon: 'TrophyIcon' as const,
    title: 'Moot Court & Competitions',
    desc: 'Organize inter-university moot court competitions and national debate forums for practical legal skills.',
    tag: 'Skills',
    accent: false,
  },
  {
    icon: 'ScaleIcon' as const,
    title: 'Student Legal Aid Clinic',
    desc: 'Establish a student-run legal aid clinic serving the Kisii community — real experience, real impact.',
    tag: 'Community',
    accent: false,
  },
  {
    icon: 'BriefcaseIcon' as const,
    title: 'Industry Connections',
    desc: 'Structured internship placements with top law firms, the High Court, and legal NGOs across Kenya.',
    tag: 'Career',
    accent: false,
  },
];

export default function AgendaPreviewSection() {
  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      <div className="absolute -bottom-20 -right-20 w-96 h-96 blob-bg pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="reveal-on-scroll mb-3">
              <span className="section-label">Campaign Agenda</span>
            </div>
            <h2 className="reveal-on-scroll text-section-heading text-foreground max-w-xl">
              8 commitments for{' '}
              <span className="text-primary">Kisii Law students</span>
            </h2>
          </div>
          <Link
            to="/agenda"
            className="reveal-on-scroll inline-flex items-center gap-2 text-sm font-700 text-primary hover:text-secondary transition-colors uppercase tracking-wide"
          >
            View Full Agenda
            <Icon name="ArrowRightIcon" size={16} className="text-current" />
          </Link>
        </div>

        {/* BENTO GRID AUDIT:
            Array has 4 cards: [Library, Moot Court, Legal Aid, Industry]
            Row 1: [col-1: Library cs-2 rs-1] [col-3: Moot Court cs-1]
            Row 2: [col-1: Legal Aid cs-1] [col-2: Industry cs-2]
            Placed 4/4 cards ✓
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 0 — Library: col-span-2 */}
          <div
            className="reveal-on-scroll md:col-span-2 bg-primary rounded-4xl p-8 card-hover flex flex-col justify-between min-h-56 relative overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-accent/10" />
            <div className="absolute -bottom-6 right-12 w-24 h-24 rounded-full bg-primary-foreground/5" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <Icon name={previewPolicies[0].icon} size={22} className="text-accent" />
                </div>
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-700 uppercase tracking-wide">
                  {previewPolicies[0].tag}
                </span>
              </div>
              <h3 className="text-xl font-700 text-primary-foreground mb-3">{previewPolicies[0].title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">{previewPolicies[0].desc}</p>
            </div>
          </div>

          {/* Card 1 — Moot Court: col-span-1 */}
          <div
            className="reveal-on-scroll reveal-delay-1 bg-card border border-border rounded-4xl p-7 card-hover flex flex-col justify-between min-h-56"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="policy-card-icon">
                <Icon name={previewPolicies[1].icon} size={20} className="text-accent" />
              </div>
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-700 uppercase tracking-wide">
                {previewPolicies[1].tag}
              </span>
            </div>
            <div>
              <h3 className="text-base font-700 text-foreground mb-2">{previewPolicies[1].title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{previewPolicies[1].desc}</p>
            </div>
          </div>

          {/* Card 2 — Legal Aid: col-span-1 */}
          <div
            className="reveal-on-scroll reveal-delay-2 bg-card border border-border rounded-4xl p-7 card-hover flex flex-col justify-between min-h-56"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="policy-card-icon">
                <Icon name={previewPolicies[2].icon} size={20} className="text-accent" />
              </div>
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-700 uppercase tracking-wide">
                {previewPolicies[2].tag}
              </span>
            </div>
            <div>
              <h3 className="text-base font-700 text-foreground mb-2">{previewPolicies[2].title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{previewPolicies[2].desc}</p>
            </div>
          </div>

          {/* Card 3 — Industry: col-span-2 */}
          <div
            className="reveal-on-scroll reveal-delay-3 md:col-span-2 bg-accent/8 border border-accent/20 rounded-4xl p-7 card-hover flex flex-col justify-between min-h-56"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center">
                <Icon name={previewPolicies[3].icon} size={22} className="text-accent" />
              </div>
              <span className="px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-700 uppercase tracking-wide">
                {previewPolicies[3].tag}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-700 text-foreground mb-2">{previewPolicies[3].title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{previewPolicies[3].desc}</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="reveal-on-scroll text-center mt-10">
          <Link
            to="/agenda"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-700 text-primary-foreground bg-primary rounded-full hover:bg-secondary transition-all duration-300 uppercase tracking-wide shadow-navy-md"
          >
            <Icon name="DocumentTextIcon" size={18} className="text-primary-foreground" />
            See All 8 Agenda Items
          </Link>
        </div>
      </div>
    </section>
  );
}