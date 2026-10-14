import { useEffect, useLayoutEffect, useState } from 'react';

export const WDTH_MIN = 62; // Archivo's narrowest width
export const WDTH_MAX = 125; // Archivo's widest width

export function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Sizes a single line of text so it exactly fills its parent's width,
 * measured at the given font width (wdth) so it never overflows when the
 * text later stretches up to that width.
 */
export function useFitText(ref, { wdth = 100, wght = 900, deps = [] } = {}) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;

    const fit = () => {
      const prevVar = el.style.fontVariationSettings;
      el.style.fontSize = '100px';
      el.style.fontVariationSettings = `"wdth" ${wdth}, "wght" ${wght}`;
      // Children may carry their own variation settings during animations.
      el.classList.add('is-measuring');
      const textWidth = el.scrollWidth;
      el.classList.remove('is-measuring');
      el.style.fontVariationSettings = prevVar;
      const available = parent.clientWidth;
      if (textWidth > 0) el.style.fontSize = `${(100 * available) / textWidth}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    let cancelled = false;
    document.fonts?.ready.then(() => !cancelled && fit());
    return () => {
      cancelled = true;
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Calls `onProgress(p)` on every animation frame while scrolling, where p
 * runs 0 → 1 as the element moves from `start` to `end` (fractions of the
 * viewport height, measured at the element's top edge).
 */
export function useScrollProgress(ref, onProgress, { start = 1, end = 0.35, enabled = true } = {}) {
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const p = (vh * start - top) / (vh * (start - end));
      onProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, onProgress, start, end, enabled]);
}

/** Adds `is-visible` to the element once it scrolls into view. */
export function useRevealOnce(ref, { threshold = 0 } = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, visible]);
  return visible;
}
