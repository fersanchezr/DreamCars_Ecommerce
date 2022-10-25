const S = require("sequelize");
const db = require("../config/index");
// const bcrypt = require("bcrypt");

class Car extends S.Model {}

Car.init(
  {
    brand: {
      type: S.STRING,
      allowNull: false,
    },
    model: {
      type: S.STRING,
      allowNull: false,
    },
    year: {
      type: S.INTEGER,
      allowNull: false,
    },
    price: {
      type: S.DECIMAL,
      allowNull: false,
    },
    description: {
      type: S.TEXT,
      allowNull: false,
    },
    img: {
      type: S.ARRAY(S.STRING),
      defaultValue: [
        "https://cdn.motor1.com/images/mgl/6ZZp9r/s3/most-expensive-cars-in-the-world-2022.webp",
      ],
    },
  },
  { sequelize: db, modelName: "car" }
);

module.exports = Car;
