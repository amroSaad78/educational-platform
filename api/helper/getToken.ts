import { User } from "../entities/User";
const jwt = require("jsonwebtoken");
const config = require("../config/configurations");

module.exports = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
    },
    config.TOKEN.secret,
    {
      issuer: config.TOKEN.issuer,
      algorithm: "HS256",
      expiresIn: config.TOKEN.expireTime,
    }
  );
};
