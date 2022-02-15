module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Animals', [
      {
        name: 'Персик',
        isChecked: true,
        age: 0.5,
        city: 'Moscow',
        breed: 'Метис сибирской кошки',
        title: 'Котёнок метис сибирской кошки',
        description:
          'Ищет дом котёнок ( 6 месяцев) по кличке Персик, он очень ласковый, дружелюбен с сородичами и собаками, малыша предали предыдущие хозяева ,когда у него началась аллергия на корм те долго не думая просто выкинули, как вещь. Персик здоровый, молодой и активный котик, ищет самые ответственные и надёжные ручки.',
        user_id: 1,
        img: 'https://magizoo.ru/upload/iblock/152/CAT_3_1.jpg',
        type: 'cat',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Персик',
        isChecked: true,
        age: 10,
        city: 'Moscow',
        breed: 'Чихуахуа',
        title: 'Чихуахуа ищет дом',
        description:
          'Чихуахуа ищет дом. Домашний, отказник. Кобель, 10 лет, привит, кастрирован, чипирован Есть незначительные возрастные изменения по здоровью,требуется ежегодное наблюдение кардиолога и офтальмолога.',
        user_id: 1,
        img: 'https://magizoo.ru/upload/iblock/faa/DOG_2_.jpg',
        type: 'dog',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '2 взрослые кошечки',
        isChecked: true,
        age: 3,
        city: 'Moscow',
        breed: 'Кошка',
        title: '2 взрослые кошечки',
        description:
          '2 взрослые кошечки остались без хозяина. Кошечки ухоженные, приученные к лотку. Ищут новый дом.',
        user_id: 1,
        img: 'https://magizoo.ru/upload/iblock/41e/CAT_2.jpg',
        type: 'cat',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Собака',
        isChecked: true,
        age: 1,
        city: 'Moscow',
        breed: 'Собака',
        title: 'Собака',
        description:
          'Это Варя , ее забыли в одном из снт Подмосковья , ей 10 месяцев , она очень добрая . Очень верит , что ее где-то ждут . Она очень хочет стать домашней и любимой. Будет верной и преданной своему человеку .Подойдёт для вольерного содержания , привита и стерилизована . По всем вопросам пишите или звоните .',
        user_id: 1,
        img: 'https://magizoo.ru/upload/iblock/507/DOG_1.jpg',
        type: 'dog',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Белка',
        isChecked: true,
        age: 0.5,
        city: 'Moscow',
        breed: 'Кошка',
        title: 'Кошка',
        description:
          'Малышка Белка ищет дом! Спасена из квартиры «бабули собирательницы».Худая и миниатюрная девочка:5-6 месяцев Любопытная и ласковая девчонка,любит приручаться и чесание за ушком)Знает лоток,привита от бешенства,стерильна.Кушает влажный корм(сухой пока не умеет грызть)',
        user_id: 1,
        img: 'https://magizoo.ru/upload/iblock/0c6/CAT_1.jpg',
        type: 'cat',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Animals', null, {});
  },
};
