
import React, { useState, useEffect, useRef } from 'react';

export default function CaseClosedFooter() {
  const [stamped, setStamped] = useState(false);
  const [stampProgress, setStampProgress] = useState(0); // 0 = ghost, 100 = solid
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            setStamped(true);
          }
        });
      },
      { threshold: 0.8 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (!stamped) return;
    let p = 0;
    const interval = setInterval(() => {
      p += 4;
      setStampProgress(Math.min(100, p));
      if (p >= 100) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [stamped]);

  const opacity = stampProgress / 100;
  const scale = 0.85 + (stampProgress / 100) * 0.15;

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-background relative overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Stamp container */}
        <div
          className="inline-block relative mb-8"
          style={{
            transform: `scale(${scale}) rotate(-4deg)`,
            opacity: stampProgress > 0 ? Math.max(0.08, opacity) : 0.08,
            transition: stamped ? 'none' : 'opacity 0.3s',
          }}
        >
          {/* Outer stamp ring */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width: 'clamp(200px, 50vw, 280px)',
              height: 'clamp(200px, 50vw, 280px)',
              borderRadius: '50%',
              border: `6px solid rgba(26,35,126,${Math.max(0.12, opacity)})`,
              boxShadow: `0 0 0 3px rgba(26,35,126,${Math.max(0.06, opacity * 0.4)})`,
            }}
          >
            {/* Inner ring */}
            <div
              className="absolute"
              style={{
                inset: '12px',
                borderRadius: '50%',
                border: `3px solid rgba(26,35,126,${Math.max(0.08, opacity * 0.7)})`,
              }}
            />

            {/* Circular text top */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 280 280"
              style={{ opacity: Math.max(0.1, opacity) }}
            >
              <defs>
                <path id="topArc" d="M 50,140 A 90,90 0 0,1 230,140" />
                <path id="bottomArc" d="M 230,140 A 90,90 0 0,1 50,140" />
              </defs>
              <text
                style={{
                  fontFamily: '"Courier New", Courier, monospace',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  fill: `rgba(26,35,126,${Math.max(0.15, opacity)})`,
                  textTransform: 'uppercase',
                }}
              >
                <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                  KISII UNIVERSITY · SCHOOL OF LAW
                </textPath>
              </text>
              <text
                style={{
                  fontFamily: '"Courier New", Courier, monospace',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  fill: `rgba(26,35,126,${Math.max(0.15, opacity)})`,
                  textTransform: 'uppercase',
                }}
              >
                <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
                  KSUSA ELECTIONS · 2026
                </textPath>
              </text>
            </svg>

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-1 px-6">
              <span
                className="text-xs font-800 tracking-widest uppercase"
                style={{
                  fontFamily: '"Courier New", Courier, monospace',
                  color: `rgba(26,35,126,${Math.max(0.12, opacity)})`,
                }}
              >
                CASE
              </span>
              <span
                className="font-900 tracking-tight leading-none"
                style={{
                  fontFamily: '"Courier New", Courier, monospace',
                  fontSize: 'clamp(2rem, 6vw, 2.8rem)',
                  color: `rgba(26,35,126,${Math.max(0.12, opacity)})`,
                }}
              >
                CLOSED
              </span>
              <div
                className="w-full h-0.5 my-1"
                style={{ background: `rgba(26,35,126,${Math.max(0.1, opacity * 0.5)})` }}
              />
              <span
                className="text-xs font-700 tracking-widest uppercase"
                style={{
                  fontFamily: '"Courier New", Courier, monospace',
                  color: `rgba(26,35,126,${Math.max(0.1, opacity)})`,
                }}
              >
                OCT 16, 2026
              </span>
            </div>
          </div>
        </div>

        {/* Handwritten annotation */}
        <div
          className="mt-4 transition-all duration-700"
          style={{
            opacity: stampProgress > 60 ? (stampProgress - 60) / 40 : 0,
            transform: `translateY(${stampProgress > 60 ? 0 : 12}px)`,
          }}
        >
          <p
            className="text-xl md:text-2xl"
            style={{
              fontFamily: 'var(--font-handwriting), "Dancing Script", cursive',
              color: '#1a237e',
              letterSpacing: '0.02em',
            }}
          >
            Filed by students, for students
          </p>
          <div
            className="mx-auto mt-1 h-px w-48"
            style={{ background: 'rgba(26,35,126,0.2)' }}
          />
        </div>

        {/* Scroll hint when not yet stamped */}
        {!stamped && (
          <p className="mt-8 text-xs text-muted-foreground tracking-widest uppercase animate-pulse">
            Scroll to seal the record
          </p>
        )}
      </div>
    </section>
  );
}
