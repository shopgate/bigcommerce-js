import { notifyEventReceived } from './appEvents';

export default {
  __call: function call(eventName, eventArguments) {
    console.log(`${`# Received event ${eventName}`}$`);

    let args = eventArguments;

    if (!eventArguments || !Array.isArray(eventArguments)) {
      args = [];
    }

    notifyEventReceived(eventName, args);
  },
};
