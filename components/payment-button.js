/**
 * Payment button — only starts Checkout if offer is configured.
 * Requires createSession: async () => ({ url: string }) from your backend.
 * Never embeds secret Stripe keys in the client.
 * @module payment-button
 */

import {
  assertOfferReadyForCheckout,
  buildCheckoutMetadata,
  resolveOffer,
} from './entitlements-resolve.js';
import { announce } from './a11y-live-region.js';

/**
 * @param {HTMLElement} mountEl
 * @param {{
 *   productKey: string,
 *   interval?: 'month'|'year',
 *   label?: string,
 *   lang?: 'fr'|'en',
 *   createSession: (payload: {
 *     productKey: string,
 *     interval: string,
 *     metadata: object,
 *   }) => Promise<{ url?: string, error?: string }>,
 * }} opts
 * @returns {{ destroy: () => void }}
 */
export function mountPaymentButton(mountEl, opts) {
  const o = opts || {};
  if (!mountEl) return { destroy: function () {} };

  const productKey = o.productKey;
  const interval = o.interval === 'year' ? 'year' : 'month';
  const lang = o.lang === 'en' ? 'en' : 'fr';

  let resolved;
  try {
    resolved = assertOfferReadyForCheckout(productKey, interval);
  } catch (err) {
    mountEl.innerHTML =
      '<p role="alert">' +
      (lang === 'en'
        ? 'Payment unavailable: offer not configured.'
        : 'Paiement indisponible : offre non configurée.') +
      '</p>';
    return { destroy: function () {} };
  }

  const meta = buildCheckoutMetadata(productKey, interval);
  const label =
    o.label ||
    (lang === 'en'
      ? 'Pay ' + resolved.amount_eur + ' €'
      : 'Payer ' + String(resolved.amount_eur).replace('.', ',') + ' €');

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = label;
  btn.setAttribute('data-product-key', productKey);
  btn.style.minHeight = '48px';
  btn.style.minWidth = '48px';
  btn.style.padding = '0.65rem 1.25rem';
  btn.style.fontSize = '1rem';
  btn.style.cursor = 'pointer';

  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  status.style.marginTop = '0.5rem';
  status.style.fontSize = '0.9rem';

  let busy = false;

  async function onClick() {
    if (busy) return;
    if (typeof o.createSession !== 'function') {
      status.textContent =
        lang === 'en'
          ? 'Missing createSession (server).'
          : 'createSession serveur manquant.';
      return;
    }
    busy = true;
    btn.disabled = true;
    status.textContent =
      lang === 'en' ? 'Redirecting to secure payment…' : 'Redirection vers le paiement sécurisé…';
    announce(status.textContent);
    try {
      const res = await o.createSession({
        productKey: productKey,
        interval: interval,
        metadata: meta,
      });
      if (res && res.url && /^https:\/\//i.test(res.url)) {
        window.location.href = res.url;
        return;
      }
      status.textContent =
        (res && res.error) ||
        (lang === 'en' ? 'Could not start checkout.' : 'Impossible de démarrer le paiement.');
    } catch (e) {
      status.textContent =
        lang === 'en' ? 'Payment error.' : 'Erreur de paiement.';
    }
    busy = false;
    btn.disabled = false;
  }

  btn.addEventListener('click', onClick);
  mountEl.innerHTML = '';
  mountEl.appendChild(btn);
  mountEl.appendChild(status);

  const info = document.createElement('p');
  info.style.fontSize = '0.85rem';
  info.style.opacity = '0.85';
  if (resolved.credits_per_month > 0) {
    info.textContent =
      lang === 'en'
        ? 'Includes ' + resolved.credits_per_month + ' credits / month.'
        : 'Inclut ' + resolved.credits_per_month + ' crédits / mois.';
  } else if (resolved.apps.length) {
    info.textContent =
      lang === 'en'
        ? 'Access: ' + resolved.apps.join(', ')
        : 'Accès : ' + resolved.apps.join(', ');
  }
  mountEl.appendChild(info);

  return {
    destroy: function () {
      btn.removeEventListener('click', onClick);
      mountEl.innerHTML = '';
    },
  };
}

export function describeOffer(productKey, interval) {
  return resolveOffer(productKey, interval);
}
