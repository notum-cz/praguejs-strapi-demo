"use strict";

/**
 *  page controller
 */
const { getFullPopulateObject } = require("../../../helpers/populationHelper");
const { createCoreController } = require("@strapi/strapi").factories;

const modelUid = "api::page.page";

module.exports = createCoreController(modelUid, ({ strapi }) => ({
  async find(ctx) {
    const { results, meta } = await strapi.service(modelUid).findWithSections({
      ...getFullPopulateObject(modelUid),
      ...ctx.query,
    });

    return {
      data: await this.sanitizeOutput(results, ctx),
      meta,
    };
  },
}));
