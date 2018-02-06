const SHOPGATE_PAGE_CART = 'cart';
const SHOPGATE_PAGE_CHECKOUT_SUCCESS = 'checkout_success';
const SHOPGATE_PAGE_CHECKOUT = 'checkout';
const SHOPGATE_PAGE_LOGIN = 'login';
const SHOPGATE_PAGE_REGISTER = 'register';
const SHOPGATE_PAGE_REGISTER_SUCCESS = 'register_success';
const SHOPGATE_PAGE_FORGOT_PASSWORD = 'forgot_password';

export const shopgatePageIdentifier = {
  scriptFileName: window.location.pathname.substr(1),
  isCheckout() {
    return this.identifyPage() === SHOPGATE_PAGE_CHECKOUT;
  },
  isCheckoutSuccess() {
    return this.identifyPage() === SHOPGATE_PAGE_CHECKOUT_SUCCESS;
  },
  isCart() {
    return this.identifyPage() === SHOPGATE_PAGE_CART;
  },
  isRegister() {
    return this.identifyPage() === SHOPGATE_PAGE_REGISTER;
  },
  isRegistrationSuccess() {
    return this.identifyPage() === SHOPGATE_PAGE_REGISTER_SUCCESS;
  },
  isLogin() {
    return this.identifyPage() === SHOPGATE_PAGE_LOGIN;
  },
  isForgotPassword() {
    return this.identifyPage() === SHOPGATE_PAGE_FORGOT_PASSWORD;
  },
  identifyPage() {
    switch (this.scriptFileName) {
      case 'cart.php':
        return SHOPGATE_PAGE_CART;
      case 'checkout/order-confirmation':
      case 'finishorder.php':
        return SHOPGATE_PAGE_CHECKOUT_SUCCESS;
      case 'login.php':
        if (window.location.search.indexOf('action=create_account') !== -1) {
          return SHOPGATE_PAGE_REGISTER;
        } else if (window.location.search.indexOf('action=account_created') !== -1) {
          return SHOPGATE_PAGE_REGISTER_SUCCESS;
        } else if (window.location.search.indexOf('action=reset_password') !== -1) {
          return SHOPGATE_PAGE_FORGOT_PASSWORD;
        }
        return SHOPGATE_PAGE_LOGIN;
      case 'checkout':
      case 'checkout.php':
        return SHOPGATE_PAGE_CHECKOUT;
      default:
        return '';
    }
  },
};
