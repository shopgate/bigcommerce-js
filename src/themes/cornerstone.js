import { Cart } from './cornerstone/Cart';
import { Checkout } from './cornerstone/Checkout';
import { CheckoutSuccess } from './cornerstone/CheckoutSuccess';
import { OnDocumentReady } from '../modules/OnDocumentReady';
import { pageIdentifier } from '../modules/pageIdentifier';
import { RegisterSuccess } from './cornerstone/RegisterSuccess';
import { Register } from './cornerstone/Register';
import { Login } from './cornerstone/Login';
import { ForgotPassword } from './cornerstone/ForgotPassword';
import { ShopgateAppCodeExecutor } from '../modules/ShopgateAppCodeExecutor';

const shopgateAppCodeExecutor = new ShopgateAppCodeExecutor();

shopgateAppCodeExecutor.execute(() => {
  let currentPage;

  switch (true) {
    case pageIdentifier.isCart():
      currentPage = new Cart();
      break;
    case pageIdentifier.isCheckout():
      currentPage = new Checkout();
      break;
    case pageIdentifier.isCheckoutSuccess():
      currentPage = new CheckoutSuccess();
      break;
    case pageIdentifier.isForgotPassword():
      currentPage = new ForgotPassword();
      break;
    case pageIdentifier.isLogin():
      currentPage = new Login();
      break;
    case pageIdentifier.isRegister():
      currentPage = new Register();
      break;
    case pageIdentifier.isRegistrationSuccess():
      currentPage = new RegisterSuccess(shopgateAppCodeExecutor);
      break;
    default:
      currentPage = null;
      break;
  }

  if (currentPage !== null) {
    const onDocumentReady = new OnDocumentReady();
    onDocumentReady.execute(currentPage.execute);
  }
});

