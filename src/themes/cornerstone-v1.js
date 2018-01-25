import { shopgateCart } from './cornerstone/cart';
import { shopgateCheckout } from './cornerstone/checkout';
import { shopgateCheckoutSuccess } from './cornerstone/checkout_success';
import { shopgateOnDocumentReady } from '../modules/ShopgateOnDocumentReady';
import { shopgatePageIdentifier } from '../modules/ShopgatePageIdentifier';
import { shopgateRegisterSuccess } from './cornerstone/register_success';

if (shopgatePageIdentifier.isCart()) {
  shopgateOnDocumentReady(shopgateCart);
}

if (shopgatePageIdentifier.isCheckout()) {
  shopgateOnDocumentReady(shopgateCheckout);
}

if (shopgatePageIdentifier.isCheckoutSuccess()) {
  shopgateOnDocumentReady(shopgateCheckoutSuccess);
}

if (
  shopgatePageIdentifier.isRegistrationSuccess() &&
  (shopgatePageIdentifier.isLogin() || shopgatePageIdentifier.isCart())
) {
  shopgateOnDocumentReady(shopgateRegisterSuccess);
}
