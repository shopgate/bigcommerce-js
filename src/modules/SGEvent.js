import { notifyEventReceived } from './appEvents';

export default {
  /**
   * @param {string} eventName Name of the event.
   * @param {Array} eventArguments Arguments to the event.
   */
  __call: function call(eventName, eventArguments) {
    console.log(`${`# Received event ${eventName}`}$`);

    let args = eventArguments;

    if (!eventArguments || !Array.isArray(eventArguments)) {
      args = [];
    }

    notifyEventReceived(eventName, args);
  },

  /**
   * It is required for iOS app in order for SGEvent to be used.
   * Additionally due to issue in android app page in in app browser gets changed.
   * @returns {boolean}
   */
  isDocumentReady: function isDocumentReady() {
    return true;
  },
};
