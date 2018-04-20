import { hideElementsByClassName } from '../../modules/hideElementByClassName';

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
    hideElementsByClassName('page-header');
    hideElementsByClassName('main-header');
  }

  /**
   * Hides the footer
   * @private
   */
  hideFooter() {
    hideElementsByClassName('main-footer');
  }
}
