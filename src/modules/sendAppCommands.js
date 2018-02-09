/**
 * Sends list of commands to the app
 *
 * @param {AppCommand[]} appCommands to be sent to the App
 * @param {string} libVersion shopgate app lib version
 */
export function sendAppCommands(appCommands, libVersion = '9.0') {
  if (appCommands.length === 0) {
    return;
  }

  if ('dispatchCommandsForVersion' in window.SGJavascriptBridge) {
    window.SGJavascriptBridge.dispatchCommandsForVersion(appCommands, libVersion);
  } else {
    window.SGJavascriptBridge.dispatchCommandsStringForVersion(
      JSON.stringify(appCommands),
      libVersion
    );
  }
}
