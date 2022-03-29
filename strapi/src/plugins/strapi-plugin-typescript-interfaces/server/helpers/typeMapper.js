/**
 * Maps strapi type format to expended TypeScript format.
 * @param {object} strapiType type in strapi format
 * @returns {string} extended TypeScript
 */
const getType = (strapiType) => {
  switch (strapiType.type) {
    case "date":
    case "datetime":
    case "email":
    case "password":
    case "richtext":
    case "string":
    case "text":
    case "time":
    case "timestamp":
    case "uid":
      return "string";
    case "enumeration":
      return strapiType.enum
        ? strapiType.enum.map((item) => `"${item}"`).join(" | ")
        : "string";
    case "media":
      return "Blob";
    case "json":
      return "{ [key: string]: any }";
    case "dynamiczone":
      return "any[]";
    case "biginteger":
    case "decimal":
    case "float":
    case "integer":
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    default:
      return "any";
  }
};

/**
 * Maps strapi type format to a formatted object.
 * @param {object} strapiType strapi type
 * @returns {{type: string, required: boolean}} object with formatted type
 */
const typeMapper = (strapiType) => {
  return {
    type: getType(strapiType),
    required: strapiType.required === true,
  };
};

module.exports = typeMapper;
