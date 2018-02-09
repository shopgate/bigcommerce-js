import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { walkThroughAnchors } from '../../modules/walkThroughAnchors';
import { AbstractPage } from '../AbstractPage';

/**
 * Makes cart page escape proof
 */
export class Cart extends AbstractPage {
  /**
   * Make the page escape proof
   */
  execute() {
    this.removedLinkInTitle();
    this.hideHeader();
    this.hideFooter();
    this.removeProductLinks();
  }

  /**
   * Removes the link in the title
   */
  removedLinkInTitle() {
    walkThroughAnchors((anchor) => {
      if (
        anchor.parentElement.nodeName === 'H1'
        || anchor.parentElement.nodeName === 'H2'
      ) {
        // eslint-disable-next-line no-param-reassign
        anchor.onclick = e => e.preventDefault();
      }
    });
  }

  /**
   * Removed links from product links
   */
  removeProductLinks() {
    walkThroughAnchors(((anchor) => {
      if (
        anchor.parentElement.className === 'cart-item-name'
      ) {
        // eslint-disable-next-line no-param-reassign
        anchor.onclick = e => e.preventDefault();
      }
    }));
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
