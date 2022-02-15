module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@admin.ru',
        password:
          '$2a$10$YhI2rKg5AUhbAou2RZ1RL.OdD1p0VdQMbixChWXPFCHwxP3wpajT6',
        isAdmin: true,
        phone: '8-800',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
