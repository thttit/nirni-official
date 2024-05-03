module.exports = {
  routes: [
    {
      method: "PATCH",
      path: "/orders/:id",
      handler: "order.updateOrderStatus",
      config: {
        policies: [],
      },
    },
  ],
};
