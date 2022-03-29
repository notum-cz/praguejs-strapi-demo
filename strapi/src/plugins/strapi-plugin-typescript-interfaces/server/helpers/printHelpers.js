const fs = require("fs");
const path = require("path");
const { isArray } = require("lodash/fp");

/**
 * Adds imports to a result from the given model typings.
 * @param {object} result output object to store the result
 * @param {object[]} interfaceTypings model typings from which imports are generated
 */
const handleImports = (result, interfaceTypings, interfaceName) => {
  let hasImports = false;
  const imports = [];

  for (const typing of Object.values(interfaceTypings)) {
    const types = isArray(typing.type) ? typing.type : [typing.type];

    for (const type of types) {
      if (type.startsWith("I") && interfaceName !== type) {
        hasImports = true;
        imports.push(`import { ${type} } from "./${type}";`);
      }
    }
  }

  if (hasImports) {
    const uniqueImports = new Set(imports);
    result.push(...uniqueImports);
    result.push("");
  }
};

/**
 * Returns string contaning formatted type.
 * @param {object} typing
 * @returns {string} string containg formatted type
 */
const formatType = (typing) => {
  let type = typing.type;
  if (isArray(type)) {
    if (type.length > 1) {
      type = `(${type.join(" | ")})`;
    } else {
      type = type[0];
    }
  }

  return `${type}${typing.isArray ? "[]" : ""}`;
};

/**
 * Returns string containing content of an interface file.
 * @param {string} interfaceName name of the interface
 * @param {object[]} interfaceTypings model typings
 * @returns {string} string containing content of an interface file
 */
const formatInterface = (interfaceName, interfaceTypings) => {
  const result = [];

  handleImports(result, interfaceTypings, interfaceName);

  result.push(`export interface ${interfaceName} {`);
  for (const [name, typing] of Object.entries(interfaceTypings)) {
    result.push(
      `  ${name}${typing.required ? "" : "?"}: ${formatType(typing)};`
    );
  }
  result.push("}");
  result.push("");
  return result.join("\n");
};

/**
 * Saves content to a given file in ".tmp/typings" folder.
 * @param {string} fileName name of a file to save to
 * @param {string} content string to save
 */
const printToFile = (fileName, content, publicPath) => {
  const filePath = path.resolve(publicPath, fileName);
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }
  fs.writeFileSync(filePath, content, { encoding: "utf8", flag: "w+" }, (e) => {
    console.error(e);
  });
};

module.exports = { formatInterface, formatType, handleImports, printToFile };
