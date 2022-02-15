module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Корм',
        url: 'food',
        img: '/img/pet-food.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Игрушки',
        url: 'toys',
        img: '/img/pet-toy.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Костюмы',
        url: 'clothes',
        img: '/img/clothes.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
