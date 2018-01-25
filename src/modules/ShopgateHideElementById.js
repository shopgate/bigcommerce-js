/**
 * @param {string} elementId
 */
export function shopgateHideElementById (elementId) {
  let element = document.getElementById(elementId)
  if (typeof(element) !== 'undefined' && element !== null) {
    element.style.display = 'none'
  }
}
