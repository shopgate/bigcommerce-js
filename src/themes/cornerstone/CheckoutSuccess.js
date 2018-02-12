import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { hideElementById } from '../../modules/hideElementById';

/**
 * Makes checkout escape proof
 */
export class CheckoutSuccess {
  /**
   * Makes checkout escape proof
   */
  execute = () => {
    this.changeLinks();
    this.hideLinksToDesktopPage();
  };

  /**
   * Makes specific links not useable
   * @private
   */
  changeLinks() {
    const anchors = document.getElementsByTagName('A');

    for (let i = 0; i < anchors.length; i += 1) {
      if (anchors[i].href.indexOf('action=view_order') !== -1) {
        anchors[i].onclick = e => e.preventDefault();
      }

      if (anchors[i].parentElement.nodeName === 'H1' || anchors[i].parentElement.nodeName === 'H2') {
        anchors[i].onclick = e => e.preventDefault();
      }
    }
  }

  /**
   * Hides specific elements
   * @private
   */
  hideLinksToDesktopPage() {
    hideElementsByClassName('checkout-banner');
    hideElementById('SimilarMultiProductsByCustomerViews');
    this.changeLinks();
  }
}
