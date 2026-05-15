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

const METRICS = [
  { key: 'Jaw Width', val: '142 mm' },
  { key: 'Brow Arch', val: '0.78' },
  { key: 'Eye Spacing', val: '31 mm' },
  { key: 'Lip Ratio', val: '1:1.62' },
  { key: 'Canthal Tilt', val: '+4.2°' },
  { key: 'Philtrum', val: '14 mm' },
];

const COLOR_MARKERS = [
  { top: '8%', label: 'ITA +42' },
  { top: '32%', label: 'ITA +18' },
  { top: '56%', label: 'ITA −06' },
  { top: '78%', label: 'ITA −28' },
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
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from(faceRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.94,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      });

      if (leftPanelsRef.current) {
        gsap.from(leftPanelsRef.current.children, {
          x: -48,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        });
      }

      if (rightPanelsRef.current) {
        gsap.from(rightPanelsRef.current.children, {
          x: 48,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.bg} />

      <div className={styles.container}>
        <div ref={topRef} className={styles.top}>
          <p className={styles.label}>Personalised Aesthetics</p>
          <h2 className={styles.heading}>
            Your complete{' '}
            <span className={styles.headingAccent}>facial analysis</span>
          </h2>
          <p className={styles.subtitle}>
            Every face is unique. We assess more than 100 unique facial markers to give you a
            precise understanding of your aesthetics.
          </p>
        </div>

        <div className={styles.stage}>
          {/* Left panels */}
          <div ref={leftPanelsRef} className={styles.panelsLeft}>
            {/* Dot grid */}
            <div className={`${styles.panel} ${styles.dotGrid}`}>
              {DOT_GRID.map((active, i) => (
                <div
                  key={i}
                  className={`${styles.dot}${active ? ` ${styles.active}` : ''}`}
                />
              ))}
            </div>

            {/* Area chart */}
            <div className={`${styles.panel} ${styles.chartPanel}`}>
              <p className={styles.chartLabel}>Facial Symmetry</p>
              <ResponsiveContainer width="100%" height={90}>
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
                    contentStyle={{
                      background: 'rgba(0,0,0,0.6)',
                      border: 'none',
                      borderRadius: 4,
                      fontSize: '0.6rem',
                      color: '#fff',
                    }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(v) => [`${v ?? 0}%`, 'Score']}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <p className={styles.chartPct}>56%</p>
            </div>
          </div>

          {/* Face */}
          <div ref={faceRef} className={styles.faceWrap}>
            <Image
              src="/images/face-analysis.png"
              alt="Facial analysis subject"
              width={340}
              height={460}
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              priority
            />
          </div>

          {/* Right panels */}
          <div ref={rightPanelsRef} className={styles.panelsRight}>
            {/* Color scale */}
            <div className={`${styles.panel} ${styles.colorScale}`}>
              <p className={styles.chartLabel} style={{ fontSize: '0.5rem' }}>
                ITA
              </p>
              <div className={styles.colorBar}>
                {COLOR_MARKERS.map((m) => (
                  <div
                    key={m.label}
                    className={styles.colorBarMarker}
                    data-label={m.label}
                    style={{ top: m.top }}
                  />
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className={`${styles.panel} ${styles.metricsPanel}`}>
              {METRICS.map((m) => (
                <div key={m.key} className={styles.metricRow}>
                  <span className={styles.metricKey}>{m.key}</span>
                  <span className={styles.metricVal}>{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
