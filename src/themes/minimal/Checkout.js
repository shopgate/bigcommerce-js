import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { hideElementById } from '../../modules/hideElementById';

/**
 * Makes checkout escape proof
 */
export class Checkout {
  /**
   * Makes checkout escape proof
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
