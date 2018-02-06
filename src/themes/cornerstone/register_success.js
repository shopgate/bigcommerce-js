import { shopgateHideElementsByClassName } from '../../modules/ShopgateHideElementByClassName';
import { shopgateExecuteAppRelatedCode } from '../../modules/ShopgateExecuteAppRelatedCode';

/**
 * Makes register success page escape proof
 */
export function shopgateRegisterSuccess() {
  shopgateHideElementsByClassName('header');
  shopgateHideElementsByClassName('footer');
  shopgateHideElementsByClassName('button');

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

    // TODO: Currently only working on Android
    window.SGJavascriptBridge.dispatchCommandsStringForVersion(JSON.stringify(commands), '12.0');
  }

  shopgateExecuteAppRelatedCode(shopgateAppOpenLoginForm);
}
