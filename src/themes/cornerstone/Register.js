import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { setMargin } from '../../modules/boxing';
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
   * Makes register page escape proof.
   */
  execute = () => {
    this.hideHeader();
    this.hideFooter();
    this.setBodyMargins();
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
   * Hides the header.
   * @private
   */
  hideHeader() {
    hideElementsByClassName('header');
  }

  /**
   * (Re)sets margin of body class to reduce the leftover
   * space where header and footer used to be.
   */
  setBodyMargins() {
    setMargin('body', '-2em 0 0 0');
  }

  /**
   * Hides the footer.
   * @private
   */
  hideFooter() {
    hideElementsByClassName('footer');
  }
}

