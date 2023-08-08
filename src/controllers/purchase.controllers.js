const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const Cart = require("../models/Cart");

const getAll = catchError(async (req, res) => {
  const results = await Purchase.findAll({ where: { userId: req.user.id } });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const productsCart = await Cart.findAll({
    where: { userId: req.user.id },
    attributes: ["quantity", "userId", "productId"],
    raw: true,
  });
  console.log(productsCart);
  const purchases = await Purchase.bulkCreate(productsCart);
  await Cart.destroy({ where: { userId: req.user.id } });
  return res.status(201).json(purchases);
});

module.exports = {
  getAll,
  create,
};
