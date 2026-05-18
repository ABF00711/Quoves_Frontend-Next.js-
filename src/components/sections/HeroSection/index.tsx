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
  const svgRef    = useRef<SVGSVGElement>(null);
  const pathRef   = useRef<SVGPathElement>(null);
  const trail1Ref = useRef<SVGPathElement>(null);
  const trail2Ref = useRef<SVGPathElement>(null);
  const grad1Ref  = useRef<SVGLinearGradientElement>(null);
  const grad2Ref  = useRef<SVGLinearGradientElement>(null);
  const dot1Ref   = useRef<SVGCircleElement>(null);
  const dot2Ref   = useRef<SVGCircleElement>(null);

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
      const d1 = dot1Ref.current;
      const d2 = dot2Ref.current;
      const t1 = trail1Ref.current;
      const t2 = trail2Ref.current;
      const g1 = grad1Ref.current;
      const g2 = grad2Ref.current;
      if (!comp || !before || !after || !svg || !path || !d1 || !d2 || !t1 || !t2 || !g1 || !g2) return;

      const beforeRect = before.getBoundingClientRect();
      const afterRect  = after.getBoundingClientRect();
      const compRect   = comp.getBoundingClientRect();

      const PAD = 38; // 19px visual padding (viewBox offset accounts for half)
      const R   = 12;

      svg.setAttribute('viewBox', `${-PAD / 2} ${-PAD / 2} ${compRect.width + PAD} ${compRect.height + PAD}`);

      // Before card rectangle bounds
      const bx1 = beforeRect.left   - compRect.left - PAD / 2;
      const by1 = beforeRect.top    - compRect.top  - PAD;
      const bx2 = beforeRect.right  - compRect.left + PAD;
      const by2 = beforeRect.bottom - compRect.top  + PAD;

      // After card rectangle bounds
      const ax1 = afterRect.left   - compRect.left - PAD;
      const ay2 = afterRect.bottom - compRect.top  + PAD;
      const ax2 = afterRect.right  - compRect.left + PAD / 2;

      // Connector rectangle: 30% of card height, centered vertically
      const midY      = (by1 + by2) / 2;
      const connHalfH = (by2 - by1) * 0.05;
      const cy1 = midY - connHalfH;
      const cy2 = midY + connHalfH;
      const CR  = 21.53; // connector corner radius

      const d = [
        `M ${bx1 + R},${by1}`,
        `H ${bx2 - R}`,                                   // → Before top
        `Q ${bx2},${by1} ${bx2},${by1 + R}`,             // Before inner-TR (→↓)
        `V ${cy1 - CR}`,                                   // ↓ approach connector TL
        `Q ${bx2},${cy1} ${bx2 + CR},${cy1}`,             // connector TL corner (↓→)
        `H ${ax1 - CR}`,                                   // connector top line →
        `Q ${ax1},${cy1} ${ax1},${cy1 - CR}`,             // connector TR corner (→↑)
        `V ${by1 + R}`,                                    // ↑ approach After inner-TL
        `Q ${ax1},${by1} ${ax1 + R},${by1}`,              // After inner-TL corner (↑→)
        `H ${ax2 - R}`,                                    // → After top
        `Q ${ax2},${by1} ${ax2},${by1 + R}`,              // After outer-TR (→↓)
        `V ${ay2 - R}`,                                    // ↓ After right
        `Q ${ax2},${ay2} ${ax2 - R},${ay2}`,              // After outer-BR (↓←)
        `H ${ax1 + R}`,                                    // ← After bottom
        `Q ${ax1},${ay2} ${ax1},${ay2 - R}`,              // After inner-BL (←↑)
        `V ${cy2 + CR}`,                                   // ↑ approach connector BR
        `Q ${ax1},${cy2} ${ax1 - CR},${cy2}`,             // connector BR corner (↑←)
        `H ${bx2 + CR}`,                                   // connector bottom line ←
        `Q ${bx2},${cy2} ${bx2},${cy2 + CR}`,             // connector BL corner (←↓)
        `V ${by2 - R}`,                                    // ↓ approach Before inner-BR
        `Q ${bx2},${by2} ${bx2 - R},${by2}`,              // Before inner-BR (↓←)
        `H ${bx1 + R}`,                                    // ← Before bottom
        `Q ${bx1},${by2} ${bx1},${by2 - R}`,              // Before outer-BL (←↑)
        `V ${by1 + R}`,                                    // ↑ Before left
        `Q ${bx1},${by1} ${bx1 + R},${by1}`,              // Before outer-TL (↑→)
        'Z',
      ].join(' ');

      path.setAttribute('d', d);
      t1.setAttribute('d', d);
      t2.setAttribute('d', d);

      const totalLength = path.getTotalLength();
      const TAIL_LEN    = 174.94;
      const dashArray   = `${TAIL_LEN} ${totalLength + TAIL_LEN}`;
      t1.setAttribute('stroke-dasharray', dashArray);
      t2.setAttribute('stroke-dasharray', dashArray);

      const motionOpts = {
        path,
        align: path,
        alignOrigin: [0.5, 0.5] as [number, number],
      };

      function syncTrail(
        trailEl: SVGPathElement,
        gradEl: SVGLinearGradientElement,
        anim: gsap.core.Tween,
      ) {
        const headLen = anim.progress() * totalLength;
        const tailLen = ((headLen - TAIL_LEN) % totalLength + totalLength) % totalLength;
        const headPt  = path!.getPointAtLength(Math.min(headLen, totalLength - 0.01));
        const tailPt  = path!.getPointAtLength(tailLen);
        gradEl.setAttribute('x1', String(tailPt.x));
        gradEl.setAttribute('y1', String(tailPt.y));
        gradEl.setAttribute('x2', String(headPt.x));
        gradEl.setAttribute('y2', String(headPt.y));
        trailEl.setAttribute('stroke-dashoffset', String(TAIL_LEN - headLen));
      }

      // Pixel separation between the two dots along the path
      const SEP_PX = 2300;

      let anim1: gsap.core.Tween;
      let anim2: gsap.core.Tween;

      anim1 = gsap.to(d1, {
        motionPath: motionOpts, duration: 8, repeat: -1, ease: 'none',
        onUpdate() { syncTrail(t1, g1, anim1); },
      });
      anim2 = gsap.to(d2, {
        motionPath: motionOpts, duration: 8, repeat: -1, ease: 'none',
        onUpdate() { syncTrail(t2, g2, anim2); },
      });
      // Pre-seek dot2 so both dots appear immediately at the right positions
      anim2.progress(1 - SEP_PX / totalLength);
      syncTrail(t2, g2, anim2);
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
          <p ref={labelRef} className={styles.label}>Personalised Analysis</p>
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

          {/* Single combined SVG path + two animated dots with gradient tails */}
          <svg ref={svgRef} className={styles.pathSvg} aria-hidden="true">
            <defs>
              <linearGradient ref={grad1Ref} id="tailGrad1" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#CDDBE1" />
                <stop offset="100%" stopColor="#869AA1" />
              </linearGradient>
              <linearGradient ref={grad2Ref} id="tailGrad2" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#CDDBE1" />
                <stop offset="100%" stopColor="#869AA1" />
              </linearGradient>
            </defs>
            <path ref={pathRef}   className={styles.pathLine} />
            <path ref={trail1Ref} className={styles.tailPath} stroke="url(#tailGrad1)" />
            <path ref={trail2Ref} className={styles.tailPath} stroke="url(#tailGrad2)" />
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
