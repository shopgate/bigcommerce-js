import { shopgateHideElementByClassName } from '../../modules/ShopgateHideElementByClassName';

/**
 * Makes register page escape proof
 */
export function shopgateForgotPassword() {
  shopgateHideElementByClassName('header');
  shopgateHideElementByClassName('footer');
}
