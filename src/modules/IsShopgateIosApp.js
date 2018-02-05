/**
 * Determines if the current browser is a Shopgate App or not
 *
 * @returns {*}
 */
export function isShopgateIosApp() {
  return navigator.userAgent.indexOf('libshopgate') !== -1;
}
