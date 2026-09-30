
import React, { useState, useEffect, useRef, useCallback } from 'react';

type Phase =
  | 'idle'       // Act 1 — waiting for click
  | 'scanning'   // Act 2 — seal flash + light beam + HUD
  | 'opening'    // Act 2 — doors swinging open
  | 'pushing'    // Act 3 — camera push through gap
  | 'signing'    // Act 3 — handwritten signature
  | 'done';

const SIGNATURE_TEXT = 'Innocent Ogembo';
const HUD_LINES = [
  'BIOMETRIC SCAN…',
  'CASE NO. KSUSA/2026/001',
  'IDENTITY VERIFIED',
  'ACCESS GRANTED',
];

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState<Phase>('idle');
  const [showSkip, setShowSkip] = useState(false);
  const [sealFlash, setSealFlash] = useState(false);
  const [sealStop, setSealStop] = useState(false);
  const [scanBeam, setScanBeam] = useState(false);
  const [hudLine, setHudLine] = useState(-1);
  const [glitch, setGlitch] = useState(false);
  const [caseVerified, setCaseVerified] = useState(false);
  const [doorOpen, setDoorOpen] = useState(0); // 0–100
  const [cameraPush, setCameraPush] = useState(false);
  const [signatureProgress, setSignatureProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [promptPulse, setPromptPulse] = useState(true);
  const doorAnimRef = useRef<number | null>(null);
  const sigIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Show skip after 1.5s
  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Prompt pulse flicker
  useEffect(() => {
    if (phase !== 'idle') return;
    const t = setInterval(() => setPromptPulse(p => !p), 900);
    return () => clearInterval(t);
  }, [phase]);

  const handleSkip = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 400);
  }, [onComplete]);

  const handleEnter = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('scanning');

    // Seal snaps + flashes
    setSealStop(true);
    setTimeout(() => setSealFlash(true), 80);
    setTimeout(() => setSealFlash(false), 400);

    // Light beam sweep
    setTimeout(() => setScanBeam(true), 300);
    setTimeout(() => setScanBeam(false), 1000);

    // HUD lines tick in
    HUD_LINES.forEach((_, i) => {
      setTimeout(() => setHudLine(i), 400 + i * 220);
    });

    // Case verified flash
    setTimeout(() => setCaseVerified(true), 400);
    setTimeout(() => setCaseVerified(false), 900);

    // Glitch flicker on text just before doors open
    setTimeout(() => setGlitch(true), 1100);
    setTimeout(() => setGlitch(false), 1250);

    // Start opening doors
    setTimeout(() => {
      setPhase('opening');
      let progress = 0;
      const animate = () => {
        progress += isMobile ? 2.2 : 1.8;
        setDoorOpen(Math.min(progress, 100));
        if (progress < 100) {
          doorAnimRef.current = requestAnimationFrame(animate);
        } else {
          // Camera push
          setTimeout(() => {
            setPhase('pushing');
            setCameraPush(true);
            // Signature fires
            setTimeout(() => {
              setPhase('signing');
              let sig = 0;
              sigIntervalRef.current = setInterval(() => {
                sig += 2;
                setSignatureProgress(Math.min(sig, 100));
                if (sig >= 100) {
                  if (sigIntervalRef.current) clearInterval(sigIntervalRef.current);
                  // Fade out
                  setTimeout(() => {
                    setVisible(false);
                    setTimeout(onComplete, 500);
                  }, 800);
                }
              }, 22);
            }, 400);
          }, 200);
        }
      };
      doorAnimRef.current = requestAnimationFrame(animate);
    }, 1300);
  }, [phase, isMobile, onComplete]);

  useEffect(() => {
    return () => {
      if (doorAnimRef.current) cancelAnimationFrame(doorAnimRef.current);
      if (sigIntervalRef.current) clearInterval(sigIntervalRef.current);
    };
  }, []);

  if (!visible) return null;

  // Door open angle/translate
  const leftDoorTransform = isMobile
    ? `translateX(-${doorOpen * 0.52}%)`
    : `perspective(900px) rotateY(${-doorOpen * 0.85}deg) translateX(-${doorOpen * 0.18}%)`;
  const rightDoorTransform = isMobile
    ? `translateX(${doorOpen * 0.52}%)`
    : `perspective(900px) rotateY(${doorOpen * 0.85}deg) translateX(${doorOpen * 0.18}%)`;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ background: '#050a14' }}
    >
      {/* Ember particle background (always visible behind doors) */}
      <EmberBackground />

      {/* ── DOORS ── */}
      <div
        className="absolute inset-0 flex"
        style={{
          transform: cameraPush ? 'scale(1.18)' : 'scale(1)',
          transition: cameraPush ? 'transform 1.2s cubic-bezier(0.22,1,0.36,1)' : 'none',
        }}
      >
        {/* Left door */}
        <div
          className="relative flex-1 origin-left"
          style={{
            transform: leftDoorTransform,
            transition: phase === 'opening' ? 'none' : undefined,
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
          }}
        >
          <DoorPanel side="left" open={doorOpen} />
        </div>

        {/* Right door */}
        <div
          className="relative flex-1 origin-right"
          style={{
            transform: rightDoorTransform,
            transition: phase === 'opening' ? 'none' : undefined,
            transformOrigin: 'right center',
            transformStyle: 'preserve-3d',
          }}
        >
          <DoorPanel side="right" open={doorOpen} />
        </div>

        {/* Glowing seam between doors */}
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: doorOpen > 2 ? `${Math.min(doorOpen * 8, 200)}px` : '3px',
            background: doorOpen > 2
              ? `radial-gradient(ellipse at center, rgba(220,38,38,0.95) 0%, rgba(220,38,38,0.6) 30%, rgba(239,68,68,0.2) 70%, transparent 100%)`
              : 'linear-gradient(180deg, transparent 0%, #dc2626 20%, #ef4444 50%, #dc2626 80%, transparent 100%)',
            boxShadow: doorOpen > 2
              ? '0 0 60px 20px rgba(220,38,38,0.5), 0 0 120px 40px rgba(220,38,38,0.2)'
              : '0 0 12px 3px rgba(220,38,38,0.8)',
            transition: 'width 0.05s linear, background 0.1s',
            zIndex: 10,
          }}
        />

        {/* Light beam scan */}
        {scanBeam && (
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20"
            style={{
              top: 0,
              width: '4px',
              height: '100%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(220,38,38,0.9) 40%, rgba(255,100,100,1) 50%, rgba(220,38,38,0.9) 60%, transparent 100%)',
              boxShadow: '0 0 20px 8px rgba(220,38,38,0.6)',
              animation: 'scanBeamDown 0.7s ease-in-out forwards',
            }}
          />
        )}
      </div>

      {/* ── SEAL ── */}
      <div
        className="absolute pointer-events-none z-30"
        style={{
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: doorOpen > 40 ? Math.max(0, 1 - (doorOpen - 40) / 40) : 1,
          transition: 'opacity 0.3s',
        }}
      >
        <HolographicSeal
          spinning={!sealStop}
          flash={sealFlash}
          size={isMobile ? 100 : 140}
        />
        {/* Case verified flash */}
        {caseVerified && (
          <div
            className="absolute left-1/2 -translate-x-1/2 mt-2 text-center whitespace-nowrap"
            style={{ top: '100%' }}
          >
            <span
              className="text-xs font-900 tracking-widest uppercase"
              style={{
                color: '#ef4444',
                fontFamily: 'monospace',
                textShadow: '0 0 12px rgba(239,68,68,0.9)',
                animation: 'flashPulse 0.4s ease-out',
              }}
            >
              CASE NO. 001 — VERIFIED
            </span>
          </div>
        )}
      </div>

      {/* ── HUD READOUT ── */}
      {hudLine >= 0 && doorOpen < 60 && (
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            bottom: '22%',
            left: '50%',
            transform: 'translateX(-50%)',
            minWidth: '260px',
            textAlign: 'center',
          }}
        >
          {HUD_LINES.slice(0, hudLine + 1).map((line, i) => (
            <div
              key={i}
              className="text-xs font-700 tracking-widest uppercase mb-1"
              style={{
                fontFamily: 'monospace',
                color: i === hudLine ? '#ef4444' : 'rgba(239,68,68,0.45)',
                textShadow: i === hudLine ? '0 0 10px rgba(239,68,68,0.8)' : 'none',
                animation: i === hudLine ? 'hudLineIn 0.18s ease-out' : 'none',
              }}
            >
              {line}
            </div>
          ))}
        </div>
      )}

      {/* ── ACT 1: ENTER PROMPT ── */}
      {phase === 'idle' && (
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[18%] z-40 pointer-events-none">
          <button
            onClick={handleEnter}
            className="pointer-events-auto relative group flex flex-col items-center gap-3 focus:outline-none"
            aria-label="Enter the court"
          >
            {/* Access prompt box */}
            <div
              className="px-8 py-4 border rounded-sm relative overflow-hidden"
              style={{
                borderColor: 'rgba(220,38,38,0.6)',
                background: 'rgba(5,10,20,0.85)',
                boxShadow: '0 0 24px rgba(220,38,38,0.25), inset 0 0 20px rgba(220,38,38,0.05)',
              }}
            >
              {/* Scan-line flicker overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
                  animation: 'scanlines 8s linear infinite',
                }}
              />
              <span
                className="relative z-10 text-sm md:text-base font-900 tracking-[0.35em] uppercase"
                style={{
                  fontFamily: 'monospace',
                  color: promptPulse ? '#ef4444' : 'rgba(239,68,68,0.55)',
                  textShadow: promptPulse ? '0 0 16px rgba(239,68,68,0.9)' : 'none',
                  transition: 'color 0.4s, text-shadow 0.4s',
                }}
              >
                ▶ ENTER THE COURT
              </span>
              {/* Corner accents */}
              <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-red-500/60" />
              <span className="absolute top-1 right-1 w-2 h-2 border-t border-r border-red-500/60" />
              <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-red-500/60" />
              <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-red-500/60" />
            </div>
            <span
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: 'monospace', color: 'rgba(239,68,68,0.4)' }}
            >
              CLICK TO AUTHENTICATE
            </span>
          </button>
        </div>
      )}

      {/* ── ACT 3: SIGNATURE ── */}
      {(phase === 'signing' || (phase === 'pushing' && cameraPush)) && signatureProgress > 0 && (
        <div
          className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          style={{ opacity: signatureProgress > 10 ? 1 : signatureProgress / 10 }}
        >
          <div className="text-center">
            <div
              className="text-xs font-700 tracking-widest uppercase mb-3"
              style={{
                fontFamily: 'monospace',
                color: 'rgba(239,68,68,0.7)',
                textShadow: '0 0 8px rgba(239,68,68,0.5)',
              }}
            >
              Filed for the record: September 2026
            </div>
            <div className="relative overflow-hidden inline-block">
              <span
                className="block text-5xl md:text-7xl"
                style={{
                  fontFamily: '"Dancing Script", cursive',
                  color: '#ffffff',
                  clipPath: `inset(0 ${100 - signatureProgress}% 0 0)`,
                  transition: 'clip-path 0.025s linear',
                  whiteSpace: 'nowrap',
                  textShadow: '0 0 30px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.8)',
                  letterSpacing: '0.02em',
                  lineHeight: 1.2,
                }}
              >
                {SIGNATURE_TEXT}
              </span>
              {/* Pen nib */}
              {phase === 'signing' && signatureProgress < 98 && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-80"
                  style={{ left: `${signatureProgress}%`, transition: 'left 0.025s linear' }}
                />
              )}
            </div>
            {/* Underline */}
            <div
              className="mt-2 h-px bg-white/30 origin-left"
              style={{
                transform: `scaleX(${signatureProgress / 100})`,
                transition: 'transform 0.025s linear',
              }}
            />
          </div>
        </div>
      )}

      {/* ── GLITCH overlay ── */}
      {glitch && (
        <div
          className="absolute inset-0 z-50 pointer-events-none"
          style={{
            background: 'rgba(220,38,38,0.06)',
            animation: 'glitchFlash 0.15s steps(2) forwards',
          }}
        />
      )}

      {/* ── SKIP BUTTON ── */}
      {showSkip && phase === 'idle' && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 text-xs tracking-widest uppercase transition-all duration-300 hover:opacity-100"
          style={{
            fontFamily: 'monospace',
            color: 'rgba(239,68,68,0.45)',
            animation: 'fadeInSlow 0.6s ease-out forwards',
          }}
          aria-label="Skip entrance"
        >
          Skip →
        </button>
      )}

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes sealSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sealFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scanBeamDown {
          0% { transform: translateX(-50%) translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(-50%) translateY(100vh); opacity: 0; }
        }
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }
        @keyframes flashPulse {
          0% { opacity: 0; transform: translateX(-50%) scale(0.9); }
          40% { opacity: 1; transform: translateX(-50%) scale(1.05); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        @keyframes hudLineIn {
          0% { opacity: 0; transform: translateX(-6px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes glitchFlash {
          0% { opacity: 1; transform: skewX(0deg); }
          33% { opacity: 0.7; transform: skewX(-1.5deg) translateX(2px); }
          66% { opacity: 1; transform: skewX(1deg) translateX(-2px); }
          100% { opacity: 0; transform: skewX(0deg); }
        }
        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes sealFlashAnim {
          0% { filter: brightness(1) drop-shadow(0 0 8px rgba(220,38,38,0.6)); }
          30% { filter: brightness(3) drop-shadow(0 0 30px rgba(220,38,38,1)); }
          60% { filter: brightness(2) drop-shadow(0 0 20px rgba(220,38,38,0.9)); }
          100% { filter: brightness(1) drop-shadow(0 0 8px rgba(220,38,38,0.6)); }
        }
        @keyframes emberFloat {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.7; }
          50% { transform: translateY(-60px) translateX(10px) scale(1.2); opacity: 1; }
          100% { transform: translateY(-120px) translateX(-5px) scale(0.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Door Panel ── */
function DoorPanel({ side, open }: { side: 'left' | 'right'; open: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: side === 'left' ?'linear-gradient(to right, #0a0f1a 0%, #111827 60%, #1a2035 100%)' :'linear-gradient(to left, #0a0f1a 0%, #111827 60%, #1a2035 100%)',
      }}
    >
      {/* Door panel insets */}
      <div className="absolute inset-4 border border-white/5 rounded-sm" />
      <div className="absolute inset-8 border border-white/3 rounded-sm" />

      {/* Vertical light strips (tech trim) */}
      {[0.15, 0.35, 0.65, 0.85].map((pos, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: `${pos * 100}%`,
            background: `linear-gradient(180deg, transparent 0%, rgba(220,38,38,${0.08 + i * 0.02}) 30%, rgba(220,38,38,${0.12 + i * 0.02}) 50%, rgba(220,38,38,${0.08 + i * 0.02}) 70%, transparent 100%)`,
          }}
        />
      ))}

      {/* Horizontal accent lines */}
      {[0.2, 0.5, 0.8].map((pos, i) => (
        <div
          key={i}
          className="absolute left-4 right-4 h-px"
          style={{
            top: `${pos * 100}%`,
            background: 'rgba(220,38,38,0.08)',
          }}
        />
      ))}

      {/* Edge glow (inner seam side) */}
      <div
        className="absolute top-0 bottom-0 w-8"
        style={{
          [side === 'left' ? 'right' : 'left']: 0,
          background: side === 'left' ?'linear-gradient(to left, rgba(220,38,38,0.25) 0%, transparent 100%)' :'linear-gradient(to right, rgba(220,38,38,0.25) 0%, transparent 100%)',
        }}
      />

      {/* Door handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-1 h-16 rounded-full"
        style={{
          [side === 'left' ? 'right' : 'left']: '12%',
          background: 'linear-gradient(180deg, rgba(220,38,38,0.6) 0%, rgba(220,38,38,0.3) 50%, rgba(220,38,38,0.6) 100%)',
          boxShadow: '0 0 8px rgba(220,38,38,0.4)',
          opacity: open > 30 ? Math.max(0, 1 - (open - 30) / 30) : 1,
        }}
      />
    </div>
  );
}

/* ── Holographic Seal ── */
function HolographicSeal({ spinning, flash, size }: { spinning: boolean; flash: boolean; size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        animation: flash ? 'sealFlashAnim 0.35s ease-out' : spinning ? undefined : 'none',
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid rgba(220,38,38,0.5)',
          boxShadow: '0 0 20px rgba(220,38,38,0.4), inset 0 0 20px rgba(220,38,38,0.1)',
          animation: spinning ? 'sealSpin 8s linear infinite' : 'none',
        }}
      />
      {/* Inner spinning ring */}
      <div
        style={{
          position: 'absolute',
          inset: size * 0.08,
          borderRadius: '50%',
          border: '1px solid rgba(220,38,38,0.3)',
          animation: spinning ? 'sealSpin 5s linear infinite reverse' : 'none',
        }}
      />
      {/* Tick marks */}
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1px',
            height: size * 0.08,
            background: i % 6 === 0 ? 'rgba(220,38,38,0.7)' : 'rgba(220,38,38,0.25)',
            transformOrigin: `0 ${-size * 0.42}px`,
            transform: `rotate(${i * 15}deg)`,
          }}
        />
      ))}
      {/* Center emblem */}
      <div
        style={{
          position: 'absolute',
          inset: size * 0.22,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, rgba(5,10,20,0.9) 100%)',
          border: '1px solid rgba(220,38,38,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <span style={{ fontSize: size * 0.14, color: 'rgba(220,38,38,0.9)', fontFamily: 'monospace', fontWeight: 900, lineHeight: 1 }}>⚖</span>
        <span style={{ fontSize: size * 0.07, color: 'rgba(220,38,38,0.6)', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1 }}>KSUSA</span>
      </div>
      {/* Float animation wrapper */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          animation: 'sealFloat 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

/* ── Ember Particle Background ── */
function EmberBackground() {
  const embers = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      size: 2 + Math.random() * 3,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {embers.current.map(e => (
        <div
          key={e.id}
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(239,68,68,0.9) 0%, rgba(220,38,38,0.4) 100%)`,
            boxShadow: '0 0 4px rgba(239,68,68,0.6)',
            animation: `emberFloat ${e.duration}s ${e.delay}s ease-out infinite`,
          }}
        />
      ))}
      {/* Ambient red glow at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(220,38,38,0.18) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
