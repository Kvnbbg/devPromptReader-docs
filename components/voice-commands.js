/**
 * In-app voice commands via Web Speech API (when available).
 * Complements OS Voice Control — does not replace it.
 * @module voice-commands
 */

/**
 * @param {'fr'|'en'} [lang]
 * @returns {Record<string, string[]>}
 */
export function defaultCommandMap(lang) {
  if (lang === 'en') {
    return {
      next: ['next', 'next page', 'forward'],
      prev: ['previous', 'back', 'prev page'],
      pause: ['pause', 'stop scroll', 'stop'],
      resume: ['resume', 'play', 'continue'],
      theme: ['theme', 'change theme'],
      scan: ['scan', 'next item'],
      select: ['select', 'choose', 'click'],
      help: ['help', 'commands'],
    };
  }
  return {
    next: ['suivant', 'page suivante', 'après'],
    prev: ['précédent', 'page précédente', 'retour'],
    pause: ['pause', 'arrêt', 'stop'],
    resume: ['reprise', 'reprendre', 'continuar', 'continue'],
    theme: ['thème', 'theme', 'contraste'],
    scan: ['scan', 'suivant élément', 'élément suivant'],
    select: ['valider', 'sélectionner', 'choisir', 'ok'],
    help: ['aide', 'commandes'],
  };
}

function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * @param {{
 *   lang?: 'fr'|'en',
 *   commands?: Record<string, string[]>,
 *   onCommand?: (name: string, phrase: string) => void,
 *   continuous?: boolean,
 * }} [opts]
 * @returns {{ start: () => void, stop: () => void, supported: boolean }}
 */
export function createVoiceCommands(opts) {
  const o = opts || {};
  const lang = o.lang === 'en' ? 'en' : 'fr';
  const map = o.commands || defaultCommandMap(lang);
  const SR =
    typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  if (!SR) {
    return {
      supported: false,
      start: function () {},
      stop: function () {},
    };
  }

  const rec = new SR();
  rec.lang = lang === 'en' ? 'en-US' : 'fr-FR';
  rec.continuous = o.continuous !== false;
  rec.interimResults = false;

  rec.onresult = function (event) {
    const last = event.results[event.results.length - 1];
    if (!last || !last[0]) return;
    const phrase = normalize(last[0].transcript);
    const keys = Object.keys(map);
    for (let i = 0; i < keys.length; i++) {
      const name = keys[i];
      const phrases = map[name] || [];
      for (let j = 0; j < phrases.length; j++) {
        if (phrase.indexOf(normalize(phrases[j])) !== -1) {
          if (typeof o.onCommand === 'function') o.onCommand(name, phrase);
          return;
        }
      }
    }
  };

  rec.onerror = function () {
    /* permission or network — fail silent for UX */
  };

  return {
    supported: true,
    start: function () {
      try {
        rec.start();
      } catch (_) {}
    },
    stop: function () {
      try {
        rec.stop();
      } catch (_) {}
    },
  };
}
