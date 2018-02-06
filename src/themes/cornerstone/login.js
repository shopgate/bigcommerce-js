import { shopgateHideElementByClassName } from '../../modules/ShopgateHideElementByClassName';

/**
 * Makes register page escape proof
 */
export function shopgateLogin() {
  shopgateHideElementByClassName('header');
  shopgateHideElementByClassName('footer');
}
