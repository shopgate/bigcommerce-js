/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

(function() {
  var EXTERNAL_JS_RESOURCES_URL = 'https://d192j2fhh9i6kr.cloudfront.net/bigcommerce/v1/src/';

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
   * loading a theme to make the page escape prrof. Default Theme: Cornerstone
   */
  function loadTheme() {
    var theme = document.createElement('script');
    theme.setAttribute('src', EXTERNAL_JS_RESOURCES_URL + 'themes/cornerstone.bundle.min.js');
    document.head.appendChild(theme);
  }

  /**
   * Initialize tracking for Shopgate Analytics by using the BigCommerce pageTracker
   * @see https://support.bigcommerce.com/articles/Public/Setting-Up-Google-Analytics
   *
   * @param {string} shopgateShopNumber Shopgate shop number of your shop
   */
  function loadTracking(shopgateShopNumber) {
    initTracking();

    /**
     * This function is a wrapper for BigCommerce pageTracker variable
     *
     * @constructor
     */
    function ShopgateUniversalTracking() {
      this._addTrans = addTrans;
      this._addItem = addItem;
      this._trackTrans = trackTrans;
      this.products = [];
      this.orderId = null;
      this.currency = shopgateGetCurrency();
    }

    /**
     * Scrapes the current used currency
     *
     * @returns {string}
     */
    function shopgateGetCurrency() {
      // quotes are necessary example content: All prices are in <span title='Euro'>EUR</span>
      var currencyInfo = "%%GLOBAL_AllPricesAreInCurrency%%";
      var regularResult = currencyInfo.match(new RegExp('/*.>([A-Za-z]{3})</'));
      return regularResult && regularResult.length > 1 ? regularResult[1] : '';
    }

    /**
     * Starts a transaction for a specific order id
     *
     * @param {string} orderID
     * @param {string} store
     * @param {string} total
     * @param {string} tax
     * @param {string} shipping
     */
    function addTrans(orderID, store, total, tax, shipping) {
      window.sgAnalytics('setConfig', {
        shopNumber: shopgateShopNumber,
        channel: 'desktop',
      });

      this.orderId = orderID;
      this.shipping = shipping;
      this.totalPrice = total;
    }

    /**
     * Adds a product to an existing transaction
     *
     * @param {string} orderID order id
     * @param {string} sku product sku
     * @param {name} product product name
     * @param {Object} variation
     * @param {number} price
     * @param {string} qty
     */
    function addItem(orderID, sku, product, variation, price, qty) {
      this.products.push({
        number: String(sku),
        name: product,
        price: String(price),
        currency: this.currency,
        quantity: qty,
      });
    }

    /**
     * The final request in BigCommerce analytics tracking
     */
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
    shopgateTrackingScript.setAttribute('src', EXTERNAL_JS_RESOURCES_URL + 'shopgate-analytics.js');
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

  /**
   * Shopgate iOS App polling
   */
  function shopgateExecuteWithRetry(
    intervalInMiliseconds,
    maximumIntervallTimeInMiliseconds,
    executeCallback
  ) {
    const startTimestampInMiliseconds = Date.now();

    const interval = setInterval(function() {
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
