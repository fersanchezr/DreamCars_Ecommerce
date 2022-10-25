const express = require("express");
const router = express.Router();
const users = require("./users");
const cars = require("./car");
const product = require("./product")
const cart = require("./cart")
// aca definir rutas

router.use("/users", users);
router.use("/cars", cars);
router.use("/products", product);
router.use("/cart", cart);

module.exports = router;
