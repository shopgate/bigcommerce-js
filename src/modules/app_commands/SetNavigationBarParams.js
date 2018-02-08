/**
 * Defines the look of the In-App-Browser navigation elements
 *
 * @param {string} title of the In-App-Browser view
 * @param {boolean} leftButton show or hide the left button
 * @param {boolean} rightButton show or hide the right button
 * @param {string} rightButtonType type of the primary button in the view
 * @param {string} rightButtonCallback configuration for primary button on click behaviour
 * @returns {AppCommand}
 */
export function setNavigationBarParams(title, leftButton = false, rightButton = true, rightButtonType = 'done', rightButtonCallback) {
  return {
    c: 'setNavigationBarParams',
    p: {
      title,
      navigationBarParams: {
        leftButton,
        rightButton,
        rightButtonType,
        rightButtonCallback,
      },
    },
  };
}
