/**
 * Determines if the current browser is a Shopgate App or not
 *
 * @returns {boolean}
 */
export function isShopgateAndroidApp() {
  return !!window.SGJavascriptBridge && navigator.userAgent.indexOf('libshopgate') === -1;
}

/**
 * Determines if the current browser is a Shopgate App or not
 *
 * @returns {boolean}
 */
export function isShopgateIosApp() {
  return navigator.userAgent.indexOf('libshopgate') !== -1;
}
