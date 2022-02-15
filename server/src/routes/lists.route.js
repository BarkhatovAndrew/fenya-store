const router = require('express').Router();
const { Category, Type } = require('../db/models');

router.get('/', async (req, res) => {
  Promise.all([Type.findAll(), Category.findAll()])
    .then(([types, categories]) => res.json({ types, categories }))
    .catch(error => console.log(error));
});

module.exports = router;
