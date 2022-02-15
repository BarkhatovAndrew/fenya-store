const router = require('express').Router();
const { Category } = require('../db/models');

router.get('/cats', async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.json(allCategories);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get('/dogs', async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.json(allCategories);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
