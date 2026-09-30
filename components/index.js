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
export { runSmokeAssert } from './smoke-assert.js';
