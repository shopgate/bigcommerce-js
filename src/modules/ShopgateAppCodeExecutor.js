import { executeWithRetry } from './executeWithRetry';
import { isShopgateJSBridgeAvailable } from './isShopgateJSBridgeAvailable';

/**
 * This class takes care if Shopgate App related code should be executed or not
 * depending on the environment
 */
export class ShopgateAppCodeExecutor {
  /**
   * @param {int} [intervalInMilliseconds=25]               interval in milliseconds to check
   *                                                       if a shopgate app environment is set
   * @param {int} [maximumIntervalTimeInMilliseconds=2500] maximum interval in milliseconds to check
   *                                                       if a shopgate app environment is set
   */
  constructor(intervalInMilliseconds = 25, maximumIntervalTimeInMilliseconds = 2500) {
    this.intervalInMiliseconds = intervalInMilliseconds;
    this.maximumIntervalTimeInMilliseconds = maximumIntervalTimeInMilliseconds;
    this.callbacks = [];
    this.isShopgateApp = null;
    this.evaluateShopgateApp();
  }

  /**
   * Tries to execute a Shopgate App related code
   *
   * @param {function} callback the method to call if we are executed inside of a Shopgate App
   */
  execute(callback) {
    if (typeof callback !== 'function') {
      return;
    }

    if (!this.isShopgateApp) {
      this.callbacks.push(callback);
      return;
    }

    callback();
  }

  /**
   * Tries to identify if we are currently in a Shopgate App environment
   * @private
   */
  evaluateShopgateApp() {
    executeWithRetry(this.intervalInMiliseconds, this.maximumIntervalTimeInMilliseconds, () => {
      if (!isShopgateJSBridgeAvailable()) {
        return false;
      }

      this.isShopgateApp = true;
      this.executeQueuedCallbacks();

      return true;
    });
  }

  /**
   * Will execute all saved callbacks
   * @private
   */
  executeQueuedCallbacks() {
    this.callbacks.forEach((callback) => {
      if (typeof callback !== 'function') {
        return;
      }

      callback();
    });
  }
}
