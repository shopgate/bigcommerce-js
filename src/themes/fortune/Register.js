import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { setMargin, setPaddingTop, setPaddingBottom } from '../../modules/boxing';
import { onRegister } from '../../modules/registerHooks';

/**
 * Makes register page escape proof
 */
export class Register {
  /**
   * Class constructor.
   */
  constructor() {
    this.rendered = false;
  }

  /**
   * Makes register page escape proof
   */
  execute = () => {
    this.hideHeader();
    this.hideFooter();
    this.improveTopPositions();
    onRegister();
    this.rendered = true;
  };

  /**
   * @returns {boolean}
   */
  isRendered() {
    return this.rendered;
  }

  /**
   * Sets margins and padding for the top elements.
   * @private
   */
  improveTopPositions() {
    setMargin('main-content', '0');
    setPaddingTop('authorization-container', '0');
    setPaddingBottom('authorization-container', '2em');
  }

  /**
   * Hides the header
   * @private
   */
  hideHeader() {
    hideElementsByClassName('page-header');
    hideElementsByClassName('main-header');
  }

  /**
   * Hides the footer
   * @private
   */
  hideFooter() {
    hideElementsByClassName('main-footer');
  }
}

