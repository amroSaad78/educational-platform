import { connectionError, dbTableError } from "../constants/errors";
import { ErrorResponse } from "../helper/errorResponse";
import { NextFunction, Response, Request } from "express";

const errorHandler = (
  payload: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, error } = payload;

  switch (error?.code) {
    case "ER_DUP_ENTRY":
      return res
        .status(400)
        .json({ errMessage: error.sqlMessage.split("for")[0].trim() });
    case "ER_NO_SUCH_TABLE":
      return res.status(500).json({ errMessage: dbTableError });
    case "ECONNREFUSED":
      return res.status(500).json({ errMessage: connectionError });
    default:
      res.status(statusCode || 500).json(error);
  }
};

export default errorHandler;
