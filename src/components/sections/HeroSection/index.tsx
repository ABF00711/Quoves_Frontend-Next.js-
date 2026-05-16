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
  const svgRef   = useRef<SVGSVGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const dot1Ref  = useRef<SVGCircleElement>(null);
  const dot2Ref  = useRef<SVGCircleElement>(null);

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
      const p1     = path1Ref.current;
      const p2     = path2Ref.current;
      const d1     = dot1Ref.current;
      const d2     = dot2Ref.current;
      if (!comp || !before || !after || !svg || !p1 || !p2 || !d1 || !d2) return;

      const beforeRect = before.getBoundingClientRect();
      const afterRect  = after.getBoundingClientRect();
      const compRect   = comp.getBoundingClientRect();

      const PAD = 19;
      const R   = 12;

      // Extend viewBox by PAD so all four padded edges are within the SVG coordinate space
      svg.setAttribute('viewBox', `${-PAD} ${-PAD} ${compRect.width + PAD * 2} ${compRect.height + PAD * 2}`);

      const roundedRect = (l: number, t: number, r: number, b: number) => [
        `M ${l + R},${t}`,
        `H ${r - R}`,
        `Q ${r},${t} ${r},${t + R}`,
        `V ${b - R}`,
        `Q ${r},${b} ${r - R},${b}`,
        `H ${l + R}`,
        `Q ${l},${b} ${l},${b - R}`,
        `V ${t + R}`,
        `Q ${l},${t} ${l + R},${t}`,
        'Z',
      ].join(' ');

      // Before card: 19px padding on all four sides, 12px corner radius
      const bx1 = beforeRect.left   - compRect.left - PAD -PAD;
      const by1 = beforeRect.top    - compRect.top  - PAD - PAD;
      const bx2 = beforeRect.right  - compRect.left + PAD + PAD;
      const by2 = beforeRect.bottom - compRect.top  + PAD + PAD;
      p1.setAttribute('d', roundedRect(bx1, by1, bx2, by2));

      // After card: 19px padding on all four sides, 12px corner radius
      const ax1 = afterRect.left   - compRect.left - PAD - PAD;
      const ay1 = afterRect.top    - compRect.top  - PAD - PAD;
      const ax2 = afterRect.right  - compRect.left + PAD + PAD;
      const ay2 = afterRect.bottom - compRect.top  + PAD + PAD;
      p2.setAttribute('d', roundedRect(ax1, ay1, ax2, ay2));

      // dot1 travels the Before card rectangle
      gsap.to(d1, {
        motionPath: { path: p1, align: p1, alignOrigin: [0.5, 0.5] as [number, number] },
        duration: 6,
        repeat: -1,
        ease: 'none',
      });

      // dot2 travels the After card rectangle, offset in time
      gsap.to(d2, {
        motionPath: { path: p2, align: p2, alignOrigin: [0.5, 0.5] as [number, number] },
        duration: 6,
        delay: 0.55,
        repeat: -1,
        ease: 'none',
      });
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

          {/* SVG: two card-outline paths + one dot per card */}
          <svg ref={svgRef} className={styles.pathSvg} aria-hidden="true">
            <path ref={path1Ref} className={styles.pathLine} />
            <path ref={path2Ref} className={styles.pathLine} />
            {/* lead dot — travels Before card path */}
            <circle ref={dot1Ref} r="4.5" className={styles.dot} />
            {/* trail dot — travels After card path */}
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
