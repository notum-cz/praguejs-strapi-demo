const {
  getModelPopulationAttributes,
} = require("./populateHelpers");
const {
  componentInterfaceMapper,
  relationInterfaceMapper,
  mediaInterfaceMapper,
} = require("./interfaceMapper");
const typeMapper = require("./typeMapper");

/**
 * Array containing all single relations.
 */
const singleRelations = ["oneToOne", "manyToOne"];

/**
 * Process model's attributes and format them.
 * @param {object} strapi Instance of Strapi
 * @param {object} model Model to process
 * @returns {object} Formatted model attributes
 */
const formatAttributes = (strapi, model) => {
  const modelAttributes = getModelPopulationAttributes(model);
  const formattedAttributes = {
    // check if works for all new models
    // adding default attributes, project specific behavior (string id)
    id: {
      type: "string",
      required: true,
    },
    ...(model.modelType === "component" && {
      __component: {
        type: "string",
        required: false,
      },
    }),
  };
  // iterates all model attributes
  for (const [key, value] of Object.entries(modelAttributes)) {
    if (value && !value.private) {
      // handles component
      if (value.type === "component") {
        formattedAttributes[key] = {
          type: componentInterfaceMapper(value.component),
          required: value.required === true,
          isArray: value.repeatable === true,
        };
        // handles dynamiczone
      } else if (value.type === "dynamiczone") {
        const componentsTypes = value.components.map((component) =>
          componentInterfaceMapper(component)
        );
        const type = componentsTypes.length > 0 ? componentsTypes : "any";
        formattedAttributes["content"] = {
          type,
          required: value.required === true,
          isArray: true,
        };
        // handles relation
      } else if (value.type === "relation") {
        const relationModel = strapi.getModel(value.target);
        formattedAttributes[key] = {
          type: relationInterfaceMapper(relationModel),
          required: value.required === true,
          isArray: !singleRelations.includes(value.relation),
        };
        // handles media
      } else if (value.type === "media") {
        formattedAttributes[key] = {
          type: mediaInterfaceMapper(),
          required: value.required === true,
          isArray: value.multiple === true,
        };
        // handles basic attributes
      } else {
        formattedAttributes[key] = typeMapper(value);
      }
    }
  }
  return formattedAttributes;
};

module.exports = formatAttributes;
