import { hideElementsByClassName } from '../../modules/hideElementByClassName';

/**
 * Makes register page escape proof
 */
export class Register {
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

