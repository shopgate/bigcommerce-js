import { walkThroughAnchors } from '../../modules/walkThroughAnchors';
import {
  isProcessed,
  receivedPageInsetChanges,
} from '../../modules/app_event_subscribers/pageInsetsChanged';
import { executeWithRetry } from '../../modules/executeWithRetry';
import { addCSS } from '../../modules/head';

/**
 * Makes checkout escape proof
 */
export class Checkout {
  /**
   * Makes checkout escape proof
   */
  execute = () => {
    this.removeLinkInTitle();
    this.modifyPopup();
  };

  /**
   * Removes link in the title of the page
   * @private
   */
  removeLinkInTitle() {
    walkThroughAnchors((anchor) => {
      if (
        anchor.parentElement.nodeName === 'H1'
        || anchor.parentElement.nodeName === 'H2'
      ) {
        // eslint-disable-next-line no-param-reassign
        anchor.onclick = e => e.preventDefault();
      }
    });
  }

  /**
   * Shortens popup to fit to app screen
   */
  modifyPopup() {
    executeWithRetry(250, 3000, () => {
      if (!isProcessed()) {
        return false;
      }

      const top = receivedPageInsetChanges.getTop();
      addCSS(`.modal { margin-top: ${top}px !important; min-height: calc(96vh - ${top}px)!important`);
      addCSS('a#cart-edit-link { color: #fff; pointer-events: none; cursor: default; }');

      return true;
    });
  }
}
