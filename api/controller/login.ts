import { ValidationService } from "../services/validationService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { LoginService } from "../services/loginService";
import { requestError } from "../constants/errors";
import * as messages from "../constants/messages";
import { autoInjectable } from "tsyringe";
const base64 = require("base-64");
const utf8 = require("utf8");

@autoInjectable()
export class LoginController {
  constructor(
    private loginService: LoginService,
    private validationService: ValidationService
  ) {}

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;
    try {
      email = utf8.decode(base64.decode(email));
      password = utf8.decode(base64.decode(password));
    } catch {
      return next(new ErrorResponse({ errMessage: requestError }, 400));
    }

    const error = this.validationService
      .isValidEmail(email, "emailErr", messages.invalidEmail)
      .required(email, "emailErr", messages.requiredEmail)
      .required(password, "passwordErr", messages.requiredPassword)
      .result();
    if (Object.keys(error).length) {
      error.errMessage = requestError;
      return next(new ErrorResponse(error, 400));
    }

    try {
      const respone = await this.loginService.login(
        email.trim().toLowerCase(),
        password.trim()
      );
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
