/**
 * Barrel — autonomous ES modules, no compilation.
 * @module components/index
 */

export { readJson, writeJson, removeKey } from './safe-storage.js';
export { createSoftNoticeQueue } from './soft-notice.js';
export {
  loadBoosters,
  saveBoosters,
  maybeGrantBooster,
  consumeBooster,
  listBoosterTypes,
} from './boosters.js';
export { createChronosLives } from './chronos-lives.js';
export {
  DISCLAIMER,
  defaultHospitalState,
  loadHospital,
  saveHospital,
  applyConsequence,
  gradeFromXp,
} from './hospital-state.js';
export { createGameSession, DISCLAIMER as HOSPITAL_DISCLAIMER } from './integrate.js';
export {
  defaultDashboard,
  loadDashboard,
  saveDashboard,
  mergeGameIntoDashboard,
} from './dashboard-dry.js';
export {
  defaultMoneyQuest,
  loadMoneyQuest,
  saveMoneyQuest,
  recordMoneySlice,
} from './money-quest-progress.js';
export {
  isValidEmail,
  isBlockedCardholderName,
  validateCheckoutFields,
  assertCheckoutAllowed,
} from './checkout-guard.js';
export {
  recordPaymentProof,
  recordAccessProof,
  findProofsFor,
  exportProofs,
} from './access-proof.js';
export { validatePaymentRequestBody } from './server-validate.js';
export {
  buildCheckoutSessionParams,
  cardThreeDSecureOptions,
  accessMetadata,
} from './checkout-session-options.js';
export {
  requireLoggedInUser,
  assertCanPurchaseEntitlement,
  kindRequiresAuth,
  AUTH_REQUIRED_KINDS,
} from './require-auth-gate.js';
export {
  getOrientation,
  isLandscape,
  onOrientationChange,
  orientationClass,
} from './orientation-media.js';
export {
  MIN_TOUCH_PX,
  measureTouchTarget,
  ensureMinTouchSize,
  findSmallTouchTargets,
} from './touch-targets.js';
export { addPointerListener, bindPressSurface } from './touch-listeners.js';
export { attachSwipe } from './touch-swipe.js';
export { attachPress } from './touch-press.js';
export { createAutoScroll, SCROLL_PRESETS } from './reader-auto-scroll.js';
export { applySeoHead, applySocialMeta } from './seo-head-dry.js';
export {
  setJsonLd,
  lecteurAppJsonLd,
  breadcrumbJsonLd,
} from './seo-json-ld.js';
export { applyLecteurSeoBoost, SEO_DRY_CHECKLIST } from './seo-boost-dry.js';
export {
  ensureSearchBarStyles,
  playRipple,
  playBounce,
  enhanceSearchBar,
} from './search-bar-fx.js';
export {
  THEMES,
  ensureReaderThemeStyles,
  applyReaderTheme,
  cycleTheme,
} from './reader-theme.js';
export { announce } from './a11y-live-region.js';
export { trapFocus } from './a11y-focus-trap.js';
export {
  LECTEUR_KEYS,
  bindLecteurKeys,
  ensureSkipLink,
} from './a11y-keyboard.js';
export {
  ensureContrastStyles,
  setHighContrast,
  systemPrefersMoreContrast,
} from './a11y-contrast.js';
export { prefersReducedMotion, runWithMotionPreference } from './a11y-motion.js';
export {
  getParrainageCopy,
  isPressureCopy,
  PARRAINAGE_FORBIDDEN_PATTERNS,
} from './parrainage-a11y-copy.js';
export { bootLecteurA11y } from './lecteur-a11y-boot.js';
export {
  EYE_MODES,
  ensureEyeComfortAssets,
  defaultEyeComfort,
  loadEyeComfort,
  saveEyeComfort,
  applyEyeComfort,
  cycleEyeMode,
} from './eye-comfort.js';
export { runSmokeAssert } from './smoke-assert.js';
