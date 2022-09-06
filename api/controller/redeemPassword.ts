import { RedeemPasswordService } from "../services/redeemPasswordService";
import { ValidationService } from "../services/validationService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { requestError } from "../constants/errors";
import * as messages from "../constants/messages";
import { autoInjectable } from "tsyringe";
const base64 = require("base-64");
const utf8 = require("utf8");

@autoInjectable()
export class RedeemPasswordController {
  constructor(
    private redeemPasswordService: RedeemPasswordService,
    private validationService: ValidationService
  ) {}

  codeRequest = async (req: Request, res: Response, next: NextFunction) => {
    let { email } = req.body;
    try {
      email = utf8.decode(base64.decode(email));
    } catch {
      return next(new ErrorResponse({ errMessage: requestError }, 400));
    }
    const error = this.validationService
      .isValidEmail(email, "emailErr", messages.invalidEmail)
      .required(email, "emailErr", messages.requiredEmail)
      .result();
    if (Object.keys(error).length) {
      error.errMessage = requestError;
      return next(new ErrorResponse(error, 400));
    }
    try {
      const respone = await this.redeemPasswordService.request(
        email.trim().toLowerCase()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  verifyCode = async (req: Request, res: Response, next: NextFunction) => {
    let { email, code } = req.body;
    try {
      email = utf8.decode(base64.decode(email));
      code = utf8.decode(base64.decode(code));
    } catch {
      return next(new ErrorResponse({ errMessage: requestError }, 400));
    }
    const error = this.validationService
      .isValidEmail(email, "errMessage", messages.invalidEmail)
      .required(email, "errMessage", messages.requiredEmail)
      .required(code, "codeErr", messages.requiredVerfCode)
      .result();
    if (Object.keys(error).length) {
      return next(new ErrorResponse(error, 400));
    }
    try {
      const respone = await this.redeemPasswordService.verify(
        email.trim().toLowerCase(),
        code.trim()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
