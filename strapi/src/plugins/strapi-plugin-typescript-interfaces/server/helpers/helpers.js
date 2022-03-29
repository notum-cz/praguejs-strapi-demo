const { camelCase } = require("lodash/fp");

/**
 * Transform string so it string with leading with capital
 * @param {string} string String to transform
 * @returns {string} String with leading capital
 */
const firstToUpper = (string) => {
  if (string && string.length > 0) {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
  }
  return string;
};

/**
 * Transform string to CamelCase (leading with capital)
 * @param {string} string String to transform
 * @returns {string} String in CamelCase
 */
const toCamelCase = (string) => {
  if (string && string.length > 0) {
    return firstToUpper(camelCase(string));
  }
  return string;
};

module.exports = { toCamelCase };
