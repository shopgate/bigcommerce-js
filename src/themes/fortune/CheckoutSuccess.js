import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { hideElementById } from '../../modules/hideElementById';
import { setNavigationBarParams } from '../../modules/app_commands/setNavigationBarParams';
import { isShopgateAndroidApp } from '../../modules/shopgateDeviceIdentifier';
import { sendAppCommands } from '../../modules/sendAppCommands';

/**
 * Makes checkout escape proof
 */
export class CheckoutSuccess {
  /**
   * @param {ShopgateAppCodeExecutor} shopgateAppCodeExecutor to execute Shopgate app related code
   */
  constructor(shopgateAppCodeExecutor) {
    this.shopgateAppCodeExecutor = shopgateAppCodeExecutor;
  }

  /**
   * Makes checkout escape proof
   */
  execute = () => {
    this.changeLinks();
    this.hideLinksToDesktopPage();
    this.changeInAppBrowserLayout();
  };

  /**
   * Will change the InAppBrowser title to "Checkout" and show a button named "done"
   * located at the top to the right
   */
  changeInAppBrowserLayout() {
    this.shopgateAppCodeExecutor.execute(() => {
      const commands = [
        setNavigationBarParams(
          'Checkout',
          false,
          isShopgateAndroidApp() ? 'done' : true,
          isShopgateAndroidApp() ? 'custom' : 'done',
          'SGAction.popTabToRoot({\'targetTab\': \'main\'}); SGAction.showTab({\'targetTab\': \'main\'});'
        ),
      ];

      sendAppCommands(commands);

      return true;
    });
  }

  /**
   * Makes specific links not useable
   * @private
   */
  changeLinks() {
    const anchors = document.getElementsByTagName('A');

    for (let i = 0; i < anchors.length; i += 1) {
      if (anchors[i].href.indexOf('action=view_order') !== -1) {
        anchors[i].onclick = e => e.preventDefault();
      }

      if (anchors[i].parentElement.nodeName === 'H1' || anchors[i].parentElement.nodeName === 'H2') {
        anchors[i].onclick = e => e.preventDefault();
      }
    }
  }

  /**
   * Hides specific elements
   * @private
   */
  hideLinksToDesktopPage() {
    hideElementsByClassName('checkout-banner');
    hideElementById('SimilarMultiProductsByCustomerViews');
    this.changeLinks();
  }
}
