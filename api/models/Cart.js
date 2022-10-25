const S = require("sequelize");
const db = require("../config/index");

class Cart extends S.Model {}

Cart.init(
  {
    // Detalles de productos
    detail: {
      type: S.ARRAY(S.JSON)
    },
    // Compra esta finalizada o no
    checkout: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    // Métodos de pago
    paymentMethod: {
      type: S.STRING
    }
    , 
    // Precio total (Se maneja desde el Front)
    totalPrice: {
      type: S.DECIMAL,
      defaultValue: 0,
    },
  },
  { sequelize: db, modelName: "cart" }
);

module.exports = Cart;
