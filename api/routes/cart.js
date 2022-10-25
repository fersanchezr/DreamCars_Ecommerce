const express = require("express");
const { Car, Cart, User, Product } = require("../models");
const main = require("../utils/sendMail");

const router = express.Router();

// Ruta agregar un auto a comprar
router.put("/:userId", (req, res) => {

  const userId = req.params.userId;
  const carId = req.body.id;

  console.log("USER_ID", userId)
  console.log("CAR_ID", carId)

  User.findByPk(userId).then((user) => {
    Car.findByPk(carId).then(
      (car) => {
        // Acá el usuario procede a la compra del auto, luego de esto podra acceder a la compra de accesorios, servicios, etc
        car.setBuyer(user)
        /* .then(() => {
          Car.findByPk(carId, { include: { model: User, as: "buyer" } })
            .then(car => {
              res.send(car);
            });

        }) */
      })
  });
})

router.get("/:carId", (req, res) => {

  const carId = req.params.carId
  Car.findByPk(carId, { include: { model: User, as: "buyer" } }).then((car) => {
    // Acá el usuario procede a la compra del auto, luego de esto podra acceder a la compra de accesorios, servicios, etc
    res.send(car);
  });
});

// Ruta para eliminar el auto a comprar (Por arrepentimiento por ej.)
router.put("/remove-car/:userId", (req, res) => {
  const userId = req.params.userId;
  const carId = req.body.id;
  User.findByPk(userId).then((user) => {
    Car.findByPk(carId, { include: { model: User, as: "buyer" } }).then(
      (car) => {
        // Acá el usuario se arrepiente de la compra del auto.
        car.removeBuyer(user);
        res.send(car);
      }
    );
  });
});

// Ruta para agregar extras al auto
router.put("/add-accesories/:carId", (req, res) => {
  const carId = req.params.carId;
  const productId = req.body.id;
  Car.findByPk(carId, {
    include: { model: Product, as: "otherProducts" },
  }).then((car) => {
    Product.findByPk(productId).then((product) => {
      car.addOtherProducts(product);
      res.send(car);
    });
  });
});

// Ruta para quitar extras al auto
router.put("/remove-accesories/:carId", (req, res) => {
  const carId = req.params.carId;
  const productId = req.body.id;
  Car.findByPk(carId, {
    include: { model: Product, as: "otherProducts" },
  }).then((car) => {
    Product.findByPk(productId).then((product) => {
      car.removeOtherProducts(product);
      res.send(car);
    });
  });
});

// Ruta para actualizar stock
router.put("/update-stock/:productId", (req, res) => {
  const productId = req.params.productId;
  const stock = req.body.stock;
  Product.update(
    { stock: stock },
    { where: { id: productId }, returning: true }
  )
    .then(([row, updatedProduct]) => {
      res.send(updatedProduct)
    });
});

// Ruta finalizar compra
router.post("/checkout/:userId", (req, res) => {
  const purchaseOrder = req.body
  const userId = req.params.userId
  console.log("USER_ID", userId)
  console.log("PO", purchaseOrder)
  User.findByPk(userId)
    .then(user => {
      Cart.create(purchaseOrder)
        .then(order => {
          user.addPurchaseOrder(order)

          // codigo para mail:
          console.log("PO", order)
          console.log("USER", user)
          main(order, user)

          res.status(201).send(order)
        })
    })
})




// Ruta ver todas las ordenes de compra
router.get("/purchased-orders/:userId", (req, res) => {
  const userId = req.params.userId
  Cart.findAll({ where: { userId: userId } })
    .then(orders => {
      res.status(200).send(orders)
    })
})

// ruta para agregar un producto al carrito
// en proceso
// router.post("/:userId", (req, res) => {
//   const { brand, model, year, price, description, img } = req.body;
//   const userId = req.params.userId;
//   Cart.create({ brand, model, year, price, description, img, userId }).then(
//     (product) => {
//       console.log("product", product);
//     }
//   );
// });

//ruta para eliminar un producto del carrito

// router.delete("/:productId", (req, res) => {
//   const idProduct = req.params.productId;
//   // Cart es un producto
//   Cart.destroy({ where: { id: idProduct } })
//     .then((id) => {
//       res.status(201).send({ message: "product deleted" });
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// });

// ruta para editar la cantidad el producto en el carrito
//en proceso

// router.put("/:idProduct", (req, res) => {
//     const productId = req.params.idProduct;
//     User.update(req.body, { where: { id: productId } })
//       .then((product) => {
//     //aca tendria que editar la cantidad de productos que quiere
//     //poner un comparador q si la cantidad es igual a 1 y quiere bajarla q le consulte si lo quiere eliminar
//     // si resta q diga uno menos
//         res.status(201).send({ Message: "uno menos" });
//         //si suma q diga uno mas
//       })
//       .catch((error) => {
//         res.status(400).send(error);
//       });
//   });

module.exports = router;
