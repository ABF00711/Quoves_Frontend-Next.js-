'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.scss';

const STEPS = [
  { num: '1', text: 'Get your expert facial analysis' },
  { num: '2', text: 'Visualise your best looking self' },
  { num: '3', text: 'Get your personalised glow-up protocol' },
  { num: '4', text: 'Track your progress and see dramatic results' },
];

export default function HeroSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [sliderVal, setSliderVal] = useState(50);

  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const beforeCardRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const afterCardRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(labelRef.current, { y: 12, opacity: 0, duration: 0.75 })
        .from(headingRef.current, { y: 28, opacity: 0, duration: 1 }, '-=0.45')
        .from(subtitleRef.current, { y: 16, opacity: 0, duration: 0.75 }, '-=0.55')
        .from(beforeCardRef.current, { x: -36, opacity: 0, duration: 0.95 }, '-=0.45')
        .from(afterCardRef.current, { x: 36, opacity: 0, duration: 0.95 }, '<')
        .from(centerRef.current, { opacity: 0, duration: 0.6 }, '-=0.6')
        .from(
          stepsRef.current!.children,
          { y: 12, opacity: 0, duration: 0.5, stagger: 0.09 },
          '-=0.5',
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.top}>
          <p ref={labelRef} className={styles.label}>
            Personalised Aesthetics
          </p>
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
        <div className={styles.comparison}>
          <div ref={beforeCardRef} className={styles.compareCard}>
            <span className={styles.compareLabel}>Before</span>
            <div className={styles.imgWrap}>
              <Image
                src="/images/before1.png"
                alt="Before"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
            </div>
          </div>

          <div ref={centerRef} className={styles.compareCenter}>
            <div className={styles.sliderScore}>
              <span className={styles.sliderScoreNum}>{sliderVal}%</span>
              match
            </div>
            <input
              type="range"
              className={styles.rangeInput}
              min={0}
              max={100}
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              aria-label="Comparison score"
            />
          </div>

          <div ref={afterCardRef} className={styles.compareCard}>
            <span className={styles.compareLabel}>After</span>
            <div className={styles.imgWrap}>
              <Image
                src="/images/before.png"
                alt="After"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
            </div>
          </div>
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
