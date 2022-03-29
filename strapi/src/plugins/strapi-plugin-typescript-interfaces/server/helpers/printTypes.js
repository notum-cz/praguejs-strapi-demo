const { mediaInterfaceMapper } = require("./interfaceMapper");
const { getMediaFileContent } = require("./mediaHelpers");
const { printToFile, formatInterface } = require("./printHelpers");

const path = require("path");
const fs = require("fs");

/**
 * Handles printing interfaces to files and then zips them to a file.
 * @param {object} types
 */
const printTypes = (types, publicPath) => {
  const typingsPath = path.resolve(`${publicPath}/typings/`);

  fs.rmSync(typingsPath, { recursive: true, force: true });

  const mediaInterface = mediaInterfaceMapper();
  for (const [interfaceName, interfaceTypings] of Object.entries(types)) {
    if (interfaceName === mediaInterface) {
      printToFile(
        `${interfaceName}.ts`,
        getMediaFileContent(interfaceName, interfaceTypings),
        typingsPath
      );
    } else {
      printToFile(
        `${interfaceName}.ts`,
        formatInterface(interfaceName, interfaceTypings),
        typingsPath
      );
    }
  }

  return typingsPath;
};

module.exports = printTypes;
