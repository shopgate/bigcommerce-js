import { isShopgateIosApp } from './IsShopgateIosApp';
import { shopgateExecuteWithRetry } from './ShopgateExecuteWithRetry';
import { isShopgateApp } from './IsShopgateApp';

/**
 * Executes Shopgate App related Code
 *
 * @param {function} executeCallback callback has to return true
 */
export function shopgateExecuteAppRelatedCode(executeCallback) {
  if (!window.hasOwnProperty('isShopgateApp')) {
    if (isShopgateIosApp() && !isShopgateApp()) {
      shopgateExecuteWithRetry(25, 2500, () => {
        if (!isShopgateApp()) {
          return false;
        }

        window.isShopgateApp = true;
        shopgateExecuteAppRelatedCode(executeCallback);

        return true;
      });
      return;
    }

    if (isShopgateApp()) {
      window.isShopgateApp = true;
    }
  }

  if (window.isShopgateApp) {
    executeCallback();
  }
}
