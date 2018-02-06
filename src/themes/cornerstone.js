import { shopgateCart } from './cornerstone/cart';
import { shopgateCheckout } from './cornerstone/checkout';
import { shopgateCheckoutSuccess } from './cornerstone/checkout_success';
import { shopgateOnDocumentReady } from '../modules/ShopgateOnDocumentReady';
import { shopgatePageIdentifier } from '../modules/ShopgatePageIdentifier';
import { shopgateRegisterSuccess } from './cornerstone/register_success';
import { shopgateRegister } from './cornerstone/register';
import { shopgateLogin } from './cornerstone/login';
import { shopgateForgotPassword } from './cornerstone/forgot_password';
import { shopgateExecuteAppRelatedCode } from '../modules/ShopgateExecuteAppRelatedCode';

shopgateExecuteAppRelatedCode(() => {
  if (shopgatePageIdentifier.isCart()) {
    shopgateOnDocumentReady(shopgateCart);
  }

  if (shopgatePageIdentifier.isCheckout()) {
    shopgateOnDocumentReady(shopgateCheckout);
  }

  if (shopgatePageIdentifier.isCheckoutSuccess()) {
    shopgateOnDocumentReady(shopgateCheckoutSuccess);
  }

  if (shopgatePageIdentifier.isRegister()) {
    shopgateOnDocumentReady(shopgateRegister);
  }

  if (shopgatePageIdentifier.isLogin()) {
    shopgateOnDocumentReady(shopgateLogin);
  }

  if (shopgatePageIdentifier.isRegistrationSuccess()) {
    shopgateOnDocumentReady(shopgateRegisterSuccess);
  }

  if (shopgatePageIdentifier.isForgotPassword()) {
    shopgateOnDocumentReady(shopgateForgotPassword);
  }
});

