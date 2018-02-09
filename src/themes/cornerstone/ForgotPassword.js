import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { AbstractPage } from '../AbstractPage';

/**
 * Makes register page escape proof
 */
export class ForgotPassword extends AbstractPage {
  /**
   * Makes register page escape proof
   */
  execute() {
    this.hideHeader();
    this.hideFooter();
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
