/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

(function() {
  var EXTERNAL_JS_RESOURCES_URL = 'https://d192j2fhh9i6kr.cloudfront.net/bigcommerce/v1/src/';
  enableShopgateAppEvents();

  /**
   * this will only be executed when a Shopgate App visits the desktop site.
   */
  function shopgateInit() {
    var shopgateShopNumber = 'REPLACE_WITH_SHOP_NUMBER';
    var yourTheme = 'cornerstone'; // Default Theme: cornerstone

    var scriptFileName = window.location.pathname.substr(1);
    if (scriptFileName === 'checkout/order-confirmation' || scriptFileName === 'finishorder.php') {
      loadTracking(shopgateShopNumber);
    }

    loadTheme(yourTheme);
  }

  /**
   * loading a theme to make the page escape proof.
   *
   * @param {string} themeName
   */
  function loadTheme(themeName) {
    var theme = document.createElement('script');
    theme.setAttribute('src', EXTERNAL_JS_RESOURCES_URL + 'themes/' + themeName + '.bundle.min.js');
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
    // No Shopgate Android App and Shopgate iOS app at all
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

  /**
   * Enabling ShopgateApp events by injecting a libshopgate meta tag.
   * Needed early (in the page loading phase) in order for iOS app to work as we expect it to.
   */
  function enableShopgateAppEvents() {
    // Check if insertion is needed
    var libshopgate = 'libshopgate';
    if (document.getElementById(libshopgate)) {
      return;
    }
  
    // Insert libshopgate as meta tag, to tell the Shopgate app to send events
    // Not using a script tag to avoid "src unavailable" errors in the browsers console
    var metaTag = document.createElement('meta');
    metaTag.setAttribute('id', libshopgate);
    // Add a "src" property (not an attribute, because of the iOS app not receiving it otherwise)
    metaTag.src = libshopgate;
    document.getElementsByTagName('head').item(0).appendChild(metaTag);
  }

  // SGEvent placeholder needed early (in the page loading phase) in order for iOS app to work as we expect it to.
  window.SGEvent = {
    /**
     * @param {string} eventName Name of the event.
     * @param {Array} eventArguments Arguments to the event.
     */
    __call: function call(eventName, eventArguments) {
      console.log(`${`# Received event ${eventName}`}$`);
  
      var args = eventArguments;
  
      if (!eventArguments || !Array.isArray(eventArguments)) {
        args = [];
      }

      console.warn(`Received event ${eventName} is not processed`);
    },
  
    /**
     * It is required for iOS app in order for SGEvent to be used.
     * Additionally due to issue in android app page in in app browser gets changed.
     * @returns {boolean}
     */
    isDocumentReady: function isDocumentReady() {
      return true;
    }
  };

})();

/* eslint-enable */
/* eslint-enable eslint-comments/no-unlimited-disable */
