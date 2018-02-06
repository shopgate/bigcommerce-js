import { shopgateHideElementsByClassName } from '../../modules/ShopgateHideElementByClassName';

/**
 * Makes register page escape proof
 */
export function shopgateLogin() {
  shopgateHideElementsByClassName('header');
  shopgateHideElementsByClassName('footer');
}
