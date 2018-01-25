import { shopgateWalkThroughAnchors } from '../../modules/ShopgateWalkThroughAnchors';

/**
 * Makes checkout escape proof
 */
export function shopgateCheckout() {
  shopgateWalkThroughAnchors((anchor) => {
    if (
      anchor.parentElement.nodeName === 'H1'
      || anchor.parentElement.nodeName === 'H2'
    ) {
      // eslint-disable-next-line no-script-url, no-param-reassign
      anchor.href = 'javascript:;'; // TODO: onclick="(e) => e.preventDefault()"
    }
  });
}
