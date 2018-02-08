/**
 * Sends list of commands to the app
 *
 * @param {Object[]} appCommands to be sent to the App
 */
export function ShopgateSendAppCommands(appCommands) {
  if (appCommands.length === 0) {
    return;
  }

  if ('dispatchCommandsForVersion' in window.SGJavascriptBridge) {
    window.SGJavascriptBridge.dispatchCommandsForVersion(appCommands, '12.0');
  } else {
    window.SGJavascriptBridge.dispatchCommandsStringForVersion(JSON.stringify(appCommands), '12.0');
  }
}
