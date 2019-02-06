/**
 * Adds style element to the head with provided css string.
 * @param {string} cssString The css string.
 */
export function addCSS(cssString) {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(cssString));
  document.head.appendChild(style);
}
