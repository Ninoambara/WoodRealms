const jwt = require("jsonwebtoken");

function generateJWT() {
  const options = {
    algorithm: "HS256",
  };
  const payload = {
    iss: "7d5638b8a60ccea19008d028a10d519e31dc740c998e18033be4afc3d5eeb048",
    sub: "ninoambara1@gmail.com",
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  const API_SECRET =
    "da8049095f7bce15cc4940a01967d73f0520f98a1daf6324d9e50e4fbf39b9c6";

  const token = jwt.sign(payload, API_SECRET, options);

  return token;
}

module.exports = generateJWT;
