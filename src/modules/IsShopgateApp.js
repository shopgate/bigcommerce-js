/**
 * Determines if the current browser is a Shopgate App or not
 *
 * @returns {boolean}
 */
export function isShopgateApp() {
  return !!window.SGJavascriptBridge;
}
