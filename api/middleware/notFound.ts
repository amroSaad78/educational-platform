import { notFoundRoute } from "../constants/errors";
import { NextFunction, Response, Request } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ errMessage: notFoundRoute });
};
