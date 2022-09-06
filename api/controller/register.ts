import { ValidationService } from "../services/validationService";
import { requestError } from "../constants/errors";
import { RegisterService } from "../services/registerService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import * as messages from "../constants/messages";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";
const base64 = require("base-64");
const utf8 = require("utf8");

@autoInjectable()
export class RegisterController {
  constructor(
    private registerService: RegisterService,
    private validationService: ValidationService
  ) {}

  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password } = req.body;
    try {
      email = utf8.decode(base64.decode(email));
      password = utf8.decode(base64.decode(password));
    } catch {
      return next(new ErrorResponse({ errMessage: requestError }, 400));
    }
    const error = this.validationService
      .between(name, 3, 50, "nameErr", messages.invalidName)
      .required(name, "nameErr", messages.requiredName)
      .isValidEmail(email, "emailErr", messages.invalidEmail)
      .required(email, "emailErr", messages.requiredEmail)
      .isSecure(password, "passwordErr", messages.weakPassword)
      .required(password, "passwordErr", messages.requiredPassword)
      .result();
    if (Object.keys(error).length) {
      error.errMessage = requestError;
      return next(new ErrorResponse(error, 400));
    }
    const user = new User(
      name.trim(),
      email.trim().toLowerCase(),
      password.trim()
    );
    await user.encryptPassword();
    user.setVerificationCode();
    user.setCodeExpiration();
    try {
      const respone = await this.registerService.register(user);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
