/* eslint-disable no-return-await */
const bcrypt = require('bcryptjs');
const { User, Animal, OrderItem, Order, Item } = require('../db/models');

async function createUser(data) {
  const { name, email, phone, password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    email,
    phone,
    password: hashPassword,
  };
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    throw new Error({ message: 'Такой пользователь уже существует' });
  }
  return await User.create(newUser);
}
async function getUserById(id) {
  const user = await User.findOne({
    where: {
      id,
    },
  });
  if (!user) {
    throw new Error('id неверный');
  }
  return user;
}

async function getUserAnimals(id) {
  console.log('id', id);
  const userAnimals = await Animal.findAll({
    where: {
      user_id: id,
    },
  });
  if (!userAnimals) {
    throw new Error('id неверный');
  }
  return userAnimals;
}

async function getUseOrder(id) {
  console.log('id', id);
  const userOrder = await Order.findAll({
    where: {
      user_id: id,
    },
    include: [
      {
        model: OrderItem,
        include: [Item],
      },
    ],
  });
  if (!userOrder) {
    throw new Error('id неверный');
  }
  return userOrder;
}

async function updateUser(id, data) {
  const { name, email, phone, password } = data;
  const user = await User.update(
    {
      name,
      email,
      phone,
      password,
    },
    {
      where: { id },
    }
  );
  if (!user) {
    throw new Error('Данные не изменены');
  } else {
    return user;
  }
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  getUserAnimals,
  getUseOrder,
};
