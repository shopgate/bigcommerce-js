import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { hideElementById } from '../../modules/hideElementById';
import { broadcastEvent } from '../../modules/app_commands/broadcastEvent';
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
    this.hideUnneededElementsOnDesktopPage();
    this.changeInAppBrowserLayout();
  };

  /**
   * Will change the InAppBrowser title to "Checkout" and show a button named "done"
   * located at the top to the right
   */
  changeInAppBrowserLayout() {
    this.shopgateAppCodeExecutor.execute(() => {
      const commands = [
        broadcastEvent('checkoutSuccess'),
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
   * Hides specific elements
   * @private
   */
  hideUnneededElementsOnDesktopPage() {
    hideElementsByClassName('nav-area');
    hideElementsByClassName('share-main-panel');
    hideElementsByClassName('Button');
    hideElementById('SideTopSellers');
    hideElementById('Footer');
  }
}
