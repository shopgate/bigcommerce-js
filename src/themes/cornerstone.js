import { Cart } from './cornerstone/Cart';
import { Checkout } from './cornerstone/Checkout';
import { CheckoutSuccess } from './cornerstone/CheckoutSuccess';
import { onDocumentReady } from '../modules/onDocumentReady';
import { pageIdentifier } from '../modules/pageIdentifier';
import { RegisterSuccess } from './cornerstone/RegisterSuccess';
import { Register } from './cornerstone/Register';
import { Login } from './cornerstone/Login';
import { ForgotPassword } from './cornerstone/ForgotPassword';
import { ShopgateAppCodeExecutor } from '../modules/ShopgateAppCodeExecutor';

const shopgateAppCodeExecutor = new ShopgateAppCodeExecutor();

shopgateAppCodeExecutor.execute(() => {
  /** @var {AbstractPage} */
  let currentPage;

  switch (true) {
    case pageIdentifier.isCart():
      currentPage = new Cart(shopgateAppCodeExecutor);
      break;
    case pageIdentifier.isCheckout():
      currentPage = new Checkout(shopgateAppCodeExecutor);
      break;
    case pageIdentifier.isCheckoutSuccess():
      currentPage = new CheckoutSuccess(shopgateAppCodeExecutor);
      break;
    case pageIdentifier.isForgotPassword():
      currentPage = new ForgotPassword(shopgateAppCodeExecutor);
      break;
    case pageIdentifier.isLogin():
      currentPage = new Login(shopgateAppCodeExecutor);
      break;
    case pageIdentifier.isRegister():
      currentPage = new Register(shopgateAppCodeExecutor);
      break;
    case pageIdentifier.isRegistrationSuccess():
      currentPage = new RegisterSuccess(shopgateAppCodeExecutor);
      break;
    default:
      currentPage = null;
      break;
  }

  if (currentPage !== null) {
    onDocumentReady(currentPage.execute());
  }
});

