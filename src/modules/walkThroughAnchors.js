/**
 * @callback ManipulateCallback
 * @param {Object} anchor
 */

/**
 * The method walks through all anchors of a document and calls for each anchor the given callback
 *
 * @param {ManipulateCallback} manipulateCallback callback has to expect anchors as a parameter
 */
export function walkThroughAnchors(manipulateCallback) {
  if (typeof manipulateCallback !== 'function') {
    return;
  }

  const anchors = document.getElementsByTagName('A');

  for (let i = 0; i < anchors.length; i += 1) {
    manipulateCallback(anchors[i]);
  }
}
