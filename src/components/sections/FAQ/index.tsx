'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FAQ.module.scss';

const GENERAL_QA = [
  {
    q: 'What is Qoves?',
    a: 'Qoves is a personalised facial analysis service that uses advanced techniques to assess over 100 unique facial markers and provides you with a science-backed glow-up protocol tailored specifically to you.',
  },
  {
    q: 'Who is this for?',
    a: 'Anyone who wants a data-driven understanding of their facial aesthetics and a personalised plan to look their best — without surgery.',
  },
  {
    q: 'What specifically will I receive?',
    a: 'A detailed facial analysis report, a personalised glow-up protocol, access to visualisation tools, and ongoing progress tracking.',
  },
  {
    q: 'How does it work?',
    a: 'You submit your photos, our system analyses your facial structure against hundreds of markers, and you receive a comprehensive report within 48 hours.',
  }, 
  {
    q: 'How long will it take to receive my results?',
    a: 'Most reports are delivered within 24–48 hours of photo submission.',
  },
  {
    q: 'Is this a one-time report or a continuous service?',
    a: 'Both options are available. You can opt for a one-time comprehensive report or subscribe for ongoing tracking and protocol updates.',
  },
  {
    q: 'How often do I need to submit photos?',
    a: 'For ongoing subscribers we recommend monthly photo submissions to accurately track your progress.',
  },
  {
    q: 'What makes Qoves different from beauty apps or filters?',
    a: 'Qoves is science-based, not algorithm-based vanity. We assess facial structure, bone ratio, skin quality and other medically-grounded markers — not surface-level filters.',
  },
  {
    q: 'Can I really get results without surgery?',
    a: 'Absolutely. The most impactful changes come from lifestyle, skincare, and targeted habit changes. Our protocol focuses entirely on non-surgical improvements.',
  },
];

const OTHER_CATEGORIES = [
  'About the Analysis',
  'About the Protocol',
  'Experience & Use',
  'Pricing & Subscription',
  'Privacy & Data',
  'Mindset & Philosophy',
  'Practical Concerns',
  'About Support',
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    const body = bodyRef.current;
    if (!body) return;

    if (!open) {
      // Set to auto first so GSAP can measure natural height, then animate from 0
      gsap.set(body, { height: 'auto' });
      gsap.from(body, { height: 0, duration: 0.42, ease: 'power2.inOut' });
    } else {
      gsap.to(body, { height: 0, duration: 0.35, ease: 'power2.inOut' });
    }
    setOpen((v) => !v);
  }, [open]);

  return (
    <div className={styles.accordionItem} data-open={open}>
      <button className={styles.accordionTrigger} onClick={toggle} aria-expanded={open}>
        <span className={styles.accordionQ}>{q}</span>
        <svg
          className={styles.accordionIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div ref={bodyRef} className={styles.accordionBody}>
        <p className={styles.accordionAnswer}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const catsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(topRef.current!.children, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.from([cardRef.current, catsRef.current!.children], {
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div ref={topRef} className={styles.top}>
          <p className={styles.label}>Your Questions</p>
          <h2 className={styles.heading}>
            Frequently asked{' '}
            <span className={styles.headingAccent}>questions</span>
          </h2>
          <p className={styles.subtitle}>
            If you have any further questions, please use the chat box in the bottom right or
            contact us by email at hello@qoves.com
          </p>
        </div>

        {/* Expanded general questions */}
        <div ref={cardRef} className={styles.activeCard}>
          <div className={styles.activeCardHeader}>
            <p className={styles.activeCardTitle}>General Questions</p>
          </div>
          {GENERAL_QA.map((item) => (
            <AccordionItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        {/* Other categories */}
        <div ref={catsRef} className={styles.categories}>
          {OTHER_CATEGORIES.map((cat) => (
            <div key={cat} className={styles.categoryRow}>
              <span className={styles.categoryName}>{cat}</span>
              <svg
                className={styles.categoryChevron}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
