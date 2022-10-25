const express = require("express");
const { User } = require("../models");
const router = express.Router();
const Car = require("../models/Car");

// Crear auto
router.post("/car", (req, res) => {
  const car = req.body;
  Car.create(car)
    .then((car) => res.status(201).send(car))
    .catch((error) => res.send(error));
});

// Crear autos
router.post("/", (req, res) => {
  const carsArray = req.body;
  Car.bulkCreate(carsArray)
    .then((cars) => res.status(201).send(cars))
    .catch((error) => res.send(error));
});

// Modificar auto
router.put("/car/:id", (req, res) => {
  const id = req.params.id;
  Car.update(req.body, { where: { id }, returning: true })
    .then(([row, updatedCar]) => {
      console.log(updatedCar);
      res.status(200).send(updatedCar);
    })
    .catch((err) => res.sendStatus(500));
});

// Traer todos lo autos
router.get("/", (req, res) => {
  Car.findAll()
    .then((cars) => {
      res.status(200).send(cars);
    })
    .catch((error) => res.send(error));
});

// Traer auto especifico con users que eligieron como favorito
router.get("/:carid", (req, res) => {
  Car.findOne({
    where: { id: req.params.carid },
    include: {
      model: User,
      as: "user",
    },
  }).then((car) => res.status(200).send(car));
});

// Añadir auto a favorito
router.put("/:userId", (req, res) => {
  const carid = req.body.id;
  User.findByPk(req.params.userId).then((user) => {
    //! Necesito recibir el id del car desde el front por req.body.id
    Car.findByPk(carid)
      .then(async (car) => {
        const favorite = await user.hasFavorites(car);
        if (favorite) {
          res.send({ message: "it's already favorite" });
        } else {
          user.addFavorites(car);
          res.send({ message: "Added favorites" });
        }
      })
      .catch((err) => console.log(err));
  });
});


// Eliminar auto
router.delete("/:carId", (req, res) => {
  const carId = req.params.carId;
  Car.destroy({ where: { id: carId } }).then((car) => {
    res.send({ message: "Car deleted" });
  });
});

// eliminar un auto de favoritos

router.put("/remove-favorite/:userId", (req, res) => {
  console.log("ENTRAMOS", req)

  const carId = req.body.id;
  User.findByPk(req.params.userId).then((user) => {
    Car.findByPk(carId)
      .then(async (car) => {
        const favorite = await user.hasFavorites(car);
        if (!favorite) {
          res.send({ message: "Dont have favorite cars" });
        } else {
          user.removeFavorites(car);
          res.status(200).send({ message: "Removed from favorites" });
        }
      })
      .catch((error) => res.send(error));
  });
});

// {
//     "brand": "fiat",
//     "model": "toro",
//     "year": 2017,
//     "price": 1000000,
//     "description": "Es una cagada",
//     "img" : null
//   }

module.exports = router;
