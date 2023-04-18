'use strict';
/**
 *  article controller
 */
const markdown = require('marked');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;
    const _ = await strapi.service('api::article.article').findOne(id);
    const content = await markdown.marked( _.content);
    return {
      ..._,
      content
    };
  }
}));
