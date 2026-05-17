'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts';
import styles from './FacialAnalysis.module.scss';

const USER_DENSITY = 76; // user's position on 0–100 density scale

const densityData = Array.from({ length: 101 }, (_, x) => {
  const mean = 44;
  const std = 17;
  const y = Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
  const v = Math.round(y * 1000) / 1000;
  return { x, curve: v, tail: x >= USER_DENSITY ? v : undefined };
});

// Active dot positions (row 0-4, col 0-4) shared across all quadrants
const ACTIVE_LOCAL = new Set([
  '0,2',
  '1,1', '1,2', '1,3',
  '2,0', '2,1', '2,2', '2,3', '2,4',
  '3,1', '3,2', '3,3',
  '4,2',
]);

const SYMMETRY_LINES = [
  { label: 'Ideal',   top: '25%', dashed: false, justify: 'flex-end' as const },
  { label: 'You',     top: '42%', dashed: false, justify: 'flex-end' as const },
  { label: 'Average', top: '65%', dashed: true,  justify: 'center'   as const },
];

const MELANIN_LABELS = [
  { label: 'Blue',  top: '5%'  },
  { label: 'Green', top: '28%' },
  { label: 'Brown', top: '56%' },
  { label: 'Deep',  top: '82%' },
];
const USER_MELANIN_TOP = '56%';

const THIRDS = [
  { label: 'Lower Third',  code: '[C]', val: 0.31 },
  { label: 'Middle Third', code: '[B]', val: 0.36 },
  { label: 'Upper Third',  code: '[A]', val: 0.31 },
];

export default function FacialAnalysis() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const leftPanelsRef = useRef<HTMLDivElement>(null);
  const rightPanelsRef = useRef<HTMLDivElement>(null);

  const [activeQ, setActiveQ] = useState<0 | 1 | 2 | 3>(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(topRef.current!.children, {
        y: 24, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.from(faceRef.current, {
        y: 40, opacity: 0, scale: 0.94, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });

      if (leftPanelsRef.current) {
        gsap.from(leftPanelsRef.current.children, {
          x: -48, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        });
      }

      if (rightPanelsRef.current) {
        gsap.from(rightPanelsRef.current.children, {
          x: 48, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>

      <div className={styles.container}>
        <div ref={topRef} className={styles.top}>
          <p className={styles.label}>PERSONALIZED AESTHETICS</p>
          <h2 className={styles.heading}>
            Your complete{' '}
            <span className={styles.headingAccent}>facial analysis</span>
          </h2>
          <p className={styles.subtitle}>
            Every face is unique. We assess more than 100 unique facial markers to
            give you a precise understanding of your aesthetics.
          </p>
        </div>

        <div className={styles.stage}>

          <div className={styles.panelsWrapper}>
            {/* ── Left panels ── */}
            <div ref={leftPanelsRef} className={styles.panelsLeft}>

              {/* 10×10 dot grid split into 4 quadrants */}
              <div className={`${styles.panel} ${styles.dotGridPanel}`}>
                <div className={`${styles.dotsContainer}`}>
                  <div className={styles.dotGrid}>
                    <span className={styles.labelTop}>Subtle</span>
                    <span className={styles.labelBottom}>Bold</span>
                    <span className={styles.labelLeft}>Masculine</span>
                    <span className={styles.labelRight}>Masculine</span>
                    {([0, 1, 2, 3] as const).map(q => (
                      <div
                        key={q}
                        className={styles.quadrant}
                        onMouseEnter={() => setActiveQ(q)}
                      >
                        {Array.from({ length: 25 }, (_, idx) => {
                          const lr = Math.floor(idx / 5);
                          const lc = idx % 5;
                          const lit = activeQ === q && ACTIVE_LOCAL.has(`${lr},${lc}`);
                          return (
                            <div
                              key={idx}
                              className={`${styles.dot}${lit ? ` ${styles.dotActive}` : ''}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${styles.badges}`}>
                  <p className={`${styles.badgeLabel}`}>Brows fall in the top 20% for natural fullness.</p>
                </div>
              </div>

              <div>
                {/* Density bell curve panel */}
                <div className={`${styles.panel} ${styles.densityPanel}`}>
                  <div className={styles.densityChart}>
                    <ResponsiveContainer width="100%" height={130}>
                      <ComposedChart data={densityData} margin={{ top: 16, right: 12, bottom: 4, left: 12 }}>
                        <CartesianGrid
                          stroke="rgba(255,255,255,0.08)"
                          strokeDasharray=""
                        />
                        <XAxis dataKey="x" type="number" domain={[0, 100]} hide />
                        <YAxis hide domain={[0, 1.15]} />
                        <Area
                          dataKey="curve"
                          type="monotone"
                          stroke="rgba(255,255,255,0.65)"
                          strokeWidth={1.5}
                          fill="rgba(255,255,255,0.03)"
                          dot={false}
                          isAnimationActive={false}
                        />
                        <Area
                          dataKey="tail"
                          type="monotone"
                          stroke="none"
                          fill="rgba(255,255,255,0.18)"
                          dot={false}
                          isAnimationActive={false}
                          connectNulls={false}
                        />
                        <ReferenceLine
                          x={USER_DENSITY}
                          stroke="rgba(255,255,255,0.35)"
                          strokeDasharray="3 4"
                          strokeWidth={1}
                        />
                        <ReferenceDot
                          x={USER_DENSITY}
                          y={densityData[USER_DENSITY].curve}
                          r={4}
                          fill="#fff"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth={5}
                        />
                        {/* Axis marker dots */}
                        <ReferenceDot x={10} y={0} r={3} fill="rgba(255,255,255,0.4)" stroke="none" />
                        <ReferenceDot x={50} y={0} r={3} fill="rgba(255,255,255,0.4)" stroke="none" />
                        <ReferenceDot x={USER_DENSITY} y={0} r={3} fill="rgba(255,255,255,0.6)" stroke="none" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className={styles.densityAxisLabels}>
                    <span>Low Density</span>
                    <span>Medium Density</span>
                    <span>High Density</span>
                  </div>
                  <div className={styles.densityFooter}>
                    <p>Your eyebrow density is in the mid 40th percentile</p>
                  </div>
                </div>

                {/* Lip smoothness panel */}
                <div className={`${styles.panel} ${styles.smoothnessPanel}`}>
                  <p className={styles.smoothnessLabel}>Lip Smoothness</p>
                  <p className={styles.smoothnessPct}>56%</p>
                  <div className={styles.smoothnessTrackWrap}>
                    <div className={styles.smoothnessIndicator} style={{ left: '56%' }}>
                      <span className={styles.smoothnessPill}>56% (You)</span>
                      <div className={styles.smoothnessDash} />
                    </div>
                    <div className={styles.smoothnessAxisLabels}>
                      <span>Rough (0%)</span>
                      <span>Smooth (100%)</span>
                    </div>
                    <div className={styles.smoothnessTrack}>
                      <div className={styles.smoothnessFill} style={{ width: '56%' }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Right panels ── */}
            <div ref={rightPanelsRef} className={styles.panelsRight}>

              {/* Melanin panel — mirrors dotGridPanel (tall, column 1) */}
              <div className={`${styles.panel} ${styles.melaninPanel}`}>
                <div className={styles.melaninBody}>
                  <div className={styles.melaninBar}>
                    {MELANIN_LABELS.map(m => (
                      <span key={m.label} className={styles.melaninLabel} style={{ top: m.top }}>
                        {m.label}
                      </span>
                    ))}
                  </div>
                  <div className={styles.melaninRef} style={{ top: USER_MELANIN_TOP }}>
                    <span className={styles.melaninPillLeft}>■ Dark Brown</span>
                    <div className={styles.melaninRefLine} />
                    <span className={styles.melaninPillRight}>You</span>
                  </div>
                </div>
                <div className={styles.melaninFooter}>
                  <p>Your eyes have a medium <em>melanin</em> concentration.</p>
                </div>
              </div>

              {/* Symmetry + Facial Thirds — mirrors density+smoothness wrapper (column 2) */}
              <div>

                {/* Symmetry panel */}
                <div className={`${styles.panel} ${styles.symmetryPanel}`}>
                  <div className={styles.symmetryLines}>
                    {SYMMETRY_LINES.map(line => (
                      <div
                        key={line.label}
                        className={`${styles.symmetryLine}${line.dashed ? ` ${styles.symmetryLineDashed}` : ''}`}
                        style={{ top: line.top, justifyContent: line.justify }}
                      >
                        <span className={styles.symmetryPill}>{line.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.symmetryAxis}>
                    <span>Asymmetrical</span>
                    <span>Symmetrical</span>
                  </div>
                </div>

                {/* Facial Thirds panel */}
                <div className={`${styles.panel} ${styles.thirdsPanel}`}>
                  <p className={styles.panelTitle}>Facial Thirds</p>
                  <div className={styles.thirdsGrid}>
                    {THIRDS.map(t => (
                      <div key={t.label} className={styles.thirdsCol}>
                        <p className={styles.thirdsLabel}>
                          {t.label} <span className={styles.thirdsCode}>{t.code}</span>
                        </p>
                        <div className={styles.thirdsTrack}>
                          <div className={styles.thirdsBar} style={{ width: `${(t.val / 0.4) * 100}%` }} />
                        </div>
                        <p className={styles.thirdsVal}>{t.val.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── Face ── */}
          <div ref={faceRef} className={styles.faceWrap}>
            <Image
              src="/images/face-analysis.png"
              alt="Facial analysis subject"
              width={732}
              height={1097}
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
