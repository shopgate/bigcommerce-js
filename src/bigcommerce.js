/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
if (window.SGJavascriptBridge) {
  shopgateInit()
} else if (navigator.userAgent.indexOf('libshopgate') !== -1) { // Shopgate iOS App
  function shopgateExecuteWithRetry(
    intervalInMiliseconds,
    maximumIntervallTimeInMiliseconds,
    executeCallback
  ) {
    const startTimestampInMiliseconds = Date.now();

    const interval = setInterval(() => {
      if (startTimestampInMiliseconds + maximumIntervallTimeInMiliseconds <= Date.now()) {
        clearInterval(interval);
        return;
      }

      if (!executeCallback()) {
        return;
      }

      clearInterval(interval);
    }, intervalInMiliseconds);
  }

  shopgateExecuteWithRetry(25, 2500, function() {
    if (!window.SGJavascriptBridge) {
      return false;
    }

    shopgateInit();

    return true;
  })
}

function shopgateInit() {
  var shopgateShopNumber = 'REPLACE_WITH_SHOP_NUMBER';

  var scriptFileName = window.location.pathname.substr(1);
  if (scriptFileName === 'checkout/order-confirmation' || scriptFileName === 'finishorder.php') {
    addTracking(shopgateShopNumber)
  }

  addTheme()
}

function addTracking(shopgateShopNumber) {
  (function(src) {
    var s, r, t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
    window.__shopgate_aq = window.__shopgate_aq || [];
    window.sgAnalytics = function() { window.__shopgate_aq.push(arguments); };
  })
  ('https://data.shopgate.com/tracking/shopgate-analytics-sdk.development.min.js');

  function ShopgateUniversalTracking() {
    this._addTrans = addTrans;
    this._addItem = addItem;
    this._trackTrans = trackTrans;
    this.products = [];
    this.orderId = null;
    this.currency = shopgateGetCurrency();
  }

  function shopgateGetCurrency() {
    var currencyInfo = "%%GLOBAL_AllPricesAreInCurrency%%"; // quotes are necessary example content: All prices are in <span title='Euro'>EUR</span>
    var regularResult = currencyInfo.match(new RegExp('/*.>([A-Za-z]{3})</'));
    return regularResult && regularResult.length > 1 ? regularResult[1] : '';
  }

  function addTrans(orderID, store, total, tax, shipping, city, state, country) {
    window.sgAnalytics('setConfig', {
      shopNumber: shopgateShopNumber,
      channel: 'desktop',
    });

    this.orderId = orderID;
    this.shipping = shipping;
    this.totalPrice = total;
  }

  function addItem(orderID, sku, product, variation, price, qty) {
    this.products.push({
      number: String(sku),
      name: product,
      price: String(price),
      currency: this.currency,
      quantity: qty,
    });
  }

  function trackTrans() {
    window.sgAnalytics('track', 'checkoutCompleted', {
      orderNumber: this.orderId,
      shipping: {
        price: this.shipping,
      },
      products: this.products,
      currency: this.currency,
      totalPrice: String(this.totalPrice),
    });
  }

  window.pageTracker = new ShopgateUniversalTracking();
}

/**
 * Default Theme: Cornerstone
 */
function addTheme() {
  !function(e){function t(n){if(o[n])return o[n].exports;var s=o[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var o={};t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=7)}([function(e,t,o){"use strict";function n(e){for(var t=document.getElementsByClassName(e),o=0;o<t.length;o+=1)t[o].style.display="none"}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateHideElementByClassName=n},function(e,t,o){"use strict";function n(e){if(!window.hasOwnProperty("isShopgateApp")){if((0,s.isShopgateIosApp)()&&!(0,i.isShopgateApp)())return void(0,a.shopgateExecuteWithRetry)(25,2500,function(){return!!(0,i.isShopgateApp)()&&(window.isShopgateApp=!0,n(e),!0)});(0,i.isShopgateApp)()&&(window.isShopgateApp=!0)}window.isShopgateApp&&e()}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateExecuteAppRelatedCode=n;var s=o(2),a=o(3),i=o(4)},function(e,t,o){"use strict";function n(){return-1!==navigator.userAgent.indexOf("libshopgate")}Object.defineProperty(t,"__esModule",{value:!0}),t.isShopgateIosApp=n},function(e,t,o){"use strict";function n(e,t,o){var n=Date.now(),s=setInterval(function(){if(n+t<=Date.now())return void clearInterval(s);o()&&clearInterval(s)},e)}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateExecuteWithRetry=n},function(e,t,o){"use strict";function n(){return!!window.SGJavascriptBridge}Object.defineProperty(t,"__esModule",{value:!0}),t.isShopgateApp=n},function(e,t,o){"use strict";function n(e){for(var t=document.getElementsByTagName("A"),o=0;o<t.length;o+=1)e(t[o])}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateWalkThroughAnchors=n},,function(e,t,o){"use strict";var n=o(8),s=o(9),a=o(10),i=o(12),r=o(13),c=o(14),u=o(15),d=o(16),p=o(17);(0,o(1).shopgateExecuteAppRelatedCode)(function(){console.log("code loaded"),r.shopgatePageIdentifier.isCart()&&(console.log("cart loaded"),(0,i.shopgateOnDocumentReady)(n.shopgateCart)),r.shopgatePageIdentifier.isCheckout()&&(console.log("checkout loaded"),(0,i.shopgateOnDocumentReady)(s.shopgateCheckout)),r.shopgatePageIdentifier.isCheckoutSuccess()&&(console.log("checkout success loaded"),(0,i.shopgateOnDocumentReady)(a.shopgateCheckoutSuccess)),r.shopgatePageIdentifier.isRegister()&&(console.log("register loaded"),(0,i.shopgateOnDocumentReady)(u.shopgateRegister)),r.shopgatePageIdentifier.isLogin()&&(console.log("login loaded"),(0,i.shopgateOnDocumentReady)(d.shopgateLogin)),r.shopgatePageIdentifier.isRegistrationSuccess()&&(console.log("register success loaded"),(0,i.shopgateOnDocumentReady)(c.shopgateRegisterSuccess)),r.shopgatePageIdentifier.isForgotPassword()&&(console.log("forgot password loaded"),(0,i.shopgateOnDocumentReady)(p.shopgateForgotPassword))})},function(e,t,o){"use strict";function n(){(0,a.shopgateWalkThroughAnchors)(function(e){"H1"!==e.parentElement.nodeName&&"H2"!==e.parentElement.nodeName||(e.onclick=function(e){return e.preventDefault()})}),(0,s.shopgateHideElementByClassName)("header"),(0,s.shopgateHideElementByClassName)("footer"),(0,a.shopgateWalkThroughAnchors)(function(e){"cart-item-name"===e.parentElement.className&&(e.onclick=function(e){return e.preventDefault()})})}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateCart=n;var s=o(0),a=o(5)},function(e,t,o){"use strict";function n(){(0,s.shopgateWalkThroughAnchors)(function(e){"H1"!==e.parentElement.nodeName&&"H2"!==e.parentElement.nodeName||(e.onclick=function(e){return e.preventDefault()})})}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateCheckout=n;var s=o(5)},function(e,t,o){"use strict";function n(){for(var e=document.getElementsByTagName("A"),t=0;t<e.length;t+=1)-1!==e[t].href.indexOf("action=view_order")&&(e[t].onclick=function(e){return e.preventDefault()}),"H1"!==e[t].parentElement.nodeName&&"H2"!==e[t].parentElement.nodeName||(e[t].onclick=function(e){return e.preventDefault()})}function s(){(0,i.shopgateHideElementByClassName)("checkout-banner"),(0,r.shopgateHideElementById)("SimilarMultiProductsByCustomerViews"),n()}function a(){n(),s()}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateCheckoutSuccess=a;var i=o(0),r=o(11)},function(e,t,o){"use strict";function n(e){var t=document.getElementById(e);void 0!==t&&null!==t&&(t.style.display="none")}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateHideElementById=n},function(e,t,o){"use strict";function n(e){"complete"===document.readyState?e():document.addEventListener("DOMContentLoaded",e)}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateOnDocumentReady=n},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.shopgatePageIdentifier={scriptFileName:window.location.pathname.substr(1),isCheckout:function(){return"checkout"===this.identifyPage()},isCheckoutSuccess:function(){return"checkout_success"===this.identifyPage()},isCart:function(){return"cart"===this.identifyPage()},isRegister:function(){return"register"===this.identifyPage()},isRegistrationSuccess:function(){return"register_success"===this.identifyPage()},isLogin:function(){return"login"===this.identifyPage()},isForgotPassword:function(){return"forgot_password"===this.identifyPage()},identifyPage:function(){switch(this.scriptFileName){case"cart.php":return"cart";case"checkout/order-confirmation":case"finishorder.php":return"checkout_success";case"login.php":return-1!==window.location.search.indexOf("action=create_account")?"register":-1!==window.location.search.indexOf("action=account_created")?"register_success":-1!==window.location.search.indexOf("action=reset_password")?"forgot_password":"login";case"checkout":case"checkout.php":return"checkout";default:return""}}}},function(e,t,o){"use strict";function n(){function e(){var e=[{c:"popTabToRoot",p:{targetTab:"main"}},{c:"openPage",p:{src:"sgapi:register/login",targetTab:"main"}},{c:"showTab",p:{targetTab:"main"}}];window.SGJavascriptBridge.dispatchCommandsStringForVersion(JSON.stringify(e),"9.0")}(0,s.shopgateHideElementByClassName)("header"),(0,s.shopgateHideElementByClassName)("footer"),(0,s.shopgateHideElementByClassName)("button"),(0,a.shopgateExecuteAppRelatedCode)(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateRegisterSuccess=n;var s=o(0),a=o(1)},function(e,t,o){"use strict";function n(){(0,s.shopgateHideElementByClassName)("header"),(0,s.shopgateHideElementByClassName)("footer")}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateRegister=n;var s=o(0)},function(e,t,o){"use strict";function n(){(0,s.shopgateHideElementByClassName)("header"),(0,s.shopgateHideElementByClassName)("footer")}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateLogin=n;var s=o(0)},function(e,t,o){"use strict";function n(){(0,s.shopgateHideElementByClassName)("header"),(0,s.shopgateHideElementByClassName)("footer")}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateForgotPassword=n;var s=o(0)}]);
}

/* eslint-enable */
/* eslint-enable eslint-comments/no-unlimited-disable */
