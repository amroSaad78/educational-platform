import { NextFunction, Response, Request } from "express";
const config = require("../config/configurations");

export const requestPolicy = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Access-Control-Allow-Origin", config.ORIGIN);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res
      .status(200)
      .json({ "Requests types: ": "PUT, POST, DELETE, GET" });
  }

  //setTimeout(() => next(), 3000); //comment this line after test finish.

  next();
};
