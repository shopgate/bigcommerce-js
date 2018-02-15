import {
  isCart,
  isCheckout,
  isCheckoutSuccess,
  isForgotPassword,
  isLogin,
  isRegistrationSuccess,
  isRegister,
} from '../modules/pageIdentifier';
import { Cart } from './cornerstone/Cart';
import { Checkout } from './cornerstone/Checkout';
import { CheckoutSuccess } from './cornerstone/CheckoutSuccess';
import { RegisterSuccess } from './cornerstone/RegisterSuccess';
import { Register } from './cornerstone/Register';
import { Login } from './cornerstone/Login';
import { ForgotPassword } from './cornerstone/ForgotPassword';
import onDocumentReady from '../modules/onDocumentReady';
import { ShopgateAppCodeExecutor } from '../modules/ShopgateAppCodeExecutor';

const shopgateAppCodeExecutor = new ShopgateAppCodeExecutor();

shopgateAppCodeExecutor.execute(() => {
  let currentPage;

  switch (true) {
    case isCart():
      currentPage = new Cart();
      break;
    case isCheckout():
      currentPage = new Checkout();
      break;
    case isCheckoutSuccess():
      currentPage = new CheckoutSuccess(shopgateAppCodeExecutor);
      break;
    case isForgotPassword():
      currentPage = new ForgotPassword();
      break;
    case isLogin():
      currentPage = new Login();
      break;
    case isRegister():
      currentPage = new Register();
      break;
    case isRegistrationSuccess():
      currentPage = new RegisterSuccess(shopgateAppCodeExecutor);
      break;
    default:
      currentPage = null;
      break;
  }

  if (currentPage !== null) {
    onDocumentReady(currentPage.execute);
  }
});

