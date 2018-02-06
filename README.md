# Shopgate Connect - BigCommerce Webcheckout
[![GitHub license](http://dmlc.github.io/img/apache2.svg)](LICENSE.md)

This repository contains all JavaScripts needed for the Shopgate BigCommerce extension

## Usage

### Production
	npm run webpack:production

This will create a file named build/bundle/bigcommerce.js and build/bundle/cornerstone.bundle.min.js. 
Before you can use the file bigcommerce.js you have to place the code of file cornerstone.bundle.min.js 
into method addTheme in file bigcommerce.js

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

This will create a bigcommerce.js and cornerstone.bundle.js without minifing the code.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) file for more information.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

Shopgate Cloud - Extension BigCommerce Cart is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE.md) file for more information.
