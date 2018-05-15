# Shopgate Connect - BigCommerce Extension Java Scripts
[![GitHub license](http://dmlc.github.io/img/apache2.svg)](LICENSE.md)
[![Build Status](https://travis-ci.org/shopgate/bigcommerce-js.svg?branch=master)](https://travis-ci.org/shopgate/bigcommerce-js)

This repository contains all JavaScripts needed for the Shopgate BigCommerce extension.

## Usage

### Production
To generate the files for the production system you need to run:

	npm run webpack:production

This will generate a file in folder "build" named "bigcommerce.js"

In order to use the content of the file you first have to replace the string "REPLACE_WITH_SHOP_NUMBER" 
with your Shopgate shop number.
Depending on the theme you are currently using you have to select one of the available:

* cornerstone
* fortune

and replace the default theme 'cornerstone' with the one you are using in variable "yourTheme".
If your theme is not available yet, please contact our Customer Success team via support-us@shopgate.com or feel free to crontribute (see [CONTRIBUTING.md](docs/CONTRIBUTING.md))

The code in file bigcommerce.js needs to be copied to your BigCommerce store. 
Log into your BigCommerce admin and navigate to "Advanced Settings" > "Web Analytics".
If there is not yet a "Google Analytics" tab you first need to select "Google Analytics" and press "Save".
Now navigate to the "Google Analytics" tab and paste your bigcommerce.js code into the text area field.

If the text area field is empty you need to surround the JavaScript code with a proper html tag:

	<script type="text/javascript">
	// The code goes here
	</script>

### Development
	npm run webpack

This will create a bigcommerce.js and the theme files without minifing the code.

### Trampoline page

The trampoline page is needed to forward parameters that are normally added to the checkout url (like tracking parameters) because all parameters will be lost after the redirect to the desktop page.
This page will save the parameters in the web store of our app and make them available on the desktop page.

There is a trampoline.html which needs to be uploaded to a public available url.
The url to the trampoline page needs to be returned in the shopgate.checkout.getUrl.v1 pipeline and gets the real checkout url as parameter (redirect_url)

This code needs to run on the desktop page to read the parameters:

```
import { ShopgateSendAppCommands } from './modules/ShopgateSendAppCommands';
import registerWebStorageResponse from './modules/app_event_subscribers/webStorageResponse';
import { subscribeEventReceived } from '../appEvents';

/**
 * Wrapper around subscriber for webStorageResponse app event.
 */
function registerWebStorageResponse () {
  subscribeEventReceived('webStorageResponse', (serial, age, value) => {
    if (serial === '12345678') {
      console.log(serial);
      console.log(age);
      console.log(value);
    }
  });
}

registerWebStorageResponse();
ShopgateSendAppCommands([shopgateGetWebStorageEntry('trampoline_parameters', 12345678)]);
```

Be aware that the code needs to be transpiled before it can be put on the desktop page!

## Changelog

See [CHANGELOG.md](CHANGELOG.md) file for more information.

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) file for more information.

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

Shopgate Cloud - Extension BigCommerce Cart is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE.md) file for more information.
