import { ShopgateSendAppCommands } from './modules/ShopgateSendAppCommands';
import { shopgateSetWebStorage } from './modules/app_commands/ShopgateSetWebStorage';
import { shopgateExecuteAppRelatedCode } from './modules/ShopgateExecuteAppRelatedCode';

/**
 * Will return all GET parameters in an array
 * @returns {Object}
 */
function getGETParameters() {
  const result = {};

  if (!window.loacation.hasOwnProperty('search') || !window.loacation.search) {
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

shopgateExecuteAppRelatedCode(() => {
  const getParameters = getGETParameters();
  console.log(getParameters);

  ShopgateSendAppCommands(shopgateSetWebStorage('get_parameters', getParameters));
});

