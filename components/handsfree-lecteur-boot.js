/**
 * Boot Lecteur for eyes / head / voice users.
 * Combines sequential nav, optional voice, gaze targets, a11y keys.
 * @module handsfree-lecteur-boot
 */

import { bootLecteurA11y } from './lecteur-a11y-boot.js';
import { createSequentialNav } from './sequential-nav.js';
import { createVoiceCommands } from './voice-commands.js';
import { enlargeTargetsForGaze } from './gaze-friendly.js';
import { announce } from './a11y-live-region.js';

/**
 * @param {{
 *   readerEl?: HTMLElement,
 *   mainId?: string,
 *   lang?: 'fr'|'en',
 *   voice?: boolean,
 *   onNext?: () => void,
 *   onPrev?: () => void,
 *   onTheme?: () => void,
 * }} [opts]
 */
export function bootHandsFreeLecteur(opts) {
  const o = opts || {};
  const lang = o.lang === 'en' ? 'en' : 'fr';

  if (o.readerEl) enlargeTargetsForGaze(o.readerEl);
  else if (typeof document !== 'undefined') enlargeTargetsForGaze(document);

  const a11y = bootLecteurA11y({
    mainId: o.mainId || 'main',
    readerEl: o.readerEl,
    highContrast: true,
    autoScroll: false,
    lang: lang,
    onNext: o.onNext,
    onPrev: o.onPrev,
    onTheme: o.onTheme,
  });

  const seq = createSequentialNav({
    root: o.readerEl || (typeof document !== 'undefined' ? document : null),
    announce: announce,
    lang: lang,
  });

  let voice = null;
  if (o.voice !== false) {
    voice = createVoiceCommands({
      lang: lang,
      onCommand: function (name) {
        if (name === 'next' && o.onNext) o.onNext();
        else if (name === 'prev' && o.onPrev) o.onPrev();
        else if (name === 'pause' && a11y.scroll) a11y.scroll.pause();
        else if (name === 'resume' && a11y.scroll) a11y.scroll.resume();
        else if (name === 'theme' && o.onTheme) o.onTheme();
        else if (name === 'scan') seq.next();
        else if (name === 'select') seq.select();
        else if (name === 'help') {
          announce(
            lang === 'en'
              ? 'Commands: next, previous, scan, select, pause, theme'
              : 'Commandes : suivant, précédent, scan, valider, pause, thème'
          );
        }
      },
    });
    if (voice.supported) voice.start();
  }

  announce(
    lang === 'en'
      ? 'Hands-free mode ready. Say help, or use scan and select.'
      : 'Mode mains libres prêt. Dites aide, ou utilisez scan et valider.'
  );

  return {
    seq: seq,
    voice: voice,
    a11y: a11y,
    destroy: function () {
      seq.destroy();
      if (voice) voice.stop();
      a11y.destroy();
    },
  };
}
