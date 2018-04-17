import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { sendAppCommands } from '../../modules/sendAppCommands';
import { broadcastEvent } from '../../modules/app_commands/broadcastEvent';
import { getRedirectPath, isWebcheckout } from '../../modules/shopgateApp';
import { redirectToCheckout, prepareForCheckout } from '../../modules/redirectToCheckout';

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

    let callback = this.closeInAppBrowser;
    if (isWebcheckout()) {
      prepareForCheckout();
      callback = redirectToCheckout;
    }
    this.rewriteCloseButtonDestination(callback);
  };

  /**
   * Sets 'Continue shopping' button close the browser.
   * @param {function} callback Callback.
   */
  rewriteCloseButtonDestination(callback) {
    const buttons = document.getElementsByClassName('button');
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].nodeName === 'A') {
        buttons[i].onclick = (e) => {
          e.preventDefault();
          callback();
        };
        break;
      }
    }
  }

  /**
   * Will close the In-App-Browser and redirect the user to the register/login page.
   * In case the user is logged in already the cart is shown
   * @private
   */
  closeInAppBrowser = () => {
    this.shopgateAppCodeExecutor.execute(() => {
      sendAppCommands([
        broadcastEvent('closeInAppBrowser', [{
          redirectTo: getRedirectPath(),
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
