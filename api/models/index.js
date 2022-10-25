// REQUIERO TODOS LOS MODELOS QUE HAY
const User = require("./User");
const Car = require("./Car");
const Product = require("./Product");
const Cart = require("./Cart");

// ASOCIACION/ RELACIONES DE LOS OBJETOS/MODELO DE MI DB --> hasMany/hasOne/ belongTo
//Siempre tienen que ser dobles, en ambas direcciones

// Un User tiene un Car en favoritos
User.belongsToMany(Car, { as: "favorites", through: "favorites_cars" });
// Car.hasMany(User)
// Un Car tiene muchos User como interesados.
Car.belongsToMany(User, { as: "user", through: "favorites_cars" });
// User.hasMany(Car)

// Un Car es comprado por un User "seller" --> Magic Method setSeller()
Car.hasMany(User, {as: "buyer", foreignKey: "carId"})
User.hasMany(Car)

// Un Car tiene muchos Product "other-products" --> Magic Method addOtherProducts()
Car.hasMany(Product, {as:"otherProducts"})
Product.belongsTo(Car)

// Un User tiene muchas ordenes de compra (Cart)
User.hasMany(Cart, {as: "purchaseOrder"})
// Orden de compra (Cart) pertenece a un solo User
Cart.belongsTo(User)

// // Un Car tiene muchos Product
// Car.hasMany(Product);
// // Un Product tiene muchos Cars
// Product.hasMany(Car);

// // Un Cart pertenece un User
// Cart.belongsTo(User)
// // Un User tiene muchos Cart
// User.hasMany(Cart)

// // Un Car pertenece a un Cart
// Car.belongsTo(Cart)
// // Un Cart pertenece a un Car
// Cart.belongsTo(Car)

// EXPORTO MODELOS PARA USARLOS EN MI PATH DE RUTAS

module.exports = { User, Car, Product, Cart };
