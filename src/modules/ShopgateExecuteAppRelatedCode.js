import { isShopgateIosApp } from './IsShopgateIosApp';
import { shopgateExecuteWithRetry } from './ShopgateExecuteWithRetry';
import { isShopgateJSBridgeAvailable } from './isShopgateJSBridgeAvailable';

let shopgateApp = false;

/**
 * Executes Shopgate App related Code
 *
 * @param {function} executeCallback callback has to return true
 */
export function shopgateExecuteAppRelatedCode(executeCallback) {
  if (shopgateApp === false) {
    if (isShopgateIosApp() && !isShopgateJSBridgeAvailable()) {
      shopgateExecuteWithRetry(25, 2500, () => {
        if (!isShopgateJSBridgeAvailable()) {
          return false;
        }

        shopgateApp = true;
        shopgateExecuteAppRelatedCode(executeCallback);

        return true;
      });
      return;
    }

    if (isShopgateJSBridgeAvailable()) {
      shopgateApp = true;
    }
  }

  if (shopgateApp) {
    executeCallback();
  }
}
