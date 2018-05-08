import registerAppEventSubscriptions from './registerAppEventSubscriptions';
import { checkWebcheckout } from './shopgateApp';
import SGEvent from './SGEvent';
import { sendAppCommands } from './sendAppCommands';
import { onLoad } from './app_commands/onLoad';
import { preloadNotification } from './app_commands/preloadNotification';
/**
 * Setup.
 */
export default function () {
  // Place the real SGEvent implementation to the window.
  window.SGEvent = SGEvent;
  sendAppCommands([
    preloadNotification(),
  ]);
  registerAppEventSubscriptions();
  checkWebcheckout();

  setTimeout(() => {
    sendAppCommands([
      onLoad(),
    ]);
  }, 2000);
}
