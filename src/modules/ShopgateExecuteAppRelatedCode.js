import { isShopgateIosApp } from './IsShopgateIosApp';
import { shopgateExecuteWithRetry } from './ShopgateExecuteWithRetry';
import { isShopgateApp } from './IsShopgateApp';

let shopgateApp = false;

/**
 * Executes Shopgate App related Code
 *
 * @param {function} executeCallback callback has to return true
 */
export function shopgateExecuteAppRelatedCode(executeCallback) {
  if (shopgateApp === false) {
    if (isShopgateIosApp() && !isShopgateApp()) {
      shopgateExecuteWithRetry(25, 2500, () => {
        if (!isShopgateApp()) {
          return false;
        }

        shopgateApp = true;
        shopgateExecuteAppRelatedCode(executeCallback);

        return true;
      });
      return;
    }

    if (isShopgateApp()) {
      shopgateApp = true;
    }
  }

  if (shopgateApp) {
    executeCallback();
  }
}
