const getRandomNumber = (min = 1, max = 10) => {
  return Math.ceil(Math.random() * (max - min + 1));
};
module.exports = {
  beforeCreate: async (event) => {
    const date = new Date();
    const codeId = `${date.getFullYear()}${
      date.getMonth() + 1
    }${date.getDate()}-${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}`;
    // Access the data object and update the 'code' property
    event.params.data.code = codeId;
  },
};
