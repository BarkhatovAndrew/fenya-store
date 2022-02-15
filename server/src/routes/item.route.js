/* eslint-disable camelcase */
const router = require('express').Router();
const Sequelize = require('sequelize');
const multer = require('multer');
const { Item, CategoryType } = require('../db/models');
const { storage } = require('../storage');

const upload = multer({ storage });

function getCategoryTypeId({ type, category }) {
  if (type) {
    if (type === 'cats') {
      switch (category) {
        case 'food':
          return 1;
        case 'toys':
          return 2;
        case 'clothes':
          return 3;
      }
    } else {
      switch (category) {
        case 'food':
          return 4;
        case 'toys':
          return 5;
        case 'clothes':
          return 6;
      }
    }
  }

  switch (category) {
    case 'food':
      return [1, 4];
    case 'toys':
      return [5, 2];
    case 'clothes':
      return [3, 6];
  }

  return undefined;
}

router.get('/:itemId', (req, res) => {
  try {
    const id = req.params.itemId;
    Item.findOne({ where: { id } }).then(item => res.json(item));
  } catch (err) {
    res.json({ err: err.message });
  }
});

router.get('/', async (req, res) => {
  const { type, category, search, offset, limit, sort } = req.query;

  const options = {};
  const where = {};

  if (limit) {
    options.limit = limit;
  }

  if (offset) {
    options.offset = offset;
  }

  if (sort) {
    options.order = sort === 'asc' ? [['price', 'ASC']] : [['price', 'DESC']];
  }

  if (search) {
    where.title = {
      [Sequelize.Op.iLike]: `%${req.query.search}%`,
    };
  }

  if (type || category) {
    where.categoryType_id = getCategoryTypeId({ type, category });
  }

  try {
    const { count: totalCount, rows: items } = await Item.findAndCountAll({
      ...options,
      where,
    });

    res.json({
      offset: parseInt(offset) + parseInt(limit),
      totalCount,
      items,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.get('/relative/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const currentItem = await Item.findOne({ where: { id } });
    const relativeItems = await Item.findAll({
      where: {
        categoryType_id: currentItem.categoryType_id,
      },
    });
    const result = relativeItems
      .filter(item => item.id !== Number(id))
      .sort(() => Math.random() - 0.5);
    res.json(result.slice(0, 5));
  } catch (err) {
    res.json({ err: err.message });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Item.destroy({ where: { id } })
    .then(data =>
      data ? res.json({ success: true }) : res.status(404).json(data)
    )
    .catch(error => res.status(500).json({ success: false, message: error }));
});

router.post('/', upload.single('img'), async (req, res) => {
  const { title, description, price, type, category, amount } = req.body;
  const { filename } = req.file;

  const categoryType_id = await CategoryType.findOne({
    where: {
      type_id: type,
      category_id: category,
    },
  });

  try {
    const item = await Item.create({
      title,
      description,
      price,
      categoryType_id: categoryType_id.id,
      rating: 0,
      img: filename,
      amount,
    });
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.put('/:id', upload.none(), async (req, res) => {
  const itemId = req.params.id;
  const { title, description, price, amount } = req.body;

  const item = await Item.findByPk(itemId);

  try {
    await item.update({
      title,
      description,
      price,
      amount,
    });

    item.save();
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
