import { subscribeEventReceived } from '../appEvents';

/**
 * Wrapper around subscriber for isDocumentReady app event.
 */
export default function () {
  // Due to issue in android app page in in app browser gets changed
  subscribeEventReceived('isDocumentReady', () => true);
}
