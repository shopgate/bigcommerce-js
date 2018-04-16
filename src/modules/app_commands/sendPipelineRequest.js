/**
 * App command to send pipeline request.
 *
 * @param {string} pipelineName Name of the pipeline.
 * @param {Object} [pipelineInput={}] Input parameters for the pipeline.
 * @returns {AppCommand}
 */
export function sendPipelineRequest(pipelineName, pipelineInput = {}) {
  return {
    c: 'sendPipelineRequest',
    p: {
      serial: pipelineName,
      name: pipelineName,
      input: pipelineInput,
    },
  };
}

/**
 * App command to send trusted pipeline request.
 *
 * @param {string} pipelineName Name of the pipeline.
 * @param {Object} [pipelineInput={}] Input parameters for the pipeline.
 * @returns {AppCommand}
 */
export function sendTrustedPipelineRequest(pipelineName, pipelineInput = {}) {
  return {
    c: 'sendPipelineRequest',
    p: {
      serial: pipelineName,
      name: pipelineName,
      input: pipelineInput,
      type: 'trusted',
    },
  };
}
