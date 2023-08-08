const Cart = require("./Cart");
const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Image);
Image.belongsTo(Product);

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

Purchase.belongsTo(Product);
Product.hasMany(Purchase);

Purchase.belongsTo(User);
User.hasMany(Purchase);
