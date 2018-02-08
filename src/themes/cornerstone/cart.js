import { shopgateHideElementsByClassName } from '../../modules/ShopgateHideElementByClassName';
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
      // eslint-disable-next-line no-param-reassign
      anchor.onclick = e => e.preventDefault();
    }
  });

  shopgateHideElementsByClassName('header');
  shopgateHideElementsByClassName('footer');

  shopgateWalkThroughAnchors(((anchor) => {
    if (
      anchor.parentElement.className === 'cart-item-name'
    ) {
      // eslint-disable-next-line no-param-reassign
      anchor.onclick = e => e.preventDefault();
    }
  }));
}
