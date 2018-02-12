import { executeWithRetry } from './executeWithRetry';
import { isShopgateJSBridgeAvailable } from './isShopgateJSBridgeAvailable';

/**
 * This class takes care if Shopgate App related code should be executed or not
 * depending on the environment
 */
export class ShopgateAppCodeExecutor {
  /**
   * @param {int} intervalInMiliseconds             interval in milisenconds
   *                                                to check if a shopgate app environment is set
   * @param {int} maximumIntervallTimeInMiliseconds maximum interval in miliseconds
   *                                                to check if a shopgate app environment is set
   */
  constructor(intervalInMiliseconds = 25, maximumIntervallTimeInMiliseconds = 2500) {
    this.shopgateApp = null;
    this.intervalInMiliseconds = intervalInMiliseconds;
    this.maximumIntervallTimeInMiliseconds = maximumIntervallTimeInMiliseconds;
    this.callbacks = [];
    this.evaluateShopgateApp();
  }

  /**
   * Tries to execute a Shopgate App related code
   *
   * @param {function} callback the method to call if we are executed inside of a Shopgate App
   */
  execute(callback) {
    if (!this.shopgateApp) {
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
    executeWithRetry(this.intervalInMiliseconds, this.maximumIntervallTimeInMiliseconds, () => {
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
