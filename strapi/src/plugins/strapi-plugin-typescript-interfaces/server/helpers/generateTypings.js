const { getModelPopulationAttributes } = require("./populateHelpers");
const formatAttributes = require("./attributeFormatter");
const { mediaContentType } = require("./mediaHelpers");
const { interfaceMapper } = require("./interfaceMapper");
const ModelQueue = require("./ModelQueue");
const printTypes = require("./printTypes");
const { modifyPageContent } = require("./sectionHelpers");
const archiver = require("archiver");
const fs = require("fs");

/**
 * Return if uid is of allowed content types (if we want to get typing for this content type)
 * @param {string} uid Uid of a content type
 * @returns {boolean} Is the content type allowed or not
 */
const isAllowedContentType = (uid) => {
  const specialContentTypes = [mediaContentType];
  return Boolean(
    uid && (uid.startsWith("api::") || specialContentTypes.includes(uid))
  );
};

/**
 * Adds all models attributes to modelQueue. ModelQueue handles duplicities.
 * @param {object} model model which children should be added
 * @param {ModelQueue} modelQueue instance of current queue
 */
const enqueueNewModelComponents = (model, modelQueue) => {
  for (const [key, value] of Object.entries(
    getModelPopulationAttributes(model)
  )) {
    if (value) {
      if (value.type === "component") {
        modelQueue.enqueue(value.component);
      } else if (value.type === "dynamiczone") {
        value.components.forEach((component) => {
          modelQueue.enqueue(component);
        });
      } else if (value.type === "relation") {
        // do nothing
      } else {
        // do nothing
      }
    }
  }
};

/**
 * Takes content of a folder and zip it to a file at given path.
 * @param {string} source path to a folder to zip
 * @param {string} outputTarget path to a file to save the zip
 * @returns {Promise<void>}
 */
async function zipDirectory(source, dest) {
  const stream = fs.createWriteStream(dest);
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.on("error", function (err) {
    throw err;
  });

  await new Promise((resolve, reject) => {
    archive.pipe(stream);
    archive.directory(source, false);
    archive.on("error", (err) => {
      throw err;
    });

    archive.finalize();

    stream.on("close", function () {
      console.log(`zipped ${archive.pointer()} total bytes.`);
      resolve(dest);
    });

    stream.on("error", function (err) {
      console.log(err);
      reject(err);
    });
  });
}

/**
 * Generete typing and exports them.
 * @param {object} strapi Instance of Strapi.
 */
const generateTypings = async (strapi) => {
  // init modalQueue
  const filteredContentTypes = Object.keys(strapi.contentTypes).filter(
    isAllowedContentType
  );
  const modelQueue = new ModelQueue(filteredContentTypes);

  const types = {};

  // process modalQueue
  let modelUid;
  while ((modelUid = modelQueue.pop())) {
    const model = strapi.getModel(modelUid);
    enqueueNewModelComponents(model, modelQueue);

    const type = formatAttributes(strapi, model);
    types[interfaceMapper(model)] = type;
  }

  // sections - project specific behavior
  modifyPageContent(strapi, types);

  // print typings
  const typingsPath = printTypes(types, strapi.dirs.public);

  await zipDirectory(typingsPath, `${strapi.dirs.public}/typings.zip`);

  fs.rmSync(typingsPath, { recursive: true, force: true });

  return `${strapi.dirs.public}/typings.zip`;
};

module.exports = generateTypings;
