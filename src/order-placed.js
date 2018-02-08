import { shopgateExecuteAppRelatedCode } from './modules/ShopgateExecuteAppRelatedCode';
import { broadcastEvent } from './modules/app_commands/BroadcastEvent';
import { setNavigationBarParams } from './modules/app_commands/SetNavigationBarParams';
import { ShopgateSendAppCommands } from './modules/ShopgateSendAppCommands';
import { isShopgateAndroidApp } from './modules/IsShopgateAndroidApp';

/**
 * This method will trigger the checkoutSuccess event and prepare the Shopgate App
 */
function shopgateOrderPlaced() {
  shopgateExecuteAppRelatedCode(() => {
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

    ShopgateSendAppCommands(commands);

    return true;
  });
}

shopgateOrderPlaced();
