import { shopgateHideElementsByClassName } from '../../modules/ShopgateHideElementByClassName';
import { shopgateExecuteAppRelatedCode } from '../../modules/ShopgateExecuteAppRelatedCode';
import { popTabToRoot } from '../../modules/app_commands/PopTabToRoot';
import { openPage } from '../../modules/app_commands/OpenPage';
import { showTab } from '../../modules/app_commands/ShowTab';
import { ShopgateSendAppCommands } from '../../modules/ShopgateSendAppCommands';

/**
 * Makes register success page escape proof
 */
export function shopgateRegisterSuccess() {
  shopgateHideElementsByClassName('header');
  shopgateHideElementsByClassName('footer');
  shopgateHideElementsByClassName('button');

  shopgateExecuteAppRelatedCode(() => {
    // TODO: Currently only working on Android
    ShopgateSendAppCommands([
      popTabToRoot('main'),
      openPage('sgapi:register/login', 'main'),
      showTab('main'),
    ]);
  });
}
