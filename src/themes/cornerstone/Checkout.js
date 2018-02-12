import { walkThroughAnchors } from '../../modules/walkThroughAnchors';

/**
 * Makes checkout escape proof
 */
export class Checkout {
  /**
   * Makes checkout escape proof
   */
  execute = () => {
    this.removeLinkInTitle();
  };

  /**
   * Removes link in the title of the page
   * @private
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
