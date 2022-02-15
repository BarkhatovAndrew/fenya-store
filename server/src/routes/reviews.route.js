/* eslint-disable camelcase */
const router = require('express').Router();
const { Review, Item, User } = require('../db/models');

router.get('/:id', (req, res) => {
  try {
    Review.findAll({ where: { item_id: req.params.id } }).then(reviews => {
      res.json(reviews);
    });
  } catch (err) {
    res.json({ err: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [User, Item],
    });
    res.json(reviews);
  } catch (err) {
    res.json({ res: 404 });
  }
});

router.post('/:id', async (req, res) => {
  const { title, description, item_id, rating } = req.body;
  const currentItem = await Item.findOne({ where: { id: item_id } });
  const { userId } = req;
  if (currentItem.rating > 5) {
    await currentItem.update({
      rating: 5,
    });
  } else {
    await currentItem.update({
      rating: Math.floor(rating + currentItem.rating / 2),
    });
  }
  const newReview = await Review.create({
    title,
    description,
    item_id,
    rating,
    user_id: userId,
    isChecked: false,
  });
  res.json(newReview);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Review.destroy({ where: { id } })
    .then(data =>
      data ? res.json({ success: true }) : res.status(404).json(data)
    )
    .catch(error => res.status(500).json({ success: false }));
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.update({ isChecked: true }, { where: { id } });
    res.json({ success: true, id });
  } catch (error) {
    res.status(501).json({ success: false });
  }
});

module.exports = router;
