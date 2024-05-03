"use strict";

/**
 * cart controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::cart.cart", ({ strapi }) => ({
  async find(ctx) {
    const { sessionId } = ctx.query || {};
    try {
      let where = {};
      if (ctx.state.user) {
        // Logged-in user
        where = { userEmail: ctx.state.user.email };
      } else if (sessionId) {
        // Non-logged-in user with sessionID
        where = { sessionId };
      } else {
        // No user or sessionID, handle as appropriate (e.g., return empty data)
      }
      const data = await strapi.db.query("api::cart.cart").findMany(where);

      return { data };
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  },
  async create(ctx) {
    // @ts-ignore
    let { email, sessionId } = ctx.request.body.data || {};
    try {
      const res = await strapi.service("api::cart.cart").create({
        data: {
          // @ts-ignore
          ...ctx.request.body.data,
          userEmail: email || null,
          sessionID: sessionId,
        },
      });
      return res;
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  },
  async delete(ctx) {
    const { email } = ctx.state.user;
    const { id } = ctx.params;
    try {
      if (id === "fakeId") {
        const res = await strapi.db.query("api::cart.cart").deleteMany({
          where: {
            // @ts-ignore
            userEmail: email || localStorage.getItem("cart")?.identifier,
          },
        });
        return res;
      }
      const res = await strapi.db.query("api::cart.cart").delete({
        where: { id },
      });
      return res;
    } catch (error) {
      ctx.response.status = 500;
      console.log({ error });
      return error;
    }
  },
}));
