const SHOPGATE_PAGE_CART = 'cart';
const SHOPGATE_PAGE_CHECKOUT_SUCCESS = 'checkout_success';
const SHOPGATE_PAGE_CHECKOUT = 'checkout';
const SHOPGATE_PAGE_LOGIN = 'login';
const SHOPGATE_PAGE_REGISTER = 'register';
const SHOPGATE_PAGE_REGISTER_SUCCESS = 'register_success';
const SHOPGATE_PAGE_FORGOT_PASSWORD = 'forgot_password';

const scriptFileName = window.location.pathname.substr(1);

/**
 * Tries to identify a BigCommerce page by given fileName
 *
 * @param {string} fileName file name of the page to identify
 * @returns {string}
 */
function identifyPage(fileName) {
  switch (fileName) {
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
}

/**
 * Identifies the checkout page
 * @returns {boolean}
 */
function isCheckout() {
  return identifyPage(scriptFileName) === SHOPGATE_PAGE_CHECKOUT;
}

/**
 * Identifies the cart page
 * @returns {boolean}
 */
function isCart() {
  return identifyPage(scriptFileName) === SHOPGATE_PAGE_CART;
}

/**
 * Identifies the register page
 * @returns {boolean}
 */
function isRegister() {
  return identifyPage(scriptFileName) === SHOPGATE_PAGE_REGISTER;
}

/**
 * Identifies the register success page
 * @returns {boolean}
 */
function isRegistrationSuccess() {
  return identifyPage(scriptFileName) === SHOPGATE_PAGE_REGISTER_SUCCESS;
}

/**
 * Identifies the login page
 * @returns {boolean}
 */
function isLogin() {
  return identifyPage(scriptFileName) === SHOPGATE_PAGE_LOGIN;
}

/**
 * Identifies the password forget page
 * @returns {boolean}
 */
function isForgotPassword() {
  return identifyPage(scriptFileName) === SHOPGATE_PAGE_FORGOT_PASSWORD;
}

/**
 * Identifies the ceckout success page
 * @returns {boolean}
 */
function isCheckoutSuccess() {
  return identifyPage(scriptFileName) === SHOPGATE_PAGE_CHECKOUT_SUCCESS;
}

export {
  isCheckout,
  isCart,
  isRegister,
  isRegistrationSuccess,
  isLogin,
  isForgotPassword,
  isCheckoutSuccess,
};
