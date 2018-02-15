import {
  isCart,
  isCheckout,
  isCheckoutSuccess,
  isForgotPassword,
  isLogin,
  isRegistrationSuccess,
  isRegister,
} from '../modules/pageIdentifier';
import { Cart } from './fortune/Cart';
import { Checkout } from './fortune/Checkout';
import { CheckoutSuccess } from './fortune/CheckoutSuccess';
import { RegisterSuccess } from './fortune/RegisterSuccess';
import { Register } from './fortune/Register';
import { Login } from './fortune/Login';
import { ForgotPassword } from './fortune/ForgotPassword';
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
      currentPage = new CheckoutSuccess();
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

