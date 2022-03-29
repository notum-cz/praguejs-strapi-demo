const { formatType } = require("./printHelpers");

/**
 * Name of the media type.
 */
const mediaContentType = "plugin::upload.file";

/**
 * Returns a content of an media interface file.
 * @param {string} interfaceName An interface name
 * @param {object} interfaceTypings Media typings
 * @returns Content of an media interface file
 */
const getMediaFileContent = (interfaceName, interfaceTypings) => {
  const result = [];

  // predefined data
  result.push(`interface IFormat {`);
  result.push(`  ext?: string;`);
  result.push(`  url: string;`);
  result.push(`  hash: string;`);
  result.push(`  mime: string;`);
  result.push(`  name?: string;`);
  result.push(`  path?: string;`);
  result.push(`  size: number;`);
  result.push(`  width?: number;`);
  result.push(`  height?: number;`);
  result.push("}");
  result.push("");

  result.push(`interface IFormats {`);
  result.push(`  large?: IFormat;`);
  result.push(`  medium?: IFormat;`);
  result.push(`  small?: IFormat;`);
  result.push(`  thumbnail?: IFormat;`);
  result.push("}");
  result.push("");

  interfaceTypings.formats = { ...interfaceTypings.formats, type: "IFormats" };

  // media interface formatting
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

module.exports = { getMediaFileContent, mediaContentType };
