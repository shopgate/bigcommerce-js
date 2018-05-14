import { sendAppCommands } from './modules/sendAppCommands';
import { setWebStorageEntry } from './modules/app_commands/setWebStorageEntry';
import { ShopgateAppCodeExecutor } from './modules/ShopgateAppCodeExecutor';
import SGEvent from './modules/SGEvent';

/**
 * Will return all GET parameters in an array
 * @returns {Object}
 */
function getGETParameters() {
  const result = {};

  if (!window.location.hasOwnProperty('search') || !window.location.search) {
    return result;
  }

  window.location.search.substr(1).split('&').forEach((item) => {
    const variableDefinition = item.split('=');
    if (variableDefinition.length < 2) {
      return;
    }

    result[variableDefinition[0]] = decodeURIComponent(variableDefinition[1]);
  });

  return result;
}

const shopgateAppCodeExecutor = new ShopgateAppCodeExecutor();
shopgateAppCodeExecutor.execute(() => {
  window.SGEvent = SGEvent;
  const trampolineParameters = getGETParameters();

  sendAppCommands([setWebStorageEntry('trampoline_parameters', trampolineParameters, 600000)]);

  if (trampolineParameters.redirect_url) {
    window.location.href = trampolineParameters.redirect_url;
  }
});

