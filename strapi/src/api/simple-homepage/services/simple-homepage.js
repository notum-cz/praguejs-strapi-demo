'use strict';

/**
 * simple-homepage service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::simple-homepage.simple-homepage');
