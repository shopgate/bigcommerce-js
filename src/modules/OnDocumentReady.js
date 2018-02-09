/**
 * @callback requestCallback
 */

/**
 * @param {requestCallback} callback function to be called when document is ready
 */
export class OnDocumentReady {
  /**
   * @param {function} callback to be called when the document is loaded
   */
  execute(callback) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      callback();
      return;
    }

    document.addEventListener('DOMContentLoaded', callback);
  }
}
