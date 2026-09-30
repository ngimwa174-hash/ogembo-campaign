
import React, { useState, useEffect, useRef } from 'react';

const ELECTION_DATE = new Date('2026-10-16T08:00:00');

interface TimeUnit {
  value: number;
  label: string;
  key: string;
}

function getTimeLeft() {
  const now = new Date();
  const diff = ELECTION_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, totalMs: diff };
}

function getMilestone(days: number, hours: number): { label: string; active: boolean } | null {
  if (days === 0 && hours <= 24) return { label: '24 HOURS TO VERDICT', active: true };
  if (days <= 7 && days > 0) return { label: '1 WEEK TO VERDICT', active: true };
  if (days <= 30 && days > 7) return { label: '30 DAYS TO VERDICT', active: true };
  return null;
}

function DocketBox({ value, label, stamping }: { value: number; label: string; stamping: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative flex items-center justify-center transition-all duration-150 ${
          stamping ? 'scale-95 brightness-110' : 'scale-100'
        }`}
        style={{
          width: 'clamp(72px, 18vw, 110px)',
          height: 'clamp(72px, 18vw, 110px)',
          background: 'linear-gradient(135deg, #fefce8 0%, #fef9e7 100%)',
          border: '3px solid #1a237e',
          borderRadius: '4px',
          boxShadow: stamping
            ? '0 0 0 2px rgba(245,158,11,0.6), 4px 4px 0 #1a237e'
            : '4px 4px 0 #1a237e',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ink texture overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 30%, #1a237e 1px, transparent 1px)',
            backgroundSize: '4px 4px',
          }}
        />
        {/* Corner marks */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-blue-900/30" />
        <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-blue-900/30" />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-blue-900/30" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-blue-900/30" />

        <span
          className="relative z-10 font-900 tabular-nums"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            color: '#1a237e',
            fontFamily: '"Courier New", Courier, monospace',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {String(value).padStart(2, '0')}
        </span>

        {/* Stamp flicker overlay */}
        {stamping && (
          <div
            className="absolute inset-0 rounded-sm pointer-events-none"
            style={{ background: 'rgba(245,158,11,0.15)' }}
          />
        )}
      </div>
      <span
        className="mt-2 text-xs font-800 tracking-widest uppercase"
        style={{ color: '#1a237e', fontFamily: '"Courier New", Courier, monospace' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function DocketCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
  const [stamping, setStamping] = useState<Record<string, boolean>>({});
  const [showMilestone, setShowMilestone] = useState(false);
  const prevRef = useRef({ days: -1, hours: -1, minutes: -1, seconds: -1 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      const t = getTimeLeft();
      setTimeLeft(t);

      const prev = prevRef.current;
      const newStamping: Record<string, boolean> = {};

      if (prev.seconds !== t.seconds) newStamping.seconds = true;
      if (prev.minutes !== t.minutes) newStamping.minutes = true;
      if (prev.hours !== t.hours) newStamping.hours = true;
      if (prev.days !== t.days) newStamping.days = true;

      if (Object.keys(newStamping).length > 0) {
        setStamping(newStamping);
        setTimeout(() => setStamping({}), 200);
      }

      prevRef.current = { days: t.days, hours: t.hours, minutes: t.minutes, seconds: t.seconds };
    }, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  // Milestone pulse
  useEffect(() => {
    if (!mounted) return;
    const milestone = getMilestone(timeLeft.days, timeLeft.hours);
    if (milestone?.active) {
      setShowMilestone(true);
    }
  }, [timeLeft.days, timeLeft.hours, mounted]);

  // Progress bar: from campaign start (Sep 1) to Oct 16
  const campaignStart = new Date('2026-09-01T00:00:00').getTime();
  const campaignEnd = ELECTION_DATE.getTime();
  const now = mounted ? Date.now() : campaignStart;
  const progressPct = Math.min(100, Math.max(0, ((now - campaignStart) / (campaignEnd - campaignStart)) * 100));

  const milestone = mounted ? getMilestone(timeLeft.days, timeLeft.hours) : null;

  const units: TimeUnit[] = [
    { value: timeLeft.days, label: 'Days', key: 'days' },
    { value: timeLeft.hours, label: 'Hours', key: 'hours' },
    { value: timeLeft.minutes, label: 'Min', key: 'minutes' },
    { value: timeLeft.seconds, label: 'Sec', key: 'seconds' },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute -top-20 -right-20 w-80 h-80 blob-bg opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section label */}
        <div className="reveal-on-scroll text-center mb-3">
          <span className="section-label">Election Day Countdown</span>
        </div>

        {/* Docket header */}
        <div className="reveal-on-scroll text-center mb-10">
          <h2 className="text-section-heading text-foreground mb-2">
            Time Until <span className="text-primary">Verdict Day</span>
          </h2>
          <p className="text-muted-foreground text-base">
            October 16, 2026 · KSUSA Congress Person Election
          </p>
        </div>

        {/* Milestone ribbon */}
        {showMilestone && milestone && (
          <div
            className="reveal-on-scroll flex justify-center mb-8"
            style={{ animation: 'milestoneRibbon 0.5s cubic-bezier(0.16,1,0.3,1) forwards' }}
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-sm font-800 text-sm tracking-widest uppercase"
              style={{
                background: '#dc2626',
                color: '#fff',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                fontFamily: '"Courier New", Courier, monospace',
                animation: 'milestonePulse 1.5s ease-in-out infinite',
              }}
            >
              <span>⚖</span>
              <span>{milestone.label}</span>
              <span>⚖</span>
            </div>
          </div>
        )}

        {/* Docket boxes */}
        <div className="reveal-on-scroll flex items-center justify-center gap-4 md:gap-8 mb-10">
          {units.map((unit, i) => (
            <React.Fragment key={unit.key}>
              <DocketBox
                value={unit.value}
                label={unit.label}
                stamping={!!stamping[unit.key]}
              />
              {i < units.length - 1 && (
                <span
                  className="text-3xl font-900 pb-6 select-none"
                  style={{ color: '#1a237e', fontFamily: '"Courier New", Courier, monospace' }}
                >
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Redaction progress bar */}
        <div className="reveal-on-scroll max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-700 tracking-widest uppercase text-muted-foreground" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
              Campaign Progress
            </span>
            <span className="text-xs font-700 tracking-widest uppercase text-muted-foreground" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
              {Math.round(progressPct)}%
            </span>
          </div>
          <div
            className="relative h-5 rounded-sm overflow-hidden"
            style={{
              background: '#e2e8f0',
              border: '2px solid #1a237e',
              boxShadow: '2px 2px 0 #1a237e',
            }}
          >
            {/* Redaction bar fill */}
            <div
              className="absolute inset-y-0 left-0 transition-all duration-1000"
              style={{
                width: `${progressPct}%`,
                background: 'repeating-linear-gradient(90deg, #1a237e 0px, #1a237e 18px, #0f172a 18px, #0f172a 20px)',
              }}
            />
            {/* Redaction bar label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-xs font-800 tracking-widest uppercase mix-blend-difference"
                style={{ color: '#fff', fontFamily: '"Courier New", Courier, monospace', fontSize: '10px' }}
              >
                ██ CASE IN PROGRESS ██
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-muted-foreground" style={{ fontFamily: '"Courier New", Courier, monospace' }}>Sep 1</span>
            <span className="text-xs text-muted-foreground" style={{ fontFamily: '"Courier New", Courier, monospace' }}>Oct 16</span>
          </div>
        </div>
      </div>
    </section>
  );
}
