import React from 'react';
import Icon from './AppIcon';

const policies = [
  {
    id: '01',
    icon: 'BookOpenIcon' as const,
    title: 'Improved Law Library Resources',
    tag: 'Academic',
    summary: 'Access to world-class legal databases and updated textbooks for every law student.',
    points: [
      'Negotiate institutional access to LexisNexis and Westlaw',
      'Advocate for updated legal textbooks in all core subjects',
      'Push for extended library hours: 6 AM – 11 PM daily',
      'Create a digital resource-sharing platform for lecture notes',
    ],
    featured: true,
  },
  {
    id: '02',
    icon: 'ScaleIcon' as const,
    title: 'Legal Aid Clinic',
    tag: 'Community',
    summary: 'A student-run legal aid clinic for real-world experience and community service.',
    points: [
      'Establish a certified legal aid clinic within the school',
      'Partner with Kisii County for community outreach',
      'Provide supervised practical experience for all years',
    ],
    featured: false,
  },
  {
    id: '03',
    icon: 'BriefcaseIcon' as const,
    title: 'Industry Connections',
    tag: 'Career',
    summary: 'Structured pathways to internships, law firms, and the judiciary.',
    points: [
      'Partner with 10+ law firms for structured internships',
      'Organize annual High Court and tribunal visits',
      'Create a LinkedIn-style law student professional network',
      'Host quarterly career fairs with legal employers',
    ],
    featured: false,
  },
  {
    id: '04',
    icon: 'HeartIcon' as const,
    title: 'Student Welfare',
    tag: 'Welfare',
    summary: 'Mental health, housing advocacy, and financial support for law students.',
    points: [
      'Establish a Law School mental health support group',
      'Advocate for affordable student accommodation',
      'Create an emergency bursary fund for law students',
      'Regular welfare check-ins and student feedback forums',
    ],
    featured: true,
  },
  {
    id: '05',
    icon: 'AcademicCapIcon' as const,
    title: 'Academic Excellence',
    tag: 'Academic',
    summary: 'Peer tutoring, study groups, and structured exam preparation.',
    points: [
      'Launch a peer tutoring program for every core subject',
      'Organize end-of-semester exam preparation bootcamps',
      'Create a past paper and study guide repository',
    ],
    featured: false,
  },
  {
    id: '06',
    icon: 'ComputerDesktopIcon' as const,
    title: 'Digital Learning',
    tag: 'Technology',
    summary: 'E-learning tools and online legal database access for all students.',
    points: [
      'Push for free student access to online legal databases',
      'Advocate for recorded lectures and digital study materials',
      'Create a law school student portal for resources and news',
    ],
    featured: false,
  },
  {
    id: '07',
    icon: 'MegaphoneIcon' as const,
    title: 'Student Voice',
    tag: 'Governance',
    summary: "Ensuring law students' concerns are heard at every level of university governance.",
    points: [
      'Attend all Senate and Faculty Board meetings as student rep',
      'Hold monthly open forums for law student feedback',
      'Publish monthly reports on advocacy outcomes',
      'Create a direct line between students and school leadership',
    ],
    featured: false,
  },
];

const tagColors: Record<string, string> = {
  Academic: 'bg-blue-50 text-blue-700 border-blue-100',
  Skills: 'bg-purple-50 text-purple-700 border-purple-100',
  Community: 'bg-green-50 text-green-700 border-green-100',
  Career: 'bg-orange-50 text-orange-700 border-orange-100',
  Welfare: 'bg-pink-50 text-pink-700 border-pink-100',
  Technology: 'bg-cyan-50 text-cyan-700 border-cyan-100',
  Governance: 'bg-accent/10 text-accent border-accent/20',
};

export default function AgendaGridSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-20 right-0 w-80 h-80 blob-bg opacity-50 pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 blob-bg-navy opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Layout (7 cards):
            lg (3-col):
              Row 1: [Library cs-2] [Legal Aid]
              Row 2: [Industry] [Welfare cs-2]
              Row 3: [Academic] [Digital cs-2]
              Row 4: [Student Voice cs-3]
            md (2-col): pairs, Student Voice full width
        */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 01 Library — featured, wide on desktop */}
          <div className="reveal-on-scroll lg:col-span-2 bg-primary rounded-4xl p-8 card-hover min-h-64 flex flex-col relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-accent/10 pointer-events-none" />
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-800 text-accent/60 font-mono">{policies[0].id}</span>
                  <div className="w-11 h-11 rounded-2xl bg-accent/20 flex items-center justify-center">
                    <Icon name={policies[0].icon} size={20} className="text-accent" />
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-700 border ${tagColors[policies[0].tag] || 'bg-accent/10 text-accent border-accent/20'}`}>
                  {policies[0].tag}
                </span>
              </div>
              <h3 className="text-xl font-700 text-primary-foreground mb-2">{policies[0].title}</h3>
              <p className="text-primary-foreground/60 text-sm mb-5">{policies[0].summary}</p>
              <ul className="space-y-2 mt-auto">
                {policies[0].points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-primary-foreground/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 02 Legal Aid */}
          <PolicyCard policy={policies[1]} delay={1} />

          {/* 03 Industry */}
          <PolicyCard policy={policies[2]} delay={2} />

          {/* 04 Welfare — featured, wide on desktop */}
          <div className="reveal-on-scroll lg:col-span-2 bg-accent/8 border border-accent/20 rounded-4xl p-7 card-hover min-h-64 flex flex-col">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-800 text-muted-foreground font-mono">{policies[3].id}</span>
                <div className="w-11 h-11 rounded-2xl bg-accent/15 flex items-center justify-center">
                  <Icon name={policies[3].icon} size={20} className="text-accent" />
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-700 border ${tagColors[policies[3].tag] || 'bg-muted text-muted-foreground border-border'}`}>
                {policies[3].tag}
              </span>
            </div>
            <h3 className="text-lg font-700 text-foreground mb-2">{policies[3].title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{policies[3].summary}</p>
            <ul className="space-y-2 mt-auto">
              {policies[3].points.map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-muted-foreground text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          {/* 05 Academic */}
          <PolicyCard policy={policies[4]} delay={1} />

          {/* 06 Digital — wide on desktop */}
          <PolicyCard policy={policies[5]} delay={2} className="lg:col-span-2" />

          {/* 07 Student Voice — full width */}
          <div className="reveal-on-scroll md:col-span-2 lg:col-span-3 bg-card border-2 border-primary/20 rounded-4xl p-8 card-hover">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs font-800 text-muted-foreground font-mono">{policies[6].id}</span>
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                  <Icon name={policies[6].icon} size={22} className="text-accent" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                  <h3 className="text-xl font-700 text-foreground">{policies[6].title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-700 border ${tagColors[policies[6].tag] || 'bg-muted text-muted-foreground border-border'}`}>
                    {policies[6].tag}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-5">{policies[6].summary}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {policies[6].points.map((pt) => (
                    <div key={pt} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {pt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PolicyCardProps {
  policy: typeof policies[0];
  delay: number;
  className?: string;
}

function PolicyCard({ policy, delay, className = '' }: PolicyCardProps) {
  const cardTagColors: Record<string, string> = {
    Academic: 'bg-blue-50 text-blue-700 border-blue-100',
    Skills: 'bg-purple-50 text-purple-700 border-purple-100',
    Community: 'bg-green-50 text-green-700 border-green-100',
    Career: 'bg-orange-50 text-orange-700 border-orange-100',
    Welfare: 'bg-pink-50 text-pink-700 border-pink-100',
    Technology: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    Governance: 'bg-amber-50 text-amber-700 border-amber-100',
  };

  return (
    <div
      className={`reveal-on-scroll bg-card border border-border rounded-4xl p-7 card-hover flex flex-col min-h-56 ${className}`}
      style={{ transitionDelay: `${delay * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-800 text-muted-foreground font-mono">{policy.id}</span>
          <div className="policy-card-icon">
            <Icon name={policy.icon} size={18} className="text-accent" />
          </div>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-700 border ${cardTagColors[policy.tag] || 'bg-muted text-muted-foreground border-border'}`}>
          {policy.tag}
        </span>
      </div>
      <h3 className="text-base font-700 text-foreground mb-2">{policy.title}</h3>
      <p className="text-muted-foreground text-sm mb-4 flex-1">{policy.summary}</p>
      <ul className="space-y-1.5 mt-auto">
        {policy.points.slice(0, 2).map((pt) => (
          <li key={pt} className="flex items-start gap-2 text-muted-foreground text-xs">
            <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}