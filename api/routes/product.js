const express = require("express");
const { User, Product } = require("../models");
const router = express.Router();

// Crear producto
router.post("/product", (req, res) => {
  const product = req.body;
  Product.create(product)
    .then((product) => res.status(201).send(product))
    .catch((error) => res.send(error));
});

// Crear productos
router.post("/", (req, res) => {
  const productsArray = req.body;
  Product.bulkCreate(productsArray)
    .then((products) => res.status(201).send(products))
    .catch((error) => res.send(error));
});

// Modificar producto
router.put("/product/:id", (req, res) => {
  const id = req.params.id;
  Product.update(req.body, { where: { id }, returning: true })
    .then(([row, updatedProduct]) => {
      console.log(updatedProduct);
      res.status(200).send(updatedProduct);
    })
    .catch((err) => res.sendStatus(500));
});

// Traer todos los productos
router.get("/", (req, res) => {
  Product.findAll()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((error) => res.send(error));
});

// Eliminar product
router.delete("/:productId", (req, res) => {
  const productId = req.params.productId;
  Product.destroy({ where: { id: productId } }).then(() => {
    res.send({ message: "Product deleted" });
  });
});

module.exports = router;
