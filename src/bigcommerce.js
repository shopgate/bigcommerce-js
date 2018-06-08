/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

(function() {
  // Declarations start here
  var EXTERNAL_JS_RESOURCES_URL = 'https://d192j2fhh9i6kr.cloudfront.net/bigcommerce/v1/src/';
  
  /**
   * this will only be executed when a Shopgate App visits the desktop site.
   */
  function shopgateInit() {
    var yourTheme = 'cornerstone'; // Default Theme: cornerstone

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
   * This function is a wrapper for BigCommerce pageTracker variable
   * @param {Object} previousPageTracker
   *
   * @constructor
   */
  function ShopgateUniversalTracking(previousPageTracker) {
    this.previousPageTracker = previousPageTracker;
    if (previousPageTracker) {
      for (var property in previousPageTracker) {
        if (typeof previousPageTracker[property] === 'function') {
          this[property] = previousPageTracker[property];
        }
      }
    }

    this._addTrans = addTrans;
    this._addItem = addItem;
    this._trackTrans = trackTrans;
    this.products = [];
    this.orderId = null;
    this.currency = shopgateGetCurrency();
  }

  /**
   * @returns {string|null}
   */
  function shopgateGetCurrency() {
    // quotes are necessary example content: All prices are in <span title='Euro'>EUR</span>
    var currencyInfo = "%%GLOBAL_AllPricesAreInCurrency%%";
    var regularResult = currencyInfo.match(new RegExp('/*.>([A-Za-z]{3})</'));

    if (regularResult && regularResult.length > 1) {
      return regularResult[1];
    }

    return null;
  }

  /**
   * Starts a transaction for a specific order id
   *
   * @param {string} orderID
   * @param {string} store
   * @param {string} total
   * @param {string} tax
   * @param {string} shipping
   * @param {string} city
   * @param {string} state
   * @param {string} country
   */
  function addTrans(orderID, store, total, tax, shipping, city, state, country) {
    if (this.previousPageTracker && typeof this.previousPageTracker._addTrans === 'function') {
      this.previousPageTracker._addTrans(orderID, store, total, tax, shipping, city, state, country);
    }

    this.orderId = orderID;
    this.shippingTotal = {
      type: 'shipping',
      amount: shipping
    };
    this.taxTotal = {
      type: 'tax',
      amount: tax
    };
    this.priceTotal = {
      type: 'grandTotal',
      amount: total
    };
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
    if (this.previousPageTracker && typeof this.previousPageTracker._addItem === 'function') {
      this.previousPageTracker._addItem(orderID, sku, product, variation, price, qty);
    }

    this.products.push({
      id: String(sku),
      name: product,
      price: {
        withTax: String(price)
      },
      quantity: qty
    });
  }

  /**
   * The final request in BigCommerce analytics tracking
   */
  function trackTrans() {
    if (this.previousPageTracker && typeof this.previousPageTracker._trackTrans === 'function') {
      this.previousPageTracker._trackTrans();
    }
    var orderId = this.orderId
    var checkoutSuccess = {
      order: {
        number: orderId,
        currency: this.currency ? this.currency : 'USD',
        totals: [
          this.shippingTotal,
          this.taxTotal,
          this.priceTotal
        ],
        products: this.products
      }
    };

    shopgateExecuteWithRetry(50, 5000, function() {
      if (!window.SGJavascriptBridge) {
        return false;
      }

      sendCommandsToApp([
        {
          'c': 'broadcastEvent',
          'p': {
            'event': 'checkoutSuccess',
            'parameters': [checkoutSuccess]
          }
        }
      ]);

      return true;
    });
  }

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

  /**
   * Send all given commands to the app
   * @param {Array} commands
   * @param {string} version
   */
  function sendCommandsToApp(commands, version = '9.0') {
    if ('dispatchCommandsForVersion' in SGJavascriptBridge) {
      SGJavascriptBridge.dispatchCommandsForVersion(commands, version);
    } else {
      SGJavascriptBridge.dispatchCommandsStringForVersion(JSON.stringify(commands), version);
    }
  }

  /**
   * Shopgate App code execution
   * @param intervalInMilliseconds
   * @param maximumIntervalTimeInMilliseconds
   * @param executeCallback
   */
  function shopgateExecuteWithRetry(
    intervalInMilliseconds,
    maximumIntervalTimeInMilliseconds,
    executeCallback
  ) {
    var startTimestampInMilliseconds = Date.now();

    var interval = setInterval(function() {
      if (Date.now() >= startTimestampInMilliseconds + maximumIntervalTimeInMilliseconds) {
        clearInterval(interval);
        return;
      }

      if (!executeCallback()) {
        return;
      }

      clearInterval(interval);
    }, intervalInMilliseconds);
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
  // Declarations end here

  // Code execution starts end here
  enableShopgateAppEvents();
  
  var scriptFileName = window.location.pathname.substr(1);
  if (scriptFileName === 'checkout/order-confirmation' || scriptFileName === 'finishorder.php') {
    var previousPageTracker = null;
    if (window.pageTracker) {
      previousPageTracker = window.pageTracker;
    }

    window.pageTracker = new ShopgateUniversalTracking(previousPageTracker);
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
  shopgateExecuteWithRetry(25, 2500, function() {
    if (!window.SGJavascriptBridge) {
      return false;
    }

    shopgateInit();

    return true;
  });
// Code execution ends here
})();

/* eslint-enable */
/* eslint-enable eslint-comments/no-unlimited-disable */
