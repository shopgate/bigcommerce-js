export const shopgatePageIdentifier = {
  scriptFileName: window.location.pathname.substr(1),
  isCheckoutSuccess() {
    return this.scriptFileName === 'checkout/order-confirmation' || this.scriptFileName === 'finishorder.php';
  },
  isCart() {
    return this.scriptFileName === 'cart.php';
  },
  isCheckout() {
    return this.scriptFileName === 'checkout' || this.scriptFileName === 'checkout.php';
  },
  isRegister() {
    return window.location.search.indexOf('action=create_account') !== -1;
  },
  isRegistrationSuccess() {
    return window.location.search.indexOf('action=account_created') !== -1;
  },
};
