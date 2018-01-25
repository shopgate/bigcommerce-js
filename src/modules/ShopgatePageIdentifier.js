export const shopgatePageIdentifier = {
  scriptFileName: window.location.pathname.substr(1),
  isCheckoutSuccess: function () {
    return this.scriptFileName === 'checkout/order-confirmation' || this.scriptFileName === 'finishorder.php'
  },
  isCart: function () {
    return sgScriptFilename === 'cart.php'
  },
  isCheckout: function () {
    return _sgScriptFilename === 'checkout' || _sgScriptFilename === 'checkout.php'
  },
  isLogin: function () {
    return _sgScriptFilename === 'login.php'
  },
  isRegistration: function () {
    return window.location.search.indexOf('action=account_created') !== -1
  }
}
