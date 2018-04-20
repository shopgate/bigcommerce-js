import { subscribeEventReceived } from '../appEvents';

/**
 * Wrapper around subscriber for pageInsetsChanged app event.
 */
export default function () {
  // Due to issue in android app page in in app browser gets changed
  subscribeEventReceived('pageInsetsChanged', (paddings) => {
    const {
      top, left, bottom, right,
    } = paddings;
    document.children[0].style.padding = `${top}px ${right}px ${bottom}px ${left}px`;
  });
}
