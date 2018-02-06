import { shopgateHideElementsByClassName } from '../../modules/ShopgateHideElementByClassName';

/**
 * Makes register page escape proof
 */
export function shopgateRegister() {
  shopgateHideElementsByClassName('header');
  shopgateHideElementsByClassName('footer');
}
