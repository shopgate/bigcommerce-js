import { hideElementsByClassName } from '../../modules/hideElementByClassName';
import { setMargin } from '../../modules/boxing';

/**
 * Makes register page escape proof
 */
export class Register {
  /**
   * Makes register page escape proof.
   */
  execute = () => {
    this.hideHeader();
    this.hideFooter();
    this.setBodyMargins();
  };

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

