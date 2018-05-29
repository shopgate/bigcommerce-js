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
import { Checkout } from './minimal/Checkout';
import { CheckoutSuccess } from './minimal/CheckoutSuccess';
import { RegisterSuccess } from './minimal/RegisterSuccess';
import { Register } from './minimal/Register';
import { Login } from './minimal/Login';
import { ForgotPassword } from './minimal/ForgotPassword';
import onDocumentReady from '../modules/onDocumentReady';
import { ShopgateAppCodeExecutor } from '../modules/ShopgateAppCodeExecutor';
import setupShopgateApp from '../modules/setupShopgateApp';
import { closeLoadingScreen } from '../modules/shopgateApp';
import { executeWithRetry } from '../modules/executeWithRetry';

/**
 * Operations that should be done after rendering of a page is finished.
 */
function afterRenderOperations() {
  closeLoadingScreen();
}

const shopgateAppCodeExecutor = new ShopgateAppCodeExecutor();

shopgateAppCodeExecutor.execute(() => {
  setupShopgateApp();

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
    // If the page provides feedback on when rendering is done,
    // We can perform after rendering operations like closing the loading screen.
    if (currentPage.isRendered) {
      executeWithRetry(250, 20000, () => {
        if (!currentPage.isRendered()) {
          return false;
        }

        afterRenderOperations();
        return true;
      });
    }
  }
});
