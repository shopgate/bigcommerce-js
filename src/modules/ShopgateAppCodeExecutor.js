import { executeWithRetry } from './executeWithRetry';
import { isShopgateJSBridgeAvailable } from './isShopgateJSBridgeAvailable';

/**
 * This class takes care if Shopgate App related code should be executed or not
 * depending on the environment
 */
export class ShopgateAppCodeExecutor {
  /**
   * @constructor
   */
  constructor() {
    this.shopgateApp = null;
    this.evaluate = false;
    this.callbacks = [];
  }

  /**
   * Tries to execute a Shopgate App related code
   *
   * @param {function} callback the method to call if we are executed inside of a Shopgate App
   */
  execute(callback) {
    if (!this.shopgateApp) {
      this.callbacks.push(callback);

      if (this.shopgateApp === null) {
        this.evaluateShopgateApp();
      }
      return;
    }

    callback();
  }

  /**
   * Tries to identify if we are currently in a Shopgate App environment
   * @private
   */
  evaluateShopgateApp() {
    if (this.shopgateApp === false || this.evaluate) {
      return;
    }
    this.evaluate = true;

    executeWithRetry(25, 2500, () => {
      if (!isShopgateJSBridgeAvailable()) {
        return false;
      }

      this.shopgateApp = true;
      this.executeQueuedCallbacks();

      return true;
    }, () => {
      this.shopgateApp = false;
    });
  }

  /**
   * Will execute all saved callbacks
   * @private
   */
  executeQueuedCallbacks() {
    for (let i = 0; i < this.callbacks.length; i += 1) {
      this.callbacks[i]();
    }
  }
}
