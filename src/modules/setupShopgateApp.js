import registerAppEventSubscriptions from './registerAppEventSubscriptions';
import { enableShopgateAppEvents, checkWebcheckout } from './shopgateApp';
import SGEvent from './SGEvent';
import { sendAppCommands } from './sendAppCommands';
import { onLoad } from './app_commands/onLoad';
/**
 * Setup.
 */
export default function () {
  window.SGEvent = SGEvent;
  enableShopgateAppEvents();
  registerAppEventSubscriptions();
  checkWebcheckout();
  setTimeout(() => {
    sendAppCommands([
      onLoad(),
    ]);
  }, 2000);
}
