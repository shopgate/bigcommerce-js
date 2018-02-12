/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

(function() {
  /**
   * this will only be executed when a Shopgate App visits the desktop site.
   */
  function shopgateInit() {
    var shopgateShopNumber = 'REPLACE_WITH_SHOP_NUMBER';

    var scriptFileName = window.location.pathname.substr(1);
    if (scriptFileName === 'checkout/order-confirmation' || scriptFileName === 'finishorder.php') {
      loadTracking(shopgateShopNumber);
    }

    loadTheme();
  }

  /**
   * Default Theme: Cornerstone
   */
  function loadTheme() {
    var theme = document.createElement('script');
    theme.setAttribute('src', 'https://d192j2fhh9i6kr.cloudfront.net/bigcommerce/v1/src/themes/cornerstone.bundle.min.js');
    document.head.appendChild(theme);
  }

  /**
   * @param {string} shopgateShopNumber Shopgate shop number of your shop
   */
  function loadTracking(shopgateShopNumber) {
    initTracking();

    function ShopgateUniversalTracking() {
      this._addTrans = addTrans;
      this._addItem = addItem;
      this._trackTrans = trackTrans;
      this.products = [];
      this.orderId = null;
      this.currency = shopgateGetCurrency();
    }

    function shopgateGetCurrency() {
      // quotes are necessary example content: All prices are in <span title='Euro'>EUR</span>
      var currencyInfo = "%%GLOBAL_AllPricesAreInCurrency%%";
      var regularResult = currencyInfo.match(new RegExp('/*.>([A-Za-z]{3})</'));
      return regularResult && regularResult.length > 1 ? regularResult[1] : '';
    }

    function addTrans(orderID, store, total, tax, shipping) {
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
   * window.sgAnalytics/window.__shopgate_aq will save all events happening before the tracking sdk is loaded.
   */
  function initTracking() {
    window.__shopgate_aq = window.__shopgate_aq || [];
    window.sgAnalytics = function() { window.__shopgate_aq.push(arguments); };

    var shopgateTrackingScript = document.createElement('script');
    shopgateTrackingScript.setAttribute('src', 'https://d192j2fhh9i6kr.cloudfront.net/bigcommerce/v1/src/shopgate-analytics.bundle.min.js');
    document.head.appendChild(shopgateTrackingScript);
  }

  if (window.SGJavascriptBridge) {
    shopgateInit();
    return;
  }

  if (navigator.userAgent.indexOf('libshopgate') === -1) {
    // No Shopgate Android App and SHopgate iOS app at all
    return;
  }

  // Shopgate iOS App polling
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
  });

})();

/* eslint-enable */
/* eslint-enable eslint-comments/no-unlimited-disable */
