'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import styles from './FacialAnalysis.module.scss';

const bellCurve = Array.from({ length: 24 }, (_, i) => {
  const x = (i - 12) / 3.5;
  return { v: Math.round(Math.exp(-0.5 * x * x) * 96) };
});

const SCALE_LABELS = ['Subtle', 'Masculine', 'Bold'];

const COLOR_MARKERS = [
  { top: '6%', label: 'Light' },
  { top: '30%', label: 'Olive' },
  { top: '58%', label: 'Brown' },
  { top: '80%', label: 'Deep' },
];

const THIRDS = [
  { label: 'Lower Third', code: '[O]', val: 0.25 },
  { label: 'Higher Third', code: '[D]', val: 0.26 },
];

function buildDotGrid() {
  const active = new Set([3, 5, 14, 15, 16, 25, 26, 27, 28, 38, 39, 40, 50, 51, 63, 64, 65]);
  return Array.from({ length: 96 }, (_, i) => active.has(i));
}
const DOT_GRID = buildDotGrid();

export default function FacialAnalysis() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const leftPanelsRef = useRef<HTMLDivElement>(null);
  const rightPanelsRef = useRef<HTMLDivElement>(null);

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

              {/* Dot grid with scale */}
              <div className={`${styles.panel} ${styles.dotGridPanel}`}>
                <div className={styles.dotGridInner}>
                  <div className={styles.scaleLabels}>
                    {SCALE_LABELS.map(l => (
                      <span key={l} className={styles.scaleLabel}>{l}</span>
                    ))}
                  </div>
                  <div className={styles.dotGrid}>
                    {DOT_GRID.map((active, i) => (
                      <div
                        key={i}
                        className={`${styles.dot}${active ? ` ${styles.active}` : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bell curve / eyebrow density */}
              <div className={`${styles.panel} ${styles.chartPanel}`}>
                <p className={styles.chartLabel}>Low Smoothness</p>
                <ResponsiveContainer width="100%" height={80}>
                  <AreaChart data={bellCurve} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth={1.5}
                      fill="url(#areaGrad)"
                      dot={false}
                    />
                    <Tooltip
                      contentStyle={{ background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: 4, fontSize: '0.6rem', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(v) => [`${v ?? 0}%`, 'Score']}
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className={styles.chartAxis}>
                  <span>Rough(5%)</span>
                  <span>Smooth(100%)</span>
                </div>
                <p className={styles.percentileText}>
                  Your eyebrow density is in the mid 40th percentile
                </p>
                <p className={styles.chartPct}>56%</p>
              </div>

            </div>

            {/* ── Right panels ── */}
            <div ref={rightPanelsRef} className={styles.panelsRight}>

              {/* ITA color scale */}
              <div className={`${styles.panel} ${styles.colorScale}`}>
                <p className={styles.chartLabel} style={{ marginBottom: 12 }}>ITA</p>
                <div className={styles.colorScaleBody}>
                  <div className={styles.colorBar}>
                    {COLOR_MARKERS.map(m => (
                      <div
                        key={m.label}
                        className={styles.colorBarMarker}
                        data-label={m.label}
                        style={{ top: m.top }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Facial Thirds */}
              <div className={`${styles.panel} ${styles.thirdsPanel}`}>
                <p className={styles.panelTitle}>Facial Thirds</p>
                <div className={styles.thirdsGrid}>
                  {THIRDS.map(t => (
                    <div key={t.label} className={styles.thirdsCol}>
                      <p className={styles.thirdsLabel}>
                        {t.label} <span className={styles.thirdsCode}>{t.code}</span>
                      </p>
                      <p className={styles.thirdsVal}>{t.val.toFixed(2)}</p>
                      <div className={styles.thirdsTrack}>
                        <div className={styles.thirdsBar} style={{ width: `${t.val * 380}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className={styles.asymmetrical}>Asymmetrical</p>
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
