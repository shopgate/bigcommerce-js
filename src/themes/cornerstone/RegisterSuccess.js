import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { popTabToRoot } from '../../modules/app_commands/popTabToRoot';
import { openPage } from '../../modules/app_commands/openPage';
import { showTab } from '../../modules/app_commands/showTab';
import { sendAppCommands } from '../../modules/sendAppCommands';
import { AbstractPage } from '../AbstractPage';

/**
 * Makes register success page escape proof
 */
export class RegisterSuccess extends AbstractPage {
  /**
   * Makes register success page escape proof
   */
  execute() {
    this.hideHeader();
    this.hideFooter();
    this.hideButton();
    this.closeInAppBrowser();
  }

  /**
   * Will close the In-App-Browser and redirect the user to the register/login page.
   * In case the user is logged in already the cart is shown
   * TODO: Currently only working on Android
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
   */
  hideButton() {
    hideElementsByClassName('button');
  }

  /**
   * Hides the header
   */
  hideHeader() {
    hideElementsByClassName('header');
  }

  /**
   * Hides the footer
   */
  hideFooter() {
    hideElementsByClassName('footer');
  }
}
