'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import styles from './BeforeAfterSlider.module.scss';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const afterWrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    const container = containerRef.current!;
    const afterWrap = afterWrapRef.current!;
    const line = lineRef.current!;

    gsap.set(afterWrap, { clipPath: 'inset(0 0 0 50%)' });

    const ctx = gsap.context(() => {
      Draggable.create(handleRef.current, {
        type: 'x',
        bounds: container,
        onDrag() {
          const cw = container.offsetWidth;
          const pct = Math.max(0, Math.min(100, ((cw / 2 + this.x) / cw) * 100));
          gsap.set(afterWrap, { clipPath: `inset(0 0 0 ${pct}%)` });
          gsap.set(line, { left: `${pct}%` });
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.imageWrap}>
        <Image
          src={before}
          alt="Before"
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
      </div>

      <div ref={afterWrapRef} className={styles.imageWrap}>
        <Image
          src={after}
          alt="After"
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
      </div>

      <div ref={lineRef} className={styles.line} />

      <div ref={handleRef} className={styles.handle}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M8 5l-5 7 5 7M16 5l5 7-5 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <span className={`${styles.label} ${styles.labelBefore}`}>{beforeLabel}</span>
      <span className={`${styles.label} ${styles.labelAfter}`}>{afterLabel}</span>
    </div>
  );
}
