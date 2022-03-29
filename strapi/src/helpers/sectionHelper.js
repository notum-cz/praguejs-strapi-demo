/**
 * Array of section namespaces.
 */
const sectionCategories = ["sections"];

/**
 * Returns true if model is a section, false otherwise.
 * @param {string} modelUid model uid
 * @returns {boolean} true if model is a section, false otherwise
 */
const isSection = (modelUid) => {
  return Boolean(
    sectionCategories.includes(modelUid.toLowerCase().split(".")[0])
  );
};

module.exports = {
  isSection,
  sectionCategories,
};
