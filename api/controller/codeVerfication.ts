import { VerficationService } from "../services/verficationService";
import { ValidationService } from "../services/validationService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { requestError } from "../constants/errors";
import * as messages from "../constants/messages";
import { autoInjectable } from "tsyringe";
const base64 = require("base-64");
const utf8 = require("utf8");

@autoInjectable()
export class CodeVerficationController {
  constructor(
    private verficationService: VerficationService,
    private validationService: ValidationService
  ) {}

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
      const respone = await this.verficationService.verify(
        email.trim().toLowerCase(),
        code.trim()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
