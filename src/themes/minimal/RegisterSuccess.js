import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { hideElementById } from '../../modules/hideElementById';
import { sendAppCommands } from '../../modules/sendAppCommands';
import { broadcastEvent } from '../../modules/app_commands/broadcastEvent';
import { getRedirectPath, isWebcheckout, invalidateWebCheckout } from '../../modules/shopgateApp';
import { redirectToCheckout, prepareForCheckout } from '../../modules/redirectToCheckout';
import { performAutologin, isAutologinDone } from '../../modules/app_event_subscribers/autologin';

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
    performAutologin();

    this.hideHeader();
    this.hideFooter();

    let callback = this.closeInAppBrowser;
    if (isWebcheckout()) {
      prepareForCheckout();
      invalidateWebCheckout();
      callback = redirectToCheckout;
    }
    this.rewriteCloseButtonDestination(callback);
  };

  /**
   * Provides information on when the rendering process can be seen as complete.
   * @returns {boolean}
   */
  isRendered = () => isAutologinDone();

  /**
   * Sets 'Continue shopping' button close the browser.
   * @param {function} callback Callback.
   */
  rewriteCloseButtonDestination(callback) {
    const buttons = document.getElementsByClassName('Button');
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
    hideElementsByClassName('nav-area');
    hideElementById('SearchForm');
  }

  /**
   * Hides the footer
   * @private
   */
  hideFooter() {
    hideElementById('Footer');
  }
}
