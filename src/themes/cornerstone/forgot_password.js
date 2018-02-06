import { shopgateHideElementsByClassName } from '../../modules/ShopgateHideElementByClassName';

/**
 * Makes register page escape proof
 */
export function shopgateForgotPassword() {
  shopgateHideElementsByClassName('header');
  shopgateHideElementsByClassName('footer');
}
