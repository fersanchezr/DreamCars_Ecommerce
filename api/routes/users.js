const express = require("express");
const validateAuth = require("../config/auth");
const { generateToken } = require("../config/tokens");
const { Car } = require("../models");
const router = express.Router();
const User = require("../models/User");

// Traer user especifico con sus autos favoritos
router.get("/:userid", (req, res) => {
  User.findOne({
    where: { id: req.params.userid },
    include: {
      model: Car,
      as: "favorites",
    },
  }).then((user) => res.status(200).send(user));
});

// crear o registrar usuarios
router.post("/register", (req, res) => {
  const { email } = req.body;
  User.findOrCreate({
    where: { email },
    defaults: req.body,
  }).then((user) => {
    user[1] ? res.status(201).send(user[0]) : res.status(200).send(user[0]);
  });
});

// ruta para editar un usuario

router.put("/:idUser", (req, res) => {
  const userId = req.params.idUser;
  User.update(req.body, { where: { id: userId } })
    .then((user) => {
      res.status(201).send({ Message: "User update" });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// ruta para eliminar un usari (admin)

router.delete("/:userId", (req, res) => {
  const idUser = req.params.userId;
  User.destroy({ where: { id: idUser } })
    .then((id) => {
      res.status(200).send({ message: "User deleted" });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// ruta para mostrar todos los usuarios (admin)

router.get("/", (req, res) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// ruta para login

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email },
    include: {
      model: Car,
      as: "favorites",
    },
  }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);
      const payload = {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        userId: user.id,
        admin: user.admin,
        favorites: user.favorites,
      };
      const token = generateToken(payload);
      res.cookie("token", token);
      res.send(payload);
    });
  });
});

// ruta para generar la persistencia

router.get("/me", validateAuth, (req, res) => {
  console.log("REQ USER", req.user);
  res.send(req.user);
});

// ruta para logout

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

// {
//     "name": "Fernando",
//     "lastname": "Sanchez",
//     "email": "f@mail.com",
//     "password": "1",
//     "phone": null,
//     "addres": null,
//     "admin": true
//   }

module.exports = router;
