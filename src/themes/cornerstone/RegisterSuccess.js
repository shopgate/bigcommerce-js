import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { popTabToRoot } from '../../modules/app_commands/popTabToRoot';
import { openPage } from '../../modules/app_commands/openPage';
import { showTab } from '../../modules/app_commands/showTab';
import { sendAppCommands } from '../../modules/sendAppCommands';

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
    this.hideButton();
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
        popTabToRoot('main'),
        openPage('sgapi:register/login', 'main'),
        showTab('main'),
      ]);
    });
  }

  /**
   * Hides the button
   * @private
   */
  hideButton() {
    hideElementsByClassName('button');
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
