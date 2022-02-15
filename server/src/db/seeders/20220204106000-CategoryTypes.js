module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('CategoryTypes', [
      {
        type_id: 1,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 2,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 2,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 2,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('CategoryTypes', null, {});
  },
};
