import { getParameterFromQueryString } from './url';
import { getCookie, setCookie } from './cookies';

/**
 * Returns query string parameter form url.
 *
 * @param {string} url An url.
 * @returns {string}
 */
function getQSFromUrl(url) {
  const qsPosition = url.indexOf('?');
  return qsPosition !== -1 ? window.location.href.substring(qsPosition) : '';
}

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
* Inserts a "libshopgate" meta tag into the head of the page,
* to enable the Shopgate app event system.
*/
export function enableShopgateAppEvents() {
  // Check if insertion is needed
  const libshopgate = 'libshopgate';
  if (document.getElementById(libshopgate)) {
    return;
  }

  // Insert libshopgate as meta tag, to tell the Shopgate app to send events
  // Not using a script tag to avoid "src unavailable" errors in the browsers console
  const metaTag = document.createElement('meta');
  metaTag.setAttribute('id', libshopgate);
  // Add a "src" property (not an attribute, because of the iOS app not receiving it otherwise)
  metaTag.src = libshopgate;
  document.getElementsByTagName('head').item(0).appendChild(metaTag);
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
