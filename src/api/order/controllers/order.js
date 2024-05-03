"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { email } = ctx.state.user;
    try {
      const res = await strapi.service("api::order.order").create({
        data: {
          // @ts-ignore
          ...ctx.request.body.data,
          userEmail: email,
        },
      });
      return res;
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    try {
      const order = await strapi.db.query("api::order.order").findOne({
        // @ts-ignore
        id,
      });

      if (!order) {
        // @ts-ignore
        return ctx.response.notFound("Order not found");
      }
      return { data: order };
    } catch (error) {
      console.error("Error fetching order:", error);
      ctx.response.status = 500;
      return { error: "Internal Server Error" };
    }
  },
  async updateOrderStatus(ctx) {
    const { id } = ctx.params;

    try {
      const order = await strapi.db.query("api::order.order").findOne({
        // @ts-ignore
        code: id,
      });

      // Update the order status to 'payed'
      await strapi.entityService.update(
        "api::order.order",
        // @ts-ignore
        order.id,
        { data: { status: "payed" } }
      );
      return { success: true };
    } catch (error) {
      console.error("Error updating order status:", error);
      ctx.response.status = 500;
      return { error: "Internal Server Error" };
    }
  },
}));
