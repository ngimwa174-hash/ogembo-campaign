import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from './AppImage';

const testimonials = [
{
  name: 'Dr.Charles Moitui',
  role: 'Faculty Advisor, School of Law',
  quote: 'Innocent is one of the most committed students I have encountered. His grasp of constitutional principles combined with his passion for student welfare makes him an ideal candidate for Congress.',
  initial: 'N'
},
{
  name: 'Braton Morara',
  role: '2nd Year LLB, Kisii University',
  quote: 'When I struggled in my first year, Innocent organized a peer tutoring group that saved my semester. That\'s the kind of Congress Person we need — someone who actually shows up.',
  initial: 'A'
}];


export default function AboutWhyRunningSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 blob-bg-navy opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-14 items-start">
          {/* Why Running */}
          <div className="lg:w-1/2 w-full">
            <div className="reveal-on-scroll mb-3">
              <span className="section-label">Why He&apos;s Running</span>
            </div>
            <h2 className="reveal-on-scroll text-3xl font-700 text-foreground tracking-tight mb-6">
              Not ambition — <span className="text-primary">purpose.</span>
            </h2>

            <div className="space-y-4 mb-8">
              {[
              {
                title: 'The Library Problem',
                body: 'Innocent spent countless late-night hours unable to access key legal databases. He knows firsthand that limited resources cost students their grades — and their futures.'
              },
              {
                title: 'Lack of Industry Exposure',
                body: 'Most Kisii Law students graduate without a single internship. Innocent wants to change that by building structured pipelines to law firms, courts, and legal NGOs.'
              },
              {
                title: 'Student Voice is Missing',
                body: 'Critical decisions affecting law students are made without their input. Innocent intends to ensure that the Student Congress becomes a real force in university governance.'
              }]?.map((r, i) =>
              <div
                key={r?.title}
                className="reveal-on-scroll border-l-4 border-accent pl-5 py-2"
                style={{ transitionDelay: `${i * 80}ms` }}>
                
                  <h3 className="font-700 text-foreground text-sm mb-1">{r?.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{r?.body}</p>
                </div>
              )}
            </div>

            <div className="reveal-on-scroll flex gap-3">
              <Link
                to="/agenda"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-700 text-primary-foreground bg-primary rounded-full hover:bg-secondary transition-all duration-300 uppercase tracking-wide">
                
                See His Solutions
              </Link>
            </div>
          </div>

          {/* Testimonials */}
          <div className="lg:w-1/2 w-full flex flex-col gap-5">
            <div className="reveal-on-scroll mb-2">
              <span className="section-label">What People Say</span>
            </div>
            {testimonials?.map((t, i) =>
            <div
              key={t?.name}
              className="reveal-on-scroll bg-card border border-border rounded-3xl p-7 card-hover"
              style={{ transitionDelay: `${i * 100}ms` }}>
              
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-800 text-lg">{t?.initial}</span>
                  </div>
                  <div>
                    <p className="font-700 text-foreground text-sm">{t?.name}</p>
                    <p className="text-muted-foreground text-xs mb-3 font-600">{t?.role}</p>
                    <p className="text-foreground/80 text-sm leading-relaxed italic">"{t?.quote}"</p>
                  </div>
                </div>
              </div>
            )}

            {/* Image */}
            <div className="reveal-on-scroll rounded-3xl overflow-hidden h-48 shadow-navy-md">
              <AppImage
                src="/images/innopic2.jpeg"
                alt="innocent for congress"
                width={800}
                height={300}
                className="w-full h-full object-cover object-center" />
              
            </div>
          </div>
        </div>
      </div>
    </section>);

}