import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { walkThroughAnchors } from '../../modules/walkThroughAnchors';

/**
 * Makes cart page escape proof
 */
export class Cart {
  /**
   * Make the page escape proof
   */
  execute = () => {
    this.hideHeader();
    this.hideFooter();
    this.removeProductLinks();
  };

  /**
   * Removed links from product links
   * @private
   */
  removeProductLinks() {
    walkThroughAnchors(((anchor) => {
      if (
        anchor.parentElement.className === 'cart-item-product-name'
      ) {
        // eslint-disable-next-line no-param-reassign
        anchor.onclick = e => e.preventDefault();
      }
    }));
  }

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
