import { subscribeEventReceived } from '../appEvents';

let pageInsetsReceived = false;
let topPx = 0;
let leftPx = 0;
let bottomPx = 0;
let rightPx = 0;

/**
 * Wrapper around subscriber for pageInsetsChanged app event.
 */
export default function () {
  // Due to issue in android app page in in app browser gets changed
  subscribeEventReceived('pageInsetsChanged', (paddings) => {
    const {
      top, left, bottom, right,
    } = paddings;

    topPx = top;
    leftPx = left;
    bottomPx = bottom;
    rightPx = right;

    document.children[0].style.padding = `${top}px ${right}px ${bottom}px ${left}px`;
    pageInsetsReceived = true;
  });
}

export const receivedPageInsetChanges = {
  getTop() {
    return topPx;
  },
  getLeft() {
    return leftPx;
  },
  getBottom() {
    return bottomPx;
  },
  getRight() {
    return rightPx;
  },
};

/**
 * Indicates if at least one pageInsersChanced event has been processed
 * @returns {boolean}
 */
export function isProcessed() { return pageInsetsReceived; }
