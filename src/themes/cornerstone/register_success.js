import { shopgateHideElementByClassName } from '../../modules/ShopgateHideElementByClassName';
import { shopgateExecuteAppRelatedCode } from '../../modules/ShopgateExecuteAppRelatedCode';

/**
 * Makes register success page escape proof
 */
export function shopgateRegisterSuccess() {
  shopgateHideElementByClassName('header');
  shopgateHideElementByClassName('footer');
  shopgateHideElementByClassName('button');

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

  shopgateExecuteAppRelatedCode(shopgateAppOpenLoginForm);
}
