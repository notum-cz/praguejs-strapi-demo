"use strict";

/**
 *  simple-homepage controller
 */

const { getFullPopulateObject } = require("../../../helpers/populationHelper");
const { createCoreController } = require("@strapi/strapi").factories;

const modelUid = "api::simple-homepage.simple-homepage";

module.exports = createCoreController(modelUid, ({ strapi }) => ({
  async find(ctx) {
    const data = await strapi
      .service(modelUid)
      .find({ ...getFullPopulateObject(modelUid) });

    return {
      data: await this.sanitizeOutput(data, ctx),
      meta: {},
    };
  },
}));
