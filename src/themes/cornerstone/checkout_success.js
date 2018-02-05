import { shopgateHideElementByClassName } from '../../modules/ShopgateHideElementByClassName';
import { shopgateHideElementById } from '../../modules/ShopgateHideElementById';

/**
 * Makes specific links not useable
 */
function shopgateChangeLinks() {
  const anchors = document.getElementsByTagName('A');

  for (let i = 0; i < anchors.length; i += 1) {
    if (anchors[i].href.indexOf('action=view_order') !== -1) {
      anchors[i].href = e => e.preventDefault();
    }

    if (anchors[i].parentElement.nodeName === 'H1' || anchors[i].parentElement.nodeName === 'H2') {
      anchors[i].href = e => e.preventDefault();
    }
  }
}

/**
 * Hides specific elements
 */
function shopgateHideLinksToDesktopPage() {
  shopgateHideElementByClassName('checkout-banner');
  shopgateHideElementById('SimilarMultiProductsByCustomerViews');
  shopgateChangeLinks();
}

/**
 * Makes checkout escape proof
 */
export function shopgateCheckoutSuccess() {
  shopgateChangeLinks();
  shopgateHideLinksToDesktopPage();
}
