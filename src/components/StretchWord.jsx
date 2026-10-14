import { useCallback, useRef } from 'react';
import { useFitText, useScrollProgress, usePrefersReducedMotion, WDTH_MIN, WDTH_MAX } from '../hooks';

/**
 * The giant section word. It is sized to fill the full width at Archivo's
 * widest setting, starts condensed, and stretches out as it scrolls into
 * view. The bottom of the letters is clipped by the section below.
 */
export default function StretchWord({ children, id }) {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useFitText(textRef, { wdth: WDTH_MAX, wght: 800 });

  const onProgress = useCallback((p) => {
    const el = textRef.current;
    if (!el) return;
    // ease-out so the stretch settles as the section arrives
    const e = 1 - Math.pow(1 - p, 3);
    const wdth = WDTH_MIN + (WDTH_MAX - WDTH_MIN) * e;
    el.style.fontVariationSettings = `"wdth" ${wdth.toFixed(2)}, "wght" 800`;
  }, []);

  useScrollProgress(wrapRef, onProgress, { start: 1, end: 0.3, enabled: !reduced });

  return (
    <div className="stretch" ref={wrapRef} id={id}>
      <h2 className="stretch__word" ref={textRef} style={{ fontVariationSettings: `"wdth" ${reduced ? WDTH_MAX : WDTH_MIN}, "wght" 800` }}>
        {children}
      </h2>
    </div>
  );
}
