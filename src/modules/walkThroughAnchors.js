/**
 * @callback ManipulateCallback
 * @param {Object} anchor
 */

/**
 * @param {ManipulateCallback} manipulateCallback callback has to expect anchors as a parameter
 */
export function walkThroughAnchors(manipulateCallback) {
  const anchors = document.getElementsByTagName('A');

  for (let i = 0; i < anchors.length; i += 1) {
    manipulateCallback(anchors[i]);
  }
}
