/**
 * @param {string} elementClass class of the DOM element
 */
export function hideElementsByClassName(elementClass) {
  const elements = document.getElementsByClassName(elementClass);

  for (let i = 0; i < elements.length; i += 1) {
    elements[i].style.display = 'none';
  }
}
