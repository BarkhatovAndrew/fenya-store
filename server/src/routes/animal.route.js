const router = require('express').Router();
const multer = require('multer');
const { storage } = require('../storage');
const { Animal, User } = require('../db/models');
const { isAuth } = require('../middlewares/isAuth');

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const animals = await Animal.findAll({
      include: [User],
    });
    res.json(animals);
  } catch (err) {
    res.json({ res: 404 });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findOne({
      include: [User],
      where: { id },
    });
    res.json(animal);
  } catch (err) {
    res.json({ res: 404 });
  }
});

router.post('/', [upload.single('img'), isAuth], async (req, res) => {
  const { name, title, description, age, type, city, breed } = req.body;
  const { filename } = req.file;
  const { userId } = req;
  try {
    const animal = await Animal.create({
      name,
      title,
      isChecked: false,
      description,
      age,
      type,
      city,
      breed,
      img: filename,
      user_id: userId,
    });
    res.json({ success: true, animal });
  } catch (error) {
    res.status(501).json({ success: false });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Animal.destroy({ where: { id } })
    .then(data =>
      data ? res.json({ success: true }) : res.status(404).json(data)
    )
    .catch(error => res.status(500).json({ success: false }));
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const animal = await Animal.update({ isChecked: true }, { where: { id } });
    res.json({ success: true, id });
  } catch (error) {
    res.status(501).json({ success: false });
  }
});

module.exports = router;
