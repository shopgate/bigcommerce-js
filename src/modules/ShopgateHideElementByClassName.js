/**
 * @param {string} elementClass
 */
export function shopgateHideElementByClassName (elementClass) {
  let elements = document.getElementsByClassName(elementClass)

  for (let i = 0; i < elements.length; ++i) {
    elements[i].style.display = 'none'
  }
}
