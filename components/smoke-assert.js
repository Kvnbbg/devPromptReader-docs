/**
 * Smoke checks — browser or Node with localStorage mock.
 * @module smoke-assert
 */

import { createSoftNoticeQueue } from './soft-notice.js';
import { maybeGrantBooster, loadBoosters } from './boosters.js';
import { createChronosLives } from './chronos-lives.js';
import { createGameSession } from './integrate.js';
import { loadDashboard } from './dashboard-dry.js';
import { recordMoneySlice, loadMoneyQuest } from './money-quest-progress.js';
import {
  validateCheckoutFields,
  isBlockedCardholderName,
  isValidEmail,
} from './checkout-guard.js';
import { recordPaymentProof, findProofsFor } from './access-proof.js';
import { MIN_TOUCH_PX } from './touch-targets.js';
import { createAutoScroll, SCROLL_PRESETS } from './reader-auto-scroll.js';
import { kindRequiresAuth } from './require-auth-gate.js';
import { lecteurAppJsonLd, breadcrumbJsonLd } from './seo-json-ld.js';
import { SEO_DRY_CHECKLIST } from './seo-boost-dry.js';
import { THEMES, cycleTheme } from './reader-theme.js';

export function runSmokeAssert() {
  const checks = {};
  const errors = [];

  function check(name, fn) {
    try {
      checks[name] = !!fn();
      if (!checks[name]) errors.push(name + ' returned falsy');
    } catch (e) {
      checks[name] = false;
      errors.push(name + ': ' + (e && e.message ? e.message : String(e)));
    }
  }

  check('softNotice', function () {
    const q = createSoftNoticeQueue({ minIntervalMs: 1 });
    q.enqueue({ kind: 't', text: 'hi', priority: 1 });
    return q.getQueueLength() >= 0;
  });

  check('chronos', function () {
    const c = createChronosLives({ initialSeconds: 10, gold: 2, lives: 2 });
    c.onCorrect();
    c.onWrong(1);
    return c.getState().lives >= 0;
  });

  check('boostersApi', function () {
    loadBoosters();
    maybeGrantBooster({ streak: 0, sessionGrants: 99, dailyGrants: 99 });
    return true;
  });

  check('session', function () {
    const s = createGameSession({ useHospital: false, initialSeconds: 5 });
    s.onCorrectAnswer();
    return !!s.snapshot().chronos;
  });

  check('dashboard', function () {
    return !!loadDashboard().moneyQuest;
  });

  check('moneyQuest', function () {
    recordMoneySlice({
      sliceId: 'smoke',
      pointsDelta: 1,
      success: true,
      seconds: 1,
    });
    return loadMoneyQuest().points >= 0;
  });

  check('checkoutGuardBlocksTest', function () {
    return isBlockedCardholderName('Test') === true;
  });

  check('checkoutGuardEmail', function () {
    return isValidEmail('a@b.co') === true && isValidEmail('') === false;
  });

  check('checkoutValidate', function () {
    const bad = validateCheckoutFields({ email: '', cardName: 'Test' });
    const good = validateCheckoutFields({
      email: 'user@example.com',
      cardName: 'Ada Lovelace',
    });
    return bad.ok === false && good.ok === true;
  });

  check('accessProof', function () {
    recordPaymentProof({
      paymentIntentId: 'pi_smoke',
      email: 'user@example.com',
      amount: 5,
      currency: 'usd',
    });
    return findProofsFor('pi_smoke').length >= 1;
  });

  check('authGate', function () {
    return kindRequiresAuth('subscription') === true;
  });

  check('touchMin', function () {
    return MIN_TOUCH_PX === 44;
  });

  check('autoScroll', function () {
    const fake = { scrollTop: 0, scrollHeight: 500, clientHeight: 100 };
    const sc = createAutoScroll(fake, { speedPxPerSec: SCROLL_PRESETS.medium });
    sc.setSpeed(50);
    return sc.getSpeed() === 50 && !sc.isRunning();
  });

  check('seoJsonLd', function () {
    const app = lecteurAppJsonLd({ name: 'Lecteur' });
    const bc = breadcrumbJsonLd([{ name: 'Home', url: 'https://example.com/' }]);
    return app['@type'] === 'WebApplication' && bc.itemListElement.length === 1;
  });

  check('seoChecklist', function () {
    return Array.isArray(SEO_DRY_CHECKLIST) && SEO_DRY_CHECKLIST.length > 3;
  });

  check('readerTheme', function () {
    return THEMES.indexOf('dark') !== -1 && cycleTheme('white') === 'light';
  });

  return { ok: errors.length === 0, checks: checks, errors: errors };
}
