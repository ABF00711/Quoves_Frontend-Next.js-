'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import styles from './HeroSection.module.scss';

const STEPS = [
  { num: '1', text: 'Get your expert facial analysis' },
  { num: '2', text: 'Visualise your best looking self' },
  { num: '3', text: 'Get your personalised glow-up protocol' },
  { num: '4', text: 'Track your progress and see dramatic results' },
];

export default function HeroSection() {
  const [activeStep, setActiveStep] = useState(1);

  const sectionRef    = useRef<HTMLElement>(null);
  const labelRef      = useRef<HTMLParagraphElement>(null);
  const headingRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef   = useRef<HTMLParagraphElement>(null);
  const compRef       = useRef<HTMLDivElement>(null);
  const beforeCardRef = useRef<HTMLDivElement>(null);
  const centerRef     = useRef<HTMLDivElement>(null);
  const afterCardRef  = useRef<HTMLDivElement>(null);
  const stepsRef      = useRef<HTMLDivElement>(null);

  // SVG refs
  const svgRef  = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dot1Ref = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    // ── Entrance animation ──────────────────────────────────
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(labelRef.current,      { y: 12, opacity: 0, duration: 0.75 })
        .from(headingRef.current,    { y: 28, opacity: 0, duration: 1    }, '-=0.45')
        .from(subtitleRef.current,   { y: 16, opacity: 0, duration: 0.75 }, '-=0.55')
        .from(beforeCardRef.current, { x: -36, opacity: 0, duration: 0.95 }, '-=0.45')
        .from(afterCardRef.current,  { x:  36, opacity: 0, duration: 0.95 }, '<')
        .from(centerRef.current,     { opacity: 0, duration: 0.5 }, '-=0.7')
        .from(stepsRef.current!.children,
          { y: 12, opacity: 0, duration: 0.5, stagger: 0.09 }, '-=0.5');
    }, sectionRef);

    // ── Perimeter path animation ────────────────────────────
    const timer = setTimeout(() => {
      const comp   = compRef.current;
      const before = beforeCardRef.current;
      const after  = afterCardRef.current;
      const svg    = svgRef.current;
      const path   = pathRef.current;
      const d1     = dot1Ref.current;
      const d2     = dot2Ref.current;
      if (!comp || !before || !after || !svg || !path || !d1 || !d2) return;

      const beforeRect = before.getBoundingClientRect();
      const afterRect  = after.getBoundingClientRect();
      const compRect   = comp.getBoundingClientRect();

      const PAD = 38; // 19px visual padding (viewBox offset accounts for half)
      const R   = 12;

      svg.setAttribute('viewBox', `${-PAD / 2} ${-PAD / 2} ${compRect.width + PAD} ${compRect.height + PAD}`);

      // Before card rectangle bounds
      const bx1 = beforeRect.left   - compRect.left - PAD;
      const by1 = beforeRect.top    - compRect.top  - PAD;
      const bx2 = beforeRect.right  - compRect.left + PAD;
      const by2 = beforeRect.bottom - compRect.top  + PAD;

      // After card rectangle bounds
      const ax1 = afterRect.left   - compRect.left - PAD;
      const ay2 = afterRect.bottom - compRect.top  + PAD;
      const ax2 = afterRect.right  - compRect.left + PAD;

      // Connector rectangle: 30% of card height, centered vertically
      const midY      = (by1 + by2) / 2;
      const connHalfH = (by2 - by1) * 0.15;
      const cy1 = midY - connHalfH;
      const cy2 = midY + connHalfH;
      const CR  = 21.53; // connector corner radius

      const d = [
        `M ${bx1 + R},${by1}`,
        `H ${bx2}`,
        `V ${cy1 - CR}`,                                  // ↓ approach connector TL
        `Q ${bx2},${cy1} ${bx2 + CR},${cy1}`,            // connector TL corner (↓→)
        `H ${ax1 - CR}`,                                  // connector top line →
        `Q ${ax1},${cy1} ${ax1},${cy1 - CR}`,            // connector TR corner (→↑)
        `V ${by1}`,
        `H ${ax2 - R}`,
        `Q ${ax2},${by1} ${ax2},${by1 + R}`,
        `V ${ay2 - R}`,
        `Q ${ax2},${ay2} ${ax2 - R},${ay2}`,
        `H ${ax1}`,
        `V ${cy2 + CR}`,                                  // ↑ approach connector BR
        `Q ${ax1},${cy2} ${ax1 - CR},${cy2}`,            // connector BR corner (↑←)
        `H ${bx2 + CR}`,                                  // connector bottom line ←
        `Q ${bx2},${cy2} ${bx2},${cy2 + CR}`,            // connector BL corner (←↓)
        `V ${by2}`,
        `H ${bx1 + R}`,
        `Q ${bx1},${by2} ${bx1},${by2 - R}`,
        `V ${by1 + R}`,
        `Q ${bx1},${by1} ${bx1 + R},${by1}`,
        'Z',
      ].join(' ');

      path.setAttribute('d', d);

      const motionOpts = {
        path,
        align: path,
        alignOrigin: [0.5, 0.5] as [number, number],
      };

      gsap.to(d1, { motionPath: motionOpts, duration: 8, repeat: -1, ease: 'none' });
      gsap.to(d2, { motionPath: motionOpts, duration: 8, delay: 0.55, repeat: -1, ease: 'none' });
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.top}>
          <p ref={labelRef} className={styles.label}>Personalised Aesthetics</p>
          <h1 ref={headingRef} className={styles.heading}>
            Get your personalised{' '}
            <span className={styles.headingAccent}>Qoves plan</span>
          </h1>
          <p ref={subtitleRef} className={styles.subtitle}>
            Understand your facial features and start your glow-up today,
            with a proven action plan — no plastic surgery needed.
          </p>
        </div>

        {/* ── Before / After ── */}
        <div ref={compRef} className={styles.comparison}>

          <div ref={beforeCardRef} className={styles.compareCard}>
            <span className={styles.compareLabel}>Before</span>
            <div className={styles.imgWrap}>
              <Image
                src="/images/Before.png"
                alt="Before"
                fill
                sizes="(max-width: 437.73px) 100vw, 45vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
            </div>
          </div>

          {/* Centre spacer */}
          <div ref={centerRef} className={styles.compareCenter} />

          <div ref={afterCardRef} className={styles.compareCard}>
            <span className={styles.compareLabel}>After</span>
            <div className={styles.imgWrap}>
              <Image
                src="/images/After.png"
                alt="After"
                fill
                sizes="(max-width: 437.73px) 100vw, 45vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
            </div>
          </div>

          {/* Single combined SVG path + two animated dots */}
          <svg ref={svgRef} className={styles.pathSvg} aria-hidden="true">
            <path ref={pathRef} className={styles.pathLine} />
            <circle ref={dot1Ref} r="4.5" className={styles.dot} />
            <circle ref={dot2Ref} r="3"   className={styles.dotTrail} />
          </svg>

        </div>

        {/* ── Steps ── */}
        <div ref={stepsRef} className={styles.steps}>
          {STEPS.map((step, i) => (
            <button
              key={step.num}
              className={`${styles.step}${activeStep === i ? ` ${styles.stepActive}` : ''}`}
              onClick={() => setActiveStep(i)}
            >
              <span className={styles.stepNum}>{step.num}</span>
              <span className={styles.stepText}>{step.text}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
