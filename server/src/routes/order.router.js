const router = require('express').Router();
const { OrderItem, Order, Item } = require('../db/models');

router.post('/', async (req, res) => {
  const order = req.body;
  const { userId } = req;
  console.log(userId, '>>>>>>>>>>>>userId');

  const newOrder = await Order.create({
    user_id: userId,
  });
  try {
    order.forEach(async el => {
      await OrderItem.create({
        order_id: newOrder.id,
        item_id: el.id,
        count: el.count,
      });
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.get('/', async (req, res) => {
  try {
    const allOrders = await OrderItem.findAll(
      {
        include: [Order, Item],
      },
      { raw: true }
    );
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  OrderItem.destroy({ where: { id } })
    .then(data =>
      data ? res.json({ success: true }) : res.status(404).json(data)
    )
    .catch(error => res.status(500).json({ success: false, message: error }));
});

module.exports = router;
