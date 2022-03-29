const { mediaContentType } = require("./mediaHelpers");
const { toCamelCase } = require("./helpers");

/**
 * Returns an interface name for the given name
 * @param {string} name Name or model uid to format
 * @returns {string} Interface name
 */
const formatInterfaceName = (name) => {
  return `I${toCamelCase(name)}`;
};

/**
 * Returns an interface name for the given model.
 * @param {object} model Model
 * @returns {string} Model interface name
 */
const interfaceMapper = (model) => {
  if (model.modelType === "contentType") {
    return relationInterfaceMapper(model);
  } else if (model.modelType === "component") {
    return componentInterfaceMapper(model.uid);
  }

  return formatInterfaceName(model.modelName);
};

/**
 * Returns an interface name for the given component uid.
 * @param {string} componentUid Conmponent uid
 * @returns {string} Component interface name
 */
const componentInterfaceMapper = (componentUid) => {
  return formatInterfaceName(componentUid);
};

/**
 * Returns an interface name for the given relation model.
 * For models strating with "api::" return as follows:
 * "api::model.model" -> IApiModel
 * For models not strating with "api::" return as follows:
 * "nonapi::model.model" -> INonapiModelModel
 * @param {object} model Relation model
 * @returns {string} Relation interface name
 */
const relationInterfaceMapper = (model) => {
  if (model.uid.startsWith("api::")) {
    return formatInterfaceName(`api::${model.modelName}`);
  } else {
    return formatInterfaceName(model.uid);
  }
};

/**
 * Returns an interface name for the media type.
 * @returns {string} Media interface name
 */
const mediaInterfaceMapper = () => {
  return formatInterfaceName(mediaContentType);
};

module.exports = {
  componentInterfaceMapper,
  mediaInterfaceMapper,
  interfaceMapper,
  relationInterfaceMapper,
};
