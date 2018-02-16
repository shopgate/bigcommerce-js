/**
 * The method calls a passed callback when the page is loaded through adding it to
 * the DOMContentLoaded event or when the page is already loaded by calling the callback directly
 *
 * @param {function} callback to be called when the document is loaded
 */
export default function onDocumentReady(callback) {
  if (typeof callback !== 'function') {
    return;
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    callback();
    return;
  }

  document.addEventListener('DOMContentLoaded', callback);
}
