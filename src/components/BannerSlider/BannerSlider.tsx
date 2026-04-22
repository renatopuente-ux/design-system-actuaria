import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './BannerSlider.module.css';

interface SlideAction {
  label: string;
  onClick: () => void;
}

interface Slide {
  id: string;
  title: string;
  description?: string;
  image?: string;
  action?: SlideAction;
}

interface BannerSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

export const BannerSlider: React.FC<BannerSliderProps> = ({
  slides,
  autoPlay = true,
  interval = 5000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  }, [slides.length]);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-play: advances slide when not paused
  useEffect(() => {
    if (!autoPlay || isPaused || slides.length <= 1) return;

    timerRef.current = setInterval(goNext, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, isPaused, goNext, interval, slides.length]);

  if (slides.length === 0) return null;

  const currentSlide = slides[activeIndex];

  return (
    <section
      className={styles['bs-root']}
      aria-label="Banner de contenido destacado"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide display */}
      <div className={styles['bs-track']} aria-live="polite" aria-atomic="true">
        {currentSlide.image && (
          <img
            src={currentSlide.image}
            alt=""
            className={styles['bs-image']}
            aria-hidden="true"
          />
        )}
        <div className={styles['bs-slide-content']}>
          <h2 className={styles['bs-title']}>{currentSlide.title}</h2>
          {currentSlide.description && (
            <p className={styles['bs-description']}>{currentSlide.description}</p>
          )}
          {currentSlide.action && (
            <button
              type="button"
              className={styles['bs-cta']}
              onClick={currentSlide.action.onClick}
            >
              {currentSlide.action.label}
            </button>
          )}
        </div>
      </div>

      {/* Prev / Next arrows */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles['bs-arrow']} ${styles['bs-arrow--prev']}`}
            onClick={goPrev}
            aria-label="Diapositiva anterior"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles['bs-arrow']} ${styles['bs-arrow--next']}`}
            onClick={goNext}
            aria-label="Siguiente diapositiva"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className={styles['bs-dots']} role="tablist" aria-label="Seleccionar diapositiva">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Diapositiva ${i + 1}: ${slide.title}`}
              className={`${styles['bs-dot']} ${i === activeIndex ? styles['bs-dot--active'] : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
