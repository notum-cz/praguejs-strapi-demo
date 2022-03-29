"use strict";

/**
 * page service.
 */
const { isArray } = require("lodash/fp");
const { isSection } = require("../../../helpers/sectionHelper");

const { createCoreService } = require("@strapi/strapi").factories;

const modelUid = "api::page.page";

function modifyPageContent(page) {
  if (isArray(page.content)) {
    let content = [];
    let currentContent = content;
    for (const component of page.content) {
      if (isSection(component.__component)) {
        const newContent = [];
        component.content = newContent;
        currentContent = newContent;
        content.push(component);
      } else {
        currentContent.push(component);
      }
    }
    page.content = content;
  }

  return page;
}

module.exports = createCoreService(modelUid, () => ({
  async findWithSections(ctx) {
    const { results, meta } = await super.find(ctx);

    const pagesWithSecion = results.map((item) => modifyPageContent(item));

    return { results: pagesWithSecion, meta };
  },
}));
