import { shopgateHideElementByClassName } from '../../modules/ShopgateHideElementByClassName';
import { shopgateInterval } from '../../modules/ShopgateInterval';

/**
 * Makes register success page escape proof
 */
export function shopgateRegisterSuccess() {
  shopgateHideElementByClassName('button');

  /**
   * @returns {boolean}
   */
  function isShopgateApp() {
    return !!window.SGJavascriptBridge;
  }

  /**
   * Shows the login page in the app
   */
  function shopgateAppOpenLoginForm() {
    const commands = [
      {
        c: 'popTabToRoot',
        p: { targetTab: 'main' },
      },
      {
        c: 'openPage',
        p: {
          src: 'sgapi:register/login', targetTab: 'main',
        },
      },
      {
        c: 'showTab',
        p: { targetTab: 'main' },
      },
    ];

    window.SGJavascriptBridge.dispatchCommandsStringForVersion(JSON.stringify(commands), '9.0');
  }

  shopgateInterval(20, 5000, () => {
    if (!isShopgateApp()) {
      return false;
    }
    shopgateAppOpenLoginForm();

    return true;
  });
}
