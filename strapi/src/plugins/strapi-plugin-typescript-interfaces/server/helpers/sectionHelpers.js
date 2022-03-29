const { toCamelCase } = require("./helpers");
const { relationInterfaceMapper } = require("./interfaceMapper");

const sectionCategories = ["sections"];


/**
 * Returns true if interface is a section, false otherwise.
 * @param {string} interfaceName interface name
 * @returns {boolean} true if interface is a section, false otherwise
 */
const isSection = (interfaceName) => {
  return sectionCategories.some((sc) =>
    interfaceName.startsWith(`I${toCamelCase(sc)}`)
  );
};

/**
 * Modifies "api::page.page" content, groups content to sections. 
 * @param {object} strapi Strapi instance
 * @param {object} types object containg model types
 */
const modifyPageContent = (strapi, types) => {
  pageInterfaceName = relationInterfaceMapper(
    strapi.getModel("api::page.page")
  );
  const content = types[pageInterfaceName].content;

  const sections = content.type.filter((c) => isSection(c));
  const nonSections = content.type.filter((c) => !isSection(c));

  for (const section of sections) {
    types[section].content = { ...content, type: nonSections };
  }
};

module.exports = { modifyPageContent };
