// Configuración del server
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const db = require("./config");
const app = express();
const routes = require("./routes");
const models = require("./models/index"); // se puede requerir y ejecutar sin guardar en una variable
const cors = require("cors");

app.use(
  cors({
    /* origin: "http://localhost:3000/", */
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes); //todas las rutas empiezan con api
// app.use("/", (req, res, next) => res.redirect("/api")); // me aseguro que si o si vaya para /api si entraste en otra ruta
app.use(express.urlencoded({ extended: false }));

db.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("API on port 3001");
  });
});
