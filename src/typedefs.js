/**
 * @callback dispatchCommandsStringForVersion
 * @param {string} command
 * @param {string} version
 */

/**
 * @callback dispatchCommandsForVersion
 * @param {Object[]} command
 * @param {string} version
 */

/**
 * @typedef {Object} window.SGJavaScriptBridge
 * @property {dispatchCommandsStringForVersion} dispatchCommandsStringForVersion
 * @property {dispatchCommandsForVersion} dispatchCommandsForVersion
 */
window.SGJavascriptBridge = Object();
