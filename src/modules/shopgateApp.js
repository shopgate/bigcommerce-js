import { getParameterFromQueryString, getQSFromUrl } from './url';
import { getCookie, setCookie, invalidateCookie } from './cookies';
import { sendAppCommands } from './sendAppCommands';
import { presentNotification } from './app_commands/presentNotification';
import { closeNotification } from './app_commands/closeNotification';

const STORAGE_KEY_LOADING_SCREEN_ENABLED = 'shopgateAppLoadingScreenEnabled';

/**
 * Returns a path app should be redirected when the process on bigcommerce side is done.
 * @returns {string}
 */
export function getRedirectPath() {
  const sgCallback = JSON.parse(getParameterFromQueryString(getQSFromUrl(window.location.href), 'sgcloud_callback_data'));
  if (!sgCallback || !sgCallback.redirectTo) {
    return '/';
  }

  return sgCallback.redirectTo;
}

/**
 * Provides true if the request is webcheckout false otherwise.
 * @returns {boolean}
 */
export function isWebcheckout() {
  return parseInt(getCookie('sgcloud_checkout'), 10) === 1;
}

/**
 * Checks if this is a webcheckout.
 */
export function checkWebcheckout() {
  const webcheckout = getParameterFromQueryString(getQSFromUrl(window.location.href), 'sgcloud_checkout');
  if (parseInt(webcheckout, 10) === 1) {
    setCookie('sgcloud_checkout', 1);
  }
}

/**
 * Invalidates web checkout cookie.
 */
export function invalidateWebCheckout() {
  invalidateCookie('sgcloud_checkout');
}

/**
 * Shows the loading screen if not already shown.
 *
 * @param {number} [timeout=10] For how long the screen will be shown in seconds.
 */
export function showLoadingScreen(timeout = 10) {
  if (window.localStorage.getItem(STORAGE_KEY_LOADING_SCREEN_ENABLED)) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY_LOADING_SCREEN_ENABLED, 'true');

  sendAppCommands([
    presentNotification(timeout),
  ]);
}

/**
 * Closes loading screen if one was previously shown.
 */
export function closeLoadingScreen() {
  if (!window.localStorage.getItem(STORAGE_KEY_LOADING_SCREEN_ENABLED)) {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY_LOADING_SCREEN_ENABLED);

  sendAppCommands([
    closeNotification(),
  ]);
}
