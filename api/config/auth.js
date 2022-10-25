//middleware de validacion de token

const { validateToken } = require("./tokens");

function validateAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const user = validateToken(token);
  console.log(user);
  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
}

module.exports = validateAuth;
