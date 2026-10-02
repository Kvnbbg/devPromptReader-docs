/**
 * One-call Lecteur a11y boot — skip link, keys, contrast, motion-aware scroll.
 * No framework. Pair with existing createAutoScroll / applyReaderTheme.
 * @module lecteur-a11y-boot
 */

import { ensureSkipLink, bindLecteurKeys } from './a11y-keyboard.js';
import { setHighContrast, systemPrefersMoreContrast } from './a11y-contrast.js';
import { prefersReducedMotion } from './a11y-motion.js';
import { announce } from './a11y-live-region.js';
import { createAutoScroll, SCROLL_PRESETS } from './reader-auto-scroll.js';

/**
 * @param {{
 *   mainId?: string,
 *   readerEl?: HTMLElement,
 *   highContrast?: boolean,
 *   autoScroll?: boolean,
 *   scrollSpeed?: number,
 *   onNext?: () => void,
 *   onPrev?: () => void,
 *   onTheme?: () => void,
 *   onSearch?: () => void,
 *   lang?: 'fr'|'en',
 * }} [opts]
 * @returns {{ destroy: () => void, scroll: object|null, announce: typeof announce }}
 */
export function bootLecteurA11y(opts) {
  const o = opts || {};
  const mainId = o.mainId || 'main';
  ensureSkipLink(mainId, o.lang === 'en' ? 'Skip to content' : 'Aller au contenu');

  const reader = o.readerEl || null;
  if (reader && (o.highContrast === true || systemPrefersMoreContrast())) {
    setHighContrast(reader, true);
  }

  let scroll = null;
  if (reader && o.autoScroll && !prefersReducedMotion()) {
    scroll = createAutoScroll(reader, {
      speedPxPerSec: o.scrollSpeed != null ? o.scrollSpeed : SCROLL_PRESETS.medium,
    });
  }

  const unbindKeys = bindLecteurKeys(typeof document !== 'undefined' ? document : reader, {
    onNext: o.onNext,
    onPrev: o.onPrev,
    onPauseScroll: function () {
      if (scroll) {
        if (scroll.isRunning()) scroll.pause();
        else scroll.resume();
      }
    },
    onTheme: o.onTheme,
    onSearch: o.onSearch,
  });

  return {
    scroll: scroll,
    announce: announce,
    destroy: function () {
      unbindKeys();
      if (scroll) scroll.stop();
    },
  };
}
