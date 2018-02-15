import { broadcastEvent } from './modules/app_commands/broadcastEvent';
import { setNavigationBarParams } from './modules/app_commands/setNavigationBarParams';
import { sendAppCommands } from './modules/sendAppCommands';
import { isShopgateAndroidApp } from './modules/shopgateDeviceIdentifier';
import { ShopgateAppCodeExecutor } from './modules/ShopgateAppCodeExecutor';

/**
 * This method will trigger the checkoutSuccess event and prepare the Shopgate App
 */
function shopgateOrderPlaced() {
  const shopgateAppCodeExecutor = new ShopgateAppCodeExecutor();
  shopgateAppCodeExecutor.execute(() => {
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

shopgateOrderPlaced();
