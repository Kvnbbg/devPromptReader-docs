/**
 * Parrainage copy — neutral, non-guilt, accessible wording (FR + EN).
 * Psycho-safe defaults for referral UI.
 * @module parrainage-a11y-copy
 */

const FR = {
  title: 'Parrainage (optionnel)',
  body: 'Si vous le souhaitez, vous pouvez inviter une personne de confiance. Ce n’est pas obligatoire et cela ne change pas votre accès actuel.',
  cta: 'Générer un lien d’invitation',
  later: 'Plus tard',
  success: 'Lien prêt. Vous pouvez le copier ou l’envoyer quand vous voulez.',
  error: 'Le lien n’a pas pu être créé. Vous pouvez réessayer ou passer cette étape.',
  skip: 'Continuer sans parrainer',
};

const EN = {
  title: 'Referral (optional)',
  body: 'If you want, you can invite someone you trust. It is not required and does not change your current access.',
  cta: 'Create invite link',
  later: 'Not now',
  success: 'Link ready. Copy or send it whenever you like.',
  error: 'Could not create the link. You can retry or skip this step.',
  skip: 'Continue without referring',
};

/**
 * @param {'fr'|'en'} [lang]
 */
export function getParrainageCopy(lang) {
  return lang === 'en' ? Object.assign({}, EN) : Object.assign({}, FR);
}

/** Keys that must never be used in UI (guilt / pressure). */
export const PARRAINAGE_FORBIDDEN_PATTERNS = [
  /obligatoire/i,
  /required to continue/i,
  /vos amis/i,
  /don't miss/i,
  /dernière chance/i,
  /only today/i,
];

/**
 * @param {string} text
 * @returns {boolean} true if text looks pressure-y
 */
export function isPressureCopy(text) {
  const s = String(text || '');
  for (let i = 0; i < PARRAINAGE_FORBIDDEN_PATTERNS.length; i++) {
    if (PARRAINAGE_FORBIDDEN_PATTERNS[i].test(s)) return true;
  }
  return false;
}
