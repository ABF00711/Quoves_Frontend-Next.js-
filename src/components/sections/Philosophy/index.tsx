'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Philosophy.module.scss';

const CARDS = [
  {
    img: '/images/LifestyleFactors_image.png',
    title: 'Lifestyle factors',
    desc: 'Considers diet, climate, stress, sleep, and habits.',
  },
  {
    img: '/images/Cultural_image.png',
    title: 'Cultural beauty standards',
    desc: 'Adapts to regional and societal ideals.',
  },
  {
    img: '/images/geneticFactors_image.png',
    title: 'Genetic factors',
    desc: 'Takes into account genetic factors and how they might impact your facial aesthetics.',
  },
];

const CONSIDER_BULLETS = [
  'Most insecurity comes from not knowing your actual baseline',
  'A precise report replaces vague anxiety with actionable data',
  'Knowing exactly what to improve eliminates rumination',
  'Social comparison almost always ignores lifestyle context',
];

const KEY_BULLETS = [
  'Not chasing unrealistic benchmarks',
  'Not trying to look like someone else',
  'Not seeking perfection',
  'Aiming only for a better version of yourself',
];

export default function Philosophy() {
  const insecurityRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const considerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading & body
      gsap.from([headingRef.current, bodyRef.current], {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: insecurityRef.current, start: 'top 70%' },
      });

      // Cards
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        });
      }

      // Consider section
      gsap.from(leftRef.current, {
        x: -32,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: considerRef.current, start: 'top 75%' },
      });

      gsap.from(rightRef.current, {
        x: 32,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: considerRef.current, start: 'top 75%' },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Full-bleed insecurity section ── */}
      <section ref={insecurityRef} className={styles.insecurity}>
        <video
          className={styles.bgVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/landing-video.mp4" type="video/mp4" />
        </video>

        <div className={styles.insecurityInner}>
          <h2 ref={headingRef} className={styles.insecurityHeading}>
            Will analyzing my face
            <span className={styles.insecurityHeadingAccent}>Make me insecure?</span>
          </h2>
          <p ref={bodyRef} className={styles.insecurityBody}>
            Most insecurity comes from uncertainty — not knowing if your concerns are real or
            imagined. When you&rsquo;re guessing about your appearance, your mind often makes
            things seem worse than they are.
          </p>

          <div ref={cardsRef} className={styles.cards}>
            {CARDS.map((card) => (
              <div key={card.title} className={styles.card}>
                <div className={styles.cardImageWrap}>
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="width: 120px"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>
                <div>
                  <p className={styles.cardTitle}>{card.title}</p>
                  <p className={styles.cardDesc}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Consider this / Is it vain section ── */}
      <section ref={considerRef} className={styles.consider}>
        <div className={styles.considerInner}>
          <div ref={leftRef} className={styles.considerLeft}>
            <p className={styles.considerLabel}>Consider this</p>
            <h3 className={styles.considerHeading}>
              Is it vain to care about{' '}
              <span className={styles.considerAccent}>your appearance?</span>
            </h3>
            <p className={styles.considerBody}>
              Most people care about how they look — that&rsquo;s not vanity, it&rsquo;s human.
              The question is whether you approach it with intention or anxiety. Appearance
              affects first impressions, self-confidence, and social outcomes in measurable ways.
              Ignoring that doesn&rsquo;t make it go away.
            </p>
            <ul className={styles.bulletList}>
              {CONSIDER_BULLETS.map((b) => (
                <li key={b} className={styles.bulletItem}>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div ref={rightRef} className={styles.considerRight}>
            <p className={styles.considerRightLabel}>The key is approaching it intelligently</p>
            <h3 className={styles.keyHeading}>
              Not chasing perfection —{' '}
              <span className={styles.keyAccent}>chasing clarity</span>
            </h3>
            <ul className={styles.keyBullets}>
              {KEY_BULLETS.map((b) => (
                <li key={b} className={styles.keyBullet}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
