const S = require("sequelize");
const db = require("../config/index");

class Product extends S.Model {}

Product.init(
  {
    // Al último pasar el notEmpty a true
    name: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    type: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    price: {
      type: S.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    description: {
      type: S.TEXT,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    img: {
      type: S.ARRAY(S.STRING),
      allowNull: false,
      defaultValue: [
        "https://cdn.motor1.com/images/mgl/6ZZp9r/s3/most-expensive-cars-in-the-world-2022.webp",
      ],
      validate: {
        notEmpty: false,
      },
    },
    stock: {
      type: S.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize: db,
    modelName: "product",
  }
);

module.exports = Product;
