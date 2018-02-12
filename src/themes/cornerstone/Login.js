import { hideElementsByClassName } from '../../modules/hideElementByClassName';

/**
 * Makes login page escape proof
 */
export class Login {
  /**
   * Makes login page escape proof
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
