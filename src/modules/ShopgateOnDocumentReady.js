/**
 * @callback requestCallback
 */

/**
 * @param {requestCallback} callback function to be called when document is ready
 */
export function shopgateOnDocumentReady(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback());
  }
}
