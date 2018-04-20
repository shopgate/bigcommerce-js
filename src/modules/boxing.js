/**
 * @param {string} elementClass Html element class attribute.
 * @param {function} callback Callback to apply for every found element.
 */
function iterateElements(elementClass, callback) {
  const elements = document.getElementsByClassName(elementClass);
  if (!elements) {
    return;
  }

  for (let i = 0; i < elements.length; i += 1) {
    callback(elements[i]);
  }
}
/* eslint-disable no-param-reassign */
/**
 * @param {string} elementClass Html class.
 * @param {string} marginSpecs Css specification for margin.
 */
export function setMargin(elementClass, marginSpecs) {
  iterateElements(elementClass, (element) => { element.style.margin = marginSpecs; });
}

/**
 * @param {string} elementClass Html class.
 * @param {string} paddingSpecs Css specification for padding.
 */
export function setPadding(elementClass, paddingSpecs) {
  iterateElements(elementClass, (element) => { element.style.padding = paddingSpecs; });
}

/**
 * @param {string} elementClass Html class.
 * @param {string} paddingTop Css specification for padding.
 */
export function setPaddingTop(elementClass, paddingTop) {
  iterateElements(elementClass, (element) => { element.style.paddingTop = paddingTop; });
}

/**
 * @param {string} elementClass Html class.
 * @param {string} paddingBottom Css specification for padding.
 */
export function setPaddingBottom(elementClass, paddingBottom) {
  iterateElements(elementClass, (element) => { element.style.paddingBottom = paddingBottom; });
}
/* eslint-enable */
