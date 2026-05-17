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
  'First impressions matter',
  'It has a considerable impact on interpersonal interactions',
  'Small improvements can drastically impact quality of life',
];

const KEY_BULLETS = [
  'Not chasing unrealistic standards',
  'Not trying to look like someone else',
  'Not seeking perfection',
  'Aiming only for a better version of yourself',
];

export default function Philosophy() {
  const frameRef = useRef<HTMLDivElement>(null);
  const considerTextRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(considerTextRef.current, {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: considerTextRef.current, start: 'top 80%' },
      });

      gsap.from(leftCardRef.current, {
        x: -60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: leftCardRef.current, start: 'top 85%' },
      });

      gsap.from(rightCardRef.current, {
        x: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: rightCardRef.current, start: 'top 85%' },
      });
    }, frameRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={frameRef} className={styles.philosophyFrame}>

      {/* ── Sticky video ── */}
      <div className={styles.videoSticky}>
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
        <div className={styles.bgVideoOverlay}></div>
      </div>

      {/* Single blur overlay spanning insecurity + consider */}
      <div className={styles.blurOverlay} />

      {/* ── Insecurity section ── */}
      <section className={styles.insecurity}>
        <div className={styles.insecurityInner}>
          <h2 className={styles.insecurityHeading}>
            Will analyzing my face
            <span className={styles.insecurityHeadingAccent}>Make me insecure?</span>
          </h2>
          <p className={styles.insecurityBody}>
            Most insecurity comes from uncertainty — not knowing if your concerns are real or
            imagined. When you&rsquo;re guessing about your appearance, your mind often makes
            things seem worse than they are.
          </p>

          <div className={styles.cards}>
            {CARDS.map((card) => (
              <div key={card.title} className={styles.card}>
                <div className={styles.cardImageWrap}>
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
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

      {/* ── Consider section ── */}
      <section className={styles.consider}>

        {/* Text appears first on scroll */}
        <div ref={considerTextRef} className={styles.considerText}>
          <h3 className={styles.considerHeading}>
            Is it vain to care
            <span className={styles.considerAccent}>about your appearance?</span>
          </h3>
          <p className={styles.considerBody}>
            Many feel guilty about wanting to improve their looks, fearing it means
            they&rsquo;re shallow or insecure. But here&rsquo;s what research tells us:
            caring about appearance is natural, just like caring about finances and
            education, it&rsquo;s just another form of self-improvement.
          </p>
        </div>

        {/* Cards slide in after text */}
        <div className={styles.considerCards}>
          <div ref={leftCardRef} className={styles.considerCard}>
            <p className={styles.considerCardTitle}>Consider this...</p>
            <div className={styles.considerCardImage} />
            <div className={styles.considerCardBullets}>
              {CONSIDER_BULLETS.map((b) => (
                <span key={b} className={styles.considerBullet}>{b}</span>
              ))}
            </div>
          </div>

          <div ref={rightCardRef} className={styles.considerCard}>
            <h3 className={styles.considerCardHeading}>
              The key is approaching it intelligently
            </h3>
            <div className={styles.considerCardBullets}>
              {KEY_BULLETS.map((b) => (
                <span key={b} className={styles.considerBullet}>{b}</span>
              ))}
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
