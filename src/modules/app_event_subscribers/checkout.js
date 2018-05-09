import { subscribeEventReceived } from '../appEvents';

let checkoutUrl = null;

/**
 * Checkout.
 */
export default function () {
  subscribeEventReceived('pipelineResponse', (err, pipelineName, response) => {
    if (pipelineName !== 'bigcommerce.checkout.getUrl.v1') {
      return;
    }

    if (err) {
      console.error(`Called pipeline '${pipelineName}' resulted in an error: ${JSON.stringify(err)}`);
      return;
    }

    if (!response.url) {
      console.error('Unable to redirect. There is no url', err);
      return;
    }

    checkoutUrl = response.url;
  });
}

/**
 * Returns checkout url
 * @returns {string|null}
 */
export function getCheckoutUrl() {
  return checkoutUrl;
}
