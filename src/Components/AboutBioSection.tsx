import React from 'react';
import AppImage from './AppImage';
import { Link } from 'react-router-dom';
import Icon from './AppIcon';

export default function AboutBioSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-72 h-72 blob-bg opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-14 items-start">
          {/* Image */}
          <div className="reveal-on-scroll lg:w-5/12 w-full flex-shrink-0">
            <div className="relative">
              <div className="rounded-4xl overflow-hidden shadow-navy-lg aspect-[4/5]">
                <AppImage
                  src="/images/innopic.jpeg"
                  alt="Young Kenyan professional man in a suit, confident and approachable expression, warm studio lighting"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 42vw" />
                
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-5 py-4 shadow-navy-md max-w-52">
                <p className="text-xs text-muted-foreground font-600 uppercase tracking-wide mb-1">Campaign Slogan</p>
                <p className="text-sm font-700 text-foreground italic">
                  "Justice for All, Excellence for Every Student"
                </p>
              </div>
              {/* Accent bar */}
              <div className="absolute top-8 -right-3 w-1.5 h-24 bg-accent rounded-full" />
            </div>
          </div>

          {/* Bio Text */}
          <div className="lg:w-7/12 w-full">
            <div className="reveal-on-scroll mb-3">
              <span className="section-label">His Story</span>
            </div>
            <h2 className="reveal-on-scroll text-3xl font-700 text-foreground tracking-tight mb-6">
              From Kisii County to the halls of justice
            </h2>

            <div className="space-y-5">
              <p className="reveal-on-scroll text-muted-foreground leading-relaxed">
                Innocent Ogembo was born and raised in Kisii County, Kenya — a region known for its vibrant community 
                spirit and strong academic traditions. From a young age, Innocent was drawn to questions of fairness, 
                rights, and the power of law to transform lives. This passion led him to pursue an LLB at Kisii 
                University School of Law, where he is currently in his second year.
              </p>

              <p className="reveal-on-scroll text-muted-foreground leading-relaxed">
                At Kisii University, Innocent quickly distinguished himself. He earned a place on the Dean&apos;s List 
                in his first and second years, demonstrating the academic rigor that underpins his candidacy. He 
                represented the School of Law as Moot Court Champion in 2024, competing against teams from across 
                the country and bringing home recognition for Kisii University.
              </p>

              <p className="reveal-on-scroll text-muted-foreground leading-relaxed">
                Beyond academics, Innocent serves as a Legal Aid Volunteer, providing basic legal guidance to 
                community members who cannot afford professional counsel. This hands-on experience has deepened 
                his understanding of what justice truly means — and why student welfare, academic resources, and 
                professional development are not luxuries, but necessities for every law student.
              </p>

              <p className="reveal-on-scroll text-muted-foreground leading-relaxed">
                His areas of academic interest — Constitutional Law, Human Rights, and Public Interest Litigation — 
                reflect the kind of Congress Person he intends to be: principled, informed, and always fighting for 
                the rights of those he represents.
              </p>
            </div>

            {/* Personal Values */}
            <div className="reveal-on-scroll mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
              { label: 'Integrity', desc: 'Honest, transparent leadership' },
              { label: 'Commitment', desc: 'Delivers on every promise' },
              { label: 'Inclusion', desc: 'Every student has a voice' }]?.map((v) =>
              <div key={v?.label} className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                  <p className="font-700 text-primary text-sm mb-1">{v?.label}</p>
                  <p className="text-xs text-muted-foreground">{v?.desc}</p>
                </div>
              )}
            </div>

            <div className="reveal-on-scroll mt-8 flex gap-3">
              <Link
                to="/agenda"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-700 text-primary-foreground bg-primary rounded-full hover:bg-secondary transition-all duration-300 uppercase tracking-wide">
                His Agenda
                <Icon name="ArrowRightIcon" size={16} className="text-primary-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

}