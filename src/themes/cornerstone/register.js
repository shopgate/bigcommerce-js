import { shopgateHideElementByClassName } from '../../modules/ShopgateHideElementByClassName';

/**
 * Makes register page escape proof
 */
export function shopgateRegister() {
  shopgateHideElementByClassName('header');
  shopgateHideElementByClassName('footer');
}
