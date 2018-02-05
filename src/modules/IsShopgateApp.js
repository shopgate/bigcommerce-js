/**
 * Determines if the current browser is a Shopgate App or not
 *
 * @returns {*}
 */
export function isShopgateApp() {
  return !!window.SGJavascriptBridge;
}
