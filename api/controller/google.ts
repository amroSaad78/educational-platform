import { ValidationService } from "../services/validationService";
import { NextFunction, Request, Response } from "express";
import { GoogleService } from "../services/googleService";
import { ErrorResponse } from "../helper/errorResponse";
import { authentication } from "../constants/errors";

import { autoInjectable } from "tsyringe";

@autoInjectable()
export class GoogleController {
  constructor(
    private googleService: GoogleService,
    private validationService: ValidationService
  ) {}

  googleChecking = async (req: Request, res: Response, next: NextFunction) => {
    let { tokenId } = req.body;
    const error = this.validationService
      .required(tokenId, "errMessage", authentication)
      .result();
    if (Object.keys(error).length) {
      return next(new ErrorResponse(error, 401));
    }

    try {
      const respone = await this.googleService.google(tokenId);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
