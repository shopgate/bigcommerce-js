/**
 * Determines if the current browser is a Shopgate App or not
 *
 * @returns {boolean}
 */
export function isShopgateJSBridgeAvailable() {
  return !!window.SGJavascriptBridge;
}
