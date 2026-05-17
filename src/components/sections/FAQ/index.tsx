'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FAQ.module.scss';

const CATEGORIES_DATA = [
  {
    name: 'General Questions',
    defaultOpen: true,
    items: [
      { q: 'What is Qoves?', a: 'Qoves is a personalised facial analysis service that uses advanced techniques to assess over 100 unique facial markers and provides you with a science-backed glow-up protocol tailored specifically to you.' },
      { q: 'Who is this for?', a: 'Anyone who wants a data-driven understanding of their facial aesthetics and a personalised plan to look their best — without surgery.' },
      { q: 'What specifically will I receive?', a: 'A detailed facial analysis report, a personalised glow-up protocol, access to visualisation tools, and ongoing progress tracking.' },
      { q: 'How does it work?', a: 'You submit your photos, our system analyses your facial structure against hundreds of markers, and you receive a comprehensive report within 48 hours.' },
      { q: 'How long will it take to receive my results?', a: 'Most reports are delivered within 24–48 hours of photo submission.' },
      { q: 'Is this a one-time report or a continuous service?', a: 'Both options are available. You can opt for a one-time comprehensive report or subscribe for ongoing tracking and protocol updates.' },
      { q: 'How often do I need to submit photos?', a: 'For ongoing subscribers we recommend monthly photo submissions to accurately track your progress.' },
      { q: 'What makes Qoves different from beauty apps or filters?', a: 'Qoves is science-based, not algorithm-based vanity. We assess facial structure, bone ratio, skin quality and other medically-grounded markers — not surface-level filters.' },
      { q: 'Can I really get results without surgery?', a: 'Absolutely. The most impactful changes come from lifestyle, skincare, and targeted habit changes. Our protocol focuses entirely on non-surgical improvements.' },
    ],
  },
  {
    name: 'About the Analysis',
    items: [
      { q: 'How accurate is the facial analysis?', a: 'Our analysis is built on peer-reviewed research and validated across thousands of profiles. We assess over 100 unique facial markers with a high degree of reproducibility.' },
      { q: 'What photos do I need to submit?', a: 'We require three standardised photos: a front-facing shot, a 45° three-quarter view, and a profile shot, all taken in natural lighting.' },
      { q: 'Do you use AI or human analysts?', a: 'We use a hybrid approach — proprietary AI models flag and measure markers, then trained analysts review and finalise your report for accuracy.' },
    ],
  },
  {
    name: 'About the Protocol',
    items: [
      { q: 'What does the protocol include?', a: 'Your personalised protocol covers skincare, nutrition, sleep, posture, grooming, and targeted lifestyle habits — all mapped to your specific facial markers.' },
      { q: 'How long until I see results?', a: 'Most clients notice meaningful improvements within 4–8 weeks of following the protocol consistently.' },
      { q: 'Will the protocol change over time?', a: 'Yes. As you track progress and resubmit photos, your protocol evolves to reflect your current state and new goals.' },
    ],
  },
  {
    name: 'Experience & Use',
    items: [
      { q: 'Is the platform easy to use?', a: 'Yes. The onboarding flow takes under five minutes, and your dashboard presents everything in a clear, visual layout.' },
      { q: 'Can I access my report on mobile?', a: 'Absolutely. The platform is fully responsive and works on any modern device or browser.' },
      { q: 'Can I share my report with someone else?', a: 'Reports are private by default. You can export a PDF version to share with a dermatologist or trusted advisor.' },
    ],
  },
  {
    name: 'Pricing & Subscription',
    items: [
      { q: 'What are the pricing options?', a: 'We offer a one-time comprehensive report, as well as monthly and annual subscription plans for ongoing tracking and protocol updates.' },
      { q: 'Can I cancel my subscription anytime?', a: 'Yes. You can cancel at any time from your account settings with no hidden fees or penalties.' },
      { q: 'Is there a free trial?', a: 'We offer a sample micro-analysis so you can experience the quality of our reporting before committing.' },
    ],
  },
  {
    name: 'Privacy & Data',
    items: [
      { q: 'How is my data stored?', a: 'All data is encrypted at rest and in transit. We comply with GDPR and applicable data protection regulations.' },
      { q: 'Do you share my photos with third parties?', a: 'Never. Your photos and report data are used exclusively to produce your analysis and are never sold or shared.' },
      { q: 'Can I delete my data?', a: 'Yes. You can request full account and data deletion at any time by contacting our support team.' },
    ],
  },
  {
    name: 'Mindset & Philosophy',
    items: [
      { q: 'Is this promoting unrealistic beauty standards?', a: 'No. Our framework is built around genetic potential and health optimisation — not comparison to external ideals or filtered imagery.' },
      { q: 'What is the Qoves philosophy?', a: 'We believe self-improvement should be grounded in science, not insecurity. Our aim is to give you an honest, actionable understanding of your appearance.' },
    ],
  },
  {
    name: 'Practical Concerns',
    items: [
      { q: 'What if I submit poor-quality photos?', a: 'Our system will flag them and prompt you to resubmit. Accurate analysis depends on consistent, well-lit photos.' },
      { q: 'What if I am unhappy with my report?', a: 'We stand behind our quality. If you feel your report is inaccurate, contact support and an analyst will review it personally.' },
    ],
  },
  {
    name: 'About Support',
    items: [
      { q: 'How do I contact support?', a: 'Use the chat box in the bottom right of any page, or email us directly at hello@qoves.com.' },
      { q: 'What are your support hours?', a: 'Our team monitors inquiries around the clock, with typical response times under 4 hours on business days.' },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    const body = bodyRef.current;
    if (!body) return;

    if (!open) {
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

interface CategoryCardProps {
  name: string;
  items: { q: string; a: string }[];
  defaultOpen?: boolean;
}

function CategoryCard({ name, items, defaultOpen = false }: CategoryCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultOpen && bodyRef.current) {
      gsap.set(bodyRef.current, { height: 'auto' });
    }
  }, []);

  const toggle = useCallback(() => {
    const body = bodyRef.current;
    if (!body) return;

    if (!open) {
      gsap.set(body, { height: 'auto' });
      gsap.from(body, { height: 0, duration: 0.42, ease: 'power2.inOut' });
    } else {
      gsap.to(body, { height: 0, duration: 0.35, ease: 'power2.inOut' });
    }
    setOpen((v) => !v);
  }, [open]);

  return (
    <div className={styles.card} data-open={open}>
      <button className={styles.cardHeader} onClick={toggle} aria-expanded={open}>
        <span className={styles.cardTitle}>{name}</span>
        <svg
          className={`${styles.cardChevron} ${open ? styles.cardChevronOpen : ''}`}
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
      </button>
      <div ref={bodyRef} className={styles.cardBody}>
        {items.map((item) => (
          <AccordionItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      gsap.from(cardsRef.current!.children, {
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
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

        <div ref={cardsRef} className={styles.cards}>
          {CATEGORIES_DATA.map((cat) => (
            <CategoryCard key={cat.name} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
