import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { AbstractPage } from '../AbstractPage';

/**
 * Makes login page escape proof
 */
export class Login extends AbstractPage {
  /**
   * Makes login page escape proof
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
