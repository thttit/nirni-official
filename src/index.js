"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const getRandomNumber = (min = 1, max = 10) => {
      return Math.ceil(Math.random() * (max - min + 1));
    };

    // Define the beforeCreate lifecycle hook
    await strapi.db.lifecycles.subscribe({
      models: ["api::order.order"], // Replace 'api::your-model.your-model' with the actual model name
      async beforeCreate(event) {
        const date = new Date();
        const codeId = `${date.getFullYear()}${
          date.getMonth() + 1
        }${date.getDate()}-${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}`;

        // Access the data object and update the 'code' property
        event.params.data.code = codeId;
      },
    });
  },
};
