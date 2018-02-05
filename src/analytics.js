/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
if (window.SGJavascriptBridge) { // TODO: check for iOS and do the polling
  var shopgateShopNumber = 'REPLACE_WITH_SHOP_NUMBER';

  var scriptFileName = window.location.pathname.substr(1);
  if (scriptFileName === 'checkout/order-confirmation' || scriptFileName === 'finishorder.php') {

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
    ('https://data.shopgate.com/tracking/shopgate-analytics-sdk.production.min.js');

    function ShopgateUniversalTracking() {
      this._addTrans = addTrans;
      this._addItem = addItem;
      this._trackTrans = trackTrans;
      this.products = [];
      this.orderId = null;
      this.currency = shopgateGetCurrency();
    }

    function shopgateGetCurrency() {
      var currencyInfo = '%%GLOBAL_AllPricesAreInCurrency%%';
      var regularResult = currencyInfo.match(new RegExp('/*.>([A-Za-z]{3})</'));// TODO: seems to not longer working or didn't work for €
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

  !function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e,t,n){"use strict";function o(e,t,n){var o=Date.now(),a=setInterval(function(){if(o+t<=Date.now())return void clearInterval(a);n()&&clearInterval(a)},e)}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateInterval=o},function(e,t,n){"use strict";function o(){return window.SGJavascriptBridge}Object.defineProperty(t,"__esModule",{value:!0}),t.isShopgateApp=o},function(e,t,n){"use strict";function o(e){for(var t=document.getElementsByClassName(e),n=0;n<t.length;n+=1)t[n].style.display="none"}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateHideElementByClassName=o},function(e,t,n){"use strict";function o(e){for(var t=document.getElementsByTagName("A"),n=0;n<t.length;n+=1)e(t[n])}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateWalkThroughAnchors=o},,function(e,t,n){"use strict";var o=n(6),a=n(7),r=n(8),s=n(10),i=n(11),c=n(12),u=n(0),p=n(1),l=n(13);(0,u.shopgateInterval)(20,5e3,function(){return!!(0,p.isShopgateApp)()&&(i.shopgatePageIdentifier.isCart()&&(0,s.shopgateOnDocumentReady)(o.shopgateCart),i.shopgatePageIdentifier.isCheckout()&&(0,s.shopgateOnDocumentReady)(a.shopgateCheckout),i.shopgatePageIdentifier.isCheckoutSuccess()&&(0,s.shopgateOnDocumentReady)(r.shopgateCheckoutSuccess),i.shopgatePageIdentifier.isRegister()&&(0,s.shopgateOnDocumentReady)(l.shopgateRegister),i.shopgatePageIdentifier.isRegistrationSuccess()&&(0,s.shopgateOnDocumentReady)(c.shopgateRegisterSuccess),!0)})},function(e,t,n){"use strict";function o(){(0,r.shopgateWalkThroughAnchors)(function(e){"H1"!==e.parentElement.nodeName&&"H2"!==e.parentElement.nodeName||(e.href="javascript:;")}),(0,a.shopgateHideElementByClassName)("header"),(0,a.shopgateHideElementByClassName)("footer"),(0,r.shopgateWalkThroughAnchors)(function(e){"cart-item-name"===e.parentElement.className&&(e.href="javascript:;")})}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateCart=o;var a=n(2),r=n(3)},function(e,t,n){"use strict";function o(){(0,a.shopgateWalkThroughAnchors)(function(e){"H1"!==e.parentElement.nodeName&&"H2"!==e.parentElement.nodeName||(e.href="javascript:;")})}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateCheckout=o;var a=n(3)},function(e,t,n){"use strict";function o(){for(var e=document.getElementsByTagName("A"),t=0;t<e.length;t+=1)-1!==e[t].href.indexOf("action=view_order")&&(e[t].href="javascript:;"),"H1"!==e[t].parentElement.nodeName&&"H2"!==e[t].parentElement.nodeName||(e[t].href="javascript:;")}function a(){(0,s.shopgateHideElementByClassName)("checkout-banner"),(0,i.shopgateHideElementById)("SimilarMultiProductsByCustomerViews"),o()}function r(){o(),a()}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateCheckoutSuccess=r;var s=n(2),i=n(9)},function(e,t,n){"use strict";function o(e){var t=document.getElementById(e);void 0!==t&&null!==t&&(t.style.display="none")}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateHideElementById=o},function(e,t,n){"use strict";function o(e){"complete"===document.readyState?e():document.addEventListener("DOMContentLoaded",e())}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateOnDocumentReady=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.shopgatePageIdentifier={scriptFileName:window.location.pathname.substr(1),isCheckoutSuccess:function(){return"checkout/order-confirmation"===this.scriptFileName||"finishorder.php"===this.scriptFileName},isCart:function(){return"cart.php"===this.scriptFileName},isCheckout:function(){return"checkout"===this.scriptFileName||"checkout.php"===this.scriptFileName},isRegister:function(){return-1!==window.location.search.indexOf("action=create_account")},isRegistrationSuccess:function(){return-1!==window.location.search.indexOf("action=account_created")}}},function(e,t,n){"use strict";function o(){function e(){return!!window.SGJavascriptBridge}function t(){var e=[{c:"popTabToRoot",p:{targetTab:"main"}},{c:"openPage",p:{src:"sgapi:register/login",targetTab:"main"}},{c:"showTab",p:{targetTab:"main"}}];window.SGJavascriptBridge.dispatchCommandsStringForVersion(JSON.stringify(e),"9.0")}(0,a.shopgateHideElementByClassName)("header"),(0,a.shopgateHideElementByClassName)("footer"),(0,a.shopgateHideElementByClassName)("button"),(0,r.shopgateInterval)(20,5e3,function(){return!!e()&&(t(),!0)})}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateRegisterSuccess=o;var a=n(2),r=n(0)},function(e,t,n){"use strict";function o(){(0,a.shopgateHideElementByClassName)("header"),(0,a.shopgateHideElementByClassName)("footer")}Object.defineProperty(t,"__esModule",{value:!0}),t.shopgateRegister=o;var a=n(2)}]);

}
/* eslint-enable */
/* eslint-enable eslint-comments/no-unlimited-disable */
