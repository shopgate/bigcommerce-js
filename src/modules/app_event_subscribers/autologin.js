import { subscribeEventReceived } from '../appEvents';
import { sendAppCommands } from '../sendAppCommands';
import { broadcastEvent } from '../app_commands/broadcastEvent';
import { sendTrustedPipelineRequest } from '../app_commands/sendPipelineRequest';
import { sendHttpRequest } from '../app_commands/sendHttpRequest';

const AUTOLOGIN_PIPELINE = 'bigcommerce.user.autologin.v1';
const CURRENT_CUSTOMER_SERIAL = 'current_customer';

let autologinProcessFinished = false;

/**
 * Requests current customer data.
 */
function requestCurrentCustomer() {
  // This is client id of our bigcommerce app.
  // It is not an oauth client id generated from the store control panel.
  const clientId = 'ked0n332n5c8opplowtqmc6kb817wot';
  sendAppCommands([
    sendHttpRequest({
      url: `https://store-r5s844ad.mybigcommerce.com/customer/current.jwt?app_client_id=${clientId}`,
      serial: CURRENT_CUSTOMER_SERIAL,
      method: 'GET',
    }),
  ], '13.0');
}

/**
 * @param {string} token JWT token.
 */
function autoLoginUserByToken(token) {
  sendAppCommands([
    sendTrustedPipelineRequest(AUTOLOGIN_PIPELINE, { token }),
  ], '12.0');
}

/**
 * Auto login.
 */
export default function () {
  subscribeEventReceived('pipelineResponse', (err, pipelineName) => {
    if (pipelineName !== AUTOLOGIN_PIPELINE) {
      return;
    }

    autologinProcessFinished = true;

    if (err) {
      console.error(`Called pipeline '${pipelineName}' resulted in an error: ${JSON.stringify(err)}`);
      // Code we know of that we can receive here are EAUTHFAILED and ELOGININVALIDTOKEN
      // We could introduce a way to display informative messages. As example guiding user to login.
      // EAUTHFAILED - authorisation in our system/app failed
      // ELOGININVALIDTOKEN - the token we provided here was not valid
      return;
    }

    sendAppCommands([
      broadcastEvent('userLoggedIn'),
    ]);
  });

  subscribeEventReceived('httpResponse', (err, serial, result) => {
    if (serial !== CURRENT_CUSTOMER_SERIAL) {
      return;
    }

    if (err) {
      console.error('Failed getting the current customer information.', err);

      autologinProcessFinished = true;
      return;
    }

    autoLoginUserByToken(result.body);
  });
}

/**
 * Performs autologin.
 */
export function performAutologin() {
  requestCurrentCustomer();
}

/**
 * Returns current customer.
 * @returns {boolean}
 */
export function isAutologinDone() {
  return autologinProcessFinished;
}
