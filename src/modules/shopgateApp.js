import { getParameterFromQueryString, getQSFromUrl } from './url';
import { getCookie, setCookie, invalidateCookie } from './cookies';

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
