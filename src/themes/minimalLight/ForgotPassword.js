import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { hideElementById } from '../../modules/hideElementById';

/**
 * Makes register page escape proof
 */
export class ForgotPassword {
  /**
   * Makes register page escape proof
   */
  execute = () => {
    this.hideHeader();
    this.hideFooter();
  };

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
