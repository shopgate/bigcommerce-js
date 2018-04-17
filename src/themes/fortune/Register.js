import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { setMargin, setPaddingTop, setPaddingBottom } from '../../modules/boxing';

/**
 * Makes register page escape proof
 */
export class Register {
  /**
   * Makes register page escape proof
   */
  execute = () => {
    this.hideHeader();
    this.hideFooter();
    this.improveTopPositions();
  };

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

