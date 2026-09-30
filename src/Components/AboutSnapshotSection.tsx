import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from './AppImage';
import Icon from './AppIcon';

const values = [
{ icon: 'ScaleIcon', label: 'Constitutional Law', desc: 'Championing rights and due process for every student' },
{ icon: 'HeartIcon', label: 'Human Rights', desc: 'Advocating for dignity and fairness in student affairs' },
{ icon: 'UserGroupIcon', label: 'Student Welfare', desc: 'Mental health, housing, and bursary access for all' },
{ icon: 'StarIcon', label: 'Academic Excellence', desc: "Peer programs to help every law student reach their peak" }];


export default function AboutSnapshotSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-20 -left-20 w-80 h-80 blob-bg-navy pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section label */}
        <div className="reveal-on-scroll mb-4">
          <span className="section-label">About the Candidate</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-14 items-center">
          {/* Image Column */}
          <div className="reveal-on-scroll lg:w-5/12 w-full">
            <div className="relative">
              {/* Main photo */}
              <div className="rounded-4xl overflow-hidden aspect-[4/5] shadow-navy-lg">
               <AppImage
                  src="/images/innopic.jpeg"
                  alt="Innocent Ogembo, law student at Kisii University School of Law"
                  className="w-full h-full object-cover object-top"
                />
                
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-4 glass-card rounded-2xl px-5 py-4 shadow-navy-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <Icon name="StarIcon" size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-600 uppercase tracking-wide">Dean&apos;s List</p>
                    <p className="text-sm font-700 text-foreground">Academic Excellence</p>
                  </div>
                </div>
              </div>
              {/* Gold accent line */}
              <div className="absolute top-8 -left-3 w-1.5 h-24 bg-accent rounded-full" />
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:w-7/12 w-full flex flex-col justify-between">
            <div>
              <h2 className="reveal-on-scroll text-section-heading text-foreground mb-6">
                A voice for law students,{' '}
                <span className="text-primary">built in the classroom.</span>
              </h2>

              <p className="reveal-on-scroll text-muted-foreground text-lg leading-relaxed mb-6">
                Innocent Ogembo is a 2nd-year LLB student at Kisii University School of Law from Kisii County, Kenya. 
                He has spent every semester understanding the real challenges law students face — from inadequate library 
                resources to limited industry exposure — and he is ready to fight for change.
              </p>

              <p className="reveal-on-scroll text-muted-foreground leading-relaxed mb-8">
                As a Dean&apos;s List honoree, Innocent combines academic excellence with 
                community service as a Legal Aid Volunteer. His candidacy is rooted in one belief: that every law student 
                at Kisii deserves the tools, support, and opportunities to become an exceptional legal professional.
              </p>

              {/* Quote */}
              <div className="reveal-on-scroll border-l-4 border-accent pl-6 py-2 mb-10 bg-accent/5 rounded-r-xl">
                <p className="text-foreground font-600 italic text-lg">
                  "I'm not running for a title. I'm running because I know exactly what this school needs, 
                  and I have the drive to deliver it."
                </p>
                <p className="text-muted-foreground text-sm mt-2 font-600">— Innocent Ogembo</p>
              </div>
            </div>

            {/* Values Grid */}
            <div className="reveal-on-scroll grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {values.map((v, i) =>
              <div
                key={v.label}
                className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border card-hover"
                style={{ transitionDelay: `${i * 80}ms` }}>
                
                  <div className="policy-card-icon flex-shrink-0">
                    <Icon name={v.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-700 text-foreground mb-0.5">{v.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="reveal-on-scroll flex flex-col sm:flex-row gap-3">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-700 text-primary-foreground bg-primary rounded-full hover:bg-secondary transition-all duration-300 uppercase tracking-wide">
                
                Full Biography
                <Icon name="ArrowRightIcon" size={16} className="text-primary-foreground" />
              </Link>
              <Link
                to="/agenda"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-700 text-primary border border-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 uppercase tracking-wide">
                
                His Agenda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

}