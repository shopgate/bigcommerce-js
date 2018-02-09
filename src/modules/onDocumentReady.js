/**
 * @callback requestCallback
 */

/**
 * @param {requestCallback} callback function to be called when document is ready
 */
export function onDocumentReady(callback) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    callback();
    return;
  }

  document.addEventListener('DOMContentLoaded', callback);
}
