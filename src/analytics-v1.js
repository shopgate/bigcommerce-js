/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
if (document.cookie.indexOf('shopgate_webcheckout') !== -1) {
  var shopgateShopNumber = 'REPLACE_WITH_SHOP_NUMBER';

  var scriptFileName = window.location.pathname.substr(1);
  if (scriptFileName === 'checkout/order-confirmation' || scriptFileName === 'finishorder.php') {

    var shopgateTrackingScript = document.createElement('script');
    shopgateTrackingScript.async = true;
    shopgateTrackingScript.src = 'https://data.shopgate.com/webcheckout/bigcommerce/checkout_success.js';  // TODO: change with real location
    document.head.appendChild(shopgateTrackingScript);

    window.__shopgate_aq = window.__shopgate_aq || [];
    window.sgAnalytics = function() { window.__shopgate_aq.push(arguments); };

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
      var regularResult = currencyInfo.match(new RegExp('/*.>([A-Za-z]{3})</'));
      return regularResult && regularResult.length > 1 ? regularResult[1] : '';
    }

    function addTrans(orderID, store, total, tax, shipping, city, state, country) {
      window.sgAnalytics('setConfig', {
        shopNumber: shopgateShopNumber,
        channel: 'desktop'
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
        quantity: qty
      });
    }

    function trackTrans() {
      window.sgAnalytics('track', 'checkoutCompleted', {
        orderNumber: this.orderId,
        shipping: {
          price: this.shipping
        },
        products: this.products,
        currency: this.currency,
        totalPrice: String(this.totalPrice)
      });
    }

    window.pageTracker = new ShopgateUniversalTracking();
  }
}
/* eslint-enable */
/* eslint-enable eslint-comments/no-unlimited-disable */
