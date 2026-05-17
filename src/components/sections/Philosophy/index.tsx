'use client';

import Image from 'next/image';
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
  return (
    <div className={styles.philosophyFrame}>

      {/* ── Sticky video — stays fixed behind both sections as they scroll over it ── */}
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

      </div>

      {/* ── Insecurity section — scrolls naturally over the sticky video ── */}
      <section className={styles.insecurity}>
        {/* Blur slices: start at 50% of the section, increase toward bottom.
            z-index 0 keeps them below the content (insecurityInner is z-index 1). */}
        <div className={styles.blurSlice} style={{ top: '50%', backdropFilter: 'blur(3px)',  WebkitBackdropFilter: 'blur(3px)'  }} />
        <div className={styles.blurSlice} style={{ top: '62%', backdropFilter: 'blur(8px)',  WebkitBackdropFilter: 'blur(8px)'  }} />
        <div className={styles.blurSlice} style={{ top: '72%', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)' }} />
        <div className={styles.blurSlice} style={{ top: '81%', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }} />

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

      {/* ── Consider section — follows insecurity, still over the sticky video ── */}
      <section className={styles.consider}>
        <div className={styles.considerInner}>
          <div className={styles.considerLeft}>
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
                <li key={b} className={styles.bulletItem}>{b}</li>
              ))}
            </ul>
          </div>

          <div className={styles.considerRight}>
            <p className={styles.considerRightLabel}>The key is approaching it intelligently</p>
            <h3 className={styles.keyHeading}>
              Not chasing perfection —{' '}
              <span className={styles.keyAccent}>chasing clarity</span>
            </h3>
            <ul className={styles.keyBullets}>
              {KEY_BULLETS.map((b) => (
                <li key={b} className={styles.keyBullet}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
