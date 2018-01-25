import { shopgateHideElementByClassName } from '../../modules/ShopgateHideElementByClassName';
import { shopgateWalkThroughAnchors } from '../../modules/ShopgateWalkThroughAnchors';

/**
 * Makes cart page escape proof
 */
export function shopgateCart() {
  shopgateWalkThroughAnchors((anchor) => {
    if (
      anchor.parentElement.nodeName === 'H1'
      || anchor.parentElement.nodeName === 'H2'
    ) {
      // eslint-disable-next-line no-script-url, no-param-reassign
      anchor.href = 'javascript:;';
    }
  });

  shopgateHideElementByClassName('header');
  shopgateHideElementByClassName('footer');

  shopgateWalkThroughAnchors(((anchor) => {
    if (
      anchor.parentElement.className === 'cart-item-name'
    ) {
      // eslint-disable-next-line no-script-url, no-param-reassign
      anchor.href = 'javascript:;';
    }
  }));
}
