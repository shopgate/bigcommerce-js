import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { hideElementById } from '../../modules/hideElementById';
import { walkThroughAnchors } from '../../modules/walkThroughAnchors';

/**
 * Makes cart page escape proof
 */
export class Cart {
  /**
   * Make the page escape proof
   */
  execute = () => {
    this.removedInfoLinks();
    this.hideHeader();
    this.hideFooter();
    this.removeProductLinks();
  };

  /**
   * Removes the link in InfoMessage
   * @private
   */
  removedInfoLinks() {
    walkThroughAnchors((anchor) => {
      let parent = anchor;
      // eslint-disable-next-line no-cond-assign
      while (parent = parent.parentElement) {
        if (parent.className === 'InfoMessage') {
          // eslint-disable-next-line no-param-reassign
          anchor.onclick = e => e.preventDefault();
        }
      }
    });
  }

  /**
   * Removed links from product links
   * @private
   */
  removeProductLinks() {
    walkThroughAnchors(((anchor) => {
      let parent = anchor;
      // eslint-disable-next-line no-cond-assign
      while (parent = parent.parentElement) {
        if (parent.className === 'CartList' && (anchor.parentElement.nodeName === 'STRONG' || anchor.parentElement.className === 'ProductImage')) {
          // eslint-disable-next-line no-param-reassign
          anchor.onclick = e => e.preventDefault();
        }
      }
    }));
  }

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
    hideElementById('SuggestiveCartContent');
  }
}
