import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { sendAppCommands } from '../../modules/sendAppCommands';
import { broadcastEvent } from '../../modules/app_commands/broadcastEvent';

/**
 * Makes register success page escape proof
 */
export class RegisterSuccess {
  /**
   * @param {ShopgateAppCodeExecutor} shopgateAppCodeExecutor to execute Shopgate app related code
   */
  constructor(shopgateAppCodeExecutor) {
    this.shopgateAppCodeExecutor = shopgateAppCodeExecutor;
  }

  /**
   * Makes register success page escape proof
   */
  execute = () => {
    this.hideHeader();
    this.hideFooter();
    this.closeInAppBrowser();
  };

  /**
   * Will close the In-App-Browser and redirect the user to the register/login page.
   * In case the user is logged in already the cart is shown
   * @private
   */
  closeInAppBrowser() {
    this.shopgateAppCodeExecutor.execute(() => {
      sendAppCommands([
        broadcastEvent('closeInAppBrowser', [{
          redirectTo: '/cart',
        }]),
      ]);
    });
  }

  /**
   * Hides the header
   * @private
   */
  hideHeader() {
    hideElementsByClassName('header');
  }

  /**
   * Hides the footer
   * @private
   */
  hideFooter() {
    hideElementsByClassName('footer');
  }
}
