/**
 * @param {string} elementId id of the DOM element
 */
export function hideElementById(elementId) {
  const element = document.getElementById(elementId);
  if (typeof (element) !== 'undefined' && element !== null) {
    element.style.display = 'none';
  }
}
