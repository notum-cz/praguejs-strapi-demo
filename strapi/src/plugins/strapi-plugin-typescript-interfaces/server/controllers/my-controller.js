"use strict";

const generateTypings = require("../helpers/generateTypings");
const fs = require("fs");

module.exports = {
  async index(ctx) {
    const archivePath = await generateTypings(strapi);
    // const archivePath = `${strapi.dirs.public}/typings.zip`;

    ctx.set("Content-Type", "application/zip");

    var readStream = fs.readFileSync(archivePath);

    return readStream;
  },
};
