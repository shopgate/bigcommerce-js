import { walkThroughAnchors } from '../../modules/walkThroughAnchors';
import { AbstractPage } from '../AbstractPage';

/**
 * Makes checkout escape proof
 */
export class Checkout extends AbstractPage {
  /**
   * Makes checkout escape proof
   */
  execute() {
    this.removeLinkInTitle();
  }

  /**
   * Removes link in the title of the page
   */
  removeLinkInTitle() {
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
}
